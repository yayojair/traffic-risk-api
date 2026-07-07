class ApiToFastApi{
    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    async queryServer(latitude, longitude, endpoint){
        // debe de coincidir con los datos de entrada de la api
        const coordenadas = { latitude: latitude, longitude: longitude };
        try {
            // 1. Espera (await) a que el servidor responda los encabezados
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST', // Especificas el método HTTP
                headers: {
                    'Content-Type': 'application/json' // Le avisas al backend que le mandas un JSON
                },
                body: JSON.stringify(coordenadas) // Conviertes tu objeto JS a una cadena de texto JSON
            })
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            // 2. Espera (await) a que se descargue y transforme el JSON por completo
            const datos = await response.json();
            
            return datos

        } catch (error) {
            // El bloque try/catch atrapa cualquier error de red o del servidor
            console.error("Ocurrió un error:", error);
        }
    }
}