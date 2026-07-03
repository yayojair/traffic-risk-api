import osmnx as ox
from geopy.geocoders import Nominatim
from shapely.geometry import Point
from fastapi import HTTPException

class GeocodingService:
    def __init__(self):
        self.cdmx_poligono = None
        self.geolocator = None

    def initialize_coord_cdmx(self):
        # 1. Obtienes el GeoDataFrame de CDMX
        cdmx = ox.geocode_to_gdf("Ciudad de México, México")
        # 2. Extraes el polígono completo (no solo las coordenadas del borde)
        self.cdmx_poligono = cdmx.geometry.iloc[0]

    def initialize_nominatim(self):
        # Inicializar Nominatim con un user_agent único (requerido por la política de uso)
        self.geolocator = Nominatim(user_agent="mi_aplicacion_python/1.0")

    def geocode_address(self, address):
        
        # 1. Geocodificación (Dirección a Coordenadas)
        location = self.geolocator.geocode(address)
        print(location)
        if location is None:
            raise HTTPException(
                status_code=404,
                detail="Address not found."
            )

        point_prove = Point(location.longitude, location.latitude)

        # 4. Verificas si está dentro
        inside = self.cdmx_poligono.contains(point_prove)

        if inside:
            return location.longitude, location.latitude
        else:
            raise HTTPException(
                status_code=400,
                detail="The model only supports locations within Mexico City."
            )


