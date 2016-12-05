
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

var insertEditButtons = function(showModalFunc) {
    var adminValues = document.getElementsByClassName("edit");
	var buttonList = [];
    for (var i = 0; i < adminValues.length; i++) {
        var editButton = document.createElement("img");
        editButton.setAttribute("src", "../images/edit.png");
		editButton.addEventListener("click", showModalFunc, false);
		
		adminValues[i].appendChild(editButton);
		buttonList.push(editButton);
	}
}

var insertEditButtonsBefore = function(showModalFunc, attributes) {
    var adminValues = document.getElementsByClassName("edit");
	var buttonList = [];
    for (var i = 0; i < adminValues.length; i++) {
        var editButton = document.createElement("img");
        editButton.setAttribute("src", "../images/edit.png");
		if (attributes != undefined) {
			appendAttributes(editButton, attributes);
		}
		editButton.addEventListener("click", showModalFunc, false);
		adminValues[i].insertBefore(editButton, adminValues[i].firstChild);
		buttonList.push(editButton);
	}
}

var appendAttributes = function(element, attributes) {
	for (attr in attributes) {
		element.setAttribute(attr, attributes[attr]);
	}
}



