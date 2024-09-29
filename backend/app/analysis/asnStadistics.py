import pandas as pd

def analyze_asn_data(file_path):
    """
    Realiza múltiples análisis sobre los datos ASN del archivo CSV.
    :param file_path: Ruta al archivo CSV subido
    :return: JSON con los resultados de varios análisis
    """
    try:
        # Leer el archivo CSV
        df = pd.read_csv(file_path, delimiter=';')

        # Análisis 1: Total de LPNs únicos
        total_lpns = int(df['Número de LPN'].nunique())  # Convertir a int nativo

        # Análisis 2: Porcentaje de productos por área (jerarquía de artículo 2)
        area_percentage = df['Jerarquía de artículo 2'].value_counts(normalize=True) * 100

        # Convertir a diccionario y asegurarse de que los valores sean flotantes
        area_percentage_dict = {str(k): float(v) for k, v in area_percentage.items()}

        # Análisis 3: Producto con más unidades enviadas (SKU con mayor cantidad total enviada)
        product_data = df.groupby(['SKU', 'Descrip Articulo'])['Cantidad enviada'].sum().reset_index()
        top_product_row = product_data.loc[product_data['Cantidad enviada'].idxmax()]
        top_sku = top_product_row['SKU']
        top_description = top_product_row['Descrip Articulo']
        max_units = int(top_product_row['Cantidad enviada'])  # Convertir a int nativo

        # Análisis 4: Porcentaje de estado del producto (Recibido vs Sin Recibir)
        status_percentage = df['Estado'].value_counts(normalize=True) * 100

        # Convertir las series de pandas en diccionarios de tipos nativos
        status_percentage_dict = {str(k): float(v) for k, v in status_percentage.items()}
        
        envio_entrada_percentage = df['Envío de entrada'].value_counts(normalize=True) * 100

        # Convertir la serie a un diccionario con tipos nativos
        envio_entrada_percentage_dict = {str(k): float(v) for k, v in envio_entrada_percentage.items()}

        # Construir el resultado en un formato JSON compatible
        result = {
            "total_lpns": total_lpns,
            "area_percentage": area_percentage_dict,  # Asegurarse de que esté definido correctamente
            "top_product": {
                "sku": str(top_sku),
                "description": str(top_description),
                "units": max_units
            },
            "status_percentage": status_percentage_dict,  # Asegurarse de que esté definido correctamente
            "envio_entrada_percentage": envio_entrada_percentage_dict
        }

        return result

    except Exception as e:
        print(f"Error al analizar el archivo: {e}")
        return None
