from dataclasses import dataclass

@dataclass
class RiskResult:
    risk: str
    confidence: float
    probabilities: dict