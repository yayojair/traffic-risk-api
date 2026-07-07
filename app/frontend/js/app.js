const trafficMap  = new TrafficMap();

trafficMap.createMap();
const trafficMarker = new TrafficMarker(trafficMap.map);

const apiToFastApi = new ApiToFastApi("http://127.0.0.1:8000/api/v1/")

trafficMap.registerClickListener(async (latitude,longitude) => {
    // Ejecutamos el método de la clase usando 'await'
    const prediction = await apiToFastApi.queryServer(latitude, longitude, 'risk')
    trafficMarker.createMarker(latitude,longitude,prediction);

});

