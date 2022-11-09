let elForm = document.querySelector(".form");
let elTimeList = document.querySelector(".time__day");
let elWeekList = document.querySelector(".info__down");
let elTimeCountry = document.querySelector(".time__country");
let deyTimeOne = elTimeList.querySelector(".time__clock--one");
let deyTimetwo = elTimeList.querySelector(".time__clock--two");
let deyTimethre = elTimeList.querySelector(".time__clock--thre");
let deyTimefour = elTimeList.querySelector(".time__clock--four");
let deyTimefive = elTimeList.querySelector(".time__clock--five");
let deyTimesix = elTimeList.querySelector(".time__clock--six");

let elTable = document.querySelector(".on__table");
let eltoday = document.querySelector(".today__texy");

// countr select
let elCountrySelect = document.querySelector(".form__town");
// select week
let elweekSelect = document.querySelector(".form__time");
// select month
let elMonthSelect = document.querySelector(".form__mon");

// Data
let data = new Date();
let month = data.getMonth() + 1;
// console.log(month)

function deyTime(arr) {

  try {

    fetch(`https://islomapi.uz/api/present/day?region=${arr}`)
    .then((res) => res.json())
    .then((data) => {
      let timesNamaz = [];
      timesNamaz.push(data);
      timesNamaz.forEach((item) => {
        elTimeCountry.textContent = item.region;
        eltoday.textContent = item.weekday;
        deyTimeOne.textContent = item.times.tong_saharlik;
        deyTimetwo.textContent = item.times.quyosh;
        deyTimethre.textContent = item.times.peshin;
        deyTimefour.textContent = item.times.asr;
        deyTimefive.textContent = item.times.shom_iftor;
        deyTimesix.textContent = item.times.hufton;

        let watch = `
      <div class="own__clock">
                  <div id="time">
                    <div class="circle" style="--clr:#ff2972">
                      <div class="dots hr_dot"></div>
                      <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle cx="70" cy="70" r="70" id="hh"></circle>
                      </svg>
                      <div id="hours">00</div>
                    </div>
                    <div class="circle" style="--clr:#fee800">
                      <div class="dots min_dot"></div>
                      <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle cx="70" cy="70" r="70" id="mm"></circle>
                      </svg>
                      <div id="minutes">00</div>
                    </div>
                    <div class="circle" style="--clr:#04fc43">
                      <div class="dots sec_dot"></div>
                      <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                        <circle cx="70" cy="70" r="70" id="ss"></circle>
                      </svg>
                      <div id="seconds">00</div>
                    </div>
                    <div class="ap">
                      <div id="ampm">AM</div>
                    </div>
                  </div>
                </div>
      `;
        elWeekList.innerHTML = watch;
      });
    });
    
  } catch (error) {
    console.log("error day");
  }
  
}

function weekTime(arr, wek, list) {
  list.innerHTML = "";
  let tableFragment = new DocumentFragment();
  try {

    fetch(`https://islomapi.uz/api/present/${wek}?region=${arr}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        elTimeCountry.textContent = item.region;
        let weekItem = document.createElement("div");
        weekItem.setAttribute("class", "spaces");
        let infoWrap = `
      <tbody class="info">
      <table class="table text-white">
      <tbody >
      <tr>
      <td class="set__table">${item.weekday}</td>
      <td>${item.times.tong_saharlik}</td>
      <td>${item.times.quyosh}</td>
      <td>${item.times.peshin}</td>
      <td>${item.times.asr}</td>
      <td>${item.times.shom_iftor}</td>
      <td>${item.times.hufton}</td>
      </tr>
      </tbody>
      </table>
      </tbody>
      `;
        weekItem.innerHTML = infoWrap;
        tableFragment.appendChild(weekItem);
      });
      list.appendChild(tableFragment);
    });
    
  } catch (error) {
    console.log("error week");
  }

}

function monthTime(arr, mon, list) {
  list.innerHTML = "";
  let tableMonFragment = new DocumentFragment();
  try {

    fetch(`https://islomapi.uz/api/monthly?region=${arr}&month=${mon}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        elTimeCountry.textContent = item.region;
        let weekItem = document.createElement("div");
        weekItem.setAttribute("class", "spaces");
        let infoWrap = `
      <tbody class="info">
      <table class="table text-white">
      <tbody >
      <tr>
      <td class="set__table">${item.weekday}</td>
      <td>${item.times.tong_saharlik}</td>
      <td>${item.times.quyosh}</td>
      <td>${item.times.peshin}</td>
      <td>${item.times.asr}</td>
      <td>${item.times.shom_iftor}</td>
      <td>${item.times.hufton}</td>
      </tr>
      </tbody>
      </table>
      </tbody>
      `;
        weekItem.innerHTML = infoWrap;
        tableMonFragment.appendChild(weekItem);
      });
      list.appendChild(tableMonFragment);
    });
    
  } catch (error) {
    console.log("Error Month");
  }
  
}

deyTime(elCountrySelect.value);

// month open function
elweekSelect.addEventListener("change", function () {
  if (elweekSelect.value == "month") {
    elMonthSelect.classList.remove("form__mon--on");
  } else {
    elMonthSelect.classList.add("form__mon--on");
  }
});

// select function
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  elWeekList.innerHTML = "";
  // day
  if (elweekSelect.value == "today") {
    elTimeList.classList.remove("off__list");
    eltoday.classList.remove("text__none");
    elTimeList.classList.add("on__list");
    eltoday.classList.add("text__block");
    deyTime(elCountrySelect.value);
    // setInterval()
  } else if (elweekSelect.value == "week") {
    elTimeList.classList.remove("on__list");
    elTimeList.classList.add("off__list");
    eltoday.classList.remove("text__block");
    eltoday.classList.add("text__none");
    elMonthSelect.classList.add("on__list");
    weekTime(elCountrySelect.value, elweekSelect.value, elWeekList);
  } else if (elweekSelect.value == "month") {
    elTimeList.classList.add("off__list");
    eltoday.classList.remove("text__block");
    eltoday.classList.add("text__none");
    if (elMonthSelect.value == "") {
      elMonthSelect.value = month;
    }
    monthTime(elCountrySelect.value, elMonthSelect.value, elWeekList);
  }

  // table
  if (elweekSelect.value == "week") {
    elTable.classList.remove("on__table");
  } else if (elweekSelect.value == "month") {
    elTable.classList.remove("on__table");
  } else {
    elTable.classList.add("on__table");
  }
});
