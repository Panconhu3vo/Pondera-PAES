import pdfplumber
import pandas as pd
import json
import os

def extract_and_clean_tables(pdf_path):
    all_cleaned_dfs = []

    # Columnas definidas por el usuario, ¡estas son las que usa pdfplumber para asignar inicialmente!
    columns_to_use = [
        "COD",
        "CARRERA O PROGRAMA ACADÉMICO",
        "LUGAR EN QUE SE IMPARTE",
        "NEM",
        "RANKING",
        "COMPETENCIA LECTORA (C. LECT.)", # Nombre original
        "COMPETENCIA MATEMÁTICA 1 (M1)", # Nombre original
        "HISTORIA Y CIENCIAS SOCIALES",
        "Opcional",
        "CIENCIAS",
        "COMPETENCIA MATEMÁTICA 2 (M2)", # Nombre original
        "ASIGNACIÓN ESPECIAL DE PEDAGOGÍA",
        "PUNTAJE PONDERADO MÍNIMO DE POSTULACIÓN",
        "PUNTAJE PROMEDIO (C. LECT. Y MAT1) MÍNIMO DE POSTULACIÓN", # Nombre original
        "REGULAR",
        "+ MC", # Nombre original
        "BEA"
    ]

    # Mapeo de nombres de columnas originales a los nombres deseados en el JSON final
    # Aquí es donde definimos cómo se verán en la salida
    column_rename_map = {
        "COMPETENCIA LECTORA (C. LECT.)": "COMPETENCIA LECTORA C. LECT.",
        "COMPETENCIA MATEMÁTICA 1 (M1)": "COMPETENCIA MATEMÁTICA 1 M1",
        "COMPETENCIA MATEMÁTICA 2 (M2)": "COMPETENCIA MATEMÁTICA 2 M2",
        "PUNTAJE PROMEDIO (C. LECT. Y MAT1) MÍNIMO DE POSTULACIÓN": "PUNTAJE PROMEDIO C. LECT. Y MAT1 MÍNIMO DE POSTULACIÓN",
        "+ MC": "MC" # Simplificado a "MC"
        # Agrega más entradas aquí si necesitas renombrar otras columnas
    }

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
                    # Crear DataFrame usando los nombres de columna originales (como los del PDF)
                    df = pd.DataFrame(table_data[2:], columns=columns_to_use)
                    
                    # --- Limpieza de los datos del DataFrame ---
                    
                    # 1. Eliminar filas completamente vacías
                    df.dropna(how='all', inplace=True)
                    
                    # 2. Reemplazar cadenas vacías o con solo espacios por NaN
                    df.replace(r'^\s*$', pd.NA, regex=True, inplace=True)
                    
                    # 3. Limpiar la columna 'COD' de paréntesis y números (si existen)
                    if "CARRERA O PROGRAMA ACADÉMICO" in df.columns:
                        df["CARRERA O PROGRAMA ACADÉMICO"] = df["CARRERA O PROGRAMA ACADÉMICO"].astype(str).str.replace(r'\s*\(\d+\)\s*', '', regex=True)
                    
                    # 4. Renombrar las columnas ANTES de la conversión de tipos,
                    #    para que las columnas numéricas usen los nombres finales.
                    df.rename(columns=column_rename_map, inplace=True)

                    # 5. Convertir tipos de datos y manejar NaNs
                    # Esta lista de columnas numéricas DEBE usar los nombres RENOMBRADOS
                    numeric_cols_final = [
                        "COD", "NEM", "RANKING",
                        "COMPETENCIA LECTORA C. LECT.", # Nombre renombrado
                        "COMPETENCIA MATEMÁTICA 1 M1", # Nombre renombrado
                        "HISTORIA Y CIENCIAS SOCIALES", "CIENCIAS",
                        "COMPETENCIA MATEMÁTICA 2 M2", # Nombre renombrado
                        "ASIGNACIÓN ESPECIAL DE PEDAGOGÍA",
                        "PUNTAJE PONDERADO MÍNIMO DE POSTULACIÓN",
                        "PUNTAJE PROMEDIO C. LECT. Y MAT1 MÍNIMO DE POSTULACIÓN", # Nombre renombrado
                        "REGULAR", "MC", "BEA" # Nombre renombrado para + MC
                    ]
                    
                    for col in numeric_cols_final:
                        if col in df.columns:
                            df[col] = pd.to_numeric(df[col], errors='coerce')
                            df[col] = df[col].fillna(0)
                            
                            if df[col].dtype == 'float64':
                                if (df[col] == df[col].astype(int)).all():
                                    df[col] = df[col].astype(int)
                                
                    # 6. Eliminar columnas que sean completamente vacías después de la limpieza (si aún quedan)
                    df.dropna(axis=1, how='all', inplace=True)
                    
                    all_cleaned_dfs.append(df)
                    print(f"    DataFrame limpiado de la tabla {table_num + 1} en página {page_num + 1}:")
                    print(df.head())
                    print(f"    Forma del DataFrame: {df.shape}")
                    print("-" * 50)

                except ValueError as ve:
                    print(f"    Error de valores al procesar tabla {table_num + 1} en página {page_num + 1}: {ve}")
                    # Mensajes de error actualizados para reflejar que la validación puede ser con los nombres renombrados
                    print(f"    Posiblemente la lista de columnas ({len(columns_to_use)}) no coincide con el número de datos ({len(table_data[2]) if len(table_data) > 2 else 'N/A'}).")
                    print("    Datos de la primera fila de la tabla (después de saltar encabezados):", table_data[2] if len(table_data) > 2 else "No hay suficientes datos.")
                    print("-" * 50)
                except Exception as e:
                    print(f"    Error general al crear o limpiar DataFrame para la tabla {table_num + 1}: {e}")
                    print(f"    Datos brutos de la tabla (primeras 5 filas): {table_data[:5]}")
                    print("-" * 50)

    return all_cleaned_dfs

# Asegúrate de que esta ruta sea la CORRECTA para tu archivo PDF.
# Si tu script está en 'Pondera-PAES/Extraccion-PDFs/' y el PDF está en 'Pondera-PAES/Extraccion-PDFs/pdfs/',
# la ruta relativa desde 'Pondera-PAES/' sería 'Extraccion-PDFs/pdfs/tabla-UAC.pdf'.
# Si el script se ejecuta directamente desde 'Extraccion-PDFs/', entonces la ruta sería 'pdfs/tabla-UAC.pdf'.
# Mantendré la ruta que me proporcionaste en tu último script.
pdf_file = 'Extraccion-PDFs/pdfs/tabla-UAC.pdf'

cleaned_dfs = extract_and_clean_tables(pdf_file)

if cleaned_dfs:
    print(f"\nTotal de DataFrames limpiados: {len(cleaned_dfs)}")
    
    final_df = pd.concat(cleaned_dfs, ignore_index=True)
    
    print("\nDataFrame final concatenado (primeras 10 filas):")
    print(final_df.head(10))
    print(f"Forma del DataFrame final: {final_df.shape}")
    
    # Ruta para el archivo JSON de salida
    json_output_file = 'Extraccion-PDFs/jsons/JSON-Prueba.json'
    
    final_df.to_json(json_output_file, orient='records', indent=4, force_ascii=False)
    
    print(f"\n¡Datos exportados exitosamente a '{json_output_file}' con codificación UTF-8 y nombres de columna deseados!")
    print("\nRevisa el archivo JSON para confirmar los nombres de columna y los datos.")

else:
    print("No se extrajeron ni limpiaron DataFrames. Revisa el PDF y la lógica de extracción.")