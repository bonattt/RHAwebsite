

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

function setupButtons() {
    var addPaymentButton = document.getElementById("addPaymentButton");
    addPaymentButton.setAttribute('data-toggle', 'modal');
    addPaymentButton.setAttribute('data-target', '#paymentModal');

    var addPaymentSubmit = document.getElementById('paymentModal-submit');
    addPaymentSubmit.addEventListener('click', function() {
        var entryIds = ['funds_amount', 'username', 'event', 'cm', 'turnin_date', 'processed_date'];
        var modalId = 'paymentModal-';
        var json_obj = parseModalEntries(modalId, entryIds);
        var apiUrl = '???';
        var xhr = xhrPostRequest(apiUrl);
        xhr.onload = function() {alert('successfully sent!');}
        // xhr.send(JSON.stringify(json_obj));
        clearModalEntries(modalId, entryIds);
    });

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

function setAdmin() {
    setupButtons();
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