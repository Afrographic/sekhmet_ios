class AndroidPipeline {
  static androidToIos(Acashflows) {
    for (let i = 0; i <= Acashflows.length - 1; i++) {
      Acashflows[i].id = Acashflows[i].id;
      Acashflows[i].name = Afro.Ucase(Acashflows[i].name);
      Acashflows[i].prix = parseInt(Acashflows[i].price);
      Acashflows[i].isGain = Acashflows[i].is_positive == 1 ? 1 : 0;
      Acashflows[i].isDepense = Acashflows[i].is_positive == 0 ? 1 : 0;
      Acashflows[i].collectionId = Acashflows[i].context_id;
      Acashflows[i].time = this.extractTime(Acashflows[i].created_date);
      Acashflows[i].year = this.extractYear(Acashflows[i].created_date);
      Acashflows[i].month = this.extractMonth(Acashflows[i].created_date);
      Acashflows[i].day = this.extractDay(Acashflows[i].created_date);
      Acashflows[i].monthNameEnglish = this.extractMonthNameEnglish(
        Acashflows[i].created_date
      );
      Acashflows[i].monthNameFrench = this.extractMonthNameFrench(
        Acashflows[i].created_date
      );
      Acashflows[i].weekDayNameEnglish = this.extractWeekDayNameEnglish(
        Acashflows[i].created_date
      );
      Acashflows[i].weekDayNameFrench = this.extractWeekDayNameFrench(
        Acashflows[i].created_date
      );
      Acashflows[i].fullDateFrench = this.extractFullDateFrench(
        Acashflows[i].created_date
      );
      Acashflows[i].fullDateEnglish = this.extractFullDateEnglish(
        Acashflows[i].created_date
      );
    }
    return Acashflows;
  }

  static extractTime(date) {
    //2023-07-20 23:03:58.623971
    let a = date.split(" ")[1];
    a = a.split(".");
    return a[0];
  }

  static extractYear(date) {
    //2023-07-20 23:03:58.623971
    let a = date.split(" ")[0];
    a = a.split("-");
    return parseInt(a[0]);
  }

  static extractMonth(date) {
    //2023-07-20 23:03:58.623971
    let a = date.split(" ")[0];
    a = a.split("-");
    return parseInt(a[1]);
  }

  static extractDay(date) {
    //2023-07-20 23:03:58.623971
    let a = date.split(" ")[0];
    a = a.split("-");
    return parseInt(a[2]);
  }

  static extractMonthNameEnglish(date) {
    let year = this.extractYear(date);
    let month = this.extractMonth(date);
    let day = this.extractDay(date);
    date = new Date(year, month - 1, day);
    const monthName = date.toLocaleString("en-US", { month: "long" });
    return monthName;
  }

  static extractMonthNameFrench(date) {
    let year = this.extractYear(date);
    let month = this.extractMonth(date);
    let day = this.extractDay(date);
    date = new Date(year, month - 1, day);
    const monthName = date.toLocaleString("fr-FR", { month: "long" });
    return monthName;
  }

  static extractWeekDayNameEnglish(date) {
    let year = this.extractYear(date);
    let month = this.extractMonth(date);
    let day = this.extractDay(date);
    date = new Date(year, month - 1, day);
    const dayName = date.toLocaleString("en-US", { weekday: "long" });
    return Afro.Ucase(dayName);
  }

  static extractWeekDayNameFrench(date) {
    let year = this.extractYear(date);
    let month = this.extractMonth(date);
    let day = this.extractDay(date);
    date = new Date(year, month - 1, day);
    const dayName = date.toLocaleString("fr-FR", { weekday: "long" });
    return Afro.Ucase(dayName);
  }

  static extractFullDateFrench(date) {
    let year = this.extractYear(date);
    let month = this.extractMonth(date);
    let day = this.extractDay(date);
    date = new Date(year, month - 1, day);
    const dateComplete = date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateComplete;
  }

  static extractFullDateEnglish(date) {
    let year = this.extractYear(date);
    let month = this.extractMonth(date);
    let day = this.extractDay(date);
    date = new Date(year, month - 1, day);
    const dateComplete = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateComplete;
  }
}

/*
IOS collection Model 
{
  name:"clsll",
  id:"uu88iijjjhh"
}
IOS Cashflow Model
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

/*
  Android collection Model

  {
    "context_id":"1746546383080",
    "context_name":"Don de la Nature"
  }

  Android cashflow Model

  {
    "id":1689890638623,
    "name":"Dejeuner",
    "price":"3200",
    "is_positive":0,
    "created_date":"2023-07-20 23:03:58.623971",
    "context_id":"",
    "context_name":""
  }
  */
