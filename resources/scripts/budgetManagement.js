const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

var current_id = -1;

function parseModalEntries(idHeader, ids) {
    var json_obj = {};
    ids.forEach(function(id) {
        console.log("id: " + id + "\nidHeader: " + idHeader);
        var entry = document.getElementById(idHeader + id);
        json_obj[id] = entry.value;
    });
    return json_obj;
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
            location.reload();
        }
        xhr.onerror = function() {
        }
        xhr.send(JSON.stringify(json_obj));
    });

    var deletePaymentButton = document.getElementById('detailsModal-delete');
    deletePaymentButton.addEventListener('click', function() {
        var apiUri = 'payment/'  + current_id;
        var xhr = xhrDeleteRequest(apiUri);
        xhr.onload = function() { location.reload(); }
        xhr.send();
    });

    var editSubmit = document.getElementById('editFundModal-submit');
    editSubmit.addEventListener('click', function() {
        var apiUri = 'fund/' + current_id
        var xhr = xhrPutRequest(apiUri);
        xhr.onload = function() {  }

        var funds_amount = document.getElementById('editFundModal-funds_amount');

        var json_obj = {"funds_amount": parseFloat(funds_amount.value)}
        xhr.send(JSON.stringify(json_obj));
    });
}

function populateFundsTable() {
    var xhr = xhrGetRequest('funds/');
    var tbody = document.getElementById('fundsTable');
    var rowNumber = 0;
    xhr.onload = function() {
        var payments = JSON.parse(xhr.responseText);
        payments.forEach(function(entry) {
            var row = buildFundsRow(entry, rowNumber);
            if (rowNumber % 2 == 1) {
                row.setAttribute('class', 'colLight');
            } else {
                row.setAttribute('class', 'colDark');
            }
            tbody.appendChild(row);
            rowNumber++;
        });
    }
    xhr.send();
}

function populatePaymentsTable() {
    var xhr = xhrGetRequest('payments/');
    var tbody = document.getElementById('paymentsTable');
    var rowNumber = 0;

    xhr.onload = function() {
        var payments = JSON.parse(xhr.responseText);
        payments.forEach(function(entry) {
            var row = buildPaymentRow(entry, rowNumber);
            if (rowNumber % 2 == 1) {
                row.setAttribute('class', 'colLight');
            } else {
                row.setAttribute('class', 'colDark');
            }
            rowNumber++;
            tbody.appendChild(row);
        });
    }
    xhr.send();
}

function buildFundsRow(fund, rowNumber) {
    var col;
    var keys = ['fund_name', 'funds_amount']
    var row = buildRow(fund, keys, rowNumber)

    // add edit button
    col = document.createElement('td');
    var editButton = document.createElement('a');
    editButton.appendChild(document.createTextNode('[edit]'));
    editButton.setAttribute('class', 'tableEntry');
    editButton.setAttribute('id', 'row' + rowNumber + 'edit');

    var data = editButton.dataset;
    data.toggle = "modal";
    data.target = "#editFundModal";

    editButton.addEventListener('click', function() {
        var header = document.getElementById('editFundModal-header');
        header.innerHTML = "Edit " + fund.fund_name + " Fund";

        var funds_amount = document.getElementById('editFundModal-funds_amount');
        funds_amount.value = parseFloat(fund.funds_amount);

        current_id = fund.funds_id;
    });

    col.appendChild(editButton);
    row.appendChild(col);
    return row;
}

function buildPaymentRow(payment, rowNumber) {
    var col;
    var keys = ['proposal_id', 'cm', 'receiver']
    var row = buildRow(payment, keys, rowNumber);

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
    row.appendChild(getDisplayExpenseDetailsLink(payment));
    return row;
}

function getDisplayExpenseDetailsLink(json_obj, rowNumber) {
    var link = document.createElement('a');
    link.appendChild(document.createTextNode('[details]'));
    link.setAttribute('id', 'row' + rowNumber + 'details');
    link.setAttribute('class', 'expenseDetails tableEntry');

    var data = link.dataset;
    data.toggle = "modal"
    data.target = "#detailsModal"

    link.addEventListener('click', function() {
        current_id = json_obj.expenses_id;
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
    var col = document.createElement('td');
    row.appendChild(col);

    row.setAttribute('id', 'row' + rowNumber);
    var colNumber = 0;

    keys.forEach(function(key) {
        col = document.createElement('td');
        col.appendChild(document.createTextNode(data[key]));
        col.setAttribute('class', 'tableEntry');
        col.setAttribute('id', 'row' + rowNumber + 'col' + colNumber);
        row.appendChild(col);
        colNumber++;
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

function unHideAminStuff() {
    var el = document.getElementById("tables");
    el.style.display = "block";

    el = document.getElementById("buttonWrapper");
    el.style.display = "block";
}

function setNotAdmin() {
    var el = document.getElementById("notAdminMsg");
    el.style.display = "block";
}

function setAdmin() {
    unHideAminStuff();
    setupButtons();
    populatePaymentsTable();
    populateFundsTable();
}

function setup() {
    var officersxhr = getOfficers();
    officersxhr.onload = function () {
        if (userIsOfficer(officersxhr.responseText)) {
            setAdmin();
        } else {
            setNotAdmin();
        }
    };
    officersxhr.send();
}

$(document).ready(function () {
    setup();
});