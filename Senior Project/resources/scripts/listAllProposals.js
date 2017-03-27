

const FIELDS = [
        "proposal_name",
        "money_requested",
        "money_allocated",
//            "proposed_date",
//            "event_date",
        "week_proposed",
        "quarter_proposed",
        "proposer",
        "description",
        "cost_to_attendee",
        "max_attendance",
    ]

const BROWSER = (function(){
    // Code snippet from Stack Overflow
    // http://stackoverflow.com/questions/2400935/browser-detection-in-javascript
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})().toLowerCase();


var body = document.getElementsByTagName('body')[0];
var tables = new Array();

var last_proposal_clicked = -1;

function displayProposals(isAdmin) {
    var xhr = getEvents();
    xhr.onload = function () {
        var proposals = JSON.parse(xhr.responseText);
        var startingYear = 2015;
        var proposalsForCurrentYear = new Array();
        for (var i = proposals.length - 1; i >= 0; i--) {
            var proposedDate = new Date(proposals[i].proposed_date);
            if (proposedDate.getFullYear() == (startingYear + 1) && proposedDate.getMonth() > 6) {
                var paragraph = startingYear.toString();
                paragraph = document.createElement('p');
                paragraph.innerText = startingYear + "-" + (startingYear + 1);
                paragraph.setAttribute('class', 'yearTextListProposals');
                body.appendChild(paragraph);
                drawTable(proposalsForCurrentYear.reverse(), isAdmin);
                proposalsForCurrentYear = new Array();
                startingYear++;
            }
            proposalsForCurrentYear.push(proposals[i]);
        }
        var paragraph = startingYear.toString();
        paragraph = document.createElement('p');
        paragraph.innerText = startingYear + "-" + (startingYear + 1);
        paragraph.setAttribute('class', 'yearTextListProposals');
        body.appendChild(paragraph);
        drawTable(proposalsForCurrentYear.reverse(), isAdmin);
    }
    xhr.send();
}

function createColumnHead(name) {
    var newTd = document.createElement('td');
    newTd.setAttribute('align', 'middle');
    newTd.setAttribute('width', 200);
    newTd.innerHTML = '<b>' + name + '</b>';
    newTd.dataset.toggle = "modal";
    newTd.dataset.target = "#infoModal";
    return newTd;
}

function createTableRow(index, proposal, isAdmin) {
    var tr = document.createElement('tr');
    tr.setAttribute('proposal', index);
    //doClosure(members, index);
    if (index % 2 == 0) {
        tr.setAttribute('bgcolor', '#f0f0f0');
    }
    for (attr in proposal) {
        tr.dataset[attr] = proposal[attr];
    }
    return tr
}

function drawTable(proposals, isAdmin) {
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
    tbdy.appendChild(createColumnHead("Paid"));
    tbdy.appendChild(createColumnHead("Event Date"));
    tbdy.appendChild(createColumnHead("Proposed Date"));
    tbdy.appendChild(createColumnHead("Proposed Quarter"));
    tbdy.appendChild(createColumnHead("Proposed Week"));

    for (var i = proposals.length - 1; i >= 0; i--) {
        var tr = createTableRow(i, proposals[i]);
        var id = proposals[i].proposal_id
        if (isAdmin) {
            console.log("adding listener " + id);
            addRowListener(tr, proposals[i]);
        }
        else {console.log("not adding listener " + id)}
        var tdname = document.createElement('td');
        tdname.innerHTML = proposals[i].proposal_name;
        tdname.setAttribute("id", "proposal_name" + id);

        var tddate = document.createElement('td');
        var eventDate = new Date(proposals[i].event_date);
        eventDate = (eventDate.getMonth() + 1) + "/" + eventDate.getUTCDate() + "/" + eventDate.getFullYear();
        tddate.innerHTML = eventDate;
        tddate.setAttribute("id", "event_date" + id);

        var tdProposedDate = document.createElement('td');
        var proposedEventDate = new Date(proposals[i].proposed_date);
        proposedEventDate = (proposedEventDate.getMonth() + 1) + "/" + proposedEventDate.getUTCDate() + "/" + proposedEventDate.getFullYear();
        tdProposedDate.innerHTML = proposedEventDate;
        tdProposedDate.setAttribute("id", "proposed_date" + id);

        tdweek = document.createElement('td');
        tdweek.innerHTML = proposals[i].week_proposed;
        tdweek.setAttribute("id", "week_proposed" + id);

        var tdquarter = document.createElement('td');
        tdquarter.innerHTML = proposals[i].quarter_proposed;
        tdquarter.setAttribute("id", "quarter_proposed" + id);

        var tdrequested = document.createElement('td');
        tdrequested.innerHTML = "$" + proposals[i].money_requested;
        tdrequested.setAttribute("id", "money_requested" + id);

        var tdallocated = document.createElement('td');
        tdallocated.innerHTML = "$" + proposals[i].money_allocated;
        tdallocated.setAttribute("id", "money_allocated" + id);

        var tdpaid = document.createElement('td');
        tdpaid.innerHTML = proposals[i].paid;
        tdpaid.setAttribute("id", "paid" + id);

        var tdreserve = document.createElement('td');
        var tdused = document.createElement('td');

        doClosure(proposals, i, tdused, tdreserve);
        tr.appendChild(tdname);
        tr.appendChild(tdrequested);
        tr.appendChild(tdallocated);
        tr.appendChild(tdreserve);
        tr.appendChild(tdused);
        tr.appendChild(tdpaid);
        tr.appendChild(tddate);
        tr.appendChild(tdProposedDate);
        tr.appendChild(tdquarter);
        tr.appendChild(tdweek);
        tbdy.appendChild(tr);
    }
    table.appendChild(tbdy);
    body.appendChild(table);
}

