(function() {
    var officer = [{
	username: "cookmn",
	firstname: "Allison",
	lastname: "Cook",
	hall: "none",
	memberType: "President",
	active: true,
	trip_eligible: true,
    email: "cookmn@rose-hulman.edu",
    phoneNumber: "(812) 230-9401",
    roomNumber: "Skinner2A",
    boxNumber: "2863"
},
{
	username: "cookmn",
	firstname: "Morgan",
	lastname: "Cook",
	hall: "none",
	memberType: "Vice President",
	active: true,
	trip_eligible: true,
    email: "cookmn@rose-hulman.edu",
    phoneNumber: "(812) 230-9401",
    roomNumber: "Skinner2A",
    boxNumber: "2863"
},
{
	username: "cookmn",
	firstname: "Morgan",
	lastname: "Cook",
	hall: "none",
	memberType: "",
	active: true,
	trip_eligible: true,
    email: "cookmn@rose-hulman.edu",
    phoneNumber: "(812) 230-9401",
    roomNumber: "Skinner2A",
    boxNumber: "2863"
},
{
	username: "cookmn",
	firstname: "Morgan",
	lastname: "Cook",
	hall: "none",
	memberType: "NCC",
	active: true,
	trip_eligible: true,
    email: "cookmn@rose-hulman.edu",
    phoneNumber: "(812) 230-9401",
    roomNumber: "Skinner2A",
    boxNumber: "2863"
},
{
	username: "cookmn",
	firstname: "Morgan",
	lastname: "Cook",
	hall: "none",
	memberType: "Service",
	active: true,
	trip_eligible: true,
    email: "cookmn@rose-hulman.edu",
    phoneNumber: "(812) 230-9401",
    roomNumber: "Skinner2A",
    boxNumber: "2863"
}];

    for(var i=0; i<officer.length; i++){
        if(officer[i].memberType != ""){
        var html = "<div class='officer'>";
        html += "<h3 class='edit'>" + officer[i].firstname + " " + officer[i].lastname + " - " + officer[i].memberType + "</h3>";
        html += "<img src='../images/officers/" + removeSpaces(officer[i].memberType.toLowerCase()) + ".jpg' alt='" + officer[i].memberType +  "'height='294' width='195'>";
        html += "<p>Email: <a href='mailto:'" + officer[i].email +">" + officer[i].email + "</a></p>";
        html += "<p> Phone Number: " + officer[i].phoneNumber + "</p>";
        html += "<p> Room: " + officer[i].roomNumber + "</p>";
        html += "<p>Box #: " + officer[i].boxNumber + "</p>";

        var officers = document.getElementById("officers");
        console.log(officers.innerHTML);
        officers.innerHTML += html;

        }
    }
})();

function removeSpaces(thingToRemoveSpacesFrom){
    return thingToRemoveSpacesFrom.replace(" ","");
}

(function () {
    var isAdmin = true;


    if (isAdmin) {
        var adminValues = document.getElementsByClassName("edit");
        for (var i = 0; i < adminValues.length; i++) {
            var editImage = document.createElement("img");
            editImage.setAttribute("src", "../images/edit.png");
            adminValues[i].appendChild(editImage);
            editImage.addEventListener("click", function (e) {
                showModal(e);
            }, false);
        }
    }


    function showModal(editImage) {
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];
        var nameAndTitle = editImage.srcElement.parentElement.innerHTML;

        var parent = editImage.srcElement.parentElement.parentElement;

        nameAndTitle = nameAndTitle.split(" - ");
        // var name = "Name: " + nameAndTitle[0];
        var name = "Name: "; 
        var title = "Title: ";
        var email = "Email: ";
        var phoneNumber = "Phone number: ";
        var room = "Room number: " + parent.querySelectorAll(":nth-child(5)")[0].textContent.split(": ")[1];
        var cm = null;

        var titleInput = document.createElement("textarea");
        titleInput.setAttribute("rows", "1");
        titleInput.setAttribute("cols", "30");
        titleInput.innerHTML = nameAndTitle[1].split("<")[0];

        var nameInput = document.createElement("textarea");
        nameInput.setAttribute("rows", "1");
        nameInput.setAttribute("cols", "30");
        nameInput.innerHTML = nameAndTitle[0];

        //This is how to get the image
        //console.log(parent.firstChild.nextElementSibling.querySelectorAll(":nth-child(1)")[0].currentSrc);


        var emailInput = document.createElement("textarea");
        emailInput.setAttribute("rows", "1");
        emailInput.setAttribute("cols", "30");
        emailInput.innerHTML = parent.querySelectorAll(":nth-child(3)")[0].textContent.split(": ")[1];
        console.log(parent.querySelectorAll(":nth-child(3)")[0].textContent);

        var phnNumInput = document.createElement("textarea");
        phnNumInput.setAttribute("rows", "1");
        phnNumInput.setAttribute("cols", "30");
        phnNumInput.innerHTML = parent.querySelectorAll(":nth-child(4)")[0].textContent.split(": ")[1];

        var CMInput = null;
        if (parent.querySelectorAll(":nth-child(6)")[0]) { 
            cm = "CM: ";
            CMInput = document.createElement("textarea");
            CMInput.setAttribute("rows", "1");
            CMInput.setAttribute("cols", "30");
            CMInput.innerHTML = parent.querySelectorAll(":nth-child(6)")[0].textContent.split(": ")[1];
        }


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
        if(CMInput) {
            CMNode.appendChild(CMInput);
        }
        if(document.getElementById("CM")) {
            document.getElementById("CM").innerHTML = cm;
        }


        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
            nameNode.removeChild(nameNode.firstChild);
            emailNode.removeChild(emailNode.firstChild);
            phnNode.removeChild(phnNode.firstChild);
            titleNode.removeChild(titleNode.firstChild);
            if(CMNode.firstChild) {
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
                if(CMNode.firstChild) {
                    CMNode.removeChild(CMNode.firstChild);
                }
            }
        }
    }




})();

function showModal(){
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
        if(CMInput) {
            CMNode.appendChild(CMInput);
        }
        if(document.getElementById("CM")) {
            document.getElementById("CM").innerHTML = cm;
        }


        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
            nameNode.removeChild(nameNode.firstChild);
            emailNode.removeChild(emailNode.firstChild);
            phnNode.removeChild(phnNode.firstChild);
            titleNode.removeChild(titleNode.firstChild);
            if(CMNode.firstChild) {
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
                if(CMNode.firstChild) {
                    CMNode.removeChild(CMNode.firstChild);
                }
            }
        }
}