const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns =document.querySelectorAll(".dropdown Select");
const btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


// for(  let select in countryList){
//     console.log(select ,countryList[select]);
// }
for(let select of dropdowns){
    for(let currCode in countryList){
        let newOPtion = document.createElement("option");
        newOPtion.innerText = currCode;
        newOPtion.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOPtion.selected = currCode
        }else if(select.name==="to" && currCode==="INR"){
            newOPtion.selected = currCode
        }
         select.append(newOPtion);
       
    }
    select.addEventListener("change",(evt)=>{
         updateflag(evt.target);
        

    })
}

const updateflag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newsrc;
}
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
   
});

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval===""|| amtval < 1){
        amtval=1;
        amount.value="1";
    }
    console.log(fromCurr.value.toLowerCase(),toCurr.value.toLowerCase())
    const URL =`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()];
    let rates = rate[toCurr.value.toLowerCase()];
    console.log(rates);
    
    let finalamt = amtval*rates;
    msg.innerText=`${amtval}${fromCurr.value} = ${finalamt}${toCurr.value}`;

}
window.addEventListener("load",()=>{
    updateExchangeRate();
});