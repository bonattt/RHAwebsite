var committeeMap = new Object();
var committeeID;

function setAdmin(officers) {    
    if (userIsOfficer(officers)) {
		var editButtons = insertEditButtons('committee', 'committee-modal-', 'committeeid',
                function(json_data, put_id) {
            // *** this is where I'm working ***
            var apiUrl = 'committee/' + put_id
            var xhr = xhrPutRequest(apiUrl);
            var body = {"description": json_data.description, "committeename": json_data.committeename} // , "committeeName": "test committee"};
            xhr.onload = function() { location.reload() };
            xhr.send(JSON.stringify(body));
        });
    }
    var addCommitteeButton = document.getElementById("addCommittee");
    addCommitteeButton.addEventListener("click", showEmptyModal);
    //addCommitteeButton.style.display = "block";
    return;
}
/*
var setupEditModal = function(dataElementId, taretIdRoot) {
	var dataset = document.getElementById(dataElementId).dataset;
	
	var nameField = document.getElementById("committee-modal-name");
	nameField.value = dataset.name;
	
	var descriptionField = document.getElementById("committee-modal-desc");
	descriptionField.value = dataset.desc;
}   
*/
function setup() {
	var apiExtension = 'committees/';
	// enableSubmitButton("everyCommitteeEver", "committee-modal-", apiExtension);
	
	var urlExtension = 'committees';
    var xhr = xhrGetRequest(urlExtension);
    xhr.onload = function () { createHTMLFromResponseText(xhr.responseText) }
    xhr.send();
    // setTimeout(function () { createHTMLFromResponseText(xhr.responseText) }, 300);

    function createHTMLFromResponseText(committee) {
        committee = JSON.parse(committee);
        for (var i = 0; i < committee.length; i++) {
            var id = committee[i].committeeid
            committeeMap[committee[i].committeename] = id;
            if (i % 2 == 0) {
                var html = "<div class='committeeWrapperRight'>";
                html += "<div class='committees'><h3 class='edit' id='committee" + id + "'>" + committee[i].committeename + "</h3>";
                html += "<p>" + committee[i].description + "</p></div>";
                html += "<image class='committeePhoto' src=" + committee[i].image + " alt=" + committee[i].committeename + "></div>";
            } else {
                var html = "<div class='committeeWrapperLeft'>";
                html += "<image class='committeePhoto' src=" + committee[i].image + " alt=" + committee[i].committeename + ">";
                html += "<div class='committees'><h3 class='edit' id='committee" + id + "'>" + committee[i].committeename + "</h3>";
                html += "<p>" + committee[i].description + "</p></div></div>";
            }

            var committees = document.getElementById("committees");
            committees.innerHTML += html;
            
            var dataset = document.getElementById('committee' + id).dataset;
            var fields = ["committeename", "committeeid", "description", "image"]
            fields.forEach(function(field) {
                // console.log("setting field " + field + " to " + committee[i][field]);
                dataset[field] = committee[i][field];
            });
        }

        var officersxhr = getOfficers();
        officersxhr.send();
        setTimeout(function () { setAdmin(officersxhr.responseText) }, 300);
    }
}


// function showEmptyModal() {
//     console.log("that one");
//     var modal = document.getElementById('myModal');
//     var span = document.getElementsByClassName("close")[0];

//     var committee = "Committee: ";
//     var description = "Description: ";
//     var image = "Image: ";

//     var committeeInput = document.createElement("textarea");
//     committeeInput.setAttribute("rows", "1");
//     committeeInput.setAttribute("cols", "30");

//     var descInput = document.createElement("textarea");
//     descInput.setAttribute("rows", "4");
//     descInput.setAttribute("cols", "30");

//     var imageInput = document.createElement("textarea");
//     imageInput.setAttribute("rows", "1");
//     imageInput.setAttribute("cols", "30");

//     var committeeNode = document.getElementById("committeeInput");
//     var descNode = document.getElementById("descInput");
//     var imageNode = document.getElementById("imageInput");


//     document.getElementById("committeeName").innerHTML = committee;
//     committeeNode.appendChild(committeeInput);
//     document.getElementById("description").innerHTML = description;
//     descNode.appendChild(descInput);
//     document.getElementById("image").innerHTML = image;
//     imageNode.appendChild(imageInput);


//     modal.style.display = "block";
//     span.onclick = function () {
//         modal.style.display = "none";
//         committeeNode.removeChild(committeeNode.firstChild);
//         descNode.removeChild(descNode.firstChild);
//         imageNode.removeChild(imageNode.firstChild);

//     }
//     window.onclick = function (event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//             committeeNode.removeChild(committeeNode.firstChild);
//             descNode.removeChild(descNode.firstChild);
//             imageNode.removeChild(imageNode.firstChild);

//         }
//     }
// }

// function showModal(editImage) {
// 	var srcEvent = (editImage.srcElement || editImage.target);
//     var modal = document.getElementById('myModal');
//     var span = document.getElementsByClassName("close")[0];

//     var parent = srcEvent.parentElement.parentElement;
//     var committee = "Committee: ";
//     var description = "Description: ";
//     var image = "Image: ";

//     var committeeInput = document.createElement("textarea");
//     committeeInput.setAttribute("rows", "1");
//     committeeInput.setAttribute("cols", "30");
//     committeeInput.setAttribute("id", "committee-text");

//     var descInput = document.createElement("textarea");
//     descInput.setAttribute("rows", "4");
//     descInput.setAttribute("cols", "30");
//     descInput.setAttribute("id", "description-text");

//     var imageInput = document.createElement("textarea");
//     imageInput.setAttribute("rows", "1");
//     imageInput.setAttribute("cols", "30");
//     imageInput.setAttribute("id", "image-text");

//     var committeeNode = document.getElementById("committeeInput");
//     var descNode = document.getElementById("descInput");
//     var imageNode = document.getElementById("imageInput");

//     if (parent.parentElement.id == "committeeWrapperRight") {
//         committeeInput.innerHTML = parent.querySelectorAll(":nth-child(1)")[0].textContent;
//         committeeID = committeeMap[parent.querySelectorAll(":nth-child(1)")[0].textContent];
//         descInput.innerHTML = parent.querySelectorAll(":nth-child(2)")[0].textContent;
//         imageInput.innerHTML = parent.nextSibling.currentSrc.split("images/committees/")[1];
//     } else {
//         committeeInput.innerHTML = parent.querySelectorAll(":nth-child(1)")[0].textContent;
//         committeeID = committeeMap[parent.querySelectorAll(":nth-child(1)")[0].textContent];
//         descInput.innerHTML = parent.querySelectorAll(":nth-child(2)")[0].textContent;
//         imageInput.innerHTML = parent.previousSibling.currentSrc.split("images/committees/")[1];
//     }


//     var submitButton = document.getElementById("submit");
//     submitButton.addEventListener("click", submit);

// }

function submit(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    saveCommittee();
    window.location.reload();
}

function saveCommittee() {
    var urlExtension = 'committee/' + committeeID;
    
    var xhr = xhrPutRequest(urlExtension);
    var committeeName = document.getElementById("committee-text").value;
    var description = document.getElementById("description-text").value;
    var image = "images/committees/" + document.getElementById("image-text").value;
    xhr.send(JSON.stringify({ committeename: committeeName, description: description, image: image }));
    return xhr;

}


$(document).ready(function() {
    setup();
});