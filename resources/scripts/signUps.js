
var apiURL = BASE_API_URL;
var isAdmin = false;
var isAMember = false;

function displayPastEvents() {
    var xhr = getEvents();
    xhr.onload = function () {
        createHTMLFromResponseText(xhr.responseText)
    }
    xhr.send();

    function createHTMLFromResponseText(proposal) {
        proposal = JSON.parse(proposal);

        for (var i = 0; i < proposal.length; i++) {
            var cost = 0;
            if (proposal[i].cost_to_attendee == '$0.00') {
                cost = "FREE";
            } else {
                cost = proposal[i].cost_to_attendee;
            }
            var eventDate = new Date(proposal[i].event_date);

            var html = "<div class='row edit'><div class='col-sm-12'><img class='eventImageSignUps' src='" + proposal[i].image_path + "' alt='Event Image'>";
            html += "<div class='eventTextSignUps'><h1 class='eventTitle'>" + proposal[i].proposal_name + "</h1>";
            html += "<div class='costEventDateWrapper'> <h3 class='cost'>$" + cost + "</h3>";
            html += "<h3 class='eventDate'>" + (eventDate.getMonth() + 1) + "/" + eventDate.getUTCDate() + "/" + eventDate.getFullYear() + "</h3></div><br/><p class='eventDescription'>" + proposal[i].description + "</p><br/><br/>";
            html += "</div>";
            html += "<div class='eventActions'><a data-toggle='modal' data-target='#listModal' onclick='showAttendeesModal(" + proposal[i].proposal_id + ")'><p class='viewListLink'>Attendees</p></a></div></div></div>";

            var tileArea = document.getElementsByClassName("eventTileArea")[0];
            tileArea.innerHTML += html;
        }
    }

    function getEvents() {
        var url = apiURL + 'pastevents';
        function createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                // Check if the XMLHttpRequest object has a "withCredentials" property.
                // "withCredentials" only exists on XMLHTTPRequest2 objects.
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest != "undefined") {
                // Otherwise, check if XDomainRequest.
                // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                // Otherwise, CORS is not supported by the browser.
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
            // return responseText;
        }

        xhr.onerror = function () {
            console.log("There was an error");
        }
        // xhr.send();
        return xhr;
    }
}
function setupAdmin(officers) {
    isAdmin = true;
}

function displaySignUps() {
    var officersxhr = getOfficers(); // from adminPermission.js
    var username = JSON.parse(sessionStorage.getItem("userData")).username;
    var memberXhr = xhrGetRequest('members/');
    memberXhr.onload = function () {
        var members = JSON.parse(memberXhr.responseText);
        for (var i = 0; i < members.length; i++) {
            if (members[i]["username"] == username && members[i]["hall"] != null) {
                isAMember = true;
                break;
            }
        }
        if (!isAMember) {
            var signUpLinks = document.getElementsByClassName("signUpLink");
        }
    };
    memberXhr.send();

    officersxhr.onload = function () {
        if (userIsOfficer(officersxhr.responseText)) {
            setupAdmin();
        }

        var xhr = getEvents();
        xhr.onload = function () { createHTMLFromResponseText(xhr.responseText) };
        xhr.send();

        function createHTMLFromResponseText(proposal) {
            proposal = JSON.parse(proposal);
            var editButtons = [];

            for (var i = 0; i < proposal.length; i++) {
                var proposal_id = proposal[i].proposal_id;
                var eventHtml = generatePageHTML(proposal[i]);
                var tileArea = document.getElementsByClassName("eventTileArea")[0];
                tileArea.appendChild(eventHtml);
            }
        }

        function getEvents() {
            var url = apiURL + 'events';
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
            // xhr.send();
            return xhr;
        }
    }
    officersxhr.send();
}

var getSignupDateHtml = function (proposal, signUpCloseDate, signUpOpenDate, signUpOpenDateFormatted) {

    var signUpHtml = document.createElement('p');
    signUpHtml.setAttribute('class', 'eventSignUpDate');
    if (signUpOpenDate > new Date()) {
        var textNode = document.createTextNode("Sign-ups open on: " + signUpOpenDateFormatted);
    } else {
        var textNode = document.createTextNode('Sign-ups close on: ' + signUpCloseDate);
    }
    signUpHtml.appendChild(textNode);
    return signUpHtml;
}

