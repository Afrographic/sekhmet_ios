// Translation dictionary
const translations = {
    en: {
      title: "Hello World",
      desc: "This is a multilingual website.",
      btn: "Translate to French"
    },
    fr: {
      title: "Bonjour le monde",
      desc: "Ceci est un site web multilingue.",
      btn: "Translate to English"
    }
  };
  
  let currentLang = "fr";
  
  document.getElementById("lang-btn").addEventListener("click", () => {
    currentLang = currentLang === "fr" ? "en" : "fr";
  
    document.getElementById("title").textContent = translations[currentLang].title;
    document.getElementById("desc").textContent = translations[currentLang].desc;
    document.getElementById("lang-btn").textContent = translations[currentLang].btn;
  });