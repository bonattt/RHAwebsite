
var displayingAllMembers = true;
var table = document.createElement('table');

function setAdmin(officers) {    
    if (userIsOfficer(officers)) {
        setupSubmitAttendanceButton();
        var cancelBtn = document.getElementById('update-modal-cancel');
        cancelBtn.addEventListener('click', function() {
            document.getElementById("csvFile").value = '';
        });
    }
    return;
}

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

function setupSubmitAttendanceButton() {
    var addCommitteeBtn = document.getElementById("submitAttendance");
    addCommitteeBtn.style.display = "block"; //*/
    addCommitteeBtn.addEventListener('click', function() {       
        
        var submitBtn = document.getElementById('update-modal-submit');
        var submitAttendanceSubmit = function (e) {
            var urlExtension = 'attendance/';
            
            var files = document.getElementById("csvFile").files;

            var reader = new FileReader();

            reader.onload = function (e) {
                var result = reader.result.split("\n").sort();

                var xhr = xhrPutRequest(urlExtension);

                xhr.onreadystatechange = function (e) {
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        location.reload();
                    }
                };
                xhr.send(JSON.stringify({ membersToUpdate: result }));
            clearSubmitHandlers(submitBtn);
            return xhr;
            };

            reader.readAsText(files[0]);

            document.getElementById("csvFile").value = '';
        }
        submitBtn.addEventListener('click', submitAttendanceSubmit);
        var addCommitteeCancel = function () {
            clearSubmitHandlers(submitBtn);
            cancelBtn.removeEventListener('click', addCommitteeCancel);
        }
        var cancelBtn = document.getElementById('update-modal-cancel');
        cancelBtn.addEventListener('click', function() {
            // do nothing.
        });        
    });
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

$(document).ready(function() {
    setup();
    var officersxhr = getOfficers();
    officersxhr.onload = () => { setAdmin(officersxhr.responseText) }
    officersxhr.send();
});