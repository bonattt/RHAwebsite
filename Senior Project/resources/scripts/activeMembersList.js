
var displayingAllMembers = true;

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
    var floorMoneyTable = document.getElementById("activeMembersTable");
    floorMoneyTable.innerHTML = "";
    var html = "<table border='1' align='center' bordercolor='#808080' id='membersTable'><tbody><tr>";
    html += "<td align='middle' width='200'><b>Name</b></td><td align='middle' width='200'><b>Hall</b></td>";
    var countForColoring = 0;
    for (var i = 0; i < members.length - 1; i += 1) {
        if (countForColoring % 2 == 0) {
            html += "<tr bgcolor='#f0f0f0' id='member" + i + "' data-toggle='modal' data-target='#myModal'><td>" + members[i].firstname + " " + members[i].lastname + "</td>";
        } else {
            html += "<tr id='member" + i + "' data-toggle='modal' data-target='#myModal'><td>" + members[i].firstname + " " + members[i].lastname + "</td>";
        }
        html += "<td>" + members[i].hall + "</td></tr>";
        countForColoring++;
    }
    floorMoneyTable.innerHTML += html;
    var table = document.getElementById("membersTable");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < members.length - 1; i++) {
        row = table.rows[i];
        var dataset = document.getElementById('member' + i).dataset;
        var fields = ["firstname", "lastname", "username", "membertype", "phone_number", "hall", "room_number", "cm", "active"]
        fields.forEach(function (field) {
            console.log("setting field " + field + " to " + members[i][field]);
            dataset[field] = members[i][field];
        });
        document.getElementById("member-modal-name").innerHTML = members[i].firstname;

        //row.addEventListener("click", showModal);
    }
    //}
}

function drawActiveMembersTable(members) {
    members = JSON.parse(members);
    var floorMoneyTable = document.getElementById("activeMembersTable");
    floorMoneyTable.innerHTML = "";
    var html = "<table border='1' align='center' bordercolor='#808080' id='membersTable'><tbody><tr>";
    html += "<td align='middle' width='200'><b>Name</b></td><td align='middle' width='200'><b>Hall</b></td>";
    var countForColoring = 0;
    for (var i = 0; i < members.length - 1; i += 1) {
        if (members[i].active) {
            if (countForColoring % 2 == 0) {
                html += "<tr bgcolor='#f0f0f0' id='memberType" + i + "' data-toggle='modal' data-target='#myModal'><td>" + members[i].firstname + " " + members[i].lastname + "</td>";
            } else {
                html += "<tr id='memberType" + i + "' data-toggle='modal' data-target='#myModal'><td>" + members[i].firstname + " " + members[i].lastname + "</td>";
            }
            html += "<td>" + members[i].hall + "</td></tr>";
            countForColoring++;
        }
        //floorMoneyTable.innerHTML += html;
        //console.log(html);
        //html = "";
        //var tr = document.getElementById("memberID" + i);
        //tr.addEventListener("click", showModal);
    }
    floorMoneyTable.innerHTML += html;
    //for (var i = 0; i < funds.length - 1; i += 1) {
    // var getBy = i;
    // console.log(getBy);
    // var tr = floorMoneyTable.getElementById(getBy);
    // console.log(tr);
    // tr.addEventListener("click", showModal);
    var table = document.getElementById("membersTable");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        row = table.rows[i];

        //row.addEventListener("click", showModal);
    }
    //}
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