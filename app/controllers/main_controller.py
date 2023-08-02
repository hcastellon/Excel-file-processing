import pandas as pd
import re


class ControladorPrincipal:
    def __init__(self):
        pass

    def procesar_archivo(self, df):
        df = pd.read_excel(df, header=None, names=["Nombres completos", "Correos electrónicos", "celular"])
        # Dividir el campo "Nombres completos" en "nombre1", "nombre2", "apellido1" y "apellido2"
        df[["nombre1", "nombre2", "apellido1", "apellido2"]] = df["Nombres completos"].str.split(" ", n=3, expand=True)
        # Eliminar el campo "Nombres completos"
        df = df.drop(columns=["Nombres completos"])
        # Eliminar los registros que no tienen correo electrónico o celular
        df = df.dropna(subset=["Correos electrónicos", "celular"], how="all")
        # Aplicar formato al campo celular removiendo caracteres no numéricos
        df["celular"] = df["celular"].apply(lambda x: re.sub(r"\D", "", str(x)))
        # Crear la columna "ID" con el string "(UUID()," para cada registro
        df["ID"] = "(UUID()"
        # Crear la columna "IsStudent" con el valor "0" para cada registro
        df["IsStudent"] = "0"
        # Verificar si los campos nombre1, nombre2, apellido1 y apellido2 están como "None" y reemplazarlos por ""
        df["nombre1"] = df["nombre1"].apply(lambda x: "" if x == "None" else x)
        df["nombre2"] = df["nombre2"].apply(lambda x: "" if x == "None" else x)
        df["apellido1"] = df["apellido1"].apply(lambda x: "" if x == "None" else x)
        df["apellido2"] = df["apellido2"].apply(lambda x: "" if x == "None" else x)

        df1 = df[["nombre1", "nombre2", "apellido1", "apellido2", "Correos electrónicos", "celular"]]
        # Agregar comillas dobles y una coma a los valores de los campos
        df = df.applymap(lambda x: f'"{x}",')
        # Reordenar las columnas
        df2 = df[["ID", "nombre1", "nombre2", "apellido1", "apellido2", "Correos electrónicos", "celular", "IsStudent"]]

        # Devolver el DataFrame procesado u otro resultado deseado
        return df1, df2
