class TrafficMap {
    constructor (){
        this.map = null
    }

    createMap(){
        this.map = L.map('map').setView([19.4270, -99.1676], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(this.map);
    }

    registerClickListener(onClick){
        
        this.map.on('click', (e) => {
            const longitude = e.latlng.lng
            const latitude = e.latlng.lat
            onClick(longitude, latitude);
        });
    }

}