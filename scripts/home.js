let addCashflowButton = document.querySelector(".addCashflowButton");
let createCashFlow = document.querySelector(".createCashFlow");
let home = document.querySelector(".home");

function goToCreateCashflowView(){
    let editTitle = document.getElementById("editTitle");
    editTitle.innerHTML = "Creer un cashflow";

    let nomCashflowInput = document.querySelector("#nomCashflowInput");
    let prixCashflowInput = document.querySelector("#prixCashflowInput");
    nomCashflowInput.value="";
    prixCashflowInput.value="";
    nomCashflowInput.focus();
    addCashflowButton.classList.add("inactive");
    home.classList.add("inactive");
    createCashFlow.classList.remove("inactive");
    setDepense();
    removeSelectedCollection(null);

    //Scroll to top position
    let html = document.querySelector("html");
    html.scrollTop = 0;
}

function preventBrowserContextMenu(){
    let cahsflowItemList = document.querySelectorAll(".cahsflowItemList");
    for(let i = 0 ; i<=cahsflowItemList.length-1;i++){
        let item = cahsflowItemList[i];
        item.addEventListener("contextmenu",(e)=>{
            e.preventDefault();
        })
    }
}

async function renderCashflow(){
    await init_data();
    let listCashflows = document.querySelector(".listCashflows");
    listCashflows.innerHTML = "";
    for(let i = 0 ; i<=cashflows.length - 1;i++){
        let gain= "gain";
        let sign = "+";
        if(cashflows[i].isDepense == 1){
            gain="";
            sign="-";
        }
        
        listCashflows.innerHTML+= `
        <div class="cahsflowItemList" onmousedown="startPress(this)"
        ontouchstart="startPress(this)" onmouseup="cancelPress(this)" onmouseleave="cancelPress(this)"
        ontouchend="cancelPress(this)" ontouchcancel="cancelPress(this)">
            <div class="options inactive">
                <img src="assets/images/msg_edit.svg" alt="" onclick="editCashflow(${i})">
                <img src="assets/images/msg_delete.svg" alt="" onclick="deleteCashflow(${i})">
            </div>
            <div>${cashflows[i].name}</div>
            <div class="priceDate">
                <div class="price ${gain}" >${sign}${Afro.formatNumWithWhiteSpace(cashflows[i].prix)} ${setCurrency.currency}</div>
                <div class="date">${Afro.Ucase(cashflows[i].fullDateFrench)}</div>
            </div>
        </div>
        `
        preventBrowserContextMenu();
    }
}
renderCashflow();

function editCashflow(i){
    EditCashFlow.initView(i);
}

async function deleteCashflow(i){
    if(confirm("Voulez vous vraiment supprimer l'enregistrement?")){
        console.log(i);
        cashflows.splice(i,1);
        await updateDB(cashflows);
        renderCashflow();
    }
}

// Manage casflow menu on long press
 // Show menu
 let press_timer;
 function startPress(el) {
   this.press_timer = setTimeout(async () => {
    let options = el.firstElementChild;
    options.classList.remove("inactive");
    await Afro.sleep(5000);
    options.classList.add("inactive");
   }, 500);
 }

 function cancelPress(event) {
   clearTimeout(this.press_timer);
 }