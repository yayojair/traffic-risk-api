from fastapi import APIRouter
from app.core.dependencies import get_traffic_service
from app.schemas.request import RiskAnalysisRequest, AddressRequest
from app.schemas.response import RiskAnalysisResponse
from app.services.traffic_service import TrafficService
from fastapi import Depends


router = APIRouter()

@router.post("/risk")
def risk(payload: RiskAnalysisRequest,
        traffic_service: TrafficService = Depends(get_traffic_service)):
    # La ruta solo recibe, delega al servicio y responde
    result = traffic_service.calculate_risk(payload.latitude, payload.longitude)
    
    return RiskAnalysisResponse(risk=result.risk, confidence=result.confidence, locations=result.locations, address=result.address, probabilities=result.probabilities)

@router.get("/health")
def health():
    return {"status": "ok"}

@router.post("/address")
def address(payload:AddressRequest,
        traffic_service: TrafficService = Depends(get_traffic_service),
        ):
    # La ruta solo recibe, delega al servicio y responde
    result = traffic_service.calculate_risk_address(payload.address)
    return RiskAnalysisResponse(risk=result.risk, confidence=result.confidence, locations=result.locations, address=result.address, probabilities=result.probabilities)