function generatePageHTML(proposal, proposal_id, cost, eventDate) {
    var cost = 0;
    if (proposal.cost_to_attendee == '$0.00') {
        cost = "FREE";
    } else {
        cost = proposal.cost_to_attendee;
    }

    var signUpCloseDate = new Date(proposal.event_signup_close);
    var signUpCloseDateFormatted = (signUpCloseDate.getMonth() + 1) + "/" + signUpCloseDate.getUTCDate() + "/" + signUpCloseDate.getFullYear();
    var signUpOpenDate = new Date(proposal.event_signup_open);
    var signUpOpenDateFormatted = (signUpOpenDate.getMonth() + 1) + "/" + (signUpOpenDate.getUTCDate() + 1) + "/" + signUpOpenDate.getFullYear();

    var signupHtml = getSignupDateHtml(proposal, signUpCloseDateFormatted, signUpOpenDate, signUpOpenDateFormatted);

    var attendees = proposal.attendees;
    var eventDate = new Date(proposal.event_date);
    eventDate = (eventDate.getMonth() + 1) + "/" + eventDate.getUTCDate() + "/" + eventDate.getFullYear();
    var proposal_id = proposal.proposal_id;

    var rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'row');

    var colDiv = document.createElement('div');
    colDiv.setAttribute('class', 'col-sm-12');
    rowDiv.appendChild(colDiv);

    var imgTag = document.createElement('img');
    imgTag.setAttribute('class', 'eventImageSignUps');
    imgTag.setAttribute('src', proposal.image_path);
    imgTag.setAttribute('alt', 'Event Image');
    colDiv.appendChild(imgTag);

    var eventTextSignUps = getEventTextSignupsHtml(proposal, cost, eventDate, signUpOpenDate, signUpCloseDate);
    colDiv.appendChild(eventTextSignUps);

    var username;
    if (sessionStorage.getItem("userData") == null) {
        username = null;
    } else {
        username = JSON.parse(sessionStorage.getItem("userData")).username;
    }
    var eventActionDiv = getEventActionDiv(proposal, username, signUpOpenDate, attendees); ////////////////////////////////////////////////////////////////////////
    colDiv.appendChild(eventActionDiv);

    return rowDiv;
}

function getEventTextSignupsHtml(proposal, cost, eventDate, signUpOpenDate, signUpCloseDate) {
    var proposal_id = proposal.proposal_id;

    var eventTextSignUps = document.createElement('div');
    eventTextSignUps.setAttribute('class', 'eventTextSignUps');
    eventTextSignUps.setAttribute('id', 'eventTextSignUps' + proposal_id);

    var fields = [
        "proposal_id",
        "proposal_name",
        "cost_to_attendee",
        "event_date",
        "event_signup_open",
        "event_signup_close",
        "description",
        "image_path"
    ];
    fields.forEach(function (field) {
        eventTextSignUps.dataset[field] = proposal[field];
    });

    var eventName = document.createElement('h1');
    eventName.setAttribute('class', 'eventTitle');
    eventName.appendChild(document.createTextNode(proposal.proposal_name));
    eventTextSignUps.appendChild(eventName);

    var costDateWrapper = document.createElement('div');
    costDateWrapper.setAttribute('class', 'costEventDateWrapper');
    eventTextSignUps.appendChild(costDateWrapper);

    var costText = document.createElement('h3');
    costText.setAttribute('class', 'cost');
    costText.appendChild(document.createTextNode('$' + cost));
    costDateWrapper.appendChild(costText);

    var dateText = document.createElement('h3');
    dateText.setAttribute('class', 'eventDate');
    dateText.appendChild(document.createTextNode(eventDate));
    costDateWrapper.appendChild(dateText);

    var eventDesc = document.createElement('p');
    eventDesc.setAttribute('class', 'eventDescription');
    eventDesc.appendChild(document.createTextNode(proposal.description));
    eventTextSignUps.appendChild(eventDesc);

    eventTextSignUps.appendChild(document.createElement('br'));
    eventTextSignUps.appendChild(document.createElement('br'));

    var signupsDate = document.createElement('p');
    var dateStr = (signUpOpenDate.getMonth() + 1) + '/' + signUpOpenDate.getDate() + '/' + signUpOpenDate.getFullYear();
    var dateStrClose = (signUpCloseDate.getMonth() + 1) + '/' + signUpCloseDate.getDate() + '/' + signUpCloseDate.getFullYear();
    signupsDate.setAttribute('class', 'eventSignUpDate');
    if (signUpOpenDate > new Date()) {
        signupsDate.appendChild(document.createTextNode('Sign-ups open on: ' + dateStr));
    } else {
        signupsDate.appendChild(document.createTextNode('Sign-ups close on: ' + dateStrClose));
    }
    eventTextSignUps.appendChild(signupsDate);

    return eventTextSignUps;
}

