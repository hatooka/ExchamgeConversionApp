const apiKey = "VNz2AbfhiSZ1t9FEpd0OXlnVAUchQ96daRNq";

const currencies = [
    {value: "JPY",label: "円"},
    {value: "USD",label: "ドル"},
    {value: "EUR",label:"ユーロ"},                            
    {value: "GBP",label:"ポンド"},
    {value: "AUD",label:"オーストラリアドル"},
    {value: "CAD",label:"カナダドル"},
    {value: "CNY",label:"元"},
    {value: "KRW",label:"ウォン"},
    {value: "INR",label:"ルピー"},
    {value: "THB",label:"バーツ"},
    {value: "PHP",label:"ペソ"},
    {value: "BRL",label:"レアル"},
    {value: "CHF",label:"フラン"},
    {value: "AED",label:"ディルハム"},
]

function createCurrencyList(){
    let from = document.getElementById("from");
    let to = document.getElementById("to");
    currencies.forEach(function(element){
        var option = document.createElement("option");
        option.text = element.label;
        option.value = element.value;
        var option2 = document.createElement("option");
        option2.text = element.label;
        option2.value = element.value;
        from.appendChild(option);
        to.appendChild(option2);
    });
};

function callConvertApi(){
    currencies
    var request = new XMLHttpRequest();
    var path = "https://currencyapi.net/api/v1/rates?key=" + apiKey;
    let from = document.getElementById("from");
    let to = document.getElementById("to");
    var fromIdx = from.selectedIndex;
    var toIdx = to.selectedIndex;
    let amount = parseInt(document.getElementById("amount").value);
    var fromValue = from.options[fromIdx].value;
    var toValue = to.options[toIdx].value;

    request.open("GET",path);
    request.send();

    var fromRate = 1.0;
    var toRate = 1.0;
    request.addEventListener("load", function(){
        const data = JSON.parse(this.responseText);
        console.log(data);
        for(var key of Object.keys(data.rates)){
            if (key == fromValue){
                fromRate = data.rates[key]
            }
            if (key == toValue){
                toRate = data.rates[key]
            }
        };
        console.log(fromRate);
        console.log(toRate);
        console.log(amount/fromRate*toRate);
        var result = document.getElementById("result");
        result.innerHTML = amount/fromRate*toRate + to.options[toIdx].text;

    });

    request.addEventListener("error", function(){
        console.error("error occured");
    });
}

window.onload = createCurrencyList()