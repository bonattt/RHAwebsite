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
            var urlExtension = 'attendance/';
            
            var files = document.getElementById("csvFile").files;

            var reader = new FileReader();

            reader.onload = function (e) {
                var result = reader.result.split("\n").sort();

                var xhr = xhrPostRequest(urlExtension);

                xhr.onreadystatechange = function (e) {
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        location.reload();
                    }
                };
                xhr.send(JSON.stringify({ membersToUpdate: result }));
            clearSubmitHandlers(submitBtn);
            return xhr;
            };

            reader.readAsText(files[0]);

            document.getElementById("csvFile").value = '';
        }
        submitBtn.addEventListener('click', submitAttendanceSubmit);
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