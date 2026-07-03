from dataclasses import dataclass

@dataclass
class PredictionResult:
    probability: float
    prediction: float
    message: str