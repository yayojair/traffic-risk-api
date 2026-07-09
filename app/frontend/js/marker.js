class TrafficMarker{
    constructor(map){
        this.map = map;
        this.currentMarker = null;
    }

    getMarkerColor(risk) {
        switch(risk){

            case "alto":
                return "red";

            case "moderado_alto":
                return "orange";

            case "moderado_bajo":
                return "yellow";

            case "bajo":
            case "nulo":
                return "green";

            default:
                return "";
        }
        

    }

    createIcon(color){
        return new L.Icon({
            iconUrl: `images/marker-icon-${color}.png`,
            shadowUrl: "images/marker-icon-white.png",

            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }

    createMarker(prediction){
        //eliminamos un marker en caso de que ya exista uno
        if (this.currentMarker) {
            this.map.removeLayer(this.currentMarker);
        }

        //mostrar otras probabilidades
        const probabilitiesHtml = Object.entries(prediction.probabilities)
        .map(([risk, probability]) =>
            `<li>${risk}: <strong>${(probability * 100).toFixed(1)}%</strong></li>`
        )
        .join("");

        const longitude = prediction.locations.longitude;
        const latitude = prediction.locations.latitude;


        const color = this.getMarkerColor(prediction.risk);
        const iconColor = this.createIcon(color);
 
        const colorPrediction = (risk) => {
            const colores = {
                alto: "🔴",
                moderado_alto: "🟠",
                moderado_bajo: "🟡",
                bajo: "🟢"
            };
            
            // Si el riesgo existe en el objeto, lo devuelve. Si no (el else), devuelve verde.
            return colores[risk] || "🟢";
        };

        //crear el marker sobre el mapa con la predicion
        this.currentMarker = L.marker([latitude, longitude], {icon: iconColor}).addTo(this.map)
        .bindPopup(`<div class="popup-content">
                        <h3>🚦 Traffic Risk</h3>

                        <p><strong>${colorPrediction(prediction.risk)}Nivel de riesgo:</strong> ${prediction.risk.toUpperCase()}</p>

                        <p><strong>Confianza del modelo:</strong> ${(prediction.confidence * 100).toFixed(1)}%</p>

                        <p><strong>Probabilidades por categoría:</strong> ${(probabilitiesHtml)}

                        <hr>

                        <p><strong>📍 Coordenadas</strong></p>
                        <small>
                            Dirección: ${prediction.address}<br>
                            Latitude: ${latitude.toFixed(6)}<br>
                            Longitude: ${longitude.toFixed(6)}
                        </small>
                        <small style="display:block; margin-top:10px; color:gray;">
                            Predicción realizada con un modelo entrenado únicamente con datos de la Ciudad de México.
                        </small>
                    </div>`)
        .openPopup();
    }

}