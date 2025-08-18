class EditCashFlow{
    static cashFlowToEdit ={};
    static initView(i){
        EditCashFlow.cashFlowToEdit =  cashflows[i];
        let cashflow = cashflows[i];
        let createCashFlow = document.querySelector(".createCashFlow");
        let home = document.querySelector(".home");
        let editTitle = document.getElementById("editTitle");
        editTitle.innerHTML = "Edition";
        createCashFlow.classList.remove("inactive");
        home.classList.add("inactive");

        // Set Fields
        let nomCashflowInput = document.querySelector("#nomCashflowInput");
        let prixCashflowInput = document.querySelector("#prixCashflowInput");
        nomCashflowInput.value = cashflow.name;
        prixCashflowInput.value = cashflow.prix;

        nomCashflowInput.focus();

        if(cashflow.isGain == 1){
            setGain();
        }else{
            setDepense();
        }

        // Set Collections
        let collection = {};
        let collectionIndex = -1;
        for(let i = 0 ; i <=collections.length - 1;i++){
            if(collections[i].id == cashflow.collectionId){
                collection = collections[i];
                collectionIndex = i;
            }
        }
        if(collectionIndex != -1){
            selectCollection(collectionIndex);
        }else{
            removeSelectedCollection(null);
        }
    }

    static edit(name,collectionId,prix){
        EditCashFlow.cashFlowToEdit.name = name;
        EditCashFlow.cashFlowToEdit.collectionId = collectionId;
        EditCashFlow.cashFlowToEdit.prix = prix;
        EditCashFlow.cashFlowToEdit.isGain = isGain;
        EditCashFlow.cashFlowToEdit.isDepense = isDepense;

        console.log(EditCashFlow.cashFlowToEdit);
        
        for(let i = 0 ; i <= cashflows.length-1;i++){
            if(cashflows[i].id == EditCashFlow.cashFlowToEdit.id){
                cashflows[i] = EditCashFlow.cashFlowToEdit;
            }
        }
        updateDB(cashflows);
    }
}