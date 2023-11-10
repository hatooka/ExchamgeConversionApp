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
        option.text = element.label + "(" + element.value + ")";
        option.value = element.value;
        from.appendChild(option);

        var option2 = document.createElement("option");
        option2.text = element.label + "(" + element.value + ")";
        option2.value = element.value;
        to.appendChild(option2);
    });
};

function callConvertApi(){
    let from = document.getElementById("from");
    let to = document.getElementById("to");
    let toIdx = to.selectedIndex;
    let amount = parseInt(document.getElementById("amount").value);

    var request = new XMLHttpRequest();
    var path = "https://currencyapi.net/api/v1/rates?key=" + apiKey;

    request.open("GET",path);
    request.send();


    request.addEventListener("load", function(){
        const data = JSON.parse(this.responseText);
        var fromRate = 1.0;
        var toRate = 1.0;
        for(var key of Object.keys(data.rates)){
            // api/v1/ratesの基準がUSドルなのでUSDが選択されている場合は１倍のまま
            if (from.value != "USD" && key == from.value){
                fromRate = data.rates[key]
            }
            if (to.value != "USD" && key == to.value){
                toRate = data.rates[key]
            }
        };
        var result = document.getElementById("result");

        // 小数第3位で四捨五入して表示
        result.innerHTML = Math.round(amount/fromRate*toRate * 100)/100 + " " +  to.options[toIdx].value;
    });

    request.addEventListener("error", function(){
        console.error("error occured");
    });
}

function clickButton(){
    // バリデーションチェック
    var check = false;
    let amount = parseInt(document.getElementById("amount").value);
    let errMesageLabel = document.getElementById("errMessage");
    if (isNaN(amount)|| amount == undefined){
        errMesageLabel.innerHTML = "金額が入力されていません";
        check = true
    }else if( amount <=0 ){
        errMesageLabel.innerHTML = "０より大きい数字を入力してください";
        check = true
    }

    errMesageLabel.hidden = !check

    if (!check){
        callConvertApi()
    }
}

window.onload = createCurrencyList()