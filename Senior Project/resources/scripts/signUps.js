
var eventsMap = new Object();
function displayPastEvents() {
    var xhr = getEvents();
    xhr.send();
    setTimeout(function () { actuallyDoShit(xhr.responseText) }, 300);

    function actuallyDoShit(proposal) {
        proposal = JSON.parse(proposal);

        for (var i = 0; i < proposal.length; i++) {
            var html = "<div class='eventTile'><p class='signUpText'>" + proposal[i].proposal_name + " - " + proposal[i].cost_to_attendee + "</p>";
            html += "<img class='signUpImage' src =" + proposal[i].image_path + "></img>";
            html += "<a><p onclick='moreInformationFunction(this)' class='moreInfoLink'>" + "Show Details" + "</p></a>";
            html += "<a id='myBtn' class='viewListLink'> View List </a>";
            html += "<div class='moreInformation'>" + proposal[i].description + " Sign-ups for this event will close on " + proposal[i].event_signup_close + ".</div>";
            html += "</div>";

            var tileArea = document.getElementsByClassName("eventTileArea")[0];
            tileArea.innerHTML += html;

        }

    }

    function getEvents() {
        var url = apiURL + 'api/v1/pastevents';
        console.log(url);
        function createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();
            console.log("xhr is: ");
            console.log(xhr);
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
            console.log("Response text: " + responseText);
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
    var url = apiURL + 'api/v1/events/1';
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
    xhr.send(JSON.stringify({ proposal_name: "It Works!!!" }));
    return xhr;

}

function displaySignUps() {
    var xhr = getEvents();
    xhr.send();
    setTimeout(function () { actuallyDoShit(xhr.responseText) }, 300);

    function actuallyDoShit(proposal) {
        proposal = JSON.parse(proposal);
        for (var i = 0; i < proposal.length; i++) {
            var html = "<div class='eventTile'><p class='signUpText edit'>" + proposal[i].proposal_name + " - " + proposal[i].cost_to_attendee + "</p>";
            html += "<img class='signUpImage' src =" + proposal[i].image_path + "></img>";
            html += "<a><p onclick='moreInformationFunction(this)' class='moreInfoLink'>" + "Show Details" + "</p></a>";
            html += "<a onclick='signUp()'><p class='signUpLink'> Sign Up </p></a>";
            html += "<a id='myBtn' class='viewListLink'> View List </a>";
            html += "<div class='moreInformation'>" + proposal[i].description + " Sign-ups for this event will close on " + proposal[i].event_signup_close + ".</div>";
            html += "</div>";
            eventsMap[proposal[i].proposal_name] = proposal[i].proposal_id;

            var tileArea = document.getElementsByClassName("eventTileArea")[0];
            tileArea.innerHTML += html;
        }
        console.log(eventsMap);
        var isAdmin = true;
        if (isAdmin) {
            displayEditingPens();
        }
    }

    function displayEditingPens() {
        var adminValues = document.getElementsByClassName("edit");
        for (var i = 0; i < adminValues.length; i++) {
            var editImage = document.createElement("img");
            editImage.setAttribute("src", "../images/edit.png");
            adminValues[i].appendChild(editImage);
            editImage.addEventListener("click", function (e) {
                showEditModal(e);
            }, false);
        }
    }

    function getEvents() {
        var url = apiURL + 'api/v1/events';
        console.log(url);
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
            console.log("Response text: " + responseText);
            // return responseText;
        }

        xhr.onerror = function () {
            console.log("There was an error");
        }
        // xhr.send();
        return xhr;

    }

}

