from fastapi import FastAPI
from app.api.routes import router as api_router
from contextlib import asynccontextmanager
from app.services.traffic_service import TrafficService
from app.ml.prediction_engine import PredictionEngine
from app.services.geocoding_service import GeocodingService
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):

    prediction_engine = PredictionEngine()
    prediction_engine.load_label_encoder_model()
    
    geocoding_service = GeocodingService()
    geocoding_service.initialize_coord_cdmx()
    geocoding_service.initialize_nominatim()

    traffic_service = TrafficService(prediction_engine, geocoding_service)
    app.state.traffic_service = traffic_service
    
    
    
    yield  


app = FastAPI(title="Traffic Risk API",
    version="1.0.0",
    lifespan=lifespan)

app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://127.0.0.1:5500"
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Incluimos las rutas con un prefijo para versionar la API
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Traffic Risk API is running"}

