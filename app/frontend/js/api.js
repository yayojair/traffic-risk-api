class ApiToFastApi{
    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    async queryServer(latitude, longitude, endpoint){
        // debe de coincidir con los datos de entrada de la api
        const coordenadas = { latitude: latitude, longitude: longitude };
        // 1. Espera (await) a que el servidor responda los encabezados
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST', // Especificas el método HTTP
            headers: {
                'Content-Type': 'application/json' // Le avisas al backend que le mandas un JSON
            },
            body: JSON.stringify(coordenadas) // Conviertes tu objeto JS a una cadena de texto JSON
        })
        
        if (!response.ok) {
            
            throw {
                status: response.status,
                message: response.statusText
            };
        }

        // 2. Espera (await) a que se descargue y transforme el JSON por completo
        const datos = await response.json();
        
        return datos
    }

    async addressRisk(addressRisk, endpoint){
        const ad = { address: addressRisk}
        
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ad)
        });
        
        if (!response.ok) {
            throw {
                status: response.status,
                message: response.statusText
            };
        }

        const datos = await response.json();
        
        return datos

    }
}