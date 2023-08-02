import uuid
import os
import pandas as pd

from app.controllers.main_controller import ControladorPrincipal
from http import HTTPStatus
# from werkzeug.utils import secure_filename
from os.path import basename
from flask import Flask, render_template, request, url_for, send_file, redirect

app = Flask(__name__)

# Directorio para descargar archivos
UPLOAD_DIRECTORY = "uploads"
DOWNLOAD_DIRECTORY = "downloads"


@app.route('/', methods=['GET'])
def index():
    return render_template('main_window.html')


@app.route("/downloads/<filename>", methods=["GET"])
def get_downloads(filename):
    file_location = os.path.join(app.config['DOWNLOAD_FOLDER'], filename)
    return send_file(file_location, as_attachment=True)


@app.route('/procesar', methods=['POST'])
def procesar():
    df = request.files['archivo']
    if not df:
        return {
            "status": HTTPStatus.BAD_REQUEST.value,
            "msg": f"{HTTPStatus.BAD_REQUEST.phrase}: No se ha enviado ningún archivo."
        }
    else:
        try:
            # df = pd.read_excel(archivo, header=0)
            # filename = secure_filename(df.filename)
            file_location = f"{UPLOAD_DIRECTORY}/{uuid.uuid1()}.xlsx"
            df.save(file_location)
            processed_file_location = os.path.join(DOWNLOAD_DIRECTORY, basename(file_location))
            controlador = ControladorPrincipal()
            resultado1, resultado2 = controlador.procesar_archivo(file_location)
            # Puedes devolver el resultado como un archivo de Excel descargable
            # o mostrarlo en una nueva página, dependiendo de tus necesidades.
            # Por ejemplo:
            with pd.ExcelWriter(processed_file_location) as writer:
                resultado1.to_excel(writer, index=False, sheet_name="Hoja1")
                resultado2.to_excel(writer, index=False, sheet_name="Hoja2")
            # writer.save()
            mensaje = "El archivo se ha procesado correctamente. Puedes descargarlo desde el siguiente enlace:"
            return redirect(url_for('resultado', mensaje=mensaje, filename=basename(processed_file_location)))
            # return url_for('get_downloads', filename=basename(processed_file_location))
        except Exception as e:
            return f'Error al procesar el archivo: {str(e)}'


@app.route('/resultado', methods=['GET'])
def resultado():
    mensaje = request.args.get('mensaje', '')
    filename = request.args.get('filename', '')
    ruta_descarga = url_for('get_downloads', filename=filename)
    return render_template('resultado.html', mensaje=mensaje, ruta_descarga=ruta_descarga)


if __name__ == '__main__':
    app.config['UPLOAD_FOLDER'] = UPLOAD_DIRECTORY
    app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_DIRECTORY
    app.run(debug=True)
