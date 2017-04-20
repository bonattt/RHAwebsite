function setAdmin(officers) {
    if (userIsOfficer(officers)) {
        var addProposalButton = document.getElementById("addProposal");
        addProposalButton.style.display = "block";
    }
}

function setup() {
    var officersxhr = getOfficers();
    officersxhr.send();
    setTimeout(function () { setAdmin(officersxhr.responseText) }, 300);
    var createNewProposal = document.getElementById("addProposal");

    var selector = document.getElementById('quarterProposed');
        var fallOption = document.createElement('option');
        fallOption.setAttribute('value', 'Fall');
        fallOption.innerHTML = 'Fall';
        selector.appendChild(fallOption);

        
        var winterOption = document.createElement('option');
        winterOption.setAttribute('value', 'Winter');
        winterOption.innerHTML = 'Winter';
        selector.appendChild(winterOption);

        
        var springOption = document.createElement('option');
        springOption.setAttribute('value', 'Spring');
        springOption.innerHTML = 'Spring';
        selector.appendChild(springOption);
}

function submit() {
    var photoAPIURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/v1/eventPhoto';
    var photoxhr = new XMLHttpRequest();
    var dbAPIURL = 'http://rha-website-1.csse.rose-hulman.edu:3000/API/v1/proposal';
    var name = document.getElementById("name").value;
    var costToAttendee = document.getElementById("costToAttendee").value;
    var description = document.getElementById("description").value;
    var maxAttendance = document.getElementById("maxAttendance").value;
    var signUpOpenDate = document.getElementById("signUpOpenDate").value;
    var eventDate = document.getElementById("eventDate").value;
    var signUpCloseDate = document.getElementById("signUpCloseDate").value;
    var proposer = document.getElementById("proposer").value;
    var dateProposed = document.getElementById("proposedDate").value;
    var weekProposed = document.getElementById("weekProposed").value;
    var quarter = document.getElementById("quarterProposed").value;
    var moneyRequested = document.getElementById("moneyRequested").value;
    var moneyAllocated = document.getElementById("moneyAllocated").value;
    var files = document.getElementById("imageFile").files;
    if(quarter == 'Fall'){
        quarter = 0;
    } else if(quarter =='Winter'){
        quarter = 1;
    } else{
        quarter = 2;
    }
    alert(quarter);
    if (!name || !costToAttendee || !description || !eventDate || !proposer || !dateProposed || !weekProposed || !quarter || !moneyRequested || !moneyAllocated || files.length == 0) {
        var snackbar = document.getElementById("proposalsSnackbar");
        snackbar.className = "show";
        setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    }

    if (!maxAttendance) {
        maxAttendance = 10000;
    }

    if (signUpCloseDate == "" && signUpOpenDate == "") {
        signUpCloseDate = null;
        signUpOpenDate = null;
    }

    var formData = new FormData();
    formData.append("imageFile", files[0]);
    photoxhr.open('POST', photoAPIURL, true);

    photoxhr.onreadystatechange = function (e) {
        if (photoxhr.readyState == 4 && photoxhr.status == 200) {
            var image_path = JSON.parse(photoxhr.responseText).filepath;
            var dbxhr = new XMLHttpRequest();
            var dbObject = {};
            dbObject["proposal_name"] = name;
            dbObject["cost_to_attendee"] = costToAttendee;
            dbObject["event_date"] = eventDate;
            dbObject["event_signup_open"] = signUpOpenDate;
            dbObject["event_signup_close"] = signUpCloseDate;
            dbObject["proposer"] = proposer;
            dbObject["proposed_date"] = dateProposed;
            dbObject["week_proposed"] = weekProposed;
            dbObject["quarter_proposed"] = quarter;
            dbObject["money_requested"] = moneyRequested;
            dbObject["paid"] = false;
            dbObject["money_allocated"] = moneyAllocated;
            dbObject["image_path"] = image_path;
            dbObject["description"] = description;
            dbObject["max_attendance"] = maxAttendance;

            dbxhr.open('POST', dbAPIURL, true);
            dbxhr.setRequestHeader('Content-Type', 'application/json');
            dbxhr.onreadystatechange = function (e) {
                if (dbxhr.readyState == 4 && dbxhr.status == 200) {
                    location.reload();
                }
            }
            dbxhr.onerror = function () {
                console.log("There was an error");
            }

            dbxhr.send(JSON.stringify(dbObject));

        }
    };

    photoxhr.send(formData);
}

$(document).ready(function () {
    setup();
    $("#signUpOpenDate").datepicker();
    $("#signUpCloseDate").datepicker();
    $("#eventDate").datepicker();
    $("#proposedDate").datepicker();
});