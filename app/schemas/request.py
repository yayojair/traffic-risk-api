from pydantic import BaseModel

class RiskAnalysisRequest(BaseModel):
    latitude: float
    longitude: float

class AddressRequest(BaseModel):
    address: str
