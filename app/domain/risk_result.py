from dataclasses import dataclass

@dataclass
class RiskResult:
    risk: str
    confidence: float
    locations: dict
    address: str
    probabilities: dict