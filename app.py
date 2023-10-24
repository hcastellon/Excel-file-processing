import uuid
import os
import pandas as pd
import logging
from flask import Flask, render_template, request, url_for, send_file, redirect, send_from_directory

from app.controllers.main_controller import ControladorPrincipal

app = Flask(__name__)

# Directories for file handling
UPLOAD_DIRECTORY = "uploads"
DOWNLOAD_DIRECTORY = "downloads"


@app.route('/', methods=['GET'])
def index():
    return render_template('main_window.html')


@app.route("/preline.js")
def serve_preline_js():
    return send_from_directory("node_modules/preline/dist", "preline.js")


@app.route("/downloads/<filename>", methods=["GET"])
def download_file(filename: str):
    file_location = os.path.join(app.config['DOWNLOAD_FOLDER'], filename)
    return send_file(file_location, as_attachment=True)


@app.route('/procesar', methods=['POST'])
def procesar():
    uploaded_file = request.files['archivo']
    if not uploaded_file:
        return {
            "status": 400,
            "msg": "Bad Request: No se ha enviado ningún archivo."
        }
    else:
        try:
            file_uuid = str(uuid.uuid1())
            file_location = os.path.join(UPLOAD_DIRECTORY, f"{file_uuid}.xlsx")
            uploaded_file.save(file_location)
            processed_file_location = os.path.join(DOWNLOAD_DIRECTORY, f"{file_uuid}.xlsx")
            controller = ControladorPrincipal()
            resultado1, resultado2 = controller.procesar_archivo(file_location)

            with pd.ExcelWriter(processed_file_location) as writer:
                resultado1.to_excel(writer, index=False, sheet_name="Hoja1")
                resultado2.to_excel(writer, index=False, sheet_name="Hoja2")

            mensaje = "El archivo se ha procesado correctamente. Puedes descargarlo desde el siguiente enlace:"
            return redirect(url_for('resultado', mensaje=mensaje, filename=f"{file_uuid}.xlsx"))
        except Exception as e:
            error_msg = f'Error al procesar el archivo: {str(e)}'
            logging.error(error_msg)
            return error_msg


@app.route('/resultado', methods=['GET'])
def resultado():
    mensaje = request.args.get('mensaje', '')
    filename = request.args.get('filename', '')
    ruta_descarga = url_for('download_file', filename=filename)
    return render_template('resultado.html', mensaje=mensaje, ruta_descarga=ruta_descarga, inicio_url=url_for('index'))


# Configurar el sistema de registro
logging.basicConfig(filename='app.log', level=logging.DEBUG)
if __name__ == '__main__':
    app.config['UPLOAD_FOLDER'] = UPLOAD_DIRECTORY
    app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_DIRECTORY
    app.run(debug=True)
