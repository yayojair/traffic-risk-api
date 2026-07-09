const trafficMap  = new TrafficMap();
const loading = new Loading();
const notification = new Notification();

trafficMap.createMap();
const trafficMarker = new TrafficMarker(trafficMap.map);

const apiToFastApi = new ApiToFastApi("http://127.0.0.1:8000/api/v1/");

trafficMap.registerClickListener(async (latitude,longitude) => {
    // Ejecutamos el método de la clase usando 'await'
    loading.show();
    try {
        const prediction = await apiToFastApi.queryServer(latitude, longitude, 'risk');
        trafficMarker.createMarker(prediction);
    } catch (error) {
        
        switch (error.status) {

            case 400:
                notification.showError(error.message);
                break;

            case 404:
                notification.showError(error.message);
                break;

            default:
                notification.showError("Ha ocurrido un error inesperado.");
        }
    }finally{
        loading.hide();
    }
});

const formAddressRisk = document.querySelector('#form-btn-risk');
const searchAddressRisk = new SearchRisk(formAddressRisk);

searchAddressRisk.searchAddressRisk( async address => {
    loading.show();
    try {
        const prediction = await apiToFastApi.addressRisk(address,'address');
        trafficMarker.createMarker(prediction);
    } catch (error) {
        switch (error.status) {

            case 400:
                notification.showError(error.message);
                break;

            case 404:
                notification.showError(error.message);
                break;

            default:
                notification.showError("Ha ocurrido un error inesperado.");
        }
    } finally{
        loading.hide();
    }
})

