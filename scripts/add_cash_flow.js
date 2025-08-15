/*
{
    name:Afro.Ucase(nomCashflowInput.value.trim()),
    prix:prixCashflowInput,
    id : Afro.generate_unique_id_from_time(),
    isGain:isGain,
    isDepense:isDepense,
    collectionId:selectedCollectionTextViewId.innerHTML,
    time:Afro.getCurrentTime24h(),
    year:Afro.getYear(),
    month:Afro.getMonth(),
    monthNameEnglish:Afro.getMonthEnglish(),
    monthNameFrench:Afro.getMonthFrench(),
    day:Afro.getDay(),
    weekDayNameEnglish:Afro.getWeekDayNameEnglish(),
    weekDayNameFrench:Afro.getWeekDayNameFrench(),
    fullDateFrench:Afro.fullDateInFrench(),
    fullDateEnglish:Afro.fullDateInEnglish()
}
*/ 

function pickCollection(){
    let collections = document.querySelector(".collections");
    collections.classList.remove("inactive");
}

function closePickCollection(){
    let collections = document.querySelector(".collections");
    collections.classList.add("inactive");
}

let isGain = 0;
let isDepense = 1;


function setDepense(){
    let depenseBtn = document.querySelector("#depenseBtn");
    let gainBtn = document.querySelector("#gainBtn");
    depenseBtn.classList.add("activated");
    depenseBtn.classList.remove("disabled");
    gainBtn.classList.add("disabled");
    gainBtn.classList.remove("activated");
    isDepense = 1;
    isGain = 0;
}

function setGain(){
    let depenseBtn = document.querySelector("#depenseBtn");
    let gainBtn = document.querySelector("#gainBtn");
    depenseBtn.classList.add("disabled");
    depenseBtn.classList.remove("activated");
    gainBtn.classList.add("activated");
    gainBtn.classList.remove("disabled");
    isDepense = 0;
    isGain = 1;
}

function removeSelectedCollection(e){
    if(e!=null){
        e.stopPropagation();
    }
   
    let selectedCollectionTextView = document.querySelector("#selectedCollectionTextView");
    let selectedCollectionTextViewId = document.querySelector("#selectedCollectionTextViewId");
    let removeSelectedCollection = document.querySelector("#removeSelectedCollection");

    selectedCollectionTextView.innerHTML = "Cliquez pour selectionner";
    selectedCollectionTextViewId.innerHTML = "";
    removeSelectedCollection.classList.add("disable");
    removeSelectedCollection.classList.remove("active");
}

async function createCashflow(){
    let nomCashflowInput = document.querySelector("#nomCashflowInput");
    let prixCashflowInput = document.querySelector("#prixCashflowInput");
    let selectedCollectionTextViewId = document.querySelector("#selectedCollectionTextViewId");

    if(nomCashflowInput.value.trim().length == 0){
        alert("Nom invalide!");
        return;
    }
    if(prixCashflowInput.value <= 0){
        alert("Prix invalide!");
        return;
    }
    let name = Afro.Ucase(nomCashflowInput.value.trim());
    let collectionId = selectedCollectionTextViewId.innerHTML;
    let cashflowItem = {
        name:name,
        prix:parseInt(prixCashflowInput.value),
        id : Afro.generate_unique_id_from_time(),
        isGain:isGain,
        isDepense:isDepense,
        collectionId:collectionId,
        time:Afro.getCurrentTime24h(),
        year:Afro.getYear(),
        month:Afro.getMonth(),
        monthNameEnglish:Afro.getMonthEnglish(),
        monthNameFrench:Afro.getMonthFrench(),
        day:Afro.getDay(),
        weekDayNameEnglish:Afro.getWeekDayNameEnglish(),
        weekDayNameFrench:Afro.getWeekDayNameFrench(),
        fullDateFrench:Afro.fullDateInFrench(),
        fullDateEnglish:Afro.fullDateInEnglish()
    }

    cashflows.unshift(cashflowItem);
    updateDB(cashflows);

    // Reset Fields
    nomCashflowInput.value = "";
    prixCashflowInput.value = "";
    removeSelectedCollection(null);
    closeCreateCashFlowView();
    renderCashflow();
}

function closeCreateCashFlowView(){
    let addCashflowButton = document.querySelector(".addCashflowButton");
    let createCashFlow = document.querySelector(".createCashFlow");
    let home = document.querySelector(".home");
    addCashflowButton.classList.remove("inactive");
    home.classList.remove("inactive");
    createCashFlow.classList.add("inactive");
}