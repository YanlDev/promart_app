from flask import Flask
from flask_cors import CORS  # Importa CORS

def create_app():
    app = Flask(__name__)

    # Habilita CORS para todas las rutas
    CORS(app)

    # Importar y registrar rutas
    from .routes import main
    app.register_blueprint(main)

    return app
