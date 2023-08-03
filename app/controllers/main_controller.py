import pandas as pd
import re

class ControladorPrincipal:
    def __init__(self):
        pass

    def procesar_archivo(self, df):
        # Read the Excel file with specific column names
        df = pd.read_excel(df, header=None, names=["Nombres completos", "Correos electrónicos", "celular"])

        # Split the "Nombres completos" column into "nombre1", "nombre2", "apellido1", and "apellido2"
        df[["nombre1", "nombre2", "apellido1", "apellido2"]] = df["Nombres completos"].str.split(" ", n=3, expand=True)

        # Remove the "Nombres completos" column
        df.drop(columns=["Nombres completos"], inplace=True)

        # Drop rows with missing email or cellphone values
        df.dropna(subset=["Correos electrónicos", "celular"], how="all", inplace=True)

        # Format the "celular" field by removing non-numeric characters
        df["celular"] = df["celular"].apply(lambda x: re.sub(r"\D", "", str(x)))

        # Create the "ID" column with the string "(UUID()" for each row
        df["ID"] = "(UUID()"

        # Create the "IsStudent" column with the value "0" for each row
        df["IsStudent"] = "0"

        # Replace "None" values in "nombre1", "nombre2", "apellido1", and "apellido2" with empty strings
        df[["nombre1", "nombre2", "apellido1", "apellido2"]] = df[["nombre1", "nombre2", "apellido1", "apellido2"]].fillna("")

        # Prepare two DataFrames with specific column orders
        df1 = df[["nombre1", "nombre2", "apellido1", "apellido2", "Correos electrónicos", "celular"]]
        df2 = df[["ID", "nombre1", "nombre2", "apellido1", "apellido2", "Correos electrónicos", "celular", "IsStudent"]]

        # Apply quotation marks and a comma to the values of all columns
        df1 = df.applymap(lambda x: f'"{x}",')

        # Return the processed DataFrames or any other desired result
        return df1, df2