function getEventActionDiv(proposal, username, signUpOpenDate, attendees) {
    var eventActionDiv = document.createElement('div');
    eventActionDiv.setAttribute('id', 'eventActions' + proposal.proposal_id);
    eventActionDiv.setAttribute('class', 'eventActions');

    if (!isAMember) {

    } else {
        if (signUpOpenDate < new Date()) {
            var signupLink = document.createElement('a');
            signupLink.setAttribute('id', 'signUpLink' + proposal.proposal_id);
            if (username != null) {
                if ($.inArray(username, attendees) == -1) {
                    signupLink.addEventListener('click', function () { signUp(proposal.proposal_id + "") });
                    var innerParagraph = document.createElement('p');
                    innerParagraph.setAttribute('class', 'signUpLink');
                    innerParagraph.appendChild(document.createTextNode('Sign Up'));
                    signupLink.appendChild(innerParagraph);
                } else {
                    signupLink.addEventListener('click', function () { unregister(proposal.proposal_id) });
                    var innerParagraph = document.createElement('p');
                    innerParagraph.setAttribute('class', 'signUpLink');
                    innerParagraph.appendChild(document.createTextNode('Unregister'));
                    signupLink.appendChild(innerParagraph);
                }
            } else {
                signupLink.addEventListener('click', function () {
                    var snackbar = document.getElementById("notLoggedInSnackbar");
                    snackbar.className = "show";
                    setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
                });
                var innerParagraph = document.createElement('p');
                innerParagraph.setAttribute('class', 'signUpLink');
                innerParagraph.appendChild(document.createTextNode('Sign Up'));
                signupLink.appendChild(innerParagraph);
            }
        } else {
            var signupLink = document.createElement('p');
            signupLink.setAttribute('class', 'signUpLink');
            signupLink.appendChild(document.createTextNode('Signups Closed'));
        }
        eventActionDiv.appendChild(signupLink);
    }

    var showListLink = document.createElement('a');
    showListLink.addEventListener('click', function () { showAttendeesModal(proposal.proposal_id) });
    showListLink.dataset.toggle = 'modal';
    showListLink.dataset.target = '#listModal';

    var innerParagraph2 = document.createElement('p');
    innerParagraph2.setAttribute('class', 'viewListLink');
    innerParagraph2.appendChild(document.createTextNode('Attendees'));

    showListLink.appendChild(innerParagraph2);
    eventActionDiv.appendChild(showListLink);

    if (isAdmin) {
        var showEmailLink = document.createElement('a');
        showEmailLink.dataset.toggle = "modal";
        showEmailLink.dataset.target = "#listModal";
        showEmailLink.addEventListener('click', function () { showEmailModal(proposal.proposal_id) });

        var innerParagraph3 = document.createElement('p');
        innerParagraph3.setAttribute('class', 'viewListLink');
        innerParagraph3.appendChild(document.createTextNode('View Emails'));
        showEmailLink.appendChild(innerParagraph3);
        eventActionDiv.appendChild(showEmailLink);
    }

    return eventActionDiv;
}

function generateOptions(idAttr, start, end, step, names) {
    var select = document.createElement('select');
    select.setAttribute('id', idAttr);
    for (var i = start; i < end; i += step) {
        var option = document.createElement('option');
        if (typeof names == "undefined") {
            option.appendChild(document.createTextNode(i));
        } else {
            option.appendChild(document.createTextNode(names[i]));
        }
        select.appendChild(option);
    }
    return select;
}

function composeDate(modalId) {
    var date = new Date();
    var MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var monthName = document.getElementById(modalId + '_month').value;
    date.setMonth(MONTH_NAMES.indexOf(monthName));
    date.setFullYear(document.getElementById(modalId + '_year').value);
    date.setDate(document.getElementById(modalId + '_day').value);
    return date;
}

function dataElementId(proposal_id) {
    return 'eventTextSignUps' + proposal_id;
}

