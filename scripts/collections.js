/*
[
    {
        name:"Nutrition",
        id:"8s89988d9d"
    },
    {
        name:"Deplacement",
        id:"8s89988d9d"
    }
]
*/
let collections = [];
function getCollections(){
    let collectionsDB = localStorage.getItem("collections");
    if(collectionsDB == null){
        localStorage.setItem("collections","[]");
    }else{
        collections = JSON.parse(collectionsDB);
        collections = Afro.sort(collections);
        renderCollections();
    }
}
getCollections();

function renderCollections(){
    let collectionItems = document.querySelector(".collectionItems");
    collectionItems.innerHTML = "";
    for(let i = 0 ; i<=collections.length -1;i++){
        collectionItems.innerHTML += `
        <div class="collectionItem" onclick="selectCollection(${i})">
          <div >${collections[i].name}</div>
          <div>
            <img src="assets/images/delete.svg" width="24px" alt="" onclick="deleteCollection(event,'${collections[i].id}')" />
          </div>
        </div> 
        `
    }
    console.log(collections);
}

function selectCollection(index){

    let selectedCollectionTextView = document.querySelector("#selectedCollectionTextView");
    let selectedCollectionTextViewId = document.querySelector("#selectedCollectionTextViewId");
    let removeSelectedCollection = document.querySelector("#removeSelectedCollection");

    selectedCollectionTextView.innerHTML = collections[index].name;
    selectedCollectionTextViewId.innerHTML = collections[index].id;
    removeSelectedCollection.classList.add("active");
    removeSelectedCollection.classList.remove("disable");
    closePickCollection()
}

function createCollection(){
    let nomCollectionInput = document.querySelector("#nomCollectionInput");
    if(nomCollectionInput.value.trim().length == 0){
        alert("Nom de la collection invalide!");
        return;
    }
    let name = Afro.Ucase(nomCollectionInput.value.trim())
    let id = Afro.generate_unique_id_from_time();
    collections.unshift({
        name:name,
        id:id
    })
    localStorage.setItem("collections",JSON.stringify(collections));
    nomCollectionInput.value="";
    nomCollectionInput.focus();
    renderCollections();
}

function deleteCollection(e,id){
    e.stopPropagation();
    let index = 0;
    let name = "";
    for(let i = 0 ;i <= collections.length -1 ; i++){
        if(collections[i].id == id){
            index = i;
            name = collections[i].name;
        }
    }
    if(confirm(`Voulez vous vraiment supprimer la collection ${name}?`)){
        collections.splice(index,1);
        localStorage.setItem("collections",JSON.stringify(collections));
        renderCollections();

        // If the deleted Collection were selected kindly remove it
        let selectedCollectionTextView = document.querySelector("#selectedCollectionTextView");
        let selectedCollectionTextViewId = document.querySelector("#selectedCollectionTextViewId");
        let removeSelectedCollection = document.querySelector("#removeSelectedCollection");
        if(selectedCollectionTextView.innerHTML == name){
            selectedCollectionTextView.innerHTML = "Cliquez pour selectionner";
            selectedCollectionTextViewId.innerHTML = "";
            removeSelectedCollection.classList.add("disable");
            removeSelectedCollection.classList.remove("active");
        }
    }

}