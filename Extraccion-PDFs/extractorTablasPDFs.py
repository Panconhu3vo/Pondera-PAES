import pdfplumber
import pandas as pd
import json
import os
import re

# --- Funciones Auxiliares ---

# Función para convertir nombres a snake_case
def to_snake_case(name):
    # Reemplazar paréntesis y su contenido
    name = name.replace('(C. LECT.)', 'C_LECT').replace('(M1)', 'M1').replace('(M2)', 'M2')
    name = name.replace('(C. LECT. Y MAT1)', 'C_LECT_Y_MAT1')
    name = re.sub(r'[\s\.\-\+\/]', '_', name) # Reemplaza espacios, puntos, guiones, + por _
    name = re.sub(r'_+', '_', name) # Consolidar múltiples guiones bajos
    name = name.strip('_') # Eliminar guiones bajos al principio o final
    return name.upper() # Opcional: convertir a mayúsculas si prefieres snake_case en mayúsculas

def extract_and_clean_tables(pdf_path, university_name, university_acronym, has_pace_column):
    # Columnas base que usa pdfplumber para asignar inicialmente
    # NO CAMBIAMOS ESTOS NOMBRES, ya que deben coincidir con la extracción bruta del PDF
    columns_to_use_base = [
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
        "COMPETENCIA MATEMÁTICA 2 (M2)",
        "ASIGNACIÓN ESPECIAL DE PEDAGOGÍA",
        "PUNTAJE PONDERADO MÍNIMO DE POSTULACIÓN",
        "PUNTAJE PROMEDIO (C. LECT. Y MAT1) MÍNIMO DE POSTULACIÓN",
        "REGULAR",
        "+ MC",
        "BEA"
    ]

    # Lista final de columnas a usar, incluyendo PACE si el usuario lo indicó
    columns_to_use = list(columns_to_use_base) # Copiamos la lista base
    if has_pace_column:
        # Aseguramos que 'PACE' se añada al final si no existe ya
        if "PACE" not in columns_to_use:
            columns_to_use.append("PACE")
        # Si 'PACE' ya estuviera en columns_to_use_base por alguna razón, no se duplicaría.
        # En este caso, la añadimos al final. Podrías querer insertarla en una posición específica.
        # Por ejemplo: columns_to_use.insert(index_donde_quiera, "PACE")

    all_cleaned_dfs = []
    
    # Creamos el mapeo de nombres de columnas: original -> snake_case
    column_rename_map = {}
    for col in columns_to_use:
        column_rename_map[col] = to_snake_case(col)

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            print(f"Procesando página {page_num + 1}...")
            tables = page.extract_tables()

            for table_num, table_data in enumerate(tables):
                print(f"  Tabla {table_num + 1} en página {page_num + 1}...")

                # Verificar si el número de columnas de la tabla coincide con columns_to_use
                # Esto es crucial si la tabla NO tiene la columna extra pero has_pace_column es True
                # O si SÍ la tiene pero has_pace_column es False
                expected_cols_count = len(columns_to_use)
                actual_cols_count_in_table_header = len(table_data[1]) # Fila de encabezados de la tabla
                actual_cols_count_in_first_data_row = len(table_data[2]) if len(table_data) > 2 else 0

                # Decidimos qué longitud usar para la comprobación: la de la fila de encabezados o la de datos.
                # Es más seguro verificar la longitud de la primera fila de datos si los encabezados son complejos.
                # Sin embargo, pdfplumber asigna según table_data[1] y table_data[2].
                # Aquí, la tabla_data[2:] se pasa al DataFrame, así que len(table_data[2]) es el importante.
                
                # Manejo de casos donde la tabla tiene menos filas de las esperadas.
                if len(table_data) < 3 or (actual_cols_count_in_first_data_row != expected_cols_count):
                    print(f"    Advertencia: La tabla {table_num + 1} en la página {page_num + 1} tiene un número de columnas inesperado o muy pocas filas.")
                    print(f"    Esperadas: {expected_cols_count}, Encontradas en datos: {actual_cols_count_in_first_data_row}. Saltando.")
                    continue

                try:
                    df = pd.DataFrame(table_data[2:], columns=columns_to_use)
                    
                    # --- Limpieza de los datos del DataFrame ---
                    
                    df.dropna(how='all', inplace=True)
                    df.replace(r'^\s*$', pd.NA, regex=True, inplace=True)
                    
                    if "COD" in df.columns:
                        df["COD"] = df["COD"].astype(str).str.replace(r'\s*\(\d+\)\s*', '', regex=True).str.strip()
                    
                    if "CARRERA O PROGRAMA ACADÉMICO" in df.columns:
                        df["CARRERA O PROGRAMA ACADÉMICO"] = df["CARRERA O PROGRAMA ACADÉMICO"].astype(str).str.replace(r'\s*\(\d+\)\s*', '', regex=True).str.strip()
                        df["CARRERA O PROGRAMA ACADÉMICO"] = df["CARRERA O PROGRAMA ACADÉMICO"].str.replace(r'\s+', ' ', regex=True)

                    df.rename(columns=column_rename_map, inplace=True)

                    # Las columnas numéricas ahora usan los nombres que `to_snake_case` generaría
                    # Generamos esta lista dinámicamente para asegurar que siempre coincida
                    numeric_cols_final = [to_snake_case(col) for col in columns_to_use if col not in [
                        "CARRERA O PROGRAMA ACADÉMICO", "LUGAR EN QUE SE IMPARTE", "Opcional"
                        ]]
                    # Si 'PACE' existe y se añade, se incluirá automáticamente aquí porque no está en las exclusiones.

                    for col in numeric_cols_final:
                        if col in df.columns: # Asegurarse de que la columna existe en el DF actual
                            df[col] = pd.to_numeric(df[col], errors='coerce')
                            df[col] = df[col].fillna(0)
                            
                            if df[col].dtype == 'float64':
                                if (df[col] == df[col].astype(int)).all():
                                    df[col] = df[col].astype(int)
                                
                    df.dropna(axis=1, how='all', inplace=True)
                    
                    all_cleaned_dfs.append(df)
                    print(f"    DataFrame limpiado de la tabla {table_num + 1} en página {page_num + 1}:")
                    print(df.head())
                    print(f"    Forma del DataFrame: {df.shape}")
                    print("-" * 50)

                except ValueError as ve:
                    print(f"    Error de valores al procesar tabla {table_num + 1} en página {page_num + 1}: {ve}")
                    print(f"    Posiblemente la lista de columnas ({len(columns_to_use)}) no coincide con el número de datos ({actual_cols_count_in_first_data_row}).")
                    print("    Datos de la primera fila de la tabla (después de saltar encabezados):", table_data[2] if len(table_data) > 2 else "No hay suficientes datos.")
                    print("-" * 50)
                except Exception as e:
                    print(f"    Error general al crear o limpiar DataFrame para la tabla {table_num + 1}: {e}")
                    print(f"    Datos brutos de la tabla (primeras 5 filas): {table_data[:5]}")
                    print("-" * 50)

    return all_cleaned_dfs

