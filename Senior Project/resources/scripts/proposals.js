function getOfficers() {
    var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/officers';
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
    }
    xhr.onerror = function () {
        console.log("There was an error");
    }
    return xhr;
}

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
    createNewProposal.addEventListener("click", function (e) {
        addProposal(e);
    }, false);
/*
    function addProposal(event) {
        var modal = document.getElementById('editModal');
        var span = document.getElementsByClassName("closeEdit")[0];
        var modalContent = document.getElementsByClassName("modal-content")[0];
        console.log(modalContent);

        document.getElementById("name").innerHTML = name;
        document.getElementById("costToAttendee").innerHTML = costToAttendee;
        document.getElementById("image").innerHTML = image;
        document.getElementById("description").innerHTML = description;
        document.getElementById("signUpOpenDate").innerHTML = signUpOpenDate;
        document.getElementById("eventDate").innerHTML = eventDate;
        document.getElementById("signUpCloseDate").innerHTML = signUpCloseDate;
        document.getElementById("proposer").innerHTML = proposer;
        document.getElementById("weekProposed").innerHTML = weekProposed;
        document.getElementById("quarter").innerHTML = quarter;
        document.getElementById("moneyRequested").innerHTML = moneyRequested;
        document.getElementById("approved").innerHTML = approved;
        document.getElementById("moneyAllocated").innerHTML = moneyAllocated;


        modal.style.display = "block";
        span.onclick = function () {
            closeModal();

        }
        window.onclick = function (event) {
            if (event.target == modal) {
                closeModal();
            }
        }

        function closeModal() {
            modal.style.display = "none";
            nameNode.removeChild(nameNode.firstChild);
            costToAttendeeNode.removeChild(costToAttendeeNode.firstChild);
            imageNode.removeChild(imageNode.firstChild);
            descriptionNode.removeChild(descriptionNode.firstChild);
            signUpOpenDateNode.removeChild(signUpOpenDateNode.firstChild);
            eventDateNode.removeChild(eventDateNode.firstChild);
            signUpCloseDateNode.removeChild(signUpCloseDateNode.firstChild);
            proposerNode.removeChild(proposerNode.firstChild);
            weekProposedNode.removeChild(weekProposedNode.firstChild);
            quarterNode.removeChild(quarterNode.firstChild);
            moneyRequestedNode.removeChild(moneyRequestedNode.firstChild);
            approvedNode.removeChild(approvedNode.firstChild);
            moneyAllocatedNode.removeChild(moneyAllocatedNode.firstChild);
            modalContent.removeChild(submitButton);
        } 

        function submit() {
            //closeModal();
            var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/proposal/';
            function createCORSRequest(method, url) {
                var xhr = new XMLHttpRequest();
                xhr.open(method, url, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                return xhr;
            }
            var xhr = createCORSRequest('POST', url);
            if (!xhr) {
                throw new Error('CORS not supported');
            }

            xhr.onload = function () {
                var responseText = xhr.responseText;
            }

            xhr.onerror = function () {
                console.log("There was an error");
            }

            var approvedBool = false;
            if (approvedInput.value === "true") {
                approvedBool = true;
            }

            xhr.send(JSON.stringify({ name: nameInput.value, cost_to_attendee: parseInt(costToAttendeeInput.value), event_date: eventDateInput.value, event_signup_open: signUpOpenDateInput.value, event_signup_close: signUpCloseDateInput.value, image_path: imageInput.value, description: descriptionInput.value, proposer: proposerInput.value, week_proposed: parseInt(weekProposedInput.value), quarter_proposed: parseInt(quarterInput.value), money_requested: parseInt(moneyRequestedInput.value), approved: approvedBool }));
            return xhr;
        }

    }
    */
}

function submit() {
    var photoAPIURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: '') + '/api/v1/eventPhoto';
    var photoxhr = new XMLHttpRequest();

    var dbAPIURL = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/proposal/';

    var name = document.getElementById("name").value;
    var costToAttendee = document.getElementById("costToAttendee").value;
    var image = document.getElementById("imageFile").value;
    var description = document.getElementById("description").innerHTML;
    document.getElementById("signUpOpenDate").innerHTML = signUpOpenDate;
    document.getElementById("eventDate").innerHTML = eventDate;
    document.getElementById("signUpCloseDate").innerHTML = signUpCloseDate;
    document.getElementById("proposer").innerHTML = proposer;
    document.getElementById("weekProposed").innerHTML = weekProposed;
    document.getElementById("quarter").innerHTML = quarter;
    document.getElementById("moneyRequested").innerHTML = moneyRequested;
    document.getElementById("approved").innerHTML = approved;
    document.getElementById("moneyAllocated").innerHTML = moneyAllocated;

    photoxhr.open('POST', photoAPIURL, true);
    photoxhr.send();

    photoxhr.addEventListener('readystatechange', function (e) {
        if(photoxhr.readyState == 4 && photoxhr.status == 200) {
            var dbxhr = new XMLHttpRequest();
            dbxhr.open('POST', dbAPIURL, true);
            dbxhr.send();
        }
    }, false);
    console.log('I got to the submit function!');
}

$(document).ready(function() {
    setup();
});