function signUp(eventID) {
    var username = JSON.parse(sessionStorage.getItem("userData")).username;
    var url = BASE_API_URL + 'events/';
    url += eventID + '/attendees/' + username;
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        return xhr;
    }
    var xhr = createCORSRequest('PUT', url);
    if (!xhr) {
        throw new Error('CORS not supported');
    }

    xhr.onload = function () {
        var responseText = xhr.responseText;
    }

    xhr.onerror = function () {
        console.log("There was an error");
    }

    xhr.send();

    var signUpSnackbar = document.getElementById("snackbar");
    signUpSnackbar.className = "show";
    setTimeout(function () { signUpSnackbar.className = signUpSnackbar.className.replace("show", ""); }, 3000);

    var signUpLink = document.getElementById("signUpLink" + eventID);
    signUpLink.outerHTML = "<a id='signUpLink" + eventID + "' onclick='unregister(" + eventID + ")'><p class='signUpLink'>Unregister</p></a>";
    return xhr;
}

function unregister(eventID) {
    var username = JSON.parse(sessionStorage.getItem("userData")).username;
    var url = BASE_API_URL + 'events/';
    url += eventID + '/attendees/' + username;
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        return xhr;
    }
    var xhr = createCORSRequest('DELETE', url);
    if (!xhr) {
        throw new Error('CORS not supported');
    }

    xhr.onload = function () {
        var responseText = xhr.responseText;
    }

    xhr.onerror = function () {
        console.log("There was an error");
    }

    xhr.send();

    var signUpSnackbar = document.getElementById("unregisterSnackbar");
    signUpSnackbar.className = "show";
    setTimeout(function () { signUpSnackbar.className = signUpSnackbar.className.replace("show", ""); }, 3000);

    var signUpLink = document.getElementById("signUpLink" + eventID);
    signUpLink.outerHTML = "<a id='signUpLink" + eventID + "' onclick='signUp(" + eventID + ")'><p class='signUpLink'> Sign Up </p></a>";
    return xhr;
}

function moreInformationFunction(triggeringElement) {
    var parentDiv = triggeringElement.parentElement.parentElement;
    var linkClicked = parentDiv.getElementsByClassName("moreInfoLink")[0];
    var descriptionToShow = parentDiv.getElementsByClassName("moreInformation")[0];

    if (linkClicked.innerHTML == "Show Details") {
        descriptionToShow.style.display = "block";
        linkClicked.innerHTML = "Hide Details";
    } else {
        descriptionToShow.style.display = "none";
        linkClicked.innerHTML = "Show Details";
    }

}

function getAttendees(id) {
    var url = BASE_API_URL + 'events/' + id;
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
    xhr.onerror = function () {
        console.log("There was an error");
    }
    return xhr;
}
function makeListLinks() {

    listLinks = document.getElementsByClassName("viewListLink");
    for (var i = 0; i < listLinks.length; i++) {
        var listLink = listLinks[i];
        listLink.addEventListener("click", function (e) { showAttendeesModal(e); }, false);
    }

    var isAdmin = true;

    newEvent = {};
};

function showAttendeesModal(event) {
    var xhr = getAttendees(event);
    xhr.send();
    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);
        var header = 'List of Attendees';
        var attendees = response[0].attendees;
        console.log(attendees);
        var max_attendance = response[0].max_attendance;

        if ((attendees == null) || (attendees.length == 0)) {
            attendees = ["there is nobody signed up for this event!"];
        } else {
            attendees = attendees.slice(0, max_attendance);
        }
        populateListModal(header, attendees);
    }
}

function showEmailModal(event) {
    var xhr = getAttendees(event);
    xhr.send();
    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);
        var header = "Attendee Email List";
        var eventAttendees = response[0].attendees;
        if (eventAttendees == null) {
            eventAttendees = ["there is nobody signed up for this event!"];
        } else {
            for (var i = 0; i < eventAttendees.length; i++) {
                eventAttendees[i] += '@rose-hulman.edu;'
            }
        }
        populateListModal(header, eventAttendees);
    }
}

function populateListModal(header, ls) {
    document.getElementById('listModal_header').innerHTML = header+'';
    var html = ''
    ls.forEach(function(line) {
        html += line + '<br/>'
    });
    document.getElementById('listModal_body').innerHTML = html;
}

$(document).ready(function () {
    if (window.location.pathname.indexOf("pastEvents") > -1) {
        displayPastEvents();
    } else {
        displaySignUps();
    }

});