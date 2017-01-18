
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
        // return responseText;
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
            var html = generatePageHTML(proposal[i]);
            var tileArea = document.getElementsByClassName("eventTileArea")[0];
            tileArea.innerHTML += html;
            //makeListLinks();
            var fields = [
                    "proposal_id",
                    "proposal_name",
                    "event_data",
                    "event_signup_open",
                    "event_signup_close", 
                    "description"
                ];
            var dataset = document.getElementById('eventTextSignUps' + proposal_id);
            fields.forEach(function(field){
					dataset[field] = proposal[i][field];
				});
                
            /* html += "<p id='editEvent" + proposal_id + "' class='editEvent' " + 
            // "data-toggle='modal' data-target='#myModal'" +
            ">Edit Event</p></div></div></div>";    // */
            
            var editButton = document.createElement("a");
            editButton.setAttribute('id', 'editEvent' + proposal_id);
            editButton.setAttribute('class', 'editEvent');
//            editButton.dataset.toggle = 'modal';
//            editButton.dataset.target = '#myModal';
            editButton.addEventListener('click', function() {
                alert('making action listener in ' + proposal_id);
                return function() {
                    alert('click ' + proposal_id)
                }}())
            editButtons.push(editButton);
  
            var btnTxt = document.createTextNode('Edit Events');
            editButton.appendChild(btnTxt);
            
            var eventActions = document.getElementById("eventActions" + proposal_id);
            eventActions.appendChild(editButton);
            
            
            /*editButtons.push(document.getElementById('editEvent' + proposal_id));
            newEditButtons.push(editButtons[i].cloneNode(true));
            newEditButtons[i].addEventListener("click", function() {
                alert('clicked ' + proposal_id);
            }, false);
            editButtons[i].parentNode.replaceChild(newEditButtons[i], editButtons[i]); // */
            
            /* var submit = document.getElementById("submit");
            new_submit = submit.cloneNode(true);
            new_submit.addEventListener("click", function () {
                submitChanges(descInput)
            }, false);
            submit.parentNode.replaceChild(new_submit, submit); //*/                        
        }
        editButtons.forEach(function(element) {
            console.log(element)
            element.click();
        });
        

        // var editEventButtons = document.getElementsByClassName("editEvent");

        // var eventTextSignUps = document.getElementById("eventTextSignUps");
        //setupEditModal('eventTextSignUps', 'signups-modal-');
    }


    var officersxhr = getOfficers();
    officersxhr.send();
    //setTimeout(function () { setAdmin(officersxhr.responseText) }, 300);

    function getEvents() {
        var url = apiURL + 'api/v1/events';
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
        }

        xhr.onerror = function () {
            console.log("There was an error");
        }
        // xhr.send();
        return xhr;
    }
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
    if (signUpOpenDate > new Date()) {
        var signUpHTML = "<p class='eventSignUpDate'>Sign-ups open on: " + signUpOpenDateFormatted + "</p>";
    } else {
        var signUpHTML = "<p class='eventSignUpDate'>Sign-ups close on: " + signUpCloseDate + "</p>";
    }
    var attendees = proposal.attendees;
    var eventDate = new Date(proposal.event_date);
    eventDate = (eventDate.getMonth() + 1) + "/" + eventDate.getUTCDate() + "/" + eventDate.getFullYear();
    var proposal_id = proposal.proposal_id;

    var html = "<div class='row'><div class='col-sm-12'>" +
            "<img class='eventImageSignUps' src='" +
            proposal.image_path + "' alt='Event Image'>";
    html += "<div class='eventTextSignUps' id='eventTextSignUps" +
            proposal_id + "'>";
    html += "<h1 id='editEventName' class='eventTitle'>" +
            proposal.proposal_name + "</h1>";
    html += "<div class='costEventDateWrapper'> " +
            "<h3 class='cost'>" + cost + "</h3>";
    html += "<h3 class='eventDate'>" + eventDate +
            "</h3></div><br/><p class='eventDescription'>" +
            proposal.description + "</p><br/><br/>";
    html += signUpHTML + "</div>";
    html += "<div id='eventActions" + proposal_id + "' class='eventActions'>";
    
    var username = JSON.parse(sessionStorage.getItem("userData")).username;
    if (signUpOpenDate < new Date()) {
        if ($.inArray(username, attendees) == -1) {
            html += "<a id='signUpLink" + proposal_id + "' onclick='signUp(" + proposal_id + ")'>" +
                    "<p class='signUpLink'> Sign Up </p></a>";
        } else {
            html += "<a id='signUpLink" + proposal_id +
                    "' onclick='unregister(" + proposal_id + ")'>" +
                    "<p class='signUpLink'>Unregister</p></a>";
        }
        html += "<a onclick='showListModal(" + proposal_id + ")'><p class='viewListLink'>View List</p></a>"
    }
    /* html += "<p id='editEvent" + proposal_id + "' class='editEvent' " + 
            // "data-toggle='modal' data-target='#myModal'" +
            ">Edit Event</p></div></div></div>";    // */
    return html;
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

// function setAdmin(officers) {
//     if (userIsOfficer(officers)) {
//         var editbuttons = insertEditButtons(showEditModal);
//     }
// }

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
    //xhr.onload = function () {
    //    console.log(xhr.responseText);
    //}
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