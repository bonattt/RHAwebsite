const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

function parseModalEntries(idHeader, ids) {
    var json_obj = {};
    ids.forEach(function(id) {
        var entry = document.getElementById(idHeader + id);
        json_obj[id] = entry.value;
    });
    return json_obj;
}

function clearModalEntries(idHeader, ids) {
    ids.forEach(function(id) {
        var entry = document.getElementById(idHeader + id);
        entry.value = '';
    });
}

function prepEventName(str) {
    str = str.toLowerCase();
    return str.replace(/ /g, '');
}

function setupButtons() {
    var addPaymentButton = document.getElementById("addPaymentButton");
    addPaymentButton.setAttribute('data-toggle', 'modal');
    addPaymentButton.setAttribute('data-target', '#paymentModal');

    var addPaymentSubmit = document.getElementById('paymentModal-submit');
    addPaymentSubmit.addEventListener('click', function() {
        var entryIds = [
                'amountUsed', 'accountCode', 'receiver', 'description',
                'dateProcessed', 'dateReceived'
        ];
        var modalId = 'paymentModal-';
        var json_obj = parseModalEntries(modalId, entryIds);

        json_obj.dateProcessed = new Date(json_obj.dateProcessed);
        json_obj.dateReceived = new Date(json_obj.dateReceived);
        var select = document.getElementById('paymentModal-event');
        console.log(select.value);
        console.log(select.dataset);
        json_obj.proposal_id = select.dataset[prepEventName(select.value)]
        json_obj.reciepts = {"test1": "hello", "test2": "world!"};

        var apiUrl = '???';
        var xhr = xhrPostRequest(apiUrl);
        xhr.onload = function() {alert('successfully sent!');}
        xhr.send(JSON.stringify(json_obj));
        alert(JSON.stringify(json_obj));
        //clearModalEntries(modalId, entryIds);
    });

    return;

    var addChargeButton = document.getElementById("addChargeButton");
    addChargeButton.setAttribute('data-toggle', 'modal');
    addChargeButton.setAttribute('data-target', '#chargeModal');

    var addChargeSubmit = document.getElementById('chargeModal-submit');
    addChargeSubmit.addEventListener('click', function() {
        var entryIds = ['funds_hall', 'funds_amount', 'event', 'turnin_date', 'processed_date'];
        var modalId = 'chargeModal-'
        var json_obj = parseModalEntries(modalId, entryIds);
        var apiUrl = '???';
        var xhr = xhrPostRequest(apiUrl);
        xhr.onload = function() {alert('success!')}
        // xhr.send(JSON.stringify(json_obj));
        clearModalEntries(modalId, entryIds);
    });

    var addAwardButton = document.getElementById("addAwardButton");
    addAwardButton.setAttribute('data-toggle', 'modal');
    addAwardButton.setAttribute('data-target', '#awardModal');

    var addAwardSubmit = document.getElementById('awardModal-submit');
    addAwardSubmit.addEventListener('click', function() {
        var entryIds = ['funds_hall','funds_amount','event','turnin_date','processed_date'];
        var modalId = 'awardModal-';
        var json_obj = parseModalEntries(modalId, entryIds);
        var apiUrl = '???';
        var xhr = xhrPostRequest(apiUrl);
        xhr.onload = function() {alert('success!')}
        // xhr.send(JSON.stringify(json_obj));
        clearModalEntries(modalId, entryIds);
    });
}

function populatePaymentsTable() {
    var xhr = xhrGetRequest('payments/');
    var tbody = document.getElementById('paymentsTable');
    xhr.onload = function() {
        var payments = JSON.parse(xhr.responseText);
        payments.forEach(function(entry) {
            var row = buildPaymentColumn(entry);
            tbody.appendChild(row);
        });
    }
    xhr.send();
}

function buildPaymentColumn(payment) {
    var row = document.createElement('tr');

//    var col = document.createElement('td');
//    col.appendChild(document.createTextNode(payment.expenses_id));
//    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(payment.proposal_id));
    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(payment.cm));
    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(payment.receiver));
    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(payment.amountused));
    row.appendChild(col);

//    col = document.createElement('td');
//    col.appendChild(document.createTextNode(payment.description));
//    row.appendChild(col);
//
//    col = document.createElement('td');
//    col.appendChild(document.createTextNode(payment.accountcode));
//    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(composeDateStr(payment.datereceived)));
    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(composeDateStr(payment.dateprocessed)));
    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(payment.reciepts));
    row.appendChild(col);

    return row;
}

function composeDateStr(dateStr) {
    var msg = '';
    var date = new Date(dateStr);
    msg += monthNames[date.getMonth()]
    msg += ' ';
    msg += date.getDate();
    msg += ', ';
    msg += date.getFullYear();
    return msg;
}

function setAdmin() {
    setupButtons();
    populatePaymentsTable();
}

function setup() {
    var officersxhr = getOfficers();
    officersxhr.onload = function () {
        if (userIsOfficer(officersxhr.responseText)) {
            setAdmin(officersxhr.responseText);
        } else {
            alert('you should need to login...');
        }
    };
    officersxhr.send();
}

$(document).ready(function () {
    setup();
});