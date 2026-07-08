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
       
        locations = {"latitude":latitude, "longitude":longitude}
        
        address = self.geocoding_service.geocode_locations(locations)

        return RiskResult(risk=risk, confidence=confidence, locations=locations, address=address, probabilities=probabilities)

    def calculate_risk_address(self, address):

        longitude, latitude, addressApi = self.geocoding_service.geocode_address(address)

        risk, probabilities, categories = self.prediction_engine.predict(longitude, latitude)
        confidence = np.max(probabilities)
        probabilities = {
            category: prob for category, prob in zip(categories, probabilities)
        }
        locations = {"latitude":latitude, "longitude":longitude}
        return RiskResult(risk=risk, confidence=confidence, locations=locations, address=addressApi, probabilities=probabilities)