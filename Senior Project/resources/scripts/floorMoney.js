function setup() {
    var urlExtension = 'funds/';
    var xhr = xhrGetRequest(urlExtension);
    xhr.send();
    setTimeout(function () { createHTMLFromResponseText(xhr.responseText) }, 300);
    var newTransactionButton = document.getElementById("newTransactionButton");
    newTransactionButton.setAttribute('data-toggle', 'modal');
    newTransactionButton.setAttribute('data-target', '#transactionModal');

    function createHTMLFromResponseText(funds) {
        funds = JSON.parse(funds);
        var body = document.getElementsByTagName('body')[0];
        var table = document.createElement('table');
        table.setAttribute('border', 1);
        table.setAttribute('align', 'center');
        table.setAttribute('bordercolor', '#808080');
        table.setAttribute('id', 'floor-money');

        var tbdy = document.createElement('tbody');
        var tdFloor = document.createElement('td');
        tdFloor.setAttribute('align', 'middle');
        tdFloor.setAttribute('width', 200);
        tdFloor.innerHTML = "Floor";

        var tdBalance = document.createElement('td');
        tdBalance.setAttribute('align', 'middle');
        tdBalance.setAttribute('width', 200);
        tdBalance.innerHTML = "Balance";
        tbdy.appendChild(tdFloor);
        tbdy.appendChild(tdBalance);
        var countForColoring = 0;
        for (var i = 0; i < funds.length - 1; i++) {
            if (funds[i].display_on_site) {
                tr = document.createElement('tr');
                tr.setAttribute('funds', i);
                tr.setAttribute('data-toggle', 'modal');
                tr.setAttribute('data-target', '#myModal');
                doClosure(funds, i);

                if (countForColoring % 2 == 0) {
                    tr.setAttribute('bgcolor', '#f0f0f0');
                }
                countForColoring++;

                var td = document.createElement('td');
                td.innerHTML = funds[i].fund_name;

                var td2 = document.createElement('td');
                td2.innerHTML = funds[i].funds_amount;
                tr.appendChild(td);
                tr.appendChild(td2);
                tbdy.appendChild(tr);
            }
        }
        table.appendChild(tbdy);
        body.appendChild(table);
    }
}
document.addEventListener("DOMContentLoaded", function (event) {
    setup();
});



function doClosure(funds, i) {
    tr.addEventListener("click", function () { setUpModal(funds, i) });
}

function setUpModal(funds, i) {
    document.getElementById('funds-modal-funds_name').innerHTML = funds[i].fund_name;
    document.getElementById('funds-modal-funds_amount').innerHTML = funds[i].funds_amount;
}