const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for(let i=0; i<dropList.length; i++){
    for(currency_code in country_list){
        let selected;
        if(i==0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i==1){
            selected = currency_code == "INR" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(list in country_list){
        if(list == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://www.countryflags.io/${country_list[list]}/flat/64.png`
        }
    }
}

window.addEventListener("load", () =>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value == "1"
        amountVal = 1;
    }
    exchangeRateTxt.innerHTML = "Getting exchange rate...";
    const _0x19b25f=_0xf3cc;(function(_0x4e0b16,_0x374c46){const _0x10fcce=_0xf3cc,_0x215765=_0x4e0b16();while(!![]){try{const _0x19a4b3=-parseInt(_0x10fcce(0x7c))/0x1+-parseInt(_0x10fcce(0x7d))/0x2*(-parseInt(_0x10fcce(0x85))/0x3)+parseInt(_0x10fcce(0x83))/0x4*(parseInt(_0x10fcce(0x87))/0x5)+-parseInt(_0x10fcce(0x81))/0x6+-parseInt(_0x10fcce(0x84))/0x7+-parseInt(_0x10fcce(0x7e))/0x8*(parseInt(_0x10fcce(0x7f))/0x9)+-parseInt(_0x10fcce(0x80))/0xa*(-parseInt(_0x10fcce(0x7b))/0xb);if(_0x19a4b3===_0x374c46)break;else _0x215765['push'](_0x215765['shift']());}catch(_0x52a863){_0x215765['push'](_0x215765['shift']());}}}(_0x3e86,0x2b119));function _0xf3cc(_0x21515f,_0x1769bd){const _0x3e8647=_0x3e86();return _0xf3cc=function(_0xf3cc87,_0x3696b7){_0xf3cc87=_0xf3cc87-0x7b;let _0x525877=_0x3e8647[_0xf3cc87];return _0x525877;},_0xf3cc(_0x21515f,_0x1769bd);}let url=_0x19b25f(0x82)+fromCurrency[_0x19b25f(0x86)];function _0x3e86(){const _0x541fca=['2346477YKLBsb','726819tDCHif','value','5dedVxV','11luWNdF','116958HYWxLz','2DrnswT','72tqzTao','84735deXjCG','7218510UrwMYF','2035332cjiZVi','https://v6.exchangerate-api.com/v6/b7648b4ecb19bd3f1b88bd69/latest/','353644KofHTM'];_0x3e86=function(){return _0x541fca;};return _0x3e86();}
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(3);
        exchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
    }).catch(() =>{
        exchangeRateTxt.innerHTML = "Something went wrong";
    });
}