# --- Parte principal del script ---

# 1. Solicitar la información de la universidad al usuario
nombre_universidad = input("Por favor, introduce el nombre completo de la universidad: ")
siglas_universidad = input("Por favor, introduce las siglas de la universidad: ")

# NUEVO: Preguntar si el PDF tiene columna PACE
while True:
    pace_input = input("¿El PDF actual tiene una columna llamada 'PACE'? (Y/N): ").strip().upper()
    if pace_input in ['Y', 'N']:
        has_pace_column = (pace_input == 'Y')
        break
    else:
        print("Entrada no válida. Por favor, introduce 'Y' o 'N'.")

# 2. Define la ruta del archivo PDF (la que cambiarás manualmente)
pdf_file = 'Extraccion-PDFs/pdfs/tabla-PUCV.pdf' 

# 3. Define la ruta del archivo JSON principal donde se añadirán los datos
json_output_file = 'Extraccion-PDFs/jsons/Ponderaciones.json'

# 4. Extraer y limpiar las tablas, pasando la información de si tiene columna PACE
cleaned_dfs = extract_and_clean_tables(pdf_file, nombre_universidad, siglas_universidad, has_pace_column)

if cleaned_dfs:
    print(f"\nTotal de DataFrames limpiados: {len(cleaned_dfs)}")
    
    final_df = pd.concat(cleaned_dfs, ignore_index=True)
    
    print("\nDataFrame final concatenado (primeras 10 filas):")
    print(final_df.head(10))
    print(f"Forma del DataFrame final: {final_df.shape}")
    
    # Convertir el DataFrame a una lista de diccionarios para el JSON
    carreras_list = final_df.to_dict(orient='records')
    
    # Crear la estructura JSON para la universidad actual
    current_university_data = {
        "UNIVERSIDAD": {
            "nombre_de_la_universidad": nombre_universidad,
            "siglas": siglas_universidad,
            "carreras": carreras_list
        }
    }
    
    # Cargar los datos existentes de Ponderaciones.json o inicializar una lista vacía
    all_universities_data = []
    if os.path.exists(json_output_file) and os.path.getsize(json_output_file) > 0:
        try:
            with open(json_output_file, 'r', encoding='utf-8') as f:
                content = f.read()
                if content:
                    all_universities_data = json.loads(content)
                else:
                    print(f"Advertencia: '{json_output_file}' está vacío, creando uno nuevo.")
        except json.JSONDecodeError:
            print(f"Advertencia: '{json_output_file}' no es un JSON válido. Se creará un nuevo archivo.")
            all_universities_data = []
    
    # Añadir los datos de la universidad actual a la lista
    all_universities_data.append(current_university_data)
    
    # Guardar toda la lista actualizada de universidades en Ponderaciones.json
    with open(json_output_file, 'w', encoding='utf-8') as f:
        json.dump(all_universities_data, f, indent=4, ensure_ascii=False)
    
    print(f"\n¡Datos de '{nombre_universidad}' agregados/actualizados exitosamente en '{json_output_file}'!")
    print("\nRevisa el archivo JSON para confirmar la nueva entrada y la inclusión de 'PACE' si aplica.")

else:
    print("No se extrajeron ni limpiaron DataFrames. Revisa el PDF y la lógica de extracción.")