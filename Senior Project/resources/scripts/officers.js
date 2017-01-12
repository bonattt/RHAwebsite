var officerMap = new Object();
var editName;
const API_EXTENSION = '';



function setAdmin(officers) {
    if (userIsOfficer(officers)) {
		var editbuttons = insertEditButtons(
                    'officer',
                    'officers-modal-',
                    'user_id',
                    function(json_data, put_id) {
            var apiUrl = 'member/' + put_id
            var xhr = xhrPutRequest(apiUrl);
            alert('sending API put request...\napi url: "' + apiUrl + '"');
            xhr.send(JSON.stringify({"memberType": json_data.membertype}));
        });
    }
    var addOfficeButton = document.getElementById("addOfficer");
    addOfficeButton.addEventListener("click", showEmptyModal);
    //addOfficeButton.style.display = "block";
}


function setup() {
	
	/*enableSubmitButton("everyOfficerEver", "officers-modal-", function(json) {
		editName = json.firstname + ' ' + json.lastname
		console.log("editName: " + editName);
		var officerID = officerMap[editName];
		console.log("oficerID: " + officerID);
		// console.log("officerMap: ");
		// console.log(officerMap);
		var urlExtension = 'member/' + officerID;
		var xhr = xhrPutRequest(urlExtension);
		console.log("email: " + json.email);
		json.username = json.email.split("@")[0];
		console.log("username: " + json.username);
		alert(JSON.stringify(json));
		// xhr.send(JSON.stringify(json));
		// location.reload();
	});*/

    var officerId;

    var xhr = xhrGetRequest('officers');
    xhr.send();
    setTimeout(function () { createHTMLFromResponseText(xhr.responseText) }, 300);

    function createHTMLFromResponseText(officer) {
        officer = JSON.parse(officer);

        for (var i = 0; i < officer.length; i++) {
            if (officer[i].memberType != "") {
                var html = "<div class='officer'>";
                html += "<h3 class='edit' id='officer" + officer[i].user_id + "'>" 
				
				html += officer[i].firstname + " " + officer[i].lastname + " - " + officer[i].membertype
				html += "</h3>";
                html += "<img src='../images/officers/" + officer[i].membertype.toLowerCase().replace(" ", "") + ".jpg' alt='" + officer[i].membertype + "'height='294' width='195'>";
                html += "<p>Email: <a href='mailto:" + officer[i].username + "@rose-hulman.edu'>" + officer[i].username + "@rose-hulman.edu</a></p>";
                html += "<p> Phone Number: " + officer[i].phone_number + "</p>";
                html += "<p> Room: " + officer[i].hall + " " + officer[i].room_number + "</p>";
                html += "<p>Box #: " + officer[i].cm + "</p>";

                officerMap[officer[i].username] = officer[i].user_id;

                var officers = document.getElementById("officers");
                officers.innerHTML += html;
				
				var dataset = document.getElementById('officer' + officer[i].user_id).dataset;
				var fields = ["user_id", "firstname", "lastname", "username",
					"membertype", "phone_number", "room_number", "hall", "cm"];
                console.log("about to set fields");
				fields.forEach(function(field){
                    console.log("setting field " + field + " to " + officer[i][field]);
					dataset[field] = officer[i][field];
				});
            }
        }
        var officersxhr = getOfficers();
        officersxhr.onload = function () {
            setAdmin(officersxhr.responseText);
        } 
        officersxhr.send(); 
        // setTimeout(function () { setAdmin(officersxhr.responseText) }, 300); // */
    }
}

function addDataset(fields, officer) {
	
}

