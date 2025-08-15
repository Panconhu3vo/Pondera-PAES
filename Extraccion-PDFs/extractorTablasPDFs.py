import pdfplumber
import pandas as pd
import json
import os
import re

# --- Funciones Auxiliares ---

def to_snake_case(name):
    # Reemplazar paréntesis y su contenido
    name = name.replace('(C. LECT.)', 'C_LECT').replace('(M1)', 'M1').replace('(M2)', 'M2')
    name = name.replace('(C. LECT. Y MAT1)', 'C_LECT_Y_MAT1')
    name = re.sub(r'[\s\.\-\+\/]', '_', name)
    name = re.sub(r'_+', '_', name)
    name = name.strip('_')
    return name.upper()

def extract_and_clean_tables(pdf_path):
    # Definimos la lista de las 11 columnas que queremos usar
    columns_to_use = [
        "COD",
        "CARRERA O PROGRAMA ACADÉMICO",
        "LUGAR EN QUE SE IMPARTE",
        "NEM",
        "RANKING",
        "COMPETENCIA LECTORA (C. LECT.)",
        "COMPETENCIA MATEMÁTICA 1 (M1)",
        "HISTORIA Y CIENCIAS SOCIALES",
        "Opcional",
        "CIENCIAS",
        "COMPETENCIA MATEMÁTICA 2 (M2)"
    ]

    all_cleaned_dfs = []
    
    column_rename_map = {col: to_snake_case(col) for col in columns_to_use}

    if not os.path.exists(pdf_path):
        print(f"Error: El archivo PDF '{pdf_path}' no se encontró. Saltando a la siguiente universidad.")
        return []

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            print(f"Procesando página {page_num + 1}...")
            tables = page.extract_tables()

            for table_num, table_data in enumerate(tables):
                print(f"    Tabla {table_num + 1} en página {page_num + 1}...")
                
                if len(table_data) < 3:
                    print(f"      Advertencia: La tabla {table_num + 1} en la página {page_num + 1} tiene muy pocas filas. Saltando.")
                    continue

                try:
                    data_rows_cleaned = [row[:len(columns_to_use)] for row in table_data[2:]]
                    df = pd.DataFrame(data_rows_cleaned, columns=columns_to_use)
                    
                    df.dropna(how='all', inplace=True)
                    df.replace(r'^\s*$', pd.NA, regex=True, inplace=True)
                    
                    if "COD" in df.columns:
                        df["COD"] = df["COD"].astype(str).str.replace(r'\s*\(\d+\)\s*', '', regex=True).str.strip()
                    
                    if "CARRERA O PROGRAMA ACADÉMICO" in df.columns:
                        df["CARRERA O PROGRAMA ACADÉMICO"] = df["CARRERA O PROGRAMA ACADÉMICO"].astype(str).str.replace(r'\s*\(\d+\)\s*', '', regex=True).str.strip()
                        df["CARRERA O PROGRAMA ACADÉMICO"] = df["CARRERA O PROGRAMA ACADÉMICO"].str.replace(r'\s+', ' ', regex=True)

                    df.rename(columns=column_rename_map, inplace=True)

                    numeric_cols_final = [to_snake_case(col) for col in columns_to_use if col not in [
                        "CARRERA O PROGRAMA ACADÉMICO", "LUGAR EN QUE SE IMPARTE", "Opcional"
                    ]]

                    for col in numeric_cols_final:
                        if col in df.columns:
                            df[col] = pd.to_numeric(df[col], errors='coerce')
                            df[col] = df[col].fillna(0)
                            
                            if df[col].dtype == 'float64':
                                if (df[col] == df[col].astype(int)).all():
                                    df[col] = df[col].astype(int)
                                
                    df.dropna(axis=1, how='all', inplace=True)
                    
                    all_cleaned_dfs.append(df)
                    print(f"      DataFrame limpiado de la tabla {table_num + 1} en página {page_num + 1}:")
                    print(df.head())
                    print(f"      Forma del DataFrame: {df.shape}")
                    print("-" * 50)

                except Exception as e:
                    print(f"      Error general al crear o limpiar DataFrame para la tabla {table_num + 1}: {e}")
                    print(f"      Datos brutos de la tabla (primeras 5 filas): {table_data[:5]}")
                    print("-" * 50)

    return all_cleaned_dfs

# --- Parte principal del script ---

