var committeeMap = new Object();
var committeeID;

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
		var editButtons = insertEditButtons(function() {});
    }
    var addCommitteeButton = document.getElementById("addCommittee");
    addCommitteeButton.addEventListener("click", showEmptyModal);
    //addCommitteeButton.style.display = "block";
    return;
}

var setupEditModal = function(dataElementId) {
	var dataset = document.getElementById(dataElementId).dataset;
	
	var nameField = document.getElementById("committee-modal-name");
	nameField.value = dataset.name;
	
	var descriptionField = document.getElementById("committee-modal-desc");
	descriptionField.value = dataset.desc;
}

function setup() {

	var submitButton = document.getElementById("modal-submit");
	submitButton.addEventListener("click", function(event) {
		
		var committeeId = document.getElementById("everyCommitteeEver").dataset.id;
		var committeeName = document.getElementById("committee-modal-name").value;
		var committeeDesc = document.getElementById("committee-modal-desc").value;
		var committeeImg = document.getElementById("everyCommitteeEver").dataset.img;
		
		alert("TODO: add a database query here!\n" +
			"\n id: " + committeeId +
			"\n name: " + committeeName +
			"\n description: " + committeeDesc +
			"\n img: " + committeeImg
		);
	});
	
    var xhr = getCommittees();
    xhr.send();
    setTimeout(function () { createHTMLFromResponseText(xhr.responseText) }, 300);

    function createHTMLFromResponseText(committee) {
        committee = JSON.parse(committee);
        for (var i = 0; i < committee.length; i++) {
            committeeMap[committee[i].committeename] = committee[i].committeeid;
            if (i % 2 == 0) {
                var html = "<div class='committeeWrapperRight' id='committeeWrapperRight'>";
                html += "<div class='committees'><h3 class='edit'>" + committee[i].committeename + "</h3>";
                html += "<p>" + committee[i].description + "</p></div>";
                html += "<image class='committeePhoto' src=" + committee[i].image + " alt=" + committee[i].committeename + "></div>";
            } else {
                var html = "<div class='committeeWrapperLeft' id='committeeWrapperLeft'>";
                html += "<image class='committeePhoto' src=" + committee[i].image + " alt=" + committee[i].committeename + ">";
                html += "<div class='committees'><h3 class='edit'>" + committee[i].committeename + "</h3>";
                html += "<p>" + committee[i].description + "</p></div></div>";
            }

            var committees = document.getElementById("committees");
            committees.innerHTML += html;
        }

        var officersxhr = getOfficers();
        officersxhr.send();
        setTimeout(function () { setAdmin(officersxhr.responseText) }, 300);
    }

    function getCommittees() {
        var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/committees';
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
        return xhr;
    }
}


function showEmptyModal() {
    console.log("that one");
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];

    var committee = "Committee: ";
    var description = "Description: ";
    var image = "Image: ";

    var committeeInput = document.createElement("textarea");
    committeeInput.setAttribute("rows", "1");
    committeeInput.setAttribute("cols", "30");

    var descInput = document.createElement("textarea");
    descInput.setAttribute("rows", "4");
    descInput.setAttribute("cols", "30");

    var imageInput = document.createElement("textarea");
    imageInput.setAttribute("rows", "1");
    imageInput.setAttribute("cols", "30");

    var committeeNode = document.getElementById("committeeInput");
    var descNode = document.getElementById("descInput");
    var imageNode = document.getElementById("imageInput");


    document.getElementById("committeeName").innerHTML = committee;
    committeeNode.appendChild(committeeInput);
    document.getElementById("description").innerHTML = description;
    descNode.appendChild(descInput);
    document.getElementById("image").innerHTML = image;
    imageNode.appendChild(imageInput);


    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        committeeNode.removeChild(committeeNode.firstChild);
        descNode.removeChild(descNode.firstChild);
        imageNode.removeChild(imageNode.firstChild);

    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            committeeNode.removeChild(committeeNode.firstChild);
            descNode.removeChild(descNode.firstChild);
            imageNode.removeChild(imageNode.firstChild);

        }
    }
}

function showModal(editImage) {
	var srcEvent = (editImage.srcElement || editImage.target);
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];

    var parent = srcEvent.parentElement.parentElement;
    var committee = "Committee: ";
    var description = "Description: ";
    var image = "Image: ";

    var committeeInput = document.createElement("textarea");
    committeeInput.setAttribute("rows", "1");
    committeeInput.setAttribute("cols", "30");
    committeeInput.setAttribute("id", "committee-text");

    var descInput = document.createElement("textarea");
    descInput.setAttribute("rows", "4");
    descInput.setAttribute("cols", "30");
    descInput.setAttribute("id", "description-text");

    var imageInput = document.createElement("textarea");
    imageInput.setAttribute("rows", "1");
    imageInput.setAttribute("cols", "30");
    imageInput.setAttribute("id", "image-text");

    var committeeNode = document.getElementById("committeeInput");
    var descNode = document.getElementById("descInput");
    var imageNode = document.getElementById("imageInput");

    if (parent.parentElement.id == "committeeWrapperRight") {
        committeeInput.innerHTML = parent.querySelectorAll(":nth-child(1)")[0].textContent;
        committeeID = committeeMap[parent.querySelectorAll(":nth-child(1)")[0].textContent];
        descInput.innerHTML = parent.querySelectorAll(":nth-child(2)")[0].textContent;
        imageInput.innerHTML = parent.nextSibling.currentSrc.split("images/committees/")[1];
    } else {
        committeeInput.innerHTML = parent.querySelectorAll(":nth-child(1)")[0].textContent;
        committeeID = committeeMap[parent.querySelectorAll(":nth-child(1)")[0].textContent];
        descInput.innerHTML = parent.querySelectorAll(":nth-child(2)")[0].textContent;
        imageInput.innerHTML = parent.previousSibling.currentSrc.split("images/committees/")[1];
    }


    var submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", submit);

}

function submit(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    saveCommittee();
    location.reload();
}

function saveCommittee() {
var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/committee/' + committeeID;
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
var committeeName = document.getElementById("committee-text").value;
var description = document.getElementById("description-text").value;
var image = "images/committees/" + document.getElementById("image-text").value;
xhr.send(JSON.stringify({ committeename: committeeName, description: description, image: image }));
return xhr;

}


$(document).ready(function() {
    setup();
});