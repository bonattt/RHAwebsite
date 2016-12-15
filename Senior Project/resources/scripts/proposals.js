

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

    /*var createNewProposal = document.getElementById("addProposal");
    createNewProposal.addEventListener("click", function (e) {
        addProposal(e);
    }, false); */

    function addProposal(event) {
        var modal = document.getElementById('editModal');
        var span = document.getElementsByClassName("closeEdit")[0];
        var modalContent = document.getElementsByClassName("modal-content")[0];
        console.log(modalContent);

        var name = "Event name: ";
        var costToAttendee = "Cost to attendee: ";
        var image = "Image: ";
        var description = "Description: ";
        var signUpOpenDate = "Sign-up open date: ";
        var eventDate = "Event date: ";
        var signUpCloseDate = "Sign-up close date: ";
        var proposer = "Proposer: ";
        var weekProposed = "Week Proposed: ";
        var quarter = "Quarter: ";
        var moneyRequested = "Money Requested: ";
        var approved = "Approved: ";
        var moneyAllocated = "Money Allocated: ";

        var nameInput = document.createElement("textarea");
        nameInput.setAttribute("rows", "1");
        nameInput.setAttribute("cols", "30");

        var costToAttendeeInput = document.createElement("textarea");
        costToAttendeeInput.setAttribute("rows", "1");
        costToAttendeeInput.setAttribute("cols", "30");

        var imageInput = document.createElement("textarea");
        imageInput.setAttribute("rows", "1");
        imageInput.setAttribute("cols", "30");

        var descriptionInput = document.createElement("textarea");
        descriptionInput.setAttribute("rows", "4");
        descriptionInput.setAttribute("cols", "30");

        var signUpOpenDateInput = document.createElement("textarea");
        signUpOpenDateInput.setAttribute("rows", "1");
        signUpOpenDateInput.setAttribute("cols", "30");

        var eventDateInput = document.createElement("textarea");
        eventDateInput.setAttribute("rows", "1");
        eventDateInput.setAttribute("cols", "30");

        var signUpCloseDateInput = document.createElement("textarea");
        signUpCloseDateInput.setAttribute("rows", "1");
        signUpCloseDateInput.setAttribute("cols", "30");

        var proposerInput = document.createElement("textarea");
        proposerInput.setAttribute("rows", "1");
        proposerInput.setAttribute("cols", "30");

        var weekProposedInput = document.createElement("textarea");
        weekProposedInput.setAttribute("rows", "1");
        weekProposedInput.setAttribute("cols", "30");

        var quarterInput = document.createElement("textarea");
        quarterInput.setAttribute("rows", "1");
        quarterInput.setAttribute("cols", "30");

        var moneyRequestedInput = document.createElement("textarea");
        moneyRequestedInput.setAttribute("rows", "1");
        moneyRequestedInput.setAttribute("cols", "30");

        var approvedInput = document.createElement("textarea");
        approvedInput.setAttribute("rows", "1");
        approvedInput.setAttribute("cols", "30");

        var moneyAllocatedInput = document.createElement("textarea");
        moneyAllocatedInput.setAttribute("rows", "1");
        moneyAllocatedInput.setAttribute("cols", "30");

        var submitButton = document.createElement("button");
        submitButton.setAttribute("id", "submit");
        submitButton.setAttribute("class", "modalButton");
        submitButton.innerHTML = "Submit";
        submitButton.addEventListener("click", function () { submit() }, false);
        modalContent.appendChild(submitButton);

        var nameNode = document.getElementById("nameInput");
        var costToAttendeeNode = document.getElementById("costToAttendeeInput");
        var imageNode = document.getElementById("imageInput");
        var descriptionNode = document.getElementById("descriptionInput");
        var signUpOpenDateNode = document.getElementById("signUpOpenDateInput");
        var eventDateNode = document.getElementById("eventDateInput");
        var signUpCloseDateNode = document.getElementById("signUpCloseDateInput");
        var proposerNode = document.getElementById("proposerInput");
        var weekProposedNode = document.getElementById("weekProposedInput");
        var quarterNode = document.getElementById("quarterInput");
        var moneyRequestedNode = document.getElementById("moneyRequestedInput");
        var approvedNode = document.getElementById("approvedInput");
        var moneyAllocatedNode = document.getElementById("moneyAllocatedInput");


        document.getElementById("name").innerHTML = name;
        nameNode.appendChild(nameInput);
        document.getElementById("costToAttendee").innerHTML = costToAttendee;
        costToAttendeeNode.appendChild(costToAttendeeInput);
        document.getElementById("image").innerHTML = image;
        imageNode.appendChild(imageInput);
        document.getElementById("description").innerHTML = description;
        descriptionNode.appendChild(descriptionInput);
        document.getElementById("signUpOpenDate").innerHTML = signUpOpenDate;
        signUpOpenDateNode.appendChild(signUpOpenDateInput);
        document.getElementById("eventDate").innerHTML = eventDate;
        eventDateNode.appendChild(eventDateInput);
        document.getElementById("signUpCloseDate").innerHTML = signUpCloseDate;
        signUpCloseDateNode.appendChild(signUpCloseDateInput);
        document.getElementById("proposer").innerHTML = proposer;
        proposerNode.appendChild(proposerInput);
        document.getElementById("weekProposed").innerHTML = weekProposed;
        weekProposedNode.appendChild(weekProposedInput);
        document.getElementById("quarter").innerHTML = quarter;
        quarterNode.appendChild(quarterInput);
        document.getElementById("moneyRequested").innerHTML = moneyRequested;
        moneyRequestedNode.appendChild(moneyRequestedInput);
        document.getElementById("approved").innerHTML = approved;
        approvedNode.appendChild(approvedInput);
        document.getElementById("moneyAllocated").innerHTML = moneyAllocated;
        moneyAllocatedNode.appendChild(moneyAllocatedInput);


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
            closeModal();
            var url = BASE_API_URL + 'proposal/';
            function createCORSRequest(method, url) {
                var xhr = new XMLHttpRequest();
                xhr.open(method, url, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                return xhr;
            }
            var xhr = xhrPostRequest(url);
            var approvedBool = false;
            if (approvedInput.value === "true") {
                approvedBool = true;
            }

            xhr.send(JSON.stringify({ name: nameInput.value, cost_to_attendee: parseInt(costToAttendeeInput.value), event_date: eventDateInput.value, event_signup_open: signUpOpenDateInput.value, event_signup_close: signUpCloseDateInput.value, image_path: imageInput.value, description: descriptionInput.value, proposer: proposerInput.value, week_proposed: parseInt(weekProposedInput.value), quarter_proposed: parseInt(quarterInput.value), money_requested: parseInt(moneyRequestedInput.value), approved: approvedBool }));
            return xhr;
        }

    }
}

$(document).ready(function() {
    setup();
});