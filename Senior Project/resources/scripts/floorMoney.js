var awardsValue;
var expensesValue;

function setup() {    
    var urlExtension = 'floorMoney/';
    var xhr = xhrGetRequest(urlExtension);
    xhr.send();

    var urlExtensionAwards = 'awardsOnly';
    var xhrAwards = createXhrRequestJSON('POST', urlExtensionAwards);
    xhrAwards.send(JSON.stringify({ floorName: "Mees" }));

    var urlExtensionExpenses = 'expensesOnly';
    var xhrExpenses = createXhrRequestJSON('POST', urlExtensionExpenses);
    xhrExpenses.send(JSON.stringify({ floorName: "Mees"}));
    setTimeout(function () { createHTMLFromResponseText(xhr.responseText, xhrAwards.responseText, xhrExpenses.responseText) }, 300);

    function createHTMLFromResponseText(floorMoney, awards, expenses) {
        floorMoney = JSON.parse(floorMoney);
        awards = JSON.parse(awards);
        awardsValue = awards[0].sum_only_awards;
        expenses = JSON.parse(expenses);
        expensesValue = expenses[0].sum_only_expenses * -1;
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
        for (var i = 0; i < floorMoney.length; i++) {
            tr = document.createElement('tr');
            tr.setAttribute('floorMoney', i);
            tr.setAttribute('data-toggle', 'modal');
            tr.setAttribute('data-target', '#myModal');
            doClosure(floorMoney, i);

            if (countForColoring % 2 == 0) {
                tr.setAttribute('bgcolor', '#f0f0f0');
            }
            countForColoring++;

            var td = document.createElement('td');
            td.innerHTML = floorMoney[i].hall_and_floor;

            var td2 = document.createElement('td');
            td2.innerHTML = floorMoney[i].current_earned;
            tr.appendChild(td);
            tr.appendChild(td2);
            tbdy.appendChild(tr);
        }
        table.appendChild(tbdy);
        body.appendChild(table);
    }
}
document.addEventListener("DOMContentLoaded", function (event) {
    setup();
});



function doClosure(floorMoney, i) {
    tr.addEventListener("click", function () { setUpModal(floorMoney, i) });
}

function setUpModal(floorMoney, i) {
    document.getElementById('funds-modal-funds_name').innerHTML = floorMoney[i].hall_and_floor;
    document.getElementById('funds-modal-current_earned').innerHTML = floorMoney[i].current_balance;
    document.getElementById('funds-modal-possible_earned').innerHTML = floorMoney[i].possible_balance;
    document.getElementById('funds-modal-residents').innerHTML = floorMoney[i].residents;
    document.getElementById('funds-modal-expenses').innerHTML = expensesValue;
    document.getElementById('funds-modal-awards').innerHTML = awardsValue;
}