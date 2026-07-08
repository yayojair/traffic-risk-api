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
        query_osm = {"state": "Ciudad de México", "country": "México"}
        cdmx = ox.geocode_to_gdf(query_osm)
        
        # 2. Extraes el polígono completo (no solo las coordenadas del borde)
        self.cdmx_poligono = cdmx.geometry.iloc[0]

    def initialize_nominatim(self):
        # Inicializar Nominatim con un user_agent único (requerido por la política de uso)
        self.geolocator = Nominatim(user_agent="mi_aplicacion_python/1.0")

    def geocode_address(self, address):
        
        # 1. Geocodificación (Dirección a Coordenadas)
        location = self.geolocator.geocode(
            query=address,
            country_codes="mx",
            exactly_one=True,
            timeout=10
        )
                
        if location is None:
            raise HTTPException(
                status_code=404,
                detail="Address not found."
            )

        point_prove = Point(location.longitude, location.latitude)

        # 4. Verificas si está dentro
        inside = self.cdmx_poligono.contains(point_prove)

        if inside:
            return location.longitude, location.latitude, location.address
        else:
            raise HTTPException(
                status_code=400,
                detail="The model only supports locations within Mexico City."
            )
        
    def geocode_locations(self, locations):
        # 1. Primero validas espacialmente con Shapely para no perder tiempo con la API si está fuera
        longitude = locations["longitude"]
        latitude = locations["latitude"]
        point_prove = Point(longitude, latitude)
        
        if not self.cdmx_poligono.contains(point_prove):
            raise HTTPException(
                status_code=400,
                detail="The model only supports locations within Mexico City."
            )

        # 2. Geocodificación Inversa (Coordenadas -> Dirección de texto)
        try:
            # Pasamos las coordenadas en un string o tupla "lat, lon"            
            location = self.geolocator.reverse(
                query=f"{latitude}, {longitude}",
                timeout=10
            )
        except Exception:
            location = None

        if location is None:
            raise HTTPException(
                status_code=404,
                detail="No address found for these coordinates."
            )

        return location.address

