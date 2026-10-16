let strings = {
  en: {
    // Splash Screen
    slogan: "Spot your spending in real time",

    // Settings
    config: "Settings",
    settingsDescription:
      "Welcome to Sekhmet, the application that will help you monitor your expenses with precision.",
    reseignerDevise: "Please enter your currency",
    devise: "Currency",
    save: "Save",

    // About
    aPropos: "About",
    sekhmetDescription:
      "Sekhmet is a mobile application developed by the digital agency Afrographix Studio to help you have a complete view of your daily, monthly and annual expenses and earnings.",
    collecteDesDonneesDescription:
      "We do not collect your personal data, all information is only stored on your device and is not transmitted to third parties.",
    contactsDescription:
      "If you have any questions or suggestions, you can contact us by email or WhatsApp",

    //donation
    donationDescription:
      "This application is completely free; however, your donations will encourage the development of new features. Below are the Orange Money and MTN Mobile Money numbers.",

    //Import / Export de donnee
    dataMigrationTitle: "Data migration and backup",
    dataMigrationDescription: "Please select the type of data to import/export",
    importIphoneData: "Import Iphone Data",
    exportIphoneData: "Export Iphone Data",
    importAndroidCashflow: "Import Android Cashflow Data",
    importAndroidCollection: "Import Android Collections",

    //Entete page d'acceuil
    gain: "Earnings",
    depense: "Expenses",
    epargne: "Savings",

    //Creation de cashflow
    cashflowCreationTitle: "Cashflow creation",
    cashflowCreationDescription:
      "Please enter the details of your cashflow below.",
    nom: "Name",
    prix: "Price",
    collectionOptional: "Collection (Optional)",
    clickToSelect: "Click to select",

    //Collections
    collectionDescription:"Please select the collection on the list below",
    nomCollection: "Collection Name",
    creerUneCollection:"Create a collection"
  },
};

let sloganLabel = document.querySelector("#sloganLabel");
let collectionNameLabel = document.querySelector("#collectionNameLabel");
let collectionDescription = document.querySelector("#collectionDescription");
let configurationlabel = document.querySelector(".currency h1");
let settingsDescriptionLabel = document.querySelector(".currency .base");
let deviseInputLabel = document.querySelector(".currency .label");
let saveSettingsButtonLabel = document.querySelector(".currency button");
let deviseLabel = document.querySelector("#deviseLabel");
let aProposLabel = document.querySelector("#aProposLabel");
let aProposDescription = document.querySelector("#aProposDescription");
let collecteDonneesLabel = document.querySelector("#collecteDonneesLabel");
let collecteDesDonneesDescriptionLabel = document.querySelector(
  "#collecteDesDonneesDescriptionLabel",
);
let contactDescriptionLabel = document.querySelector(
  "#contactDescriptionLabel",
);
let donationDescriptionLabel = document.querySelector(
  "#donationDescriptionLabel",
);
let dataMigrationTitleLabel = document.querySelector(
  "#dataMigrationTitleLabel",
);
let selectImportTypeLabel = document.querySelector("#selectImportTypeLabel");
let importIphoneDataLabel = document.querySelector("#importIphoneDataLabel");
let ExportIphoneDataLabel = document.querySelector("#ExportIphoneDataLabel");
let importAndroidCashflowLabel = document.querySelector(
  "#importAndroidCashflowLabel",
);
let importAndroidCollectionLabel = document.querySelector(
  "#importAndroidCollectionLabel",
);

let statGainLabel = document.querySelector("#statGainLabel");
let statDepenseLabel = document.querySelector("#statDepenseLabel");
let statEpargneLabel = document.querySelector("#statEpargneLabel");


let gainLabel = document.querySelector("#gainLabel");
let depenseLabel = document.querySelector("#depenseLabel");
let epargneLabel = document.querySelector("#epargneLabel");
let cashflowCreationDescription = document.querySelector(
  "#cashflowCreationDescription",
);
let nomLabel = document.querySelector("#nomLabel");
let priceLabel = document.querySelector("#priceLabel");
let depenseBtn = document.querySelector("#depenseBtn");
let gainBtn = document.querySelector("#gainBtn");
let collectionLabel = document.querySelector("#collectionLabel");
let clickToSelect = document.querySelector(".clickToSelect");
let saveCashflow = document.querySelector("#saveCashflow");
let createCollectionButtonLabel = document.querySelector("#createCollectionButtonLabel");
let nomCollectionInputPlaceholderLabel = document.querySelector("#nomCollectionInput");

// Debut de la traduction de l'application
const language = navigator.language;
if (!language.startsWith("fr")) {
  sloganLabel.textContent = strings.en.slogan;
  configurationlabel.textContent = strings.en.config;
  settingsDescriptionLabel.textContent = strings.en.settingsDescription;
  deviseLabel.textContent = strings.en.reseignerDevise;
  deviseInputLabel.textContent = strings.en.devise;
  saveSettingsButtonLabel.textContent = strings.en.save;
  aProposLabel.textContent = strings.en.aPropos;
  aProposDescription.textContent = strings.en.sekhmetDescription;
  collecteDonneesLabel.textContent = strings.en.collecteDesDonnees;
  collecteDesDonneesDescriptionLabel.textContent =
    strings.en.collecteDesDonneesDescription;
  contactDescriptionLabel.textContent = strings.en.contactsDescription;
  donationDescriptionLabel.textContent = strings.en.donationDescription;
  dataMigrationTitleLabel.textContent = strings.en.dataMigrationTitle;
  selectImportTypeLabel.textContent = strings.en.dataMigrationDescription;
  importIphoneDataLabel.textContent = strings.en.importIphoneData;
  ExportIphoneDataLabel.textContent = strings.en.exportIphoneData;
  importAndroidCashflowLabel.textContent = strings.en.importAndroidCashflow;
  importAndroidCollectionLabel.textContent = strings.en.importAndroidCollection;
  gainLabel.textContent = strings.en.gain;
  depenseLabel.textContent = strings.en.depense;
  epargneLabel.textContent = strings.en.epargne;
  cashflowCreationDescription.textContent =
    strings.en.cashflowCreationDescription;
  nomLabel.textContent = strings.en.nom;
  priceLabel.textContent = strings.en.prix;
  depenseBtn.textContent = strings.en.depense;
  gainBtn.textContent = strings.en.gain;
  collectionLabel.textContent = strings.en.collectionOptional;
  clickToSelect.textContent = strings.en.clickToSelect;
  saveCashflow.textContent = strings.en.save;
  collectionDescription.textContent = strings.en.collectionDescription;
  collectionNameLabel.textContent = strings.en.nomCollection;
  createCollectionButtonLabel.textContent = strings.en.creerUneCollection;
  nomCollectionInputPlaceholderLabel.setAttribute("placeholder",strings.en.nomCollection);
  statGainLabel.textContent = strings.en.gain;
  statDepenseLabel.textContent = strings.en.depense;
  statEpargneLabel.textContent = strings.en.epargne;
}
