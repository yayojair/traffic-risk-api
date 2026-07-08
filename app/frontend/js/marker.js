class TrafficMarker{
    constructor(map){
        this.map = map
        this.currentMarker = null
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

        const longitude = prediction.locations.longitude
        const latitude = prediction.locations.latitude

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
        this.currentMarker = L.marker([latitude, longitude]).addTo(this.map)
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