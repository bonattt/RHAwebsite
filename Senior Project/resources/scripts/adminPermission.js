
var userIsOfficer = function(officers) {
	officer = JSON.parse(officers);
    var tempUser = JSON.parse(sessionStorage.getItem("userData"));
    for (var i = 0; i < officer.length; i++) {
        if (officer[i].username === tempUser.username) {
			return true;
		}
	}
	return false;
}

