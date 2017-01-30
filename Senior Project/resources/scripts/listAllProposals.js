var apiURL = "http://rha-website-1.csse.rose-hulman.edu:3000/";
var body = document.getElementsByTagName('body')[0];
var table = document.createElement('table');
var tbdy = document.createElement('tbody');
var tdName = document.createElement('td');
var tdRequested = document.createElement('td');
var tdBudgeted = document.createElement('td');
var tdreserve = document.createElement('td');
var tdused = document.createElement('td');
var tdIsOpen = document.createElement('td');
var tdQuarter = document.createElement('td');
var tdDate = document.createElement('td');
var countForColoring = 0;


function displayPastProposals() {
    var xhr = getEvents();
    xhr.onload = function () {
        createHTMLFromResponseText(xhr.responseText)
    }
    xhr.send();

    function createHTMLFromResponseText(proposal) {
        proposal = JSON.parse(proposal);
        for (var i = proposal.length - 1; i >= 0; i--) {
            tr = document.createElement('tr');
            tr.setAttribute('proposal', i);
            tr.setAttribute('data-toggle', 'modal');
            tr.setAttribute('data-target', '#myModal');
            //doClosure(members, i);
            if (countForColoring % 2 == 0) {
                tr.setAttribute('bgcolor', '#f0f0f0');
            }
            countForColoring++;

            var td = document.createElement('td');
            td.innerHTML = proposal[i].proposal_name;

            var td2 = document.createElement('td');
            td2.innerHTML = proposal[i].event_date;
            tr.appendChild(td);
            tr.appendChild(td2);
            tbdy.appendChild(tr);
        }
        table.appendChild(tbdy);
        body.appendChild(table);
    }

    function getEvents() {
        var url = apiURL + 'api/v1/pastevents';
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
}

function displayUpcomingProposals() {
    var xhr = getEvents();
    xhr.send();
    setTimeout(function () { createHTMLFromResponseText(xhr.responseText) }, 300);

    function createHTMLFromResponseText(proposal) {
        proposal = JSON.parse(proposal);
        var editButtons = [];

        for (var i = 0; i < proposal.length; i++) {
            console.log(proposal[i]);
            tr = document.createElement('tr');
            tr.setAttribute('proposal', i);
            tr.setAttribute('data-toggle', 'modal');
            tr.setAttribute('data-target', '#myModal');
            //doClosure(members, i);
            if (countForColoring % 2 == 0) {
                tr.setAttribute('bgcolor', '#f0f0f0');
            }
            countForColoring++;

            var td = document.createElement('td');
            td.innerHTML = proposal[i].proposal_name;

            var td2 = document.createElement('td');
            td2.innerHTML = proposal[i].event_date;

            var td3 = document.createElement('td');
            td3.innerHTML = proposal[i].money_requested;

            var td4 = document.createElement('td');
            td4.innerHTML = proposal[i].money_allocated;

            var td5 = document.createElement('td');
            td5.innerHTML = proposal[i].event_date;

            var td6 = document.createElement('td');
            td6.innerHTML = proposal[i].event_date;

            var td7 = document.createElement('td');
            td7.innerHTML = proposal[i].event_date;

            var td8 = document.createElement('td');
            td8.innerHTML = proposal[i].event_date;

            var td9 = document.createElement('td');
            td9.innerHTML = proposal[i].quarter_proposed;
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td9);
            tbdy.appendChild(tr);
        }
        table.appendChild(tbdy);
        body.appendChild(table);
    }

    var officersxhr = getOfficers();
    officersxhr.send();

    function getEvents() {
        var url = apiURL + 'api/v1/events';
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
}

$(document).ready(function () {
    displayPastProposals();
    displayUpcomingProposals();
table.innerHTML = "";
table.setAttribute('border', 1);
table.setAttribute('align', 'center');
table.setAttribute('bordercolor', '#808080');
table.setAttribute('id', 'proposalsTable');

tdName.setAttribute('align', 'middle');
tdName.setAttribute('width', 200);
tdName.innerHTML = "Name";

tdRequested.setAttribute('align', 'middle');
tdRequested.setAttribute('width', 200);
tdRequested.innerHTML = "Amount Requested";

tdBudgeted.setAttribute('align', 'middle');
tdBudgeted.setAttribute('width', 200);
tdBudgeted.innerHTML = "Amount Budgeted";

tdreserve.setAttribute('align', 'middle');
tdreserve.setAttribute('width', 200);
tdreserve.innerHTML = "Reserve";

tdused.setAttribute('align', 'middle');
tdused.setAttribute('width', 200);
tdused.innerHTML = "Used";

tdIsOpen.setAttribute('align', 'middle');
tdIsOpen.setAttribute('width', 200);
tdIsOpen.innerHTML = "Is Open";

tdDate.setAttribute('align', 'middle');
tdDate.setAttribute('width', 200);
tdDate.innerHTML = "Date";

tdQuarter.setAttribute('align', 'middle');
tdQuarter.setAttribute('width', 200);
tdQuarter.innerHTML = "Quarter";

tbdy.appendChild(tdName);
tbdy.appendChild(tdRequested);
tbdy.appendChild(tdBudgeted);
tbdy.appendChild(tdreserve);
tbdy.appendChild(tdused);
tbdy.appendChild(tdIsOpen);
tbdy.appendChild(tdDate);
tbdy.appendChild(tdQuarter);
});