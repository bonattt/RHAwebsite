function setAdmin(officers) {    
    if (userIsOfficer(officers)) {
        setupSubmitAttendanceButton();
        var cancelBtn = document.getElementById('modal-cancel');
        cancelBtn.addEventListener('click', function() {
            document.getElementById("csvFile").value = '';
        });
    }
    return;
}

function setupSubmitAttendanceButton() {
    var addCommitteeBtn = document.getElementById("submitAttendance");
    addCommitteeBtn.style.display = "block"; //*/
    addCommitteeBtn.addEventListener('click', function() {       
        
        var submitBtn = document.getElementById('modal-submit')
        var submitAttendanceSubmit = function (e) {
            var urlExtension = 'committee/';
            var photoAPIURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: '') + '/api/v1/committeePhoto';
            var photoXhr = new XMLHttpRequest();
            var files = document.getElementById("imageFile").files;

            var formData = new FormData();
            formData.append("imageFile", files[0]);
            photoXhr.open('POST', photoAPIURL, true);

            photoXhr.onreadystatechange = function (e) {
                if(photoXhr.readyState == 4 && photoXhr.status == 200) {
                    var image_path = JSON.parse(photoXhr.responseText).filepath;
                    var xhr = xhrPostRequest(urlExtension);

                    xhr.onreadystatechange = function (e) {
                        if(xhr.readyState == 4 && xhr.status == 200) {
                            location.reload();
                        }
                    };
                    xhr.send(JSON.stringify({ committeeName: committeeName.value, description: committeeDesc.value, image: image_path }));
                    clearSubmitHandlers(submitBtn);
                    return xhr;
                }
            };
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

$(document).ready(function() {
    var officersxhr = getOfficers();
    officersxhr.onload = () => { setAdmin(officersxhr.responseText) }
    officersxhr.send();
});