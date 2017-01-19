
var eventsMap = new Object();
var eventId;
var newEventName;
var newEventPrice;
var newEventImage;
var newEventDescription;
var newEventSignUpCloseDate;
var apiURL = "http://rha-website-1.csse.rose-hulman.edu:3000/"
var nameInput = document.createElement("textarea");
var priceInput = document.createElement("textarea");
var descriptionInput = document.createElement("textarea");
var signUpCloseDateInput = document.createElement("textarea");
var imageInput = document.createElement("textarea");
var nameNode = document.getElementById("nameInput");
var priceNode = document.getElementById("priceInput");
var imageNode = document.getElementById("imageInput");
var descriptionNode = document.getElementById("descriptionInput");
var signUpCloseDateNode = document.getElementById("signUpCloseDateInput");
var editValue;
var listLinks;

const MODAL_FIELD_ROOT_ID = "signups-modal-";

function displayPastEvents() {
    var xhr = getEvents();
    xhr.onload = function () {
        createHTMLFromResponseText(xhr.responseText) 
    }
    xhr.send();
    // setTimeout(function () {createHTMLFromResponseText(xhr.responseText)}, 300);
    // usign xhr.onload should be more reliable and responsive:
    // The page load won't fail if it takes more than 300 ms to receive a response,
    // and the load won't be slowed down if the response is faster than 300 ms
    // PLEASE APPLY THIS CHANGE ANYWHERE YOU SEE THIS ERROR REPEATED.    

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
            html += "<div class='costEventDateWrapper'> <h3 class='cost'>" + cost + "</h3>";
            html += "<h3 class='eventDate'>" + (eventDate.getMonth() + 1) + "/" + eventDate.getUTCDate() + "/" + eventDate.getFullYear() + "</h3></div><br/><p class='eventDescription'>" + proposal[i].description + "</p><br/><br/>";
            html += "</div>";
            html += "<div class='eventActions'><a onclick='showListModal(" + proposal[i].proposal_id + ")'><p class='viewListLink'>View List</p></a></div></div></div>";

            var tileArea = document.getElementsByClassName("eventTileArea")[0];
            tileArea.innerHTML += html;
        }
        // makeListLinks();
    }

    function getEvents() {
        var url = apiURL + 'api/v1/pastevents';
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

function saveEvent() {
    var url = apiURL + 'api/v1/events/' + eventId;
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        console.log("xhr is: ");
        console.log(xhr);
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
        console.log("Response text: " + responseText);
    }

    xhr.onerror = function () {
        console.log("There was an error");
    }
    console.log("new event name is: ");
    console.log(newEventName);

    xhr.send(JSON.stringify({ proposal_name: newEventName, cost_to_attendee: newEventPrice, image_path: newEventImage, description: newEventDescription, event_signup_close: newEventSignUpCloseDate, event_signup_open: newEventSignUpOpenDate, event_date: newEventDate, attendees: newAttendees }));

    return xhr;
}

