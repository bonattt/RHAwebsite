
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
    for (var i = 0; i < members.length; i++) {
        tr = document.createElement('tr');
        tr.setAttribute('member', i);
        tr.setAttribute('data-toggle', 'modal');
        tr.setAttribute('data-target', '#myModal');
        doClosure(members, i);
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

function doClosure(members, i) {
    tr.addEventListener("click", function () { setUpModal(members, i) });
}

function setUpModal(members, pos) {
    document.getElementById("member-modal-name").innerHTML = members[pos].firstname + " " + members[pos].lastname;
    if (members[pos].membertype) {
        document.getElementById("member-modal-membertype").innerHTML = members[pos].membertype;
    } else {
        document.getElementById("member-modal-membertype").innerHTML = "General";
    }
    document.getElementById("member-modal-username").innerHTML = members[pos].username;
    if (members[pos].phone_number) {
        document.getElementById("member-modal-phone_number").innerHTML = members[pos].phone_number;
    } else {
        document.getElementById("member-modal-phone_number").innerHTML = "N/A";
    }
    document.getElementById("member-modal-hall").innerHTML = members[pos].hall;
    if (members[pos].room_number) {
        document.getElementById("member-modal-room_number").innerHTML = members[pos].room_number;
    } else {
        document.getElementById("member-modal-room_number").innerHTML = "N/A";
    }
    if (members[pos].cm) {
        document.getElementById("member-modal-cm").innerHTML = members[pos].cm;
    } else {
        document.getElementById("member-modal-cm").innerHTML = "N/A";
    }
    document.getElementById("member-modal-active").innerHTML = members[pos].active;

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
    for (var i = 0; i < members.length; i++) {
        if (members[i].active) {
            tr = document.createElement('tr');
            tr.setAttribute('member', i);
            tr.setAttribute('data-toggle', 'modal');
            tr.setAttribute('data-target', '#myModal');
            doClosure(members, i);
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
    } else {
        drawAllMembersTable(members);
        displayingAllMembers = true;
    }
}