class setCurrency{
    static currency = "";
    static init(){
        let currency = localStorage.getItem("sekhmetCurrency");
        let home = document.querySelector(".home");
        let html = document.querySelector("html");
        let currencyView = document.querySelector(".currency");
        let devise = document.querySelector("#devise");
        if(currency == null){
            devise.focus();
            currencyView.classList.remove("inactive");
            home.classList.add("inactive");
            html.style.overflow ="hidden";
        }else{
            currencyView.classList.add("inactive");
            setCurrency.currency = currency;
        }
    }

    static save(){
        let devise = document.querySelector("#devise");
        if(devise.value.trim().length == 0){
            alert("Devise invalide!");
            return;
        }
        localStorage.setItem("sekhmetCurrency",devise.value);
        let currencyView = document.querySelector(".currency");
        let html = document.querySelector("html");
        let home = document.querySelector(".home");
        currencyView.classList.add("inactive");
        home.classList.remove("inactive");
        html.style.overflow ="auto"; 
        setCurrency.currency = devise.value;
        renderCashflow();
    }

    static edit(){
        let home = document.querySelector(".home");
        let html = document.querySelector("html");
        let currencyView = document.querySelector(".currency");
        currencyView.classList.remove("inactive");
        home.classList.add("inactive");
        html.style.overflow ="hidden";
        //Current value
        let devise = document.querySelector("#devise");
        devise.focus();
        let currency = localStorage.getItem("sekhmetCurrency");
        devise.value = currency; 
    }
}

setCurrency.init();