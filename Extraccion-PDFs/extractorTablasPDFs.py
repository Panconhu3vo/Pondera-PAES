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

def extract_and_clean_tables(pdf_path, university_name, university_acronym):
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

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            print(f"Procesando página {page_num + 1}...")
            tables = page.extract_tables()

            for table_num, table_data in enumerate(tables):
                print(f"   Tabla {table_num + 1} en página {page_num + 1}...")
                
                # Omitimos la comprobación de columnas que estaba causando el error
                if len(table_data) < 3:
                    print(f"     Advertencia: La tabla {table_num + 1} en la página {page_num + 1} tiene muy pocas filas. Saltando.")
                    continue

                try:
                    # --- EL CAMBIO CRUCIAL: Recortar los datos antes de crear el DataFrame ---
                    # Esto asegura que tomamos solo las primeras 11 columnas de las filas de datos.
                    data_rows_cleaned = [row[:len(columns_to_use)] for row in table_data[2:]]
                    
                    df = pd.DataFrame(data_rows_cleaned, columns=columns_to_use)
                    
                    # --- Limpieza de los datos del DataFrame (el resto del código es el mismo) ---
                    
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
                    print(f"     DataFrame limpiado de la tabla {table_num + 1} en página {page_num + 1}:")
                    print(df.head())
                    print(f"     Forma del DataFrame: {df.shape}")
                    print("-" * 50)

                except Exception as e:
                    print(f"     Error general al crear o limpiar DataFrame para la tabla {table_num + 1}: {e}")
                    print(f"     Datos brutos de la tabla (primeras 5 filas): {table_data[:5]}")
                    print("-" * 50)

    return all_cleaned_dfs

# --- Parte principal del script ---

nombre_universidad = input("Por favor, introduce el nombre completo de la universidad: ")
siglas_universidad = input("Por favor, introduce las siglas de la universidad: ")

pdf_file = 'Extraccion-PDFs/pdfs/tabla-UNACH.pdf' 

json_output_file = './Pondera-PAES/data/Ponderaciones.json'

cleaned_dfs = extract_and_clean_tables(pdf_file, nombre_universidad, siglas_universidad)

if cleaned_dfs:
    print(f"\nTotal de DataFrames limpiados: {len(cleaned_dfs)}")
    
    final_df = pd.concat(cleaned_dfs, ignore_index=True)
    
    print("\nDataFrame final concatenado (primeras 10 filas):")
    print(final_df.head(10))
    print(f"Forma del DataFrame final: {final_df.shape}")
    
    carreras_list = final_df.to_dict(orient='records')
    
    current_university_data = {
        "UNIVERSIDAD": {
            "nombre_de_la_universidad": nombre_universidad,
            "siglas": siglas_universidad,
            "carreras": carreras_list
        }
    }
    
    all_universities_data = []
    if os.path.exists(json_output_file) and os.path.getsize(json_output_file) > 0:
        try:
            with open(json_output_file, 'r', encoding='utf-8') as f:
                content = f.read()
                if content:
                    all_universities_data = json.loads(content)
        except json.JSONDecodeError:
            all_universities_data = []
    
    all_universities_data.append(current_university_data)
    
    with open(json_output_file, 'w', encoding='utf-8') as f:
        json.dump(all_universities_data, f, indent=4, ensure_ascii=False)
    
    print(f"\n¡Datos de '{nombre_universidad}' agregados/actualizados exitosamente en '{json_output_file}'!")
    print("\nRevisa el archivo JSON para confirmar la nueva entrada.")

else:
    print("No se extrajeron ni limpiaron DataFrames. Revisa el PDF y la lógica de extracción.")