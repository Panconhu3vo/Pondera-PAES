import pdfplumber
import pandas as pd
import json # Importamos la librería json para una verificación adicional si fuera necesario

def extract_and_clean_tables(pdf_path):
    all_cleaned_dfs = []

    # Columnas definidas por el usuario
    columns_to_use = [
        "COD",
        "CARRERA_O_PROGRAMA_ACADEMICO",
        "LUGAR_EN_QUE_SE_IMPARTE",
        "NEM",
        "RANKING",
        "COMPETENCIA_LECTORA_C_LECT",
        "COMPETENCIA_MATEMATICA_1_M1",
        "HISTORIA_Y_CIENCIAS_SOCIALES",
        "OPCIONAL",
        "CIENCIAS",
        "COMPETENCIA_MATEMATICA_2_M2",
        "ASIGNACION_ESPECIAL_DE_PEDAGOGIA",
        "PUNTAJE_PONDERADO_MINIMO_DE_POSTULACION",
        "PUNTAJE_PROMEDIO_C_LECT_Y_MAT1_MINIMO_DE_POSTULACION",
        "REGULAR",
        "MAS_MC",
        "VACANTES_BEA"
    ]

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            print(f"Procesando página {page_num + 1}...")
            tables = page.extract_tables()

            for table_num, table_data in enumerate(tables):
                print(f"  Tabla {table_num + 1} en página {page_num + 1}...")

                if len(table_data) < 3:
                    print(f"    Advertencia: La tabla {table_num + 1} en la página {page_num + 1} tiene muy pocas filas ({len(table_data)}). Saltando.")
                    continue

                try:
                    df = pd.DataFrame(table_data[2:], columns=columns_to_use)
                    
                    # --- Limpieza inicial de los datos del DataFrame ---
                    
                    # 1. Eliminar filas completamente vacías
                    df.dropna(how='all', inplace=True)
                    
                    # 2. Reemplazar cadenas vacías o con solo espacios por NaN
                    df.replace(r'^\s*$', pd.NA, regex=True, inplace=True)
                    
                    # 3. Limpiar la columna 'COD' de paréntesis y números
                    if "COD" in df.columns:
                        df["COD"] = df["COD"].astype(str).str.replace(r'\s*\(\d+\)\s*', '', regex=True)
                    
                    # 4. Convertir tipos de datos y manejar NaNs
                    numeric_cols = [
                        "COD", "NEM", "RANKING",
                        "COMPETENCIA_LECTORA_C_LECT", "COMPETENCIA_MATEMATICA_1_M1",
                        "HISTORIA_Y_CIENCIAS_SOCIALES", "CIENCIAS",
                        "COMPETENCIA_MATEMATICA_2_M2",
                        "ASIGNACION_ESPECIAL_DE_PEDAGOGIA",
                        "PUNTAJE_PONDERADO_MINIMO_DE_POSTULACION",
                        "PUNTAJE_PROMEDIO_C_LECT_Y_MAT1_MINIMO_DE_POSTULACION",
                        "REGULAR", "MAS_MC", "VACANTES_BEA"
                    ]
                    
                    for col in numeric_cols:
                        if col in df.columns:
                            # Intentar convertir a numérico. 'errors=coerce' convierte fallos a NaN.
                            df[col] = pd.to_numeric(df[col], errors='coerce')
                            # Rellenar NaN (que provienen de 'coerce' o celdas vacías) con 0
                            df[col] = df[col].fillna(0)
                            # Convertir a entero si es posible y si la columna no tiene decimales significativos
                            # Esto es opcional, pero puede hacer los datos más limpios.
                            # Para evitar errores con NaNs, ya hemos rellenado con 0.
                            if df[col].dtype == 'float64':
                                # Comprobar si todos los valores son enteros o 0.0
                                if (df[col] == df[col].astype(int)).all():
                                    df[col] = df[col].astype(int)
                                
                    # 5. Eliminar columnas que sean completamente vacías después de la limpieza (si aún quedan)
                    df.dropna(axis=1, how='all', inplace=True)
                    
                    all_cleaned_dfs.append(df)
                    print(f"    DataFrame limpiado de la tabla {table_num + 1} en página {page_num + 1}:")
                    print(df.head())
                    print(f"    Forma del DataFrame: {df.shape}")
                    print("-" * 50)

                except ValueError as ve:
                    print(f"    Error de valores al procesar tabla {table_num + 1} en página {page_num + 1}: {ve}")
                    print(f"    La lista de columnas ({len(columns_to_use)}) no coincide con el número de datos ({len(table_data[2]) if len(table_data) > 2 else 'N/A'}).")
                    print("    Datos de la primera fila de la tabla (después de saltar encabezados):", table_data[2] if len(table_data) > 2 else "No hay suficientes datos.")
                    print("-" * 50)
                except Exception as e:
                    print(f"    Error general al crear o limpiar DataFrame para la tabla {table_num + 1}: {e}")
                    print(f"    Datos brutos de la tabla (primeras 5 filas): {table_data[:5]}")
                    print("-" * 50)

    return all_cleaned_dfs

# Asegúrate de que 'tabla-UAC.pdf' esté en el mismo directorio que tu script
pdf_file = r'./pdfs/tabla-UAC.pdf'

cleaned_dfs = extract_and_clean_tables(pdf_file)

if cleaned_dfs:
    print(f"\nTotal de DataFrames limpiados: {len(cleaned_dfs)}")
    
    # Concatenar todos los DataFrames limpiados en uno solo
    final_df = pd.concat(cleaned_dfs, ignore_index=True)
    
    print("\nDataFrame final concatenado (primeras 10 filas):")
    print(final_df.head(10))
    print(f"Forma del DataFrame final: {final_df.shape}")
    
    # Guardar en JSON con codificación UTF-8
    json_output_file = './jsons/JSON-Pruebas.json'
    
    # pandas.to_json ya soporta encoding.
    # El parámetro 'force_ascii=False' es lo que asegura UTF-8.
    final_df.to_json(json_output_file, orient='records', indent=4, force_ascii=False)
    
    print(f"\n¡Datos exportados exitosamente a '{json_output_file}' con codificación UTF-8!")
    print("\nRevisa el archivo JSON y el DataFrame final para asegurarte de que la limpieza sea correcta.")

else:
    print("No se extrajeron ni limpiaron DataFrames. Revisa el PDF y la lógica de extracción.")