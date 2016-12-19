function setup() {
	var urlExtension = 'funds/';
	var xhr = xhrGetRequest(urlExtension);
    xhr.send();
    setTimeout(function() {createHTMLFromResponseText(xhr.responseText)}, 300);

    function createHTMLFromResponseText(funds) {
        funds = JSON.parse(funds);

        var html = "<table border='1' align='center' bordercolor='#808080' id='floor-money'><tbody><tr>";
        html += "<td align='middle' width='200'><b>Floor</b></td><td align='middle' width='60'><b>Balance</b></td>";
        html += "<td align='middle' width='200'><b>Floor</b></td><td align='middle' width='60'><b>Balance</b></td></tr>";
        var countForColoring = 0;
        for (var i = 0; i < funds.length - 1; i += 2) {
            if (funds[i].display_on_site) {
                if(countForColoring % 2 == 0){
                html += "<tr bgcolor='#f0f0f0'><td>" + funds[i].fund_name + "</td>";
                } else{
                html += "<tr><td>" + funds[i].fund_name + "</td>";
                }
                html += "<td align='right'>" + funds[i].funds_amount + "</td>";
                html += "<td>" + funds[i + 1].fund_name + "</td>";
                html += "<td align='right'>" + funds[i + 1].funds_amount + "</td></tr>";
                countForColoring++;
            }
        }
        var floorMoneyTable = document.getElementById("floorMoneyTable");
        floorMoneyTable.innerHTML += html;
    }
} 
document.addEventListener("DOMContentLoaded", function(event) {
    setup();
});