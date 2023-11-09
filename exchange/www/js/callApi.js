const apiKey = "VNz2AbfhiSZ1t9FEpd0OXlnVAUchQ96daRNq";


function callConvertApi(){
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
            if (key==fromValue){
                fromRate = data.rates[key]
            }
            if (key==toValue){
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