var committeeMap = new Object();
var committeeID;

function setAdmin(officers) {    
    if (userIsOfficer(officers)) {
        setupAddCommitteeButton();
		var editButtons = insertEditButtons('committee', 'committee-modal-', 'committeeid',
                function(json_data, put_id) {
            saveCommittee(json_data);
        }); 
        var deleteConfirm = document.getElementById('confirm-delete');
        deleteConfirm.addEventListener('click', function() {
            // "selected_element_id" global decleared in adminPermission.js ... sorry about that... :(
            var element = document.getElementById(selected_element_id); 
            var deleteid = element.dataset.committeeid;
            
            var apiExtension = 'committee/' + deleteid
            var xhr = xhrDeleteRequest(apiExtension);
            xhr.onload = function () {location.reload()}
            xhr.send();
            document.getElementById("imageFile").value = '';
        });
        var cancelBtn = document.getElementById('modal-cancel');
        cancelBtn.addEventListener('click', function() {
            document.getElementById("imageFile").value = '';
        });
        var deleteBtn = document.getElementById('modal-delete');
        deleteBtn.addEventListener('click', function() {
            document.getElementById("imageFile").value = '';
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
        var addCommitteeSubmit = function (e) {
            var photoXhr = new PhotoPostXhr('committeePhoto');
            var urlExtension = 'committee/';
            var postXhr = xhrPostRequest(urlExtension);
            postXhr.onload = function() { location.reload(); }
            var json_data = { 'committeeName': committeeName.value, 'description': committeeDesc.value};
            photoXhr.xhrCallback(postXhr, json_data, 'image');
            var files = document.getElementById("imageFile").files;
            var formData = new FormData();
            formData.append("imageFile", files[0]);
//            photoXhr.open('POST', photoAPIURL, true);
//
//            photoXhr.onreadystatechange = function (e) {
//                if(photoXhr.readyState == 4 && photoXhr.status == 200) {
//                    var image_path = JSON.parse(photoXhr.responseText).filepath;
//                    var xhr = xhrPostRequest(urlExtension);
//
//                    xhr.onreadystatechange = function (e) {
//                        if(xhr.readyState == 4 && xhr.status == 200) {
//                            location.reload();
//                        }
//                    };
//                    xhr.send(JSON.stringify({ committeeName: committeeName.value, description: committeeDesc.value, image: image_path }));
//                    clearSubmitHandlers(submitBtn);
//                    return xhr;
//                }
//            };
            photoXhr.send(formData);
            document.getElementById("imageFile").value = '';
        }
        submitBtn.addEventListener('click', addCommitteeSubmit);
        var addCommitteeCancel = function () {
            clearSubmitHandlers(submitBtn);
            cancelBtn.removeEventListener('click', addCommitteeCancel);
        }
        var cancelBtn = document.getElementById('modal-cancel');
        cancelBtn.addEventListener('click', function() {
            // do nothing.
        });        
    });
}

function clearImageForm() {
    var formData = new FormData();

}

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
                html += "<image class='committeePhoto' id=image" + id + " src=" + committee[i].image + " alt=" + committee[i].committeename + "></div>";
            } else {
                var html = "<div class='committeeWrapperLeft'>";
                html += "<image class='committeePhoto' id=image" + id + " src=" + committee[i].image + " alt=" + committee[i].committeename + ">";
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
        officersxhr.onload = () => { setAdmin(officersxhr.responseText) }
        officersxhr.send();
    }
}

function saveCommittee(data) {
    alert('this is the code we use!');
    var urlExtension = 'committee/' + data.committeeid;
    var xhr = xhrPutRequest(urlExtension);
    var files = document.getElementById("imageFile").files;
    console.log(files);
    xhr.onload = function () { location.reload() };

    if(files.length > 0) {
        var photoAPIURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: '') + '/api/v1/committeePhoto';
        var photoXhr = new XMLHttpRequest();
        var formData = new FormData();
        formData.append("imageFile", files[0]);
        photoXhr.open('POST', photoAPIURL, true);
        photoXhr.onreadystatechange = function (e) {
            var delPhotoXhr = new XMLHttpRequest();
            delPhotoXhr.open('DELETE', photoAPIURL, true);
            if(photoXhr.readyState == 4 && photoXhr.status == 200) {     
                var image_path = JSON.parse(photoXhr.responseText).filepath;
                delPhotoXhr.send(JSON.stringify({ tobaleet: data.image}));
                xhr.send(JSON.stringify({ committeename: data.committeename, description: data.description, image: image_path }));

            }
        }
        photoXhr.send(formData);
        var files = document.getElementById("imageFile").value = '';
    } else {
        xhr.send(JSON.stringify({ committeename: data.committeename, description: data.description}));
    }


    return xhr;

} 


$(document).ready(function() {
    setup();
});