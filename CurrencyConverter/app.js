const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdown = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "From" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "To" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption)
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    })
}

const updateFlag = (e) => {
    let currCode = e.value;
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = e.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let amt = document.querySelector(".amount input")
    let amtValue = amt.value;
    if (amtValue == "" || amtValue < 0){
        amtValue = 1;
        amt.value = "1";
    }


    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL); 
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    let finalAmt = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
});