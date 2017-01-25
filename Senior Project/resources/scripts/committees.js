var committeeMap = new Object();
var committeeID;

function setAdmin(officers) {    
    if (userIsOfficer(officers)) {
        setupAddCommitteeButton();
		var editButtons = insertEditButtons('committee', 'committee-modal-', 'committeeid',
                function(json_data, put_id) {
            // *** this is where I'm working ***
            var apiUrl = 'committee/' + put_id
            var xhr = xhrPutRequest(apiUrl);
            var body = {"description": json_data.description, "committeename": json_data.committeename} // , "committeeName": "test committee"};
            xhr.onload = function() { location.reload() };
            xhr.send(JSON.stringify(body));
        });
        var deleteBtn = document.getElementById('confirm-delete');
        deleteBtn.addEventListener('click', function() {
            // "selected_element_id" global decleared in adminPermission.js ... sorry about that... :(
            var element = document.getElementById(selected_element_id); 
            var deleteid = element.dataset.committeeid;
            
            var apiExtension = 'committee/' + deleteid
            var xhr = xhrDeleteRequest(apiExtension);
            xhr.onload = function () {location.reload()}
            xhr.send();
        });
    }
    return;
}

function setupAddCommitteeButton() {

    var addCommitteeBtn = document.getElementById("addCommittee");
    addCommitteeBtn.style.display = "block"; //*/
    addCommitteeBtn.addEventListener('click', function() {
        var deleteBtn = document.getElementById('modal-delete');
        deleteBtn.disabled = true;        
        var committeeName = document.getElementById('committee-modal-committeename')
        committeeName.value = '';
        var committeeDesc = document.getElementById('committee-modal-description')
        committeeDesc.value = '';
        var submitBtn = document.getElementById('modal-submit')
        var addCommitteeSubmit = function() {
            var urlExtension = 'committee/';
            var json_data = {"committeeName": committeeName.value, "description": committeeDesc.value};
            var xhr = xhrPostRequest(urlExtension);
            xhr.onload = function() {location.reload()};
            xhr.send(JSON.stringify(json_data));            
            clearSubmitHandlers(submitBtn);
        }
        submitBtn.addEventListener('click', addCommitteeSubmit);
        var addCommitteeCancel = function () {
            clearSubmitHandlers(submitBtn);
            cancelBtn.removeEventListener('click', addCommitteeCancel);
        }
        var cancelBtn = document.getElementById('modal-cancel');
        cancelBtn.addEventListener('click', function() {
            // nothing right now
        });        
    });
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