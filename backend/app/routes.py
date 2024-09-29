from flask import Blueprint, request, jsonify
main = Blueprint('main', __name__)
from app.analysis.asnStadistics import analyze_asn_data
import os

@main.route('/')
def index():
    return "API de carga de archivos CSV"

@main.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No se ha enviado ningún archivo"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No se ha seleccionado ningún archivo"}), 400

    # Verifica que sea un archivo CSV
    if not file.filename.endswith('.csv'):
        return jsonify({"error": "Solo se permiten archivos CSV"}), 400

    # Guardar el archivo en la carpeta uploads
    file_path = f"./app/uploads/{file.filename}"
    file.save(file_path)

    # Ahora devolver el path del archivo
    return jsonify({"message": f"Archivo {file.filename} subido con éxito", "file_path": file_path}), 200


@main.route('/analyze', methods=['POST'])
def analyze_file():
    data = request.get_json()

    if 'file_path' not in data:
        return jsonify({"error": "No se proporcionó la ruta del archivo"}), 400

    filepath = data['file_path']

    # Verificar si el archivo existe
    if not os.path.exists(filepath):
        return jsonify({"error": "El archivo no existe"}), 400

    # Realizar análisis de ASN
    analysis_result = analyze_asn_data(filepath)

    if analysis_result is not None:
        # Opcionalmente, eliminar el archivo después del análisis si es necesario
        # os.remove(filepath)
        return jsonify(analysis_result), 200
    else:
        return jsonify({"error": "Hubo un problema al analizar el archivo"}), 500