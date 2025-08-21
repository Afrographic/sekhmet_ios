function TriggerImportJSON() {
  let importFile = document.querySelector("#importFile");
  importFile.click();
}

function getImportedFile(e) {
  let file = e.target.files[0];
  let url = URL.createObjectURL(file);
  fetch(url)
    .then((response) => response.json())
    .then((json) => processImportedDate(json));
}

function processImportedDate(json) {
  products = products.concat(json);
  saveToDB();
  renderProduct();
}

function exportAsJSON() {
  let fullDate = Afro.fullDateInFrench();
  fullDate = fullDate.replace(" ", "_");
  let db = {
    cashflows: cashflows,
    collections: collections,
  };
  var dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db));
  var aNode = document.createElement("a");
  aNode.setAttribute("href", dataStr);
  aNode.setAttribute("download", "Sekhmet_db_" + fullDate + ".json");
  document.body.appendChild(aNode);
  aNode.click();
  aNode.remove();
}

function getDb(e) {
  let file = e.target.files[0];
  let url = URL.createObjectURL(file);
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      cashflows = cashflows.concat(json.cashflows);
      updateDB(cashflows);
      collections = json.collections;
      localStorage.setItem("collections", JSON.stringify(collections));
      window.location.reload();
    });
}

function triggerCashFlowFileImporter() {
  let cashflowAndroidFileImporter = document.querySelector(
    "#cashflowAndroidFileImporter"
  );
  cashflowAndroidFileImporter.click();
}

function getCasflowAndroid(e) {
  let file = e.target.files[0];
  let url = URL.createObjectURL(file);
  fetch(url)
    .then((response) => response.json())
    .then(async (json) => {
      let imported = AndroidPipeline.androidToIos(json);
      cashflows = cashflows.concat(imported);
      await updateDB(cashflows);
      window.location.reload();
    });
}

function triggerCollectionFileImporter() {
  let collectionAndroidFileImporter = document.querySelector(
    "#collectionAndroidFileImporter"
  );
  collectionAndroidFileImporter.click();
}

function getCollectionAndroid(e) {
  let file = e.target.files[0];
  let url = URL.createObjectURL(file);
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      let collections = [];
      let collectionsDB = localStorage.getItem("collections");
      if (collectionsDB != null) {
        collections = JSON.parse(collectionsDB);
        collections = Afro.sort(collections);
      }

     
      let AndroidCollection = json;
      for (let i = 0; i <= AndroidCollection.length - 1; i++) {
        AndroidCollection[i].name = Afro.Ucase(
          AndroidCollection[i].context_name
        );
        AndroidCollection[i].id = AndroidCollection[i].context_id;
      }
      collections = collections.concat(AndroidCollection);
      localStorage.setItem("collections", JSON.stringify(collections));
      window.location.reload();

      /*
        Android Collection Model
         {
          "context_id":"1746546383080",
          "context_name":"Don de la Nature"
        }
        */
    });
}

function triggerDBImport() {
  let dbImporter = document.querySelector("#dbImporter");
  dbImporter.click();
}

function toggleDataView() {
  let exportData = document.querySelector(".exportData");
  let home = document.querySelector(".home");
  exportData.classList.toggle("inactive");
  home.classList.toggle("inactive");
}
