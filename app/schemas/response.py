from pydantic import BaseModel

class RiskAnalysisResponse(BaseModel):
    risk: str
    confidence: float
    locations: dict
    address: str
    probabilities: dict
    
