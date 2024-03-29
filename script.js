const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdownSel = document.querySelectorAll(".dropdown select");
const convertBtn = document.querySelector("form button");
let fromCurr = document.querySelector(".From select");
let toCurr = document.querySelector(".To select");
let changeI = document.querySelector("i");
const msg = document.querySelector(".msg");

for (let select of dropdownSel) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "From" && currCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "To" && currCode === "USD") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

async function updateExcgRate() {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmt = amtVal * rate;

  msg.innerText = `${amtVal} ${fromCurr.value} ≈ ${finalAmt.toFixed(4)} ${
    toCurr.value
  }`;
}

window.addEventListener("load", () => {
  updateExcgRate();
});

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

convertBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExcgRate();
});

changeI.addEventListener("click", () => {
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  updateFlag(fromCurr); 
  updateFlag(toCurr); 
  updateExcgRate();
});
