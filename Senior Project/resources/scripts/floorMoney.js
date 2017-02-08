function setup() {
    var urlExtension = 'floorMoney/';
    var xhr = xhrGetRequest(urlExtension);
    xhr.send();
    setTimeout(function () { createHTMLFromResponseText(xhr.responseText) }, 300);
    var addPaymentButton = document.getElementById("addPaymentButton");
    addPaymentButton.setAttribute('data-toggle', 'modal');
    addPaymentButton.setAttribute('data-target', '#paymentModal');
    var addChargeButton = document.getElementById("addChargeButton");
    addChargeButton.setAttribute('data-toggle', 'modal');
    addChargeButton.setAttribute('data-target', '#chargeModal');
    var addAwardButton = document.getElementById("addAwardButton");
    addAwardButton.setAttribute('data-toggle', 'modal');
    addAwardButton.setAttribute('data-target', '#awardModal');

    function createHTMLFromResponseText(floorMoney) {
        floorMoney = JSON.parse(floorMoney);
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
        console.log(floorMoney);
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
    console.log("doing closure");
    tr.addEventListener("click", function () { setUpModal(floorMoney, i) });
}

function setUpModal(floorMoney, i) {
    document.getElementById('funds-modal-funds_name').innerHTML = floorMoney[i].hall_and_floor;
    document.getElementById('funds-modal-current_earned').innerHTML = floorMoney[i].current_balance;
    document.getElementById('funds-modal-possible_earned').innerHTML = floorMoney[i].possible_balance;
    document.getElementById('funds-modal-residents').innerHTML = floorMoney[i].residents;
}