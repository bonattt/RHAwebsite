(function() {
    var proposal = [{
	name: "King's Island",
	cost_to_attendee: 10.50,
	event_date: "2016-11-10",
	event_signup_open: "2016-11-01",
	event_signup_close: "2016-11-04",
	image_path: "../images/kingsIsland.jpg",
	description: "newFakeEvent",
	proposer_id: 44,
	week_proposed: 5,
	quarter_proposed: 1,
	money_requested: 750,
	approved: true
}];

    for(var i=0; i<proposal.length; i++){
        var html = "<div class='eventTile'><p class='signUpText edit'>" + proposal[i].name + " - $" + proposal[i].cost_to_attendee + "</p>";
        html += "<img class='signUpImage' src =" + proposal[i].image_path + "></img>";
        html += "<a><p onclick='moreInformationFunction(this)' class='moreInfoLink'>" + "Show Details" + "</p></a>";
        html += "<a onclick='signUp()'><p class='signUpLink'> Sign Up </p></a>";
        html += "<a id='myBtn' class='viewListLink'> View List </a>";
        html += "<div class='moreInformation'>" + proposal[i].eventDescription + " Sign-ups for this event will close on " + proposal[i].signUpCloseDate + ".</div>";
        html += "</div>";

        var tileArea = document.getElementsByClassName("eventTileArea")[0];
        tileArea.innerHTML += html;  
    }
})();

function signUp() {
    var signUpSnackbar = document.getElementById("snackbar");
    signUpSnackbar.className = "show";
    setTimeout(function () { signUpSnackbar.className = signUpSnackbar.className.replace("show", ""); }, 3000);
}

function moreInformationFunction(triggeringElement) {
    var linkClicked = triggeringElement.id;
    var events = document.getElementsByClassName("moreInformation");
    var moreInfoLinks = document.getElementsByClassName("moreInfoLink");
    for (var i = 0; i < events.length; i++) {
        //NOTE: I'm not a fan about the use of IDs here... maybe consider re-working it later. -Sean
        var moreInfo = document.getElementById(events[i].id);
        var moreInfoLink = document.getElementById(moreInfoLinks[i].id);
        if (moreInfoLink.id == linkClicked && moreInfoLink.textContent == "Show Details") {
            moreInfo.style.display = "block";
            moreInfoLink.textContent = "Hide Details";
        }
        else {
            moreInfo.style.display = "none";
            moreInfoLink.textContent = "Show Details";
        }
    }
}

(function () {

    var listLinks = document.getElementsByClassName("viewListLink");
    for (var i = 0; i < listLinks.length; i++) {
        var listLink = listLinks[i];
        listLink.addEventListener("click", showListModal, false);
    }

    var isAdmin = true;
    apiURL = "rha-website-1.csse.rose-hulman.edu:3000/";
    newEvent = {};

    if (isAdmin) {
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
        $.ajax({
            url: apiURL + 'api/v1/events',
            type: 'GET',
            data: newEvent,
            dataType: 'JSON',
            success: function(data) {
                if(data) {
                    console.log("Here's some data! " + data);
                } else {
                    console.log("Could not GET data! :(");
                }
            },
            error: function(req, status, err) {
                console.log(err, status, req);
            }
        });
    }

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
        for(var i=0; i < eventAttendees.length; i++){
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

    function showEditModal(editImage) {
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
        console.log(editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(2)")[0].currentSrc.split("images/")[1]);

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

   $(document).ready(function() {
        console.log("HELLO");
        getEvents();
    });


})();