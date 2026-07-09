class Notification {
    constructor(){
        this.alerta = document.querySelector("#show-error");
        this.textError = document.querySelector("#text-error");
        this.timeoutId = null;
    }
    
    showError(message){
        clearTimeout(this.timeoutId);
        this.alerta.classList.remove('hidden');
        this.textError.textContent = message
        this.timeoutId = setTimeout(() => {
            this.alerta.classList.add('hidden');
        }, 3000);
    }
    
}