function showEmptyModal() {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    var name = "Name: ";
    var title = "Title: ";
    var email = "Email: ";
    var phoneNumber = "Phone number: ";
    var room = "Room number: ";
    var cm = "CM: ";

    var titleInput = document.createElement("textarea");
    titleInput.setAttribute("rows", "1");
    titleInput.setAttribute("cols", "30");

    var nameInput = document.createElement("textarea");
    nameInput.setAttribute("rows", "1");
    nameInput.setAttribute("cols", "30");


    var emailInput = document.createElement("textarea");
    emailInput.setAttribute("rows", "1");
    emailInput.setAttribute("cols", "30");

    var phnNumInput = document.createElement("textarea");
    phnNumInput.setAttribute("rows", "1");
    phnNumInput.setAttribute("cols", "30");

    var CMInput = document.createElement("textarea");
    CMInput.setAttribute("rows", "1");
    CMInput.setAttribute("cols", "30");


    var nameNode = document.getElementById("nameInput");
    var emailNode = document.getElementById("emailInput");
    var phnNode = document.getElementById("phnNumInput");
    var CMNode = document.getElementById("CMInput");
    var titleNode = document.getElementById("titleInput");


    titleNode.appendChild(titleInput);
    document.getElementById("title").innerHTML = title;
    nameNode.appendChild(nameInput);
    document.getElementById("name").innerHTML = name;
    emailNode.appendChild(emailInput);
    document.getElementById("email").innerHTML = email;
    phnNode.appendChild(phnNumInput);
    document.getElementById("phnNum").innerHTML = phoneNumber;
    if (CMInput) {
        CMNode.appendChild(CMInput);
    }
    if (document.getElementById("CM")) {
        document.getElementById("CM").innerHTML = cm;
    }

    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        nameNode.removeChild(nameNode.firstChild);
        emailNode.removeChild(emailNode.firstChild);
        phnNode.removeChild(phnNode.firstChild);
        titleNode.removeChild(titleNode.firstChild);
        if (CMNode.firstChild) {
            CMNode.removeChild(CMNode.firstChild);
        }
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            nameNode.removeChild(nameNode.firstChild);
            emailNode.removeChild(emailNode.firstChild);
            phnNode.removeChild(phnNode.firstChild);
            titleNode.removeChild(titleNode.firstChild);
            if (CMNode.firstChild) {
                CMNode.removeChild(CMNode.firstChild);
            }
        }
    }
}
function saveOfficer() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    var fullname = document.getElementById("fullname").value;
    var officerID = officerMap[editName];
    var urlExtension = 'member/' + officerID;
    var xhr = xhrPutRequest(urlExtension);
   
    var titleText = document.getElementById("title-input-field").value;
    var emailText = document.getElementById("email-text").value;
    var phoneText = document.getElementById("phone-text").value;
    var hallText = document.getElementById("room-text").value.split(" ")[0];
    var roomText = document.getElementById("room-text").value.split(" ")[1];
    var cmText = document.getElementById("cm-text").value;

    var firstName = fullname.split(" ")[0];
    var lastName = fullname.split(" ")[1];
    var username = emailText.split("@")[0];
    console.log(roomText);
    xhr.send(JSON.stringify({ membertype: titleText, firstname: firstName, lastname: lastName, username: username, phone_number: phoneText, cm: cmText, room_number: roomText, hall: hallText }));
    location.reload();
    return xhr;
}
function showModal(editImage) {
	var eventSrc = (editImage.target || editImage.srcElement);
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    var nameAndTitle = eventSrc.parentElement.innerHTML;

    var parent = eventSrc.parentElement.parentElement;

    nameAndTitle = nameAndTitle.split(" - ");
    editName = nameAndTitle[0];
    // var name = "Name: " + nameAndTitle[0];
    var name = "Name: ";
    var title = "Title: ";
    var email = "Email: ";
    var phoneNumber = "Phone number: ";
    var room = "Room number: ";
    var cm = null;

    var titleInput = document.createElement("textarea");
    titleInput.setAttribute("rows", "1");
    titleInput.setAttribute("cols", "30");
    titleInput.setAttribute("id", "title-input-field");
    titleInput.innerHTML = nameAndTitle[1].split("<")[0];

    var nameInput = document.createElement("textarea");
    nameInput.setAttribute("rows", "1");
    nameInput.setAttribute("cols", "30");
    nameInput.setAttribute("id", "fullname");
    nameInput.innerHTML = nameAndTitle[0];


    var emailInput = document.createElement("textarea");
    emailInput.setAttribute("rows", "1");
    emailInput.setAttribute("cols", "30");
    emailInput.setAttribute("id", "email-text");
    emailInput.innerHTML = parent.querySelectorAll(":nth-child(3)")[0].textContent.split(": ")[1];

    var phnNumInput = document.createElement("textarea");
    phnNumInput.setAttribute("rows", "1");
    phnNumInput.setAttribute("cols", "30");
    phnNumInput.setAttribute("id", "phone-text");
    phnNumInput.innerHTML = parent.querySelectorAll(":nth-child(4)")[0].textContent.split(": ")[1];

    var roomInput = document.createElement("textarea");
    roomInput.setAttribute("rows", "1");
    roomInput.setAttribute("cols", "30");
    roomInput.setAttribute("id", "room-text");
    roomInput.innerHTML = parent.querySelectorAll(":nth-child(5)")[0].textContent.split(": ")[1];


    cm = "CM: ";
    CMInput = document.createElement("textarea");
    CMInput.setAttribute("rows", "1");
    CMInput.setAttribute("cols", "30");
    CMInput.setAttribute("id", "cm-text");
    CMInput.innerHTML = parent.querySelectorAll(":nth-child(6)")[0].textContent.split(": ")[1];


    var nameNode = document.getElementById("nameInput");
    var emailNode = document.getElementById("emailInput");
    var phnNode = document.getElementById("phnNumInput");
    var roomNode = document.getElementById("roomInput");
    var CMNode = document.getElementById("CMInput");
    var titleNode = document.getElementById("titleInput");


    titleNode.appendChild(titleInput);
    document.getElementById("title").innerHTML = title;
    nameNode.appendChild(nameInput);
    document.getElementById("name").innerHTML = name;
    emailNode.appendChild(emailInput);
    document.getElementById("email").innerHTML = email;
    phnNode.appendChild(phnNumInput);
    document.getElementById("phnNum").innerHTML = phoneNumber;
    roomNode.appendChild(roomInput);
    document.getElementById("room").innerHTML = room;
    if (CMInput) {
        CMNode.appendChild(CMInput);
    }
    if (document.getElementById("CM")) {
        document.getElementById("CM").innerHTML = cm;
    }

    var modalContent = document.getElementsByClassName("modal-content")[0];

    var submitButton = document.createElement("button");
    submitButton.setAttribute("id", "submit");
    submitButton.setAttribute("class", "modalButton");
    submitButton.innerHTML = "Submit";
    submitButton.addEventListener("click", function () { saveOfficer() }, false);

    modalContent.appendChild(submitButton);

    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        nameNode.removeChild(nameNode.firstChild);
        emailNode.removeChild(emailNode.firstChild);
        phnNode.removeChild(phnNode.firstChild);
        titleNode.removeChild(titleNode.firstChild);
        roomNode.removeChild(roomNode.firstChild);
        if (CMNode.firstChild) {
            CMNode.removeChild(CMNode.firstChild);
        }
        modalContent.removeChild(submitButton);
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            nameNode.removeChild(nameNode.firstChild);
            emailNode.removeChild(emailNode.firstChild);
            phnNode.removeChild(phnNode.firstChild);
            titleNode.removeChild(titleNode.firstChild);
            roomNode.removeChild(roomNode.firstChild);
            if (CMNode.firstChild) {
                CMNode.removeChild(CMNode.firstChild);
            }
            modalContent.removeChild(submitButton);
        }
    }
}

$(document).ready(function() {
    setup();
});
