class TrafficMarker{
    constructor(map){
        this.map = map
        this.currentMarker = null
    }

    createMarker(longitude,latitude){

        if (this.currentMarker) {
            this.map.removeLayer(this.currentMarker);
        }

        this.currentMarker = L.marker([latitude, longitude]).addTo(this.map)
        .bindPopup(`Coordenadas: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
        .openPopup();
    }
}