function setup() {
    var urlExtension = 'floorMoney/';
    var xhr = xhrGetRequest(urlExtension);
    xhr.send();


    setTimeout(function () { createHTMLFromResponseText(xhr.responseText) }, 300);

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
            td2.innerHTML = floorMoney[i].current_earned.toFixed(2);
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
    var urlExtensionAwards = 'awardsOnly';
    var xhrAwards = createXhrRequestJSON('POST', urlExtensionAwards);
    xhrAwards.send(JSON.stringify({ floorName: floorMoney[i].hall_and_floor }));

    var urlExtensionExpenses = 'expensesOnly';
    var xhrExpenses = createXhrRequestJSON('POST', urlExtensionExpenses);
    xhrExpenses.send(JSON.stringify({ floorName: floorMoney[i].hall_and_floor }));

    var urlExtensionAttendance = 'floorAttendance';
    var xhrAttendanceQ1 = createXhrRequestJSON('POST', urlExtensionAttendance);
    xhrAttendanceQ1.send(JSON.stringify({ floorName: floorMoney[i].hall_and_floor, quarter: "Q1" }));

    var xhrAttendanceQ2 = createXhrRequestJSON('POST', urlExtensionAttendance);
    xhrAttendanceQ2.send(JSON.stringify({ floorName: floorMoney[i].hall_and_floor, quarter: "Q2" }));

    var xhrAttendanceQ3 = createXhrRequestJSON('POST', urlExtensionAttendance);
    xhrAttendanceQ3.send(JSON.stringify({ floorName: floorMoney[i].hall_and_floor, quarter: "Q3" }));
    
    setTimeout(function () { setValues(xhrAwards.responseText, xhrExpenses.responseText, xhrAttendanceQ1.responseText, xhrAttendanceQ2.responseText, xhrAttendanceQ3.responseText) }, 300);
    document.getElementById('funds-modal-funds_name').innerHTML = floorMoney[i].hall_and_floor;
    document.getElementById('funds-modal-current_earned').innerHTML = floorMoney[i].current_balance.toFixed(2);
    document.getElementById('funds-modal-possible_earned').innerHTML = floorMoney[i].possible_balance;
    document.getElementById('funds-modal-residents').innerHTML = floorMoney[i].residents;
}

function setValues(awards, expenses, attendanceQ1, attendanceQ2, attendanceQ3) {
    awards = JSON.parse(awards);
    expenses = JSON.parse(expenses);
    attendanceQ1 = JSON.parse(attendanceQ1);
    attendanceQ2 = JSON.parse(attendanceQ2);
    attendanceQ3 = JSON.parse(attendanceQ3);
    document.getElementById('funds-modal-expenses').innerHTML = expenses[0].sum_only_expenses * -1;
    document.getElementById('funds-modal-awards').innerHTML = awards[0].sum_only_awards;
    document.getElementById('funds-modal-attendance_fall').innerHTML = attendanceQ1[0].count_attendance_for_floor;
    document.getElementById('funds-modal-attendance_winter').innerHTML = attendanceQ2[0].count_attendance_for_floor;
    document.getElementById('funds-modal-attendance_spring').innerHTML = attendanceQ3[0].count_attendance_for_floor;
}