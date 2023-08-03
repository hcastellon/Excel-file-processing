# Excel Data Processing Application with Flask

## Description:

This repository contains a Python application that provides a user-friendly interface to process Excel files and apply specific tasks and formatting. The application is built using Flask, making it versatile for web environments.

## Features:

1. **Excel Data Processing:** Users can upload Excel files containing data that needs processing. The application can perform tasks such as splitting the "Nombres completos" column into separate fields (nombre1, nombre2, apellidos1, apellidos2) and enclosing the values in quotes.

2. **Data Cleaning:** The application allows users to clean and format data in the "celular" column, removing symbols like "-" and "+".

3. **Multiple Outputs:** After processing the data, the application generates two DataFrames containing the processed information. Users can download these DataFrames as separate Excel files on a web-based interface.

4. **Flask Web App:** The application is designed as a Flask web app, providing a user-friendly and responsive interface accessible through a web browser. Users can upload their Excel files, process the data, and download the results directly from the application.

5. **User-friendly Interface:** The application has a clean and intuitive interface that guides users through the data processing tasks step by step.

## Usage:

1. Clone the repository and set up a Python virtual environment.
2. Install the required dependencies using pip (`pip install -r requirements.txt`).
3. Execute the Flask app using `python app.py` to run the web application.
4. Alternatively, run the desktop application using `python main.py`.

## Dependencies:

- Flask: A web framework to create the web-based user interface.
- Pandas: Used for data manipulation and working with Excel files.
- XlsxWriter: Required for Excel writing functionality.

This application offers an efficient solution for processing Excel data, making it suitable for data cleaning and manipulation tasks. It combines the convenience of a web app enhancing the user experience and simplifying data processing workflows.

Feel free to fork and contribute to this open-source project! Happy data processing!

Please adjust the description based on your specific application's features and functionalities.