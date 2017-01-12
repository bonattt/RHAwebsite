function setup() {
	var addButton = document.getElementById("calendar-add-button");
	addButton.addEventListener("click", function() {addNewCalendar("calendar1", "calendar-modal-")});

	var testButton = document.getElementById("test-calendar-button");
	var dataset = document.getElementById("calendar2").dataset;
	testButton.addEventListener("click", function() {switchCalendarView(dataset)});
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
	console.log(calendarFrame);
	console.log(calendarToView);
	console.log(calendarToView["embed"]);

	calendarFrame.innerHTML = calendarToView["embed"];

};

$(document).ready(function() {
	setup();
}); 