# Diccionario de universidades a procesar
universidades_a_procesar = [
    {"nombre": "UNIVERSIDAD DE LOS LAGOS", "siglas": "ULAGOS"},
    {"nombre": "UNIVERSIDAD DE MAGALLANES", "siglas": "UMAG"},
    {"nombre": "UNIVERSIDAD DE O’HIGGINS", "siglas": "UOH"},
    {"nombre": "UNIVERSIDAD DE PLAYA ANCHA", "siglas": "UPLA"},
    {"nombre": "UNIVERSIDAD DE SANTIAGO DE CHILE", "siglas": "USACH"},
    {"nombre": "UNIVERSIDAD DE TALCA", "siglas": "UTALCA"},
    {"nombre": "UNIVERSIDAD DE TARAPACÁ", "siglas": "UTA"},
    {"nombre": "UNIVERSIDAD DE VALPARAÍSO", "siglas": "UV"},
    {"nombre": "UNIVERSIDAD DEL BÍO-BÍO", "siglas": "UBB"},
    {"nombre": "UNIVERSIDAD DEL DESARROLLO", "siglas": "UDD"},
    {"nombre": "UNIVERSIDAD DIEGO PORTALES", "siglas": "UDP"},
    {"nombre": "UNIVERSIDAD FINIS TERRAE", "siglas": "UFT"},
    {"nombre": "UNIVERSIDAD GABRIELA MISTRAL", "siglas": "UGM"},
    {"nombre": "UNIVERSIDAD MAYOR", "siglas": "UMAYOR"},
    {"nombre": "UNIVERSIDAD METROPOLITANA DE CS. DE LA EDUCACIÓN", "siglas": "UMCE"},
    {"nombre": "UNIVERSIDAD SAN SEBASTIÁN", "siglas": "USS"},
    {"nombre": "UNIVERSIDAD SANTO TOMÁS", "siglas": "UST"},
    {"nombre": "UNIVERSIDAD TÉCNICA FEDERICO SANTA MARÍA", "siglas": "USM"},
    {"nombre": "UNIVERSIDAD TECNOLÓGICA METROPOLITANA", "siglas": "UTEM"},
    # Puedes añadir más universidades a esta lista
]

json_output_file = './Pondera-PAES/data/Ponderaciones.json'

# Inicializar o cargar el archivo JSON
all_universities_data = []
if os.path.exists(json_output_file) and os.path.getsize(json_output_file) > 0:
    try:
        with open(json_output_file, 'r', encoding='utf-8') as f:
            content = f.read()
            if content:
                all_universities_data = json.loads(content)
                print(f"\nDatos existentes cargados de '{json_output_file}'. Se añadirán nuevas entradas.")
    except json.JSONDecodeError:
        print(f"Advertencia: '{json_output_file}' no es un JSON válido. Se creará un nuevo archivo.")
        all_universities_data = []

# Bucle principal para procesar cada universidad
for universidad in universidades_a_procesar:
    nombre_universidad = universidad["nombre"]
    siglas_universidad = universidad["siglas"]
    pdf_file = f'Extraccion-PDFs/pdfs/tabla-{siglas_universidad}.pdf'

    print("\n" + "="*80)
    print(f"=== Procesando datos para la {nombre_universidad} ({siglas_universidad}) ===")
    print("="*80)

    # Llama a la función de extracción para la universidad actual
    cleaned_dfs = extract_and_clean_tables(pdf_file)

    if cleaned_dfs:
        print(f"\nTotal de DataFrames limpiados para {siglas_universidad}: {len(cleaned_dfs)}")
        
        final_df = pd.concat(cleaned_dfs, ignore_index=True)
        print(f"Forma del DataFrame final para {siglas_universidad}: {final_df.shape}")
        
        # Convierte el DataFrame a un diccionario para el JSON
        carreras_list = final_df.to_dict(orient='records')
        
        current_university_data = {
            "UNIVERSIDAD": {
                "nombre_de_la_universidad": nombre_universidad,
                "siglas": siglas_universidad,
                "carreras": carreras_list
            }
        }
        
        # Busca si la universidad ya existe para actualizarla, de lo contrario la añade
        found = False
        for i, entry in enumerate(all_universities_data):
            if entry.get("UNIVERSIDAD", {}).get("siglas") == siglas_universidad:
                all_universities_data[i] = current_university_data
                found = True
                print(f"\n¡Datos de '{nombre_universidad}' actualizados en la lista!")
                break
        
        if not found:
            all_universities_data.append(current_university_data)
            print(f"\n¡Datos de '{nombre_universidad}' agregados a la lista!")
            
    else:
        print(f"No se extrajeron datos para {nombre_universidad}. Revisar el PDF o la lógica de extracción.")

# Guardar la lista completa y actualizada en el archivo JSON
with open(json_output_file, 'w', encoding='utf-8') as f:
    json.dump(all_universities_data, f, indent=4, ensure_ascii=False)

print("\n" + "*"*80)
print(f"*** Proceso de automatización finalizado. Todos los datos se han guardado en '{json_output_file}' ***")
print("*"*80)