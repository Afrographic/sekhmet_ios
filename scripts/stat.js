class Stat {
  static devise = "XAF";
  static async compute() {
    await init_data();
    this.devise = localStorage.getItem("sekhmetCurrency");
    this.computeTotalStat();
    this.groupPerDay();
    let year = Afro.getYear();
    this.computeMonthYearStat(year);
    this.computeCollectionStat();
  }

  static renderYearStat(el) {
    let year = parseInt(el.innerHTML);
    this.computeMonthYearStat(year);
  }

  static async groupPerDay() {
    let dayGroup = [];

    let year = Afro.getYear();
    let month = Afro.getMonth();
    let monthName = Afro.getMonthFrench();
    let day = Afro.getDay();
    let devise = localStorage.getItem("sekhmetCurrency");
    for (let i = 1; i <= day; i++) {
      let cashflowsDay = [];
      let depense = 0;
      let gain = 0;
      for (let j = 0; j <= cashflows.length - 1; j++) {
        if (
          cashflows[j].year == year &&
          cashflows[j].month == month &&
          cashflows[j].day == i
        ) {
          cashflowsDay.push(cashflows[j]);
          if (cashflows[j].isDepense == 1) {
            depense += cashflows[j].prix;
          } else {
            gain += cashflows[j].prix;
          }
        }
      }
      dayGroup.unshift({
        date: `${i} ${Afro.Ucase(monthName)} ${year}`,
        dayName: Afro.Ucase(Afro.getWeekName(year, month, i)),
        depense: depense,
        gain: gain,
        epargne: gain - depense,
        cashflows: cashflowsDay,
      });
    }

    //Render view
    let dayStats = document.querySelector(".dayStats");
    dayStats.innerHTML = "";
    for (let i = 0; i <= dayGroup.length - 1; i++) {
      let cashflowLists = "";
      for (let j = 0; j <= dayGroup[i].cashflows.length - 1; j++) {
        let gain = "gain";
        let sign = "+";
        if (dayGroup[i].cashflows[j].isDepense == 1) {
          gain = "";
          sign = "-";
        }
        cashflowLists += `
                <div
                class="cahsflowItemList"
                onmousedown="startPress(this)"
                ontouchstart="startPress(this)"
                onmouseup="cancelPress(this)"
                onmouseleave="cancelPress(this)"
                ontouchend="cancelPress(this)"
                ontouchcancel="cancelPress(this)"
                >
                    <div class="options inactive">
                        <img src="assets/images/msg_edit.svg" alt="" onclick="editCashflow(${
                          dayGroup[i].cashflows[j].id
                        })">
                        <img src="assets/images/msg_delete.svg" alt="" onclick="deleteCashflow(${
                          dayGroup[i].cashflows[j].id
                        })">
                    </div>
                    <div>${dayGroup[i].cashflows[j].name}</div>
                    <div class="priceDate">
                        <div class="price ${gain}" >${sign}${Afro.formatNumWithWhiteSpace(
          dayGroup[i].cashflows[j].prix
        )} ${setCurrency.currency}</div>
                        <div class="date"> ${
                          dayGroup[i].cashflows[j].time
                        }</div>
                    </div>
                </div>
                `;
      }

      dayStats.innerHTML += `
      <div class="dayStatItem">
      <div class="dayStatItemTitle">
        <div class="dayStatDate">
          <div> <span class="c_main">${dayGroup[i].dayName}</span>, ${
        dayGroup[i].date
      }</div>
        </div>
        <hr>
        <div class="globalStat">
          <div class="item">
            <div>Gain</div>
            <div>${Afro.formatNumWithWhiteSpace(
              dayGroup[i].gain
            )} ${devise}</div>
          </div>
          <div class="item">
            <div>Depense</div>
            <div>${Afro.formatNumWithWhiteSpace(
              dayGroup[i].depense
            )} ${devise}</div>
          </div>
          <div class="item">
            <div>Epargne</div>
            <div>${Afro.formatNumWithWhiteSpace(
              dayGroup[i].epargne
            )} ${devise}</div>
          </div>
        </div>
      </div>
      <div class="dayStatCashflow">
        ${cashflowLists}
      </div>
    </div>
      `;
      preventBrowserContextMenu();
    }
  }

  static computeTotalStat() {
    let gain = 0;
    let depense = 0;
    let epargne = 0;
    for (let i = 0; i <= cashflows.length - 1; i++) {
      if (cashflows[i].isDepense == 1) {
        depense += cashflows[i].prix;
      } else {
        gain += cashflows[i].prix;
      }
    }
    epargne = gain - depense;
    //Render view
    let totalGainView = document.querySelector("#totalGainView");
    let totalDepenseView = document.querySelector("#totalDepenseView");
    let TotalEpargneView = document.querySelector("#TotalEpargneView");
    let devise = localStorage.getItem("sekhmetCurrency");

    totalGainView.innerHTML = `${Afro.formatNumWithWhiteSpace(gain)} ${devise}`;
    totalDepenseView.innerHTML = `${Afro.formatNumWithWhiteSpace(
      depense
    )} ${devise}`;
    TotalEpargneView.innerHTML = `${Afro.formatNumWithWhiteSpace(
      epargne
    )} ${devise}`;
  }

  static computeMonthYearStat(year) {

    let month = Afro.getMonth();
    let yearStat = [];
    for (let i = 1; i <= 12; i++) {
      let list = [];
      let gain = 0;
      let depense = 0;
      for (let j = 0; j <= cashflows.length - 1; j++) {
        if (cashflows[j].year == year && cashflows[j].month == i) {
          list.push(cashflows[j]);
          if (cashflows[j].isDepense == 1) {
            depense += cashflows[j].prix;
          } else {
            gain += cashflows[j].prix;
          }
        }
      }
      yearStat.unshift({
        cashflows: list,
        gain: gain,
        depense: depense,
        epargne: gain - depense,
        month: Afro.Ucase(Afro.getMonthNameFromMontIdAndYear(i, year)),
      });
    }

    // year stat
    let yearGain = 0;
    let yearDepense = 0;
    for (let i = 0; i <= yearStat.length - 1; i++) {
      yearGain += yearStat[i].gain;
      yearDepense += yearStat[i].depense;
    }
    let yearFullStat = {
      year: year,
      gain: yearGain,
      depense: yearDepense,
      epargne: yearGain - yearDepense,
      months: yearStat,
    };
    //Render View

    let devise = localStorage.getItem("sekhmetCurrency");
    let currentYearView = document.querySelector("#currentYearView");
    let yearGainView = document.querySelector("#yearGainView");
    let yearDepenseView = document.querySelector("#yearDepenseView");
    let yearEpargneView = document.querySelector("#yearEpargneView");

    let previousYearView = document.querySelector("#previousYearView");
    let nextYearView = document.querySelector("#nextYearView");

    currentYearView.innerHTML = `${year}`;
    previousYearView.innerHTML = `${year - 1}`;
    nextYearView.innerHTML = `${year + 1}`;
    yearGainView.innerHTML = `${Afro.formatNumWithWhiteSpace(
      yearFullStat.gain
    )} ${devise}`;
    yearDepenseView.innerHTML = `${Afro.formatNumWithWhiteSpace(
      yearFullStat.depense
    )} ${devise}`;
    yearEpargneView.innerHTML = `${Afro.formatNumWithWhiteSpace(
      yearFullStat.epargne
    )} ${devise}`;

    //render months Cashflow
    let yearStatMonthsView = document.querySelector(".yearStatMonthsView");
    yearStatMonthsView.innerHTML = "";
    for (let i = 0; i <= yearStat.length - 1; i++) {
      let cashflowLists = "";
      for (let j = 0; j <= yearStat[i].cashflows.length - 1; j++) {
        let gain = "gain";
        let sign = "+";
        if (yearStat[i].cashflows[j].isDepense == 1) {
          gain = "";
          sign = "-";
        }
        cashflowLists += `
        <div
                class="cahsflowItemList"
                onmousedown="startPress(this)"
                ontouchstart="startPress(this)"
                onmouseup="cancelPress(this)"
                onmouseleave="cancelPress(this)"
                ontouchend="cancelPress(this)"
                ontouchcancel="cancelPress(this)"
                >
                    <div class="options inactive">
                        <img src="assets/images/msg_edit.svg" alt="" onclick="editCashflow(${
                          yearStat[i].cashflows[j].id
                        })">
                        <img src="assets/images/msg_delete.svg" alt="" onclick="deleteCashflow(${
                          yearStat[i].cashflows[j].id
                        })">
                    </div>
                    <div>${yearStat[i].cashflows[j].name}</div>
                    <div class="priceDate">
                        <div class="price ${gain}" >${sign}${Afro.formatNumWithWhiteSpace(
          yearStat[i].cashflows[j].prix
        )} ${setCurrency.currency}</div>
                        <div class="date"> ${
                          yearStat[i].cashflows[j].time
                        }</div>
                    </div>
                </div>
        `;
      }

      yearStatMonthsView.innerHTML += `
      <div class="dayStatItem">
      <div class="dayStatItemTitle">
        <div class="dayStatDate">
          <div> <span class="c_main">${yearStat[i].month}</span></div>
          <img src="assets/images/hidden.svg" width="24px" onclick="toggleCasflowList(this)"/>
        </div>
        <hr>
        <div class="globalStat">
          <div class="item">
            <div>Gain</div>
            <div>${Afro.formatNumWithWhiteSpace(
              yearStat[i].gain
            )} ${devise}</div>
          </div>
          <div class="item">
            <div>Depense</div>
            <div>${Afro.formatNumWithWhiteSpace(
              yearStat[i].depense
            )} ${devise}</div>
          </div>
          <div class="item">
            <div>Epargne</div>
            <div>${Afro.formatNumWithWhiteSpace(
              yearStat[i].epargne
            )} ${devise}</div>
          </div>
        </div>
      </div>
      <div class="dayStatCashflow inactive">
        ${cashflowLists}
      </div>
    </div>
      `;

      preventBrowserContextMenu();
    }
  }

  static computeCollectionStat() {
    let collectionsDB = localStorage.getItem("collections");
    if (collectionsDB == null) return;
    let collections = JSON.parse(collectionsDB);
    collections = Afro.sort(collections);

    //Compute stat
    for(let i = 0 ; i<=collections.length-1;i++){
      let gain = 0;
      let depense = 0;
      for(let j = 0 ; j<= cashflows.length -1 ;j++){
        if(cashflows[j].collectionId == collections[i].id){
          if( cashflows[j].isDepense == 1){
            depense += cashflows[j].prix;
          }else{
            gain += cashflows[j].prix;
          }
        }
      }
      collections[i].gain = gain;
      collections[i].depense = depense;
    }

    
    let homeCollection = document.querySelector(".homeCollection");
    homeCollection.innerHTML ="";
    for(let i = 0 ; i<=collections.length-1;i++){
      homeCollection.innerHTML += `
      <div class="homeCollectionItem">
        <div>${collections[i].name}</div>
        <div>${Afro.formatNumWithWhiteSpace(collections[i].depense)} ${this.devise}</div>
      </div>
      `
    }
    if(collections.length == 0){
      homeCollection.classList.add("inactive");
    }
  }
}

Stat.compute();

function toggleCasflowList(el) {
  let src = el.getAttribute("src");
  if (src == "assets/images/hidden.svg") {
    el.setAttribute("src", "assets/images/visible.svg");
  } else {
    el.setAttribute("src", "assets/images/hidden.svg");
  }
  let casflowsView = el.parentNode.parentNode.parentNode.lastElementChild;
  casflowsView.classList.toggle("inactive");
}

function goToHomeFromStat() {
  let home = document.querySelector(".home");
  let yearStatView = document.querySelector(".yearStatView");
  home.classList.toggle("inactive");
  yearStatView.classList.toggle("inactive");
}