function displaySignUps() {
    var xhr = getEvents();
    xhr.send();
    setTimeout(function () { createHTMLFromResponseText(xhr.responseText) }, 300);

    function createHTMLFromResponseText(proposal) {
        proposal = JSON.parse(proposal);
        var editButtons = [];
        
        for (var i = 0; i < proposal.length; i++) {
            var proposal_id = proposal[i].proposal_id;
            var eventHtml = generatePageHTML(proposal[i]);
            var tileArea = document.getElementsByClassName("eventTileArea")[0];
            tileArea.appendChild(eventHtml);                      
        }
        editButtons.forEach(function(element) {
            console.log(element)
            element.click();
        });
    }
    
    var officersxhr = getOfficers();
    officersxhr.send();

    function getEvents() {
        var url = apiURL + 'api/v1/events';
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

var getSignupDateHtml = function(proposal, signUpCloseDate, signUpOpenDate, signUpOpenDateFormatted) {
    
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
    signUpCloseDate = (signUpCloseDate.getMonth() + 1) + "/" + signUpCloseDate.getUTCDate() + "/" + signUpCloseDate.getFullYear();
    var signUpOpenDate = new Date(proposal.event_signup_open);
    var signUpOpenDateFormatted = (signUpOpenDate.getMonth() + 1) + "/" + signUpOpenDate.getUTCDate() + "/" + signUpOpenDate.getFullYear();
    
    var signupHtml = getSignupDateHtml(proposal, signUpCloseDate, signUpOpenDate, signUpOpenDateFormatted);
    
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
    
    var eventTextSignUps = getEventTextSignupsHtml(proposal, cost, eventDate, signUpOpenDate);
    colDiv.appendChild(eventTextSignUps);
    
    var username = JSON.parse(sessionStorage.getItem("userData")).username;
    var eventActionDiv = getEventActionDiv(proposal_id, username, signUpOpenDate, attendees);
    colDiv.appendChild(eventActionDiv);
    
    return rowDiv;
}

function getEventTextSignupsHtml (proposal, cost, eventDate, signUpOpenDate) {
    var proposal_id = proposal.proposal_id;

    var eventTextSignUps = document.createElement('div');
    eventTextSignUps.setAttribute('class', 'eventTextSignUps');
    eventTextSignUps.setAttribute('id', 'eventTextSignUps' + proposal_id);
    
    var fields = [
            "proposal_id",
            "proposal_name",
            "event_date",
            "event_signup_open",
            "event_signup_close", 
            "description"
        ];
    fields.forEach(function(field){
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
    costText.appendChild(document.createTextNode(cost));
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
    var dateStr = (signUpOpenDate.getMonth()+1) + '/' + signUpOpenDate.getDate() + '/' + signUpOpenDate.getFullYear();
    signupsDate.setAttribute('class', 'eventSignUpDate');
    if (signUpOpenDate > new Date()) {
        signupsDate.appendChild(document.createTextNode('Sign-ups open on: ' + dateStr));
    } else {
        signupsDate.appendChild(document.createTextNode('Sign-ups close on: ' + dateStr));
    }
    eventTextSignUps.appendChild(signupsDate);
    
    return eventTextSignUps;
}

function getEventActionDiv(proposal_id, username, signUpOpenDate, attendees) {
    // html += "<div id='eventActions" + proposal_id + "' class='eventActions'>";
    var eventActionDiv = document.createElement('div');
    eventActionDiv.setAttribute('id', 'eventActions'+proposal_id);
    eventActionDiv.setAttribute('class', 'eventActions');

    // signup / unregister button, ? event is current 
    if (signUpOpenDate < new Date()) {
        var signupLink = document.createElement('a');
        signupLink.setAttribute('id', 'signUpLink'+proposal_id);
        if ($.inArray(username, attendees) == -1) {
            signupLink.addEventListener('click', function() {signUp(proposal_id + "")});
            var innerParagraph = document.createElement('p');
            innerParagraph.setAttribute('class', 'signUpLink');
            innerParagraph.appendChild(document.createTextNode('Sign Up'));
            signupLink.appendChild(innerParagraph);
        } else {
            signupLink.addEventListener('click', function() {unregister(proposal_id)});
            var innerParagraph = document.createElement('p');
            innerParagraph.setAttribute('class', 'signUpLink');
            innerParagraph.appendChild(document.createTextNode('Unregister'));
            signupLink.appendChild(innerParagraph);
        }
    } else {
        var signupLink = document.createElement('p');
        signupLink.setAttribute('class', 'signUpLink');
        signupLink.appendChild(document.createTextNode('signups closed'));    
    }
    eventActionDiv.appendChild(signupLink);
    
    var showListLink = document.createElement('a');
    showListLink.addEventListener('click', function() {showListModal(proposal_id)});
    var innerParagraph2 = document.createElement('p');
    innerParagraph2.setAttribute('class', 'viewListLink');
    innerParagraph2.appendChild(document.createTextNode('View List'));
    showListLink.appendChild(innerParagraph2);
    eventActionDiv.appendChild(showListLink);
    
    var editButton = document.createElement('a');
    editButton.addEventListener('click', generateEditButtonListener(
            dataElementId(proposal_id), MODAL_FIELD_ROOT_ID, submitFunc, "proposal_id"
    ));
    editButton.dataset.toggle = 'modal';
    editButton.dataset.target = '#myModal';
    var innerParagraph3 = document.createElement('p');
    innerParagraph3.setAttribute('class', 'editEvent');
    innerParagraph3.setAttribute('id', 'editEvent' + proposal_id);
    innerParagraph3.appendChild(document.createTextNode('Edit Events'));
    editButton.appendChild(innerParagraph3);
    eventActionDiv.appendChild(editButton);
    return eventActionDiv;
}

function submitFunc(json_data, put_id) {
    // submitFunc
    delete json_data.proposal_id;
    console.log(json_data);
    var apiExtension = "events/" + put_id;
	var xhr = xhrPutRequest(apiExtension);
    xhr.onload = function() {
        console.log('successfully delivered API call!');
        location.reload();
    }
    console.log(xhr);
    xhr.send(JSON.stringify(json_data));
}

function dataElementId(proposal_id) {
    return 'eventTextSignUps' + proposal_id;
}

function signUp(eventID) {
    var username = JSON.parse(sessionStorage.getItem("userData")).username;
    var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/events/';
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
    console.log("there's an xhr above me");

    var signUpSnackbar = document.getElementById("snackbar");
    signUpSnackbar.className = "show";
    setTimeout(function () { signUpSnackbar.className = signUpSnackbar.className.replace("show", ""); }, 3000);

    var signUpLink = document.getElementById("signUpLink" + eventID);
    signUpLink.outerHTML = "<a id='signUpLink" + eventID + "' onclick='unregister(" + eventID + ")'><p class='signUpLink'>Unregister</p></a>";
    return xhr;
}

function unregister(eventID) {
    var username = JSON.parse(sessionStorage.getItem("userData")).username;
    var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/events/';
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
    console.log("there's an xhr above me");

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

function getAttendees(id) {
    var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/events/' + id;
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
        listLink.addEventListener("click", function (e) { showListModal(e); }, false);
    }

    var isAdmin = true;
    var apiURL = "http://rha-website-1.csse.rose-hulman.edu:3000/";

    newEvent = {};
};

function showListModal(event) {
    var xhr = getAttendees(event);
    xhr.send();
    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);
        console.log(response[0].attendees);
        var eventAttendees = response[0].attendees;
        var modal = document.getElementById('listModal');
        var span = document.getElementsByClassName("closeList")[0];
        var list = document.getElementById("list");
        var html = "";

        var rightSide;
        if (!eventAttendees) {
            rightSide = 0;
        } else {
            rightSide = eventAttendees.length;
        }

        for (var i = 0; i < rightSide; i++) {
            console.log("The person at " + i + "is: " + eventAttendees[i]);
            html += "<br>" + eventAttendees[i];
        }
        list.innerHTML = "The attendees for this event are:";
        list.innerHTML += html;
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}

$(document).ready(function () {
    if (window.location.pathname.indexOf("pastEvents") > -1) {
        displayPastEvents();
    } else {
        displaySignUps();
    }

});

function submit() {
    var modal = document.getElementById('editModal');
    modal.style.display = "none";
    nameNode.removeChild(nameNode.firstChild);
    priceNode.removeChild(priceNode.firstChild);
    imageNode.removeChild(imageNode.firstChild);
    descriptionNode.removeChild(descriptionNode.firstChild);
    signUpCloseDateNode.removeChild(signUpCloseDateNode.firstChild);

    newEventName = nameInput.value;
    newEventPrice = priceInput.value;
    newEventImage = imageInput.value;
    newEventDescription = descriptionInput.value;
    newEventSignUpCloseDate = signUpCloseDateInput.value;

    var element = eventSrc.parentElement;
    element.parentElement.querySelectorAll(":nth-child(6)")[0].innerHTML = newEventDescription + " Sign-ups for this event will close on " + newEventSignUpCloseDate;
    console.log(element.parentElement.querySelectorAll(":nth-child(6)")[0].innerHTML);
    element.innerHTML = newEventName + " - " + newEventPrice;

    var editPen = document.createElement("img");
    editPen.setAttribute("src", "../images/edit.png");
    element.appendChild(editPen);
    editPen.addEventListener("click", function (e) {
        showEditModal(e);
    }, false);

    saveEvent();
}