class Afro {
  static generate_unique_id_from_time() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milliseconds = date.getMilliseconds();
    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  }

  static Ucase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static removeUselessWhiteSpace(str) {
    return str.trim().replaceAll(/\s+/g, " ");
  }

  rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static add_days(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static add_hours(date, hours) {
    date.setHours(date.getHours() + hours);

    return date;
  }

  static validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  static get_extension(file_name) {
    let file = file_name.split(".");
    return file[file.length - 1];
  }

  static get_file_name(file_name) {
    let file = file_name.split(".");
    return file[0];
  }

  static valid_phone(phone) {
    let regex =
      /^(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|\d{3}(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?$/;
    return regex.test(phone);
  }

  static toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  static generate4DigitsCode() {
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let code = "";
    for (let i = 0; i <= 3; i++) {
      let index = this.rand(0, numbers.length - 1);
      let digit = numbers[index];
      code += `${digit}`;
    }
    return code;
  }

  static replace_space_with_underscore(str) {
    str = str.trim().replaceAll(/\s+/g, "_");
    return str.trim().replaceAll(/\/+/g, "_");
  }

  static printWebPage(pdfName) {
    const { jsPDF } = window.jspdf;
    let facture = document.querySelector(".containerFacture");
    html2canvas(facture, {
      useCors: true,
      allowTaint: false,
      scale: 2,
      windowWidth: facture.scrollWidth,
      windowHeight: facture.scrollHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth * 2;
      const imgHeight = (imgProps.height * 2 * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", -100, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", -100, position + 20, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      pdf.save("#1 - Azeumo Romeo.pdf");
    });
  }

  static exportImage() {
    let numeroSerie = localStorage.getItem("numeroSerie");
    let client = localStorage.getItem("client");
    const { jsPDF } = window.jspdf;
    let facture = document.querySelector(".containerFacture");
    html2canvas(facture, {
      useCors: true,
      allowTaint: false,
      scale: 2,
      width: facture.offsetWidth,
      height: facture.scrollHeight,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: facture.scrollHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = imgData;
      link.download = `#${numeroSerie} - Facture - ${client}.png`;
      link.click();
    });
  }

  static isInArray(element, arr) {
    for (let i = 0; i <= arr.length - 1; i++) {
      if (arr[i] == element) {
        return true;
      }
    }
    return false;
  }

  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async show_negative_message(message) {
    let info = document.querySelector("#negative");
    let msg = document.querySelector("#negative #content");
    msg.innerHTML = message;
    info.classList.add("info_visible");
    await this.sleep(4000);
    info.classList.remove("info_visible");
  }

  static formatNumWithWhiteSpace(n) {
    const s = String(n);
    const [intPart, fracPart] = s.split(".");
    const intWithSpace = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return fracPart ? `${intWithSpace}.${fracPart}` : intWithSpace;
  }

  static sort(arr) {
    return arr.sort((a, b) => a.name.localeCompare(b.name));
  }

  static getCurrentTime24h() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  static getYear() {
    return new Date().getFullYear();
  }

  static getMonth() {
    return new Date().getMonth() + 1;
  }

  static getMonthEnglish() {
    const monthName = new Date().toLocaleString("en-US", { month: "long" });
    return monthName;
  }

  static getMonthFrench() {
    const monthName = new Date().toLocaleString("fr-FR", { month: "long" });
    return monthName;
  }

  static getDay() {
    return new Date().getDate();
  }

  static getWeekDayNameEnglish() {
    const dayName = new Date().toLocaleString("en-US", { weekday: "long" });
    return dayName;
  }

  static getWeekDayNameFrench() {
    const dayName = new Date().toLocaleString("fr-FR", { weekday: "long" });
    return dayName;
  }

  static getWeekName(year,month,day){
    const date = new Date(year,month-1,day);
    return date.toLocaleString("fr-FR", { weekday: "long" });
  }

  static getMonthNameFromMontIdAndYear(month,year){
    const date = new Date(year,month-1,1);
    const dateComplete =date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
    });
    return dateComplete;
  }

  static fullDateInFrenchWihoutWeekDay() {
    const dateComplete = new Date().toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateComplete;
  }

  static fullDateInFrench() {
    const dateComplete = new Date().toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateComplete;
  }

  static fullDateInEnglishWihoutWeekDay() {
    const dateComplete = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateComplete;
  }

  static fullDateInEnglish() {
    const dateComplete = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateComplete;
  }

  static copy(content) {
    let textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.className = "ghost";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}
