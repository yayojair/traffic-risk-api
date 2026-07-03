import joblib
import pandas as pd

class PredictionEngine:
    def __init__(self):
        self.model = None
        self.label_encoder = None

    def load_label_encoder_model(self):
        """
        Carga el modelo desde la ruta especificada.
        """
        self.model = joblib.load('app/artifacts/modelo_final.pkl')  # Cargar el modelo entrenado
        self.label_encoder = joblib.load('app/artifacts/label_encoder.pkl')  # Cargar el codificador de etiquetas

    def predict(self, location_x, location_y):

        # Definir nuevas coordenadas para predicción
        new_coordinates = pd.DataFrame({'longitud': [location_x], 'latitud': [location_y]})

        # Realizar predicción
        prediccion = self.model.predict(new_coordinates)
        probabilidades = self.model.predict_proba(new_coordinates)

        # Mostrar predicción y probabilidades
        return self.label_encoder.inverse_transform(prediccion)[0], probabilidades[0], self.label_encoder.classes_
        