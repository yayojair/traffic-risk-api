const trafficMap  = new TrafficMap();

trafficMap.createMap();
const trafficMarker = new TrafficMarker(trafficMap.map);

trafficMap.registerClickListener((longitude, latitude) => {
    trafficMarker.createMarker(longitude,latitude);
});

