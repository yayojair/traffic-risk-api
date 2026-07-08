class SearchRisk{
    constructor(eventFormAddressRisk){
        this.eventFormAddressRisk = eventFormAddressRisk
    }

    searchAddressRisk(searchAddress){

        this.eventFormAddressRisk.addEventListener('submit', e => {

            const address = document.querySelector('#address-risk');
            e.preventDefault();
            const addressRisk = address.value.trim()
            // Validamos que el usuario no haya dejado el campo vacío
            if (addressRisk === "") {
                alert("Por favor, escribe algo antes de buscar.");
                return;
            }
            searchAddress(addressRisk);
        })

    }
}