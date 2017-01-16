function setup() {
    var urlExtension = 'funds/';
    var xhr = xhrGetRequest(urlExtension);
    xhr.send();
    setTimeout(function () { createHTMLFromResponseText(xhr.responseText) }, 300);

    function createHTMLFromResponseText(funds) {
        funds = JSON.parse(funds);
        var floorMoneyTable = document.getElementById("activeMembersTable");
        var html = "<table border='1' align='center' bordercolor='#808080' id='membersTable'><tbody><tr>";
        html += "<td align='middle' width='200'><b>Name</b></td><td align='middle' width='200'><b>Hall</b></td><td align='middle' width='50'><b>Active</b></td>";
        var countForColoring = 0;
        for (var i = 0; i < funds.length - 1; i += 1) {
            console.log(i);
            if (funds[i].display_on_site) {
                if (countForColoring % 2 == 0) {
                    html += "<tr bgcolor='#f0f0f0' id='memberID" + i + "'><td>" + funds[i].fund_name + "</td>";
                } else {
                    html += "<tr id='memberID" + i + "'><td>" + funds[i].fund_name + "</td>";
                }
                html += "<td align='right'>" + funds[i].funds_amount + "</td>";
                html += "<td align='right'>" + funds[i].funds_amount + "</td></tr>";
                countForColoring++;
            }
            //floorMoneyTable.innerHTML += html;
            //console.log(html);
            //html = "";
            //var tr = document.getElementById("memberID" + i);
            //tr.addEventListener("click", showModal);
        }
        floorMoneyTable.innerHTML += html;
        for (var i = 0; i < funds.length - 1; i += 1) {
            var getBy = "memberID" + i;
            //console.log(getBy);
            //var tr = document.getElementById(getBy);
            //console.log(tr);
            //tr.addEventListener("click", showModal);
            var table = document.getElementById("membersTable");
            var rows = table.getElementsByTagName("tr");
            for (i = 0; i < rows.length; i++) {
                row = table.rows[i];
                console.log(row.innerHTML);
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", function (event) {
    setup();
});

function showModal() {
    alert("showing modal, in theory.");
}