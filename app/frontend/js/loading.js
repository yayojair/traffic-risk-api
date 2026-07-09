class Loading {
    constructor (){
        this.loading = document.querySelector("#loading-screen");
    }

    show (){
        this.loading.classList.remove("hidden");
    }

    hide (){
        this.loading.classList.add("hidden");
    }
}