function showEditModal(editImage) {
    console.log(editImage.srcElement);
    var modal = document.getElementById('editModal');
    var span = document.getElementsByClassName("closeEdit")[0];

    var title = editImage.srcElement.parentElement.innerHTML.split(" - ");
    var name = "Event name: ";
    var price = "Price: ";
    var image = "Image: ";
    var description = "Description: ";
    var signUpCloseDate = "Sign-up close date: ";

    var nameInput = document.createElement("textarea");
    nameInput.setAttribute("rows", "1");
    nameInput.setAttribute("cols", "30");
    nameInput.innerHTML = title[0];

    var priceInput = document.createElement("textarea");
    priceInput.setAttribute("rows", "1");
    priceInput.setAttribute("cols", "30");
    priceInput.innerHTML = title[1].split("<")[0];

    var descriptionInput = document.createElement("textarea");
    descriptionInput.setAttribute("rows", "4");
    descriptionInput.setAttribute("cols", "30");
    descriptionInput.innerHTML = editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(6)")[0].innerHTML.split(" Sign-ups for this event will close on ")[0];

    var signUpCloseDateInput = document.createElement("textarea");
    signUpCloseDateInput.setAttribute("rows", "1");
    signUpCloseDateInput.setAttribute("cols", "30");
    signUpCloseDateInput.innerHTML = editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(6)")[0].innerHTML.split(" Sign-ups for this event will close on ")[1].split(".")[0];
    // console.log(editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(2)")[0].currentSrc.split("images/")[1]);

    var imageInput = document.createElement("textarea");
    imageInput.setAttribute("rows", "1");
    imageInput.setAttribute("cols", "30");
    imageInput.innerHTML = editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(2)")[0].currentSrc.split("images/")[1];

    var nameNode = document.getElementById("nameInput");
    var priceNode = document.getElementById("priceInput");
    var imageNode = document.getElementById("imageInput");
    var descriptionNode = document.getElementById("descriptionInput");
    var signUpCloseDateNode = document.getElementById("signUpCloseDateInput");


    document.getElementById("name").innerHTML = name;
    nameNode.appendChild(nameInput);
    document.getElementById("price").innerHTML = price;
    priceNode.appendChild(priceInput);
    document.getElementById("image").innerHTML = image;
    imageNode.appendChild(imageInput);
    document.getElementById("description").innerHTML = description;
    descriptionNode.appendChild(descriptionInput);
    document.getElementById("signUpCloseDate").innerHTML = signUpCloseDate;
    signUpCloseDateNode.appendChild(signUpCloseDateInput);


    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        nameNode.removeChild(nameNode.firstChild);
        priceNode.removeChild(priceNode.firstChild);
        imageNode.removeChild(imageNode.firstChild);
        descriptionNode.removeChild(descriptionNode.firstChild);
        signUpCloseDateNode.removeChild(signUpCloseDateNode.firstChild);
        saveEvent();

    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            nameNode.removeChild(nameNode.firstChild);
            priceNode.removeChild(priceNode.firstChild);
            imageNode.removeChild(imageNode.firstChild);
            descriptionNode.removeChild(descriptionNode.firstChild);
            signUpCloseDateNode.removeChild(signUpCloseDateNode.firstChild);
        }
    }
}

function signUp() {
    var signUpSnackbar = document.getElementById("snackbar");
    signUpSnackbar.className = "show";
    setTimeout(function () { signUpSnackbar.className = signUpSnackbar.className.replace("show", ""); }, 3000);
}

function moreInformationFunction(triggeringElement) {
    var parentDiv = triggeringElement.parentElement.parentElement;
    var linkClicked = parentDiv.getElementsByClassName("moreInfoLink")[0];
    var descriptionToShow = parentDiv.getElementsByClassName("moreInformation")[0];
    console.log(linkClicked);
    console.log(descriptionToShow);

    if (linkClicked.innerHTML == "Show Details") {
        descriptionToShow.style.display = "block";
        linkClicked.innerHTML = "Hide Details";
    } else {
        descriptionToShow.style.display = "none";
        linkClicked.innerHTML = "Show Details";
    }

}

(function () {

    var listLinks = document.getElementsByClassName("viewListLink");
    for (var i = 0; i < listLinks.length; i++) {
        var listLink = listLinks[i];
        listLink.addEventListener("click", showListModal, false);
    }

    var isAdmin = true;
    apiURL = "http://rha-website-1.csse.rose-hulman.edu:3000/";
    newEvent = {};



    function showListModal() {
        var eventAttendees = [{
            name: "Morgan Cook"
        },
            {
                name: "Thomas Bonnatti"
            }]
        var modal = document.getElementById('listModal');
        var span = document.getElementsByClassName("closeList")[0];
        var list = document.getElementById("list");
        var html = "";
        for (var i = 0; i < eventAttendees.length; i++) {
            console.log("The person at " + i + "is: " + eventAttendees[i].name);
            html += "<br>" + eventAttendees[i].name;
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

    $(document).ready(function () {
        console.log("HELLO");
        if (window.location.pathname.indexOf("pastEvents") > -1) {
            displayPastEvents();
        } else {
            displaySignUps();
        }
    });


})();