function addRowListener(tr, proposal) {
    var id = proposal.proposal_id;
    tr.setAttribute('data-toggle', 'modal');
    tr.setAttribute('data-target', '#proposalModal');
    tr.addEventListener('click', function() {
        last_proposal_clicked = id;
        var entry;
        FIELDS.forEach(function (attr){
            console.log(attr);
            var entry = document.getElementById('proposalModal-' + attr);
            entry.value = proposal[attr];
        });
        unMarshalDates(proposal);
        document.getElementById('proposalModal-paid').checked = proposal.paid;
    });
}

function unMarshalDates(proposal) {
    var proposed_date = document.getElementById('proposalModal-proposed_date');
    var event_date = document.getElementById('proposalModal-event_date');
    var event_signup_open = document.getElementById('proposalModal-event_signup_open');
    var event_signup_close = document.getElementById('proposalModal-event_signup_close');
    if (BROWSER.includes("chrome")) {
        proposed_date.value = unMarshalHtml5(proposal.proposed_date);
        event_date.value = unMarshalHtml5(proposal.event_date);
        event_signup_open.value = unMarshalHtml5(proposal.event_signup_open);
        event_signup_close.value = unMarshalHtml5(proposal.event_signup_close);

//    } else if (BROWSER.includes("firefox")) {
    } else {
        proposed_date.value = proposal.proposed_date;
        event_date.value = proposal.event_date;
        event_signup_open.value = proposal.event_signup_open;
        event_signup_close.value = proposal.event_signup_close;
    }
}

function marshalDates(json_data) {
    var entry = document.getElementById('proposalModal-proposed_date');
    var date = new Date(entry.value);
    json_data.proposed_date = date;

    entry = document.getElementById('proposalModal-event_date');
    date = new Date(entry.value);
    json_data.event_date = date;

    entry = document.getElementById('proposalModal-event_signup_open');
    date = new Date(entry.value);
    json_data.event_signup_open = date;

    entry = document.getElementById('proposalModal-event_signup_close');
    date = new Date(entry.value);
    json_data.event_signup_close = date;

}

function unMarshalHtml5(dateStr) {
    var date = new Date(dateStr);
    var msg = date.getFullYear();
    msg += '-';
    var month = date.getMonth();
    if (month < 10) {month = "0" + month}
    msg += month;
    msg += '-'
    var day = date.getDate();
    if (day < 10) {day = "0" + day}
    msg += day;
    console.log("in: " + dateStr);
    console.log("Unmarshaled date: "  + msg);
    return msg
}

function doClosure(proposal, i, tdused, tdreserve) {
    var urlExtensionUsed = 'getMoneyUsed';
    var xhrUsed = createXhrRequestJSON('POST', urlExtensionUsed);
    xhrUsed.onload = function () { setValues(xhrUsed.responseText, tdused, tdreserve, proposal, i) };
    xhrUsed.send(JSON.stringify({ proposal_id: proposal[i].proposal_id }));
}

function setValues(used, tdused, tdreserve, proposal, i) {
    used = JSON.parse(used);
    var usedVal = used[0].get_money_used;
    tdused.innerHTML = "$" + (Math.round(usedVal*100) / 100);
    var reserve = proposal[i].money_allocated - used[0].get_money_used;
    tdreserve.innerHTML = "$" + (Math.round(reserve*100) / 100);
}

function getEvents() {
    var url = BASE_API_URL + 'allEvents/';
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
        var id = last_proposal_clicked;

        var json_data = {}
        FIELDS.forEach(function(attr) {
            var entry = document.getElementById('proposalModal-' + attr);
            console.log('proposalModal-' + attr);
            json_data[attr] = entry.value;
        });
        json_data.paid = document.getElementById('proposalModal-paid').checked;
        marshalDates(json_data);



//        json_data.description = "hello, I am a description";

        var apiUri = 'events/' + id;
        var xhr = xhrPutRequest(apiUri);
        xhr.onload = function() {
            location.reload();
        }
        console.log(json_data);
        alert(JSON.stringify(json_data));
        removeNullValues(json_data);
        console.log(json_data);
        xhr.send(JSON.stringify(json_data));
    });

    var deleteBtn = document.getElementById("deleteConfirmModal-delete");
    deleteBtn.addEventListener('click', function() {
        var apiUri = 'event/' + last_proposal_clicked;
        var xhr = xhrDeleteRequest(apiUri);
        xhr.onload = function() {
            location.reload();
        }
        xhr.send();
    });
}

function removeNullValues(json_data) {
    for (attr in json_data) {
        if (json_data == null) {
            delete json_data[attr];
        }
    }
}


$(document).ready(function () {
    console.log(BROWSER);
    var officersxhr = getOfficers();
    officersxhr.onload = function () {
        var isAdmin = false;
        if (userIsOfficer(officersxhr.responseText)) {
            isAdmin = true;
            setupModalButtons();
        }
        displayProposals(isAdmin);
    };
    officersxhr.send();
});