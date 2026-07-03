from app.domain.risk_result import RiskResult
import numpy as np



class TrafficService:

    def __init__(self, prediction_engine, geocoding_service):
        self.prediction_engine = prediction_engine
        self.geocoding_service = geocoding_service

    
    def calculate_risk(self, latitude, longitude):
        risk, probabilities, categories = self.prediction_engine.predict(longitude, latitude)
        confidence = np.max(probabilities)
        probabilities = {
            category: prob for category, prob in zip(categories, probabilities)
        }
        return RiskResult(risk=risk, confidence=confidence, probabilities=probabilities)

    def calculate_risk_address(self, address):

        longitude, latitude = self.geocoding_service.geocode_address(address)

        risk, probabilities, categories = self.prediction_engine.predict(longitude, latitude)
        confidence = np.max(probabilities)
        probabilities = {
            category: prob for category, prob in zip(categories, probabilities)
        }
        return RiskResult(risk=risk, confidence=confidence, probabilities=probabilities)