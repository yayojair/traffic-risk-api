from pydantic import BaseModel

class RiskAnalysisResponse(BaseModel):
    risk: str
    confidence: float
    probabilities: dict
    
