var apiURL = "http://rha-website-1.csse.rose-hulman.edu:3000/";
var body = document.getElementsByTagName('body')[0];
var tables = new Array();

var last_proposal_clicked = -1;

function displayProposals() {
    var xhr = getEvents();
    xhr.onload = function () {
//        createHTMLFromResponseText(xhr.responseText)
//    }
//
//    function createHTMLFromResponseText(proposal) {
        var proposal = JSON.parse(xhr.responseText);
        var startingYear = 2015;
        var proposalsForCurrentYear = new Array();
        for (var i = proposal.length - 1; i >= 0; i--) {
            var proposedDate = new Date(proposal[i].proposed_date);
            if (proposedDate.getFullYear() == (startingYear + 1) && proposedDate.getMonth() > 6) {
                var paragraph = startingYear.toString();
                paragraph = document.createElement('p');
                paragraph.innerText = startingYear + "-" + (startingYear + 1);
                paragraph.setAttribute('class', 'yearTextListProposals');
                body.appendChild(paragraph);
                drawTable(proposalsForCurrentYear.reverse());
                proposalsForCurrentYear = new Array();
                startingYear++;
            }
            proposalsForCurrentYear.push(proposal[i]);
        }
        var paragraph = startingYear.toString();
        paragraph = document.createElement('p');
        paragraph.innerText = startingYear + "-" + (startingYear + 1);
        paragraph.setAttribute('class', 'yearTextListProposals');
        body.appendChild(paragraph);
        drawTable(proposalsForCurrentYear.reverse());
    }
    xhr.send();
}

function createColumnHead(name) {
    var newTd = document.createElement('td');
    newTd.setAttribute('align', 'middle');
    newTd.setAttribute('width', 200);
    newTd.innerHTML = name;
    return newTd;
}

function createTableRow(index) {
    var tr = document.createElement('tr');
    tr.setAttribute('proposal', index);
    tr.setAttribute('data-toggle', 'modal');
    tr.setAttribute('data-target', '#proposalModal');
    //doClosure(members, index);
    if (index % 2 == 0) {
        tr.setAttribute('bgcolor', '#f0f0f0');
    }
    return tr
}

function drawTable(proposal) {
    var table = document.createElement('table');
    table.innerHTML = "";
    table.setAttribute('border', 1);
    table.setAttribute('align', 'center');
    table.setAttribute('bordercolor', '#808080');
    table.setAttribute('class', 'proposalsTable');
    var tbdy = document.createElement('tbody');

    tbdy.appendChild(createColumnHead("Name"));
    tbdy.appendChild(createColumnHead("Amount Requested"));
    tbdy.appendChild(createColumnHead("Amout Budgeted"));
    tbdy.appendChild(createColumnHead("Reserve"));
    tbdy.appendChild(createColumnHead("Used"));
    tbdy.appendChild(createColumnHead("Is Open"));
    tbdy.appendChild(createColumnHead("Event Date"));
    tbdy.appendChild(createColumnHead("Proposed Date"));
    tbdy.appendChild(createColumnHead("Proposed Quarter"));
    tbdy.appendChild(createColumnHead("Proposed Week"));

    for (var i = proposal.length - 1; i >= 0; i--) {
        var tr = createTableRow(i);
        addModalPopulateListener(tr, proposal[i].proposal_id);

        var tdname = document.createElement('td');
        tdname.innerHTML = proposal[i].proposal_name;

        var tddate = document.createElement('td');
        var eventDate = new Date(proposal[i].event_date);
        eventDate = (eventDate.getMonth() + 1) + "/" + eventDate.getUTCDate() + "/" + eventDate.getFullYear();
        tddate.innerHTML = eventDate;

        tdweek = document.createElement('td');
        tdweek.innerHTML = proposal[i].week_proposed;

        var tdProposedDate = document.createElement('td');
        var proposedEventDate = new Date(proposal[i].proposed_date);
        proposedEventDate = (proposedEventDate.getMonth() + 1) + "/" + proposedEventDate.getUTCDate() + "/" + proposedEventDate.getFullYear();
        tdProposedDate.innerHTML = proposedEventDate;

        var tdquarter = document.createElement('td');
        tdquarter.innerHTML = proposal[i].quarter_proposed;

        var tdrequested = document.createElement('td');
        tdrequested.innerHTML = proposal[i].money_requested;

        var tdallocated = document.createElement('td');
        tdallocated.innerHTML = proposal[i].money_allocated;

        var tdpaid = document.createElement('td');
        tdpaid.innerHTML = proposal[i].paid;

        var tdreserve = document.createElement('td');
        var tdused = document.createElement('td');

        doClosure(proposal, i, tdused, tdreserve);
        tr.appendChild(tdname);
        tr.appendChild(tdrequested);
        tr.appendChild(tdallocated);
        tr.appendChild(tdreserve);
        tr.appendChild(tdused);
        tr.appendChild(tdpaid);
        tr.appendChild(tddate);
        tr.appendChild(tdquarter);
        tr.appendChild(tdweek);
        tr.appendChild(tdProposedDate);
        tbdy.appendChild(tr);
    }
    table.appendChild(tbdy);
    body.appendChild(table);
}

function addModalPopulateListener(tr, proposal_id) {
    tr.addEventListener('click', function() {
        last_proposal_clicked = proposal_id;


    })
}

function doClosure(proposal, i, tdused, tdreserve) {
    var urlExtensionUsed = 'getMoneyUsed';
    var xhrUsed = createXhrRequestJSON('POST', urlExtensionUsed);
    xhrUsed.onload = function () { setValues(xhrUsed.responseText, tdused, tdreserve, proposal, i) };
    xhrUsed.send(JSON.stringify({ proposal_id: proposal[i].proposal_id }));
}

function setValues(used, tdused, tdreserve, proposal, i) {
    used = JSON.parse(used);
    tdused.innerHTML = used[0].get_money_used;
    tdreserve.innerHTML = proposal[i].money_allocated - used[0].get_money_used;
}

function getEvents() {
    var url = apiURL + 'api/v1/allEvents';
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    }
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        throw new Error('CORS not supported');
    }

    xhr.onload = function () {
        var responseText = xhr.responseText;
    }

    xhr.onerror = function () {
        console.log("There was an error");
    }
    return xhr;
}

function setupModalButtons() {
    var submitBtn = document.getElementById("proposalModal-submit");
    submitBtn.addEventListener('click', function() {
        alert("submit " + last_proposal_clicked);
    });

    var deleteBtn = document.getElementById("deleteConfirmModal-delete");
    deleteBtn.addEventListener('click', function() {
        alert("delete " + last_proposal_clicked);
    });
}


$(document).ready(function () {
    displayProposals();
    setupModalButtons();
});