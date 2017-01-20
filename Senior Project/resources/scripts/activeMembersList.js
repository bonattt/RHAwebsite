
var displayingAllMembers = true;
var table = document.createElement('table');

function setup() {
    var urlExtension = 'members/';
    var xhr = xhrGetRequest(urlExtension);
    xhr.send();
    setTimeout(function () { createHTMLFromResponseText(xhr.responseText) }, 300);

    function createHTMLFromResponseText(members) {
        drawAllMembersTable(members);
        var allMembersButton = document.getElementById('allMembers');
        $(".allMembers").change(function () {
            displayOtherTable(members);
        });
        $(".activeMembers").change(function () {
            displayOtherTable(members);
        });
    }
}
document.addEventListener("DOMContentLoaded", function (event) {
    setup();
});

function showModal() {
    alert("showing modal, in theory.");
}

function drawAllMembersTable(members) {
    members = JSON.parse(members);
    var body = document.getElementsByTagName('body')[0];
    table.innerHTML = "";
    table.setAttribute('border', 1);
    table.setAttribute('align', 'center');
    table.setAttribute('bordercolor', '#808080');
    table.setAttribute('id', 'membersTable');

    var tbdy = document.createElement('tbody');
    var tdName = document.createElement('td');
    tdName.setAttribute('align', 'middle');
    tdName.setAttribute('width', 200);
    tdName.innerHTML = "Name";

    var tdHall = document.createElement('td');
    tdHall.setAttribute('align', 'middle');
    tdHall.setAttribute('width', 200);
    tdHall.innerHTML = "Hall";
    tbdy.appendChild(tdName);
    tbdy.appendChild(tdHall);
    var countForColoring = 0;
    for (var i = 0; i < members.length - 1; i++) {
        tr = document.createElement('tr');
        tr.setAttribute('member', i);
        tr.setAttribute('data-toggle', 'modal');
        tr.setAttribute('data-target', '#myModal');

        function doClosure() {
        tr.addEventListener("click", function () { setUpModal(members, i) });
        }
        doClosure();
        if (countForColoring % 2 == 0) {
            tr.setAttribute('bgcolor', '#f0f0f0');
        }
        countForColoring++;

        var td = document.createElement('td');
        td.innerHTML = members[i].firstname + " " + members[i].lastname;

        var td2 = document.createElement('td');
        td2.innerHTML = members[i].hall;
        tr.appendChild(td);
        tr.appendChild(td2);
        tbdy.appendChild(tr);
    }
    table.appendChild(tbdy);
    body.appendChild(table);
}

function setUpModal(members, pos) {
    console.log(pos);
    document.getElementById("member-modal-name").innerHTML = members[pos].firstname;

}

function drawActiveMembersTable(members) {
    members = JSON.parse(members);
    table.innerHTML = "";
    var body = document.getElementsByTagName('body')[0];
    table.setAttribute('border', 1);
    table.setAttribute('align', 'center');
    table.setAttribute('bordercolor', '#808080');
    table.setAttribute('id', 'membersTable');

    var tbdy = document.createElement('tbody');
    var tdName = document.createElement('td');
    tdName.setAttribute('align', 'middle');
    tdName.setAttribute('width', 200);
    tdName.innerHTML = "Name";

    var tdHall = document.createElement('td');
    tdHall.setAttribute('align', 'middle');
    tdHall.setAttribute('width', 200);
    tdHall.innerHTML = "Hall";
    tbdy.appendChild(tdName);
    tbdy.appendChild(tdHall);
    var countForColoring = 0;
    for (var i = 0; i < members.length - 1; i++) {
        if (members[i].active) {
            tr = document.createElement('tr');
            tr.setAttribute('member', i);
            tr.setAttribute('data-toggle', 'modal');
            tr.setAttribute('data-target', '#myModal');
            tr.addEventListener("click", function () { setUpModal(members, i) });
            if (countForColoring % 2 == 0) {
                tr.setAttribute('bgcolor', '#f0f0f0');
            }
            countForColoring++;

            var td = document.createElement('td');
            td.innerHTML = members[i].firstname + " " + members[i].lastname;

            var td2 = document.createElement('td');
            td2.innerHTML = members[i].hall;
            tr.appendChild(td);
            tr.appendChild(td2);
            tbdy.appendChild(tr);
        }
    }
    table.appendChild(tbdy);
    body.appendChild(table);
}

function displayOtherTable(members) {
    if (displayingAllMembers) {
        drawActiveMembersTable(members);
        displayingAllMembers = false;
        console.log("displaying active");
    } else {
        drawAllMembersTable(members);
        displayingAllMembers = true;
        console.log("displaying all");
    }
}