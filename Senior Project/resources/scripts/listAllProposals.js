var apiURL = "http://rha-website-1.csse.rose-hulman.edu:3000/";
var body = document.getElementsByTagName('body')[0];
var tables = new Array();


function displayProposals() {
    var xhr = getEvents();
    xhr.onload = function () {
        createHTMLFromResponseText(xhr.responseText)
    }
    xhr.send();

    function createHTMLFromResponseText(proposal) {
        proposal = JSON.parse(proposal);
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

    function drawTable(proposal) {

        var table = document.createElement('table');
        var tbdy = document.createElement('tbody');
        var tdName = document.createElement('td');
        var tdRequested = document.createElement('td');
        var tdBudgeted = document.createElement('td');
        var tdreserve = document.createElement('td');
        var tdused = document.createElement('td');
        var tdIsOpen = document.createElement('td');
        var tdProposedDate = document.createElement('td');
        var tdQuarter = document.createElement('td');
        var tdWeek = document.createElement('td');
        var tdDate = document.createElement('td');
        var countForColoring = 0;
        table.innerHTML = "";
        table.setAttribute('border', 1);
        table.setAttribute('align', 'center');
        table.setAttribute('bordercolor', '#808080');
        table.setAttribute('class', 'proposalsTable');

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
        tdDate.innerHTML = "Event Date";

        tdProposedDate.setAttribute('align', 'middle');
        tdProposedDate.setAttribute('width', 200);
        tdProposedDate.innerHTML = "Proposed Date";

        tdQuarter.setAttribute('align', 'middle');
        tdQuarter.setAttribute('width', 200);
        tdQuarter.innerHTML = "Proposed Quarter";

        tdWeek.setAttribute('align', 'middle');
        tdWeek.setAttribute('width', 200);
        tdWeek.innerHTML = "Proposed Week";


        tbdy.appendChild(tdName);
        tbdy.appendChild(tdRequested);
        tbdy.appendChild(tdBudgeted);
        tbdy.appendChild(tdreserve);
        tbdy.appendChild(tdused);
        tbdy.appendChild(tdIsOpen);
        tbdy.appendChild(tdDate);
        tbdy.appendChild(tdQuarter);
        tbdy.appendChild(tdWeek);
        tbdy.appendChild(tdProposedDate);

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
            tdreserve.innerHTML = "reserve tbd";

            var tdused = document.createElement('td');
            tdused.innerHTML = "used tbd";

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
}

$(document).ready(function () {
    displayProposals();
});