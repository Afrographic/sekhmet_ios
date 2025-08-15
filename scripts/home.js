let addCashflowButton = document.querySelector(".addCashflowButton");
let createCashFlow = document.querySelector(".createCashFlow");
let home = document.querySelector(".home");

function goToCreateCashflowView(){
    let nomCashflowInput = document.querySelector("#nomCashflowInput");
    nomCashflowInput.focus();
    addCashflowButton.classList.add("inactive");
    home.classList.add("inactive");
    createCashFlow.classList.remove("inactive");
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
    console.log(cashflows);
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
                <img src="assets/images/msg_edit.svg" alt="">
                <img src="assets/images/msg_delete.svg" alt="">
            </div>
            <div>${cashflows[i].name}</div>
            <div class="priceDate">
                <div class="price ${gain}">${sign}${Afro.formatNumWithWhiteSpace(cashflows[i].prix)} XAF</div>
                <div class="date">${Afro.Ucase(cashflows[i].fullDateFrench)}</div>
            </div>
        </div>
        `
        preventBrowserContextMenu();
    }
}
renderCashflow();


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