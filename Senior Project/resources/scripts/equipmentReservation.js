function setup() {
	// var addButton = document.getElementById("calendar-add-button");
	// addButton.addEventListener("click", function() {addNewCalendar("calendar1", "calendar-modal-")});

	var select = document.getElementById("calendar-selector");
	select.onchange = function() {
		var selIndex = select.selectedIndex + 1;
		console.log(selIndex);
		var selValue = $('select option:nth-child(' + selIndex + ')').val();
		console.log(selValue);
		var calendarToSelect = document.getElementById(selValue);
		console.log(calendarToSelect);
		switchCalendarView(calendarToSelect);
	}

	var dataset = document.getElementById("calendar2").dataset;
}

 function addNewCalendar(dataElementId, targetIdRoot) {
	console.log("whatup tho");
	var dataset = document.getElementById(dataElementId).dataset;
	for (attr in dataset) {
		var textField = document.getElementById(targetIdRoot + attr);
		if (textField == undefined) { continue; }
		textField.value = dataset[attr];

		console.log(textField);
	}

	/*var nameField = document.getElementById(targetIdRoot + "name");
	nameField.value = dataset.name;
	
	var descriptionField = document.getElementById(targetIdRoot + "desc");
	descriptionField.value = dataset.desc; //*/
}

function switchCalendarView(calendarToView) {
	console.log("I'm happening!");
	var calendarFrame = document.getElementById("calendar-wrapper");
	if (calendarToView == null) {
		calendarFrame.innerHTML = "";
		return;
	}
	console.log(calendarFrame);
	console.log(calendarToView);
	console.log(calendarToView.getAttribute("data-embed"));

	calendarFrame.innerHTML = calendarToView.getAttribute("data-embed");

};

$(document).ready(function() {
	setup();
}); 
