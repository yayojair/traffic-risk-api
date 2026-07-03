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

    registerClickListener(){
        this.map.on('click', (e) => {
            console.log(`tu longitud es ${e.latlng.lng}. y tu latitude es ${e.latlng.lat}`);
        });
    }

}