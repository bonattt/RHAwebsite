(function() {
    var proposal = [{
	name: "King's Island",
	cost_to_attendee: 10.50,
	event_date: "2016-11-10",
	event_signup_open: "2016-11-01",
	event_signup_close: "2016-11-04",
	image_path: "../images/kingsIsland.jpg",
	description: "newFakeEvent",
	proposer_id: 44,
	week_proposed: 5,
	quarter_proposed: 1,
	money_requested: 750,
	approved: true
},
{
	name: "King's Island",
	cost_to_attendee: 10.50,
	event_date: "2016-11-10",
	event_signup_open: "2016-11-01",
	event_signup_close: "2016-11-04",
	image_path: "../images/kingsIsland.jpg",
	description: "newFakeEvent",
	proposer_id: 44,
	week_proposed: 5,
	quarter_proposed: 1,
	money_requested: 750,
	approved: true
},
{
	name: "King's Island",
	cost_to_attendee: 10.50,
	event_date: "2016-11-10",
	event_signup_open: "2016-11-01",
	event_signup_close: "2016-11-04",
	image_path: "../images/kingsIsland.jpg",
	description: "newFakeEvent",
	proposer_id: 44,
	week_proposed: 5,
	quarter_proposed: 1,
	money_requested: 750,
	approved: true
},
{
	name: "King's Island",
	cost_to_attendee: 10.50,
	event_date: "2016-11-10",
	event_signup_open: "2016-11-01",
	event_signup_close: "2016-11-04",
	image_path: "../images/kingsIsland.jpg",
	description: "newFakeEvent",
	proposer_id: 44,
	week_proposed: 5,
	quarter_proposed: 1,
	money_requested: 750,
	approved: true
}];

    for(var i=0; i<proposal.length; i++){
        console.log("hey there, cutie ;)")
        var html = "<div class='event'><a href='sign-ups'>";
        html += "<img src=" + proposal[0].image_path + " alt='Event' class='eventImage'>";
        html += "<div class='eventText'><h2>" + proposal[0].name + "</h2>";
        html += "<p>" + proposal[0].event_date + "</p></div></a></div>";

        var sidebar = document.getElementById("sidebarTitle");
        console.log(sidebar.innerHTML);
        console.log(sidebar.innerHTML += html);
        sidebar.innterHTML += html; 
    }
})();

(function() {
	var isAdmin = true;
    var hasListener = false;
    var whatsnew = {};

	if (isAdmin) {
        var adminValues = document.getElementsByClassName("edit");
        for (var i = 0; i < adminValues.length; i++) {
            var editImage = document.createElement("img");
            editImage.setAttribute("src", "../images/edit.png");
            editImage.style.cssText = "float: right;";
            // adminValues[i].appendChild(editImage);
            adminValues[i].insertBefore(editImage, adminValues[i].firstChild);
            editImage.addEventListener("click", function (e) {
                showModal(e);
            }, false);
        }
    }

    function getFrontPageNews() {

    }

    function inputHandler(property, value) {
        console.log(value);
        whatsnew[property] = value;
        $('#title').text(whatsnew.title);
        $('#shownDescription').text(whatsnew.shownDescription);
    }

    function showModal(editImage) {
    	var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];
        var img = editImage.srcElement.innerHTML;
        var div = editImage.srcElement.parentElement;

        var newStuff = "Header: ";
        var newStuffDesc = "Description: ";

        var newStuffInput = document.createElement("textarea");
        newStuffInput.setAttribute("rows", "1");
        newStuffInput.setAttribute("cols", "20");
        newStuffInput.setAttribute("name", "");
        newStuffInput.innerHTML = div.querySelectorAll(":nth-child(2)")[0].innerHTML;
        // whatsnew["title"] = newStuffInput.innerHTML;

        var descInput = document.createElement("textarea");
        descInput.setAttribute("rows", "4");
        descInput.setAttribute("cols", "20");
        descInput.innerHTML = div.querySelectorAll(":nth-child(3)")[0].innerHTML;
        // whatsnew["shownDescription"] = descInput.innerHTML;

        var whatsnewNode = document.getElementById("whatsnewInput");
        var descNode = document.getElementById("descInput");

        document.getElementById("whatsnew").innerHTML = newStuff;
        whatsnewNode.appendChild(newStuffInput);
        document.getElementById("description").innerHTML = newStuffDesc;
        descNode.appendChild(descInput);

        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
            whatsnewNode.removeChild(whatsnewNode.firstChild);
            descNode.removeChild(descNode.firstChild);

        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                whatsnewNode.removeChild(whatsnewNode.firstChild);
                descNode.removeChild(descNode.firstChild);

            }
        }


        var submit = document.getElementById("submit");
        submit.style.cssText = "height: 10%; width: 25%; font-size: 14px; float: right; color: black; margin-right: 40%;";
        new_submit=submit.cloneNode(true);
        new_submit.addEventListener("click", function() {
            submitChanges(newStuffInput, descInput)
        }, false);
        submit.parentNode.replaceChild(new_submit, submit);


        
        function submitChanges(header, description) {
            div.querySelectorAll(":nth-child(2)")[0].innerHTML = header.value;
            div.querySelectorAll(":nth-child(3)")[0].innerHTML = description.value;

            modal.style.display = "none";
            whatsnewNode.removeChild(whatsnewNode.firstChild);
            descNode.removeChild(descNode.firstChild);
        }
    }


})();