(function () {
    var fund = [{
        fund_name: "BSB0-1",
        funds_amount: 30.45,
        display_on_site: true
    },
        {
            fund_name: "BSB2",
            funds_amount: 30.45,
            display_on_site: false
        },
        {
            fund_name: "BSB3",
            funds_amount: 30.45,
            display_on_site: true
        },
        {
            fund_name: "Scharp",
            funds_amount: 30.45,
            display_on_site: true
        },
        {
            fund_name: "Blum",
            funds_amount: 30.45,
            display_on_site: true
        }];

    var html = "<table border='1' align='center' bordercolor='#808080' id='floor-money'><tbody><tr>";
    html += "<td align='middle' width='200'><b>Floor</b></td><td align='middle' width='60'><b>Balance</b></td>";
    html += "<td align='middle' width='200'><b>Floor</b></td><td align='middle' width='60'><b>Balance</b></td></tr>";
    
    for (var i = 0; i < fund.length - 1; i += 2) {
        if (fund[i].display_on_site) {
            html += "<tr bgcolor='#f0f0f0'><td>" + fund[i].fund_name + "</td>";
            html += "<td align='right'>" + fund[i].funds_amount + "</td>";
            html += "<tr bgcolor='#f0f0f0'><td>" + fund[i + 1].fund_name + "</td>";
            html += "<td align='right'>" + fund[i + 1].funds_amount + "</td></tr>";
        }
    }
    
    var floorMoneyTable = document.getElementById("floorMoneyTable");
    floorMoneyTable.innerHTML += html;
})(); 