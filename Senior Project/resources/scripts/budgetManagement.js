const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

function parseModalEntries(idHeader, ids) {
    var json_obj = {};
    ids.forEach(function(id) {
        console.log("id: " + id + "\nidHeader: " + idHeader);
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
                'amountUsed','cm', 'accountCode', 'receiver', 'description',
                'dateProcessed', 'dateReceived'
        ];
        var modalId = 'paymentModal-';
        var json_obj = parseModalEntries(modalId, entryIds);

        json_obj.dateProcessed = new Date(json_obj.dateProcessed);
        json_obj.dateReceived = new Date(json_obj.dateReceived);
        var select = document.getElementById('paymentModal-event');
        json_obj.proposal_id = select.dataset[prepEventName(select.value)]
        json_obj.reciepts = {"test1": "hello", "test2": "world!"};

        json_obj.amountUsed = parseFloat(json_obj.amountUsed);

        var apiUrl = 'payment/';
        var xhr = xhrPostRequest(apiUrl);
        xhr.onload = function() {
            alert('successfully sent!');
        }
        xhr.onerror = function() {
            alert('error sending request!');
        }
        xhr.send(JSON.stringify(json_obj));
        alert(JSON.stringify(json_obj));
        //clearModalEntries(modalId, entryIds);
    });

    var addChargeButton = document.getElementById("addFundButton");
    addChargeButton.setAttribute('data-toggle', 'modal');
    addChargeButton.setAttribute('data-target', '#fundModal');

    var addChargeSubmit = document.getElementById('fundModal-submit');
    addChargeSubmit.addEventListener('click', function() {
        alert('click!');
//        var entryIds = ['funds_hall', 'funds_amount', 'event', 'turnin_date', 'processed_date'];
//        var modalId = 'chargeModal-'
//        var json_obj = parseModalEntries(modalId, entryIds);
//        var apiUrl = '???';
//        var xhr = xhrPostRequest(apiUrl);
//        xhr.onload = function() {alert('success!')}
//        // xhr.send(JSON.stringify(json_obj));
//        clearModalEntries(modalId, entryIds);
    });
}

function populateFundsTable() {
    var xhr = xhrGetRequest('funds/');
    var tbody = document.getElementById('FundsTable');
    xhr.onload = function() {
        var payments = JSON.parse(xhr.responseText);
        payments.forEach(function(entry) {
            console.log(display_on_site);
            console.log(typeof display_on_site);
            if (! entry.display_on_site) {
                return;
            }
            var row = buildFundsRow(entry);
            tbody.appendChild(row);
        });
    }
    xhr.send();
}

function populatePaymentsTable() {
    var xhr = xhrGetRequest('payments/');
    var tbody = document.getElementById('paymentsTable');
    var count = 0;

    xhr.onload = function() {
        var payments = JSON.parse(xhr.responseText);
        payments.forEach(function(entry) {
            var row = buildPaymentRow(entry);
            if (count % 2 == 1) {
                row.setAttribute('class', 'colLight');
            } else {
                row.setAttribute('class', 'colDark');
            }
            count++;
            tbody.appendChild(row);
        });
    }
    xhr.send();
}

function buildFundsRow(fund) {
    var row = document.createElement('tr');
    var col;

    col = document.createElement('td');
    col.appendChild(document.createTextNode(fund.fund_id));
    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(fund.fund_name));
    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(fund.funds_amount));
    row.appendChild(col);

    return row;
}

function buildPaymentRow(payment) {
    var col;
    var keys = ['expenses_id', 'proposal_id', 'cm', 'receiver']
    var row = buildRow(payment, keys);

    // special cases:
    col = document.createElement('td');
    var amount = parseFloat(Math.round(payment.amountused * 100) / 100).toFixed(2);
    col.appendChild(document.createTextNode("$" + amount));
    col.setAttribute('class', 'tableEntry');
    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(composeDateStr(payment.datereceived)));
    col.setAttribute('class', 'tableEntry');
    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(composeDateStr(payment.dateprocessed)));
    col.setAttribute('class', 'tableEntry');
    row.appendChild(col);

//    col = document.createElement('td');
//    col.appendChild(document.createTextNode(payment.reciepts));
//    col.setAttribute('class', 'tableEntry');
//    row.appendChild(col);
    row.appendChild(getDisplayDetailsLink(payment));

    return row;
}

function getDisplayDetailsLink(json_obj, rowNumber) {
    var link = document.createElement('a');
    link.appendChild(document.createTextNode('[details]'));
    link.setAttribute('id', 'row' + rowNumber + 'details');
    link.setAttribute('class', 'expenseDetails');

    var data = link.dataset;
    data.toggle = "modal"
    data.target = "#detailsModal"

    link.addEventListener('click', function() {
        console.log('click');
        var description = document.getElementById('detailsModal-description');
        description.innerHTML = json_obj.description;

        var accountCode = document.getElementById('detailsModal-accountcode');
        accountCode.innerHTML = json_obj.accountcode;

        var reciepts = document.getElementById('detailsModal-reciepts');
        reciepts.innerHTML = JSON.stringify(json_obj.reciepts)
    });

    return link;
}

function buildRow(data, keys, rowNumber) {
    var row = document.createElement('tr');
    var col;

    row.setAttribute('id', 'row' + rowNumber);
    var colNumber = 0;

    keys.forEach(function(key) {
        col = document.createElement('td');
        col.appendChild(document.createTextNode(data[key]));
        col.setAttribute('class', 'tableEntry');
        col.setAttribute('id', 'row' + rowNumber + 'col' + colNumber);
        row.appendChild(col);
    });
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