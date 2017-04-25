const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

var gridData = [{
        "amount": 0.0,
        "date": new Date()
    },
    {
        "amount": 0.0,
        "date": new Date()
    },
    {
        "amount": 0.0,
        "date": new Date()
    },
    {
        "amount": 0.0,
        "date": new Date()
    },
    {
        "amount": 0.0,
        "date": new Date()
    },
    {
        "amount": 0.0,
        "date": new Date()
    }
]

var current_id = -1;

function parseModalEntries(idHeader, ids) {
    var json_obj = {};
    ids.forEach(function (id) {
        var entry = document.getElementById(idHeader + id);
        json_obj[id] = entry.value;
    });
    return json_obj;
}

function prepEventName(str) {
    str = str.toLowerCase();
    return str.replace(/ /g, '');
}

function setupEventSelector() {
    console.log('setupEventSelector');
    var apiExtension = 'allEvents/';
    var xhr = xhrGetRequest(apiExtension);
    xhr.onload = function () {
        var selector = document.getElementById('paymentModal-event');
        var eventList = JSON.parse(xhr.responseText)
        console.log(eventList);
        eventList.forEach(function (event) {
            console.log('adding ' + event.proposal_name);
            var option = document.createElement('option');
            option.setAttribute('id', 'eventOption' + event.proposal_id);
            option.setAttribute('value', event.proposal_id);
            option.innerHTML = event.proposal_name;
            selector.appendChild(option);
        });
    }
    xhr.send();
}

function setupButtons() {
    var addPaymentButton = document.getElementById("addPaymentButton");
    addPaymentButton.setAttribute('data-toggle', 'modal');
    addPaymentButton.setAttribute('data-target', '#paymentModal');

    var addPaymentSubmit = document.getElementById('paymentModal-submit');
    addPaymentSubmit.addEventListener('click', function () {
        document.getElementById('modal-header').click();
        var entryIds = [
            'amountUsed', 'CM', 'receiver', 'description', 'dateprocessed', 'datereceived'
        ];
        var modalId = 'paymentModal-';
        var json_obj = parseModalEntries(modalId, entryIds);

        json_obj.accountCode = document.getElementById('paymentModal-accountCode').innerHTML || 0.0;
        json_obj.dateprocessed = new Date(json_obj.dateprocessed);
        json_obj.datereceived = new Date(json_obj.datereceived);
        var select = document.getElementById('paymentModal-event');
        json_obj.proposal_id = select.dataset[prepEventName(select.value)]

        /* parse through the table to insert dates*/
        var grid = $("#receiptsGrid").swidget();
        var receiptsObject = [];
        for (var i = 0; i < grid.contentTable[0].rows.length; i++) {
            var currentRow = grid.contentTable[0].rows[i];
            var dateText = currentRow.childNodes[1].innerHTML;
            if (dateText != "Add a date") {
                var dateArray = currentRow.childNodes[1].innerHTML.split('/');
                var dateToSend = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1];
                gridData[i].date = dateToSend;
                if (gridData[i].amount != 0) {
                    receiptsObject.push(gridData[i]);
                }
            }
        }
        json_obj.receipts = {
            "receipts": receiptsObject
        };


        json_obj.proposal_id = select.options[select.selectedIndex].value;

        json_obj.amountUsed = parseFloat(json_obj.amountUsed);

        var apiUri = 'payment/';
        var xhr = xhrPostRequest(apiUri);
        xhr.onload = function () {
            location.reload();
        }
        xhr.onerror = function () {}
        xhr.send(JSON.stringify(json_obj));
    });

    var deletePaymentButton = document.getElementById('detailsModal-delete');
    deletePaymentButton.addEventListener('click', function (e) {
        $('#deleteExpenseConfirmationModal').modal();
    });

    var deletePaymentButtonConfirm = document.getElementById('deleteExpense-confirm');
    deletePaymentButtonConfirm.addEventListener('click', function () {
        var apiUri = 'payment/' + current_id;
        var xhr = xhrDeleteRequest(apiUri);
        xhr.onload = function () {
            location.reload();
        }
        xhr.send();
    });

    var updatePaymentButton = document.getElementById('detailsModal-confirm');
    updatePaymentButton.addEventListener('click', function () {
        document.getElementById('modal-header').click();
        var apiUri = 'payment/' + current_id;
        var xhr = xhrPutRequest(apiUri);
        var receiptsObject = [];
        var total = 0.0;
        var descText = document.getElementById('detailsModal-description').value;
        var grid = $("#receiptsDetailGrid").swidget();
        for (var i = 0; i < grid.contentTable[0].rows.length; i++) {
            var currentRow = grid.contentTable[0].rows[i];
            var dateText = currentRow.childNodes[1].innerHTML;
            if (dateText != "Add a date") {
                var dateArray = currentRow.childNodes[1].innerHTML.split('/');
                var dateToSend = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1];
                gridData[i].date = dateToSend;
                if (gridData[i].amount != 0) {
                    receiptsObject.push(gridData[i]);
                    total += parseFloat(gridData[i].amount);
                }
            }
        }

        var json_obj = {
            "receipts": {
                "receipts": receiptsObject
            },
            "amountused": total,
            "description": descText
        }
        xhr.onload = function () {
            location.reload();
        }
        xhr.send(JSON.stringify(json_obj));
    });

    var editSubmit = document.getElementById('confirm-confirm');
    editSubmit.addEventListener('click', function () {
        var apiUri = 'fund/' + current_id
        var xhr = xhrPutRequest(apiUri);
        xhr.onload = function () {}

        var funds_amount = document.getElementById('editFundModal-funds_amount');

        var json_obj = {
            "funds_amount": parseFloat(funds_amount.value)
        }
        xhr.send(JSON.stringify(json_obj));
        location.reload();
    });

    var cancelFinalChanges = document.getElementById('finalChanges-cancel');
    cancelFinalChanges.addEventListener('click', function() {
        $('#detailsModal-processedCheck').attr('checked', false);
    });

    var confirmFinalChanges = document.getElementById('finalChanges-confirm');
    confirmFinalChanges.addEventListener('click', function() {
        document.getElementById('detailsModal-processedDate').disabled = false;
    });
}

function populateFundsTable() {
    var xhr = xhrGetRequest('funds/');
    var tbody = document.getElementById('fundsTable');
    var rowNumber = 0;
    xhr.onload = function () {
        var payments = JSON.parse(xhr.responseText);
        payments.forEach(function (entry) {
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
    xhr.onload = function () {
        var payments = JSON.parse(xhr.responseText)
        populatePaymentsTableHelper(payments, rowNumber, tbody);
    }
    xhr.send();
}

function populatePaymentsTableHelper(payments, rowNumber, tbody) {
    var xhr = xhrGetRequest('allEvents/');
    xhr.onload = function () {
        var allEvents = JSON.parse(xhr.responseText);
        payments.forEach(function (pay) {
            var proposal_name = '[event was deleted]';
            allEvents.forEach(function (event) {
                if (event.proposal_id == pay.proposal_id) {
                    proposal_name = event.proposal_name;
                }
            });
            var row = buildPaymentRow(pay, proposal_name, rowNumber);
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

    editButton.addEventListener('click', function () {
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

function buildPaymentRow(payment, proposal_name, rowNumber) {
    var col;
    var keys = ['cm', 'receiver']

    var row = document.createElement('tr');
    var col = document.createElement('td');
    row.appendChild(col);

    row.setAttribute('id', 'row' + rowNumber);
    var colNumber = 0;
    col = document.createElement('td');

    col.appendChild(document.createTextNode(proposal_name));
    col.setAttribute('class', 'tableEntry');
    col.setAttribute('id', 'row' + rowNumber + 'col' + 0);
    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(payment.cm));
    col.setAttribute('class', 'tableEntry');
    col.setAttribute('id', 'row' + rowNumber + 'col' + 1);
    row.appendChild(col);

    col = document.createElement('td');
    col.appendChild(document.createTextNode(payment.receiver));
    col.setAttribute('class', 'tableEntry');
    col.setAttribute('id', 'row' + rowNumber + 'col' + 2);
    row.appendChild(col);

    //    var row = buildRow(payment, keys, rowNumber);


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
    row.appendChild(getDisplayExpenseDetailsLink(payment, rowNumber));
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

    link.addEventListener('click', function () {
        $("#receiptsDetailGrid").empty();

        current_id = json_obj.expenses_id;
        var description = document.getElementById('detailsModal-description');
        description.value = json_obj.description;

        var accountCode = document.getElementById('detailsModal-accountcode');
        accountCode.value = json_obj.accountcode;

        var receiptList = json_obj.receipts.receipts;
        var processedCheck = document.getElementById('detailsModal-processedCheck');
        var processedDate = document.getElementById('detailsModal-processedDate');
        processedDate.disabled = true;

        if (json_obj.dateprocessed) {
            processedDate.value = json_obj.dateprocessed;
            processedCheck.checked = true;
            processedCheck.disabled = true;
            description.disabled = true;
            accountCode.disabled = true;
            //Buttons
            document.getElementById('detailsModal-delete').disabled = true;
            document.getElementById('detailsModal-confirm').disabled = true;
            $("#receiptsDetailGrid").shieldGrid({
                dataSource: {
                    data: receiptList,
                    schema: {
                        fields: {
                            amount: {
                                path: "amount",
                                type: String
                            },
                            date: {
                                path: "date",
                                type: Date
                            }
                        }
                    }
                },
                columns: [{
                        field: "amount",
                        title: "Amount",
                        format: function (value) {
                            if (value == null || value == 0 || isNaN(value)) {
                                return 'Add an amount'
                            } else {
                                return "$" + parseFloat(value).toFixed(2);
                            }
                        },
                        width: "10px"
                    },
                    {
                        field: "date",
                        title: "Date",
                        format: function (value) {
                            var today = new Date();
                            var day = value.getDate();
                            var month = value.getMonth() + 1;
                            var year = value.getFullYear();
                            var date = month + '/' + day + '/' + year;
                            if (day == today.getDate() &&
                                month == today.getMonth() + 1 &&
                                year == today.getFullYear()) {
                                return 'Add a date';
                            } else {
                                return date;
                            }
                        },
                        type: Date,
                        width: "20px"
                    }
                ],
                editing: {
                    enabled: false
                }
            });

        } else {
            for (var i = 0; i < gridData.length; i++) {
                if (receiptList[i] != null) {
                    gridData[i] = receiptList[i];
                }
            }
            $("#receiptsDetailGrid").shieldGrid({
                dataSource: {
                    data: gridData,
                    schema: {
                        fields: {
                            amount: {
                                path: "amount",
                                type: String
                            },
                            date: {
                                path: "date",
                                type: Date
                            }
                        }
                    }
                },
                events: {
                    save: function (e) {
                        updateTotal("#receiptsDetailGrid");
                    }
                },
                rowHover: false,
                columns: [{
                        field: "amount",
                        title: "Amount",
                        format: function (value) {
                            if (value == null || value == 0 || isNaN(value)) {
                                return 'Add an amount'
                            } else {
                                return "$" + parseFloat(value).toFixed(2);
                            }
                        },
                        width: "10px"
                    },
                    {
                        field: "date",
                        title: "Date",
                        format: function (value) {
                            var today = new Date();
                            var day = value.getDate();
                            var month = value.getMonth() + 1;
                            var year = value.getFullYear();
                            var date = month + '/' + day + '/' + year;
                            if (day == today.getDate() &&
                                month == today.getMonth() + 1 &&
                                year == today.getFullYear()) {
                                return 'Add a date';
                            } else {
                                return date;
                            }
                        },
                        type: Date,
                        width: "20px"
                    }
                ],
                editing: {
                    enabled: true,
                    event: "click",
                    type: "cell",
                    insertNewRowAt: "pagebottom"
                }
            });

            $('#detailsModal-processedCheck').on('change', function (e) {
                if(e.target.checked) {
                    $('#finalChangesConfirmationModal').modal();
                } else {
                    processedDate.disabled = true;
                    processedDate.value = null;
                }
            })
        }
    });

    return link;
}

function buildRow(data, keys, rowNumber) {
    var row = document.createElement('tr');
    var col = document.createElement('td');
    row.appendChild(col);

    row.setAttribute('id', 'row' + rowNumber);
    var colNumber = 0;

    keys.forEach(function (key) {
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
    setupEventSelector();
}

function updateTotal(gridToUpdate) {
    var grid = $(gridToUpdate).swidget();
    var totalInput = document.getElementById('paymentModal-amountUsed');
    var total = 0.0;

    for (var i = 0; i < grid.contentTable[0].rows.length; i++) {
        var currentRow = grid.contentTable[0].rows[i];
        var currentNum;
        if (currentRow.childNodes[0].childNodes[0].data == null) {
            currentNum = parseFloat(currentRow.childNodes[0].childNodes[0].value);
        } else {
            currentNum = parseFloat(currentRow.childNodes[0].childNodes[0].data.substring(1));
        }
        if (!isNaN(currentNum)) {
            total += parseFloat(currentNum);
            gridData[i].amount = currentNum;
        } else {
            currentRow.childNodes[0].childNodes[0].value = gridData[i].amount;
        }
    }
    totalInput.value = total.toFixed(2).toString();
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
    $("#processedDate").datepicker();
    $("#paymentModal-datereceived").datepicker();
    $('#paymentModal-dateprocessed').datepicker();

    $("#receiptsGrid").shieldGrid({
        dataSource: {
            data: gridData,
            schema: {
                fields: {
                    amount: {
                        path: "amount",
                        type: String
                    },
                    date: {
                        path: "date",
                        type: Date
                    }
                }
            }
        },
        events: {
            save: function (e) {
                updateTotal("#receiptsGrid");
            }
        },
        rowHover: false,
        columns: [{
                field: "amount",
                title: "Amount",
                format: function (value) {
                    if (value == null || value == 0 || isNaN(value)) {
                        return 'Add an amount'
                    } else {
                        return "$" + parseFloat(value).toFixed(2);
                    }
                },
                width: "10px"
            },
            {
                field: "date",
                title: "Date",
                format: function (value) {
                    var today = new Date();
                    var day = value.getDate();
                    var month = value.getMonth() + 1;
                    var year = value.getFullYear();
                    var date = month + '/' + day + '/' + year;
                    if (day == today.getDate() &&
                        month == today.getMonth() + 1 &&
                        year == today.getFullYear()) {
                        return 'Add a date';
                    } else {
                        return date;
                    }
                },
                type: Date,
                width: "20px"
            }
        ],
        editing: {
            enabled: true,
            event: "click",
            type: "cell",
            insertNewRowAt: "pagebottom"
        }
    });
});