(function() {
	var isAdmin = true;

	if (isAdmin) {
        var adminValues = document.getElementsByClassName("edit");
        for (var i = 0; i < adminValues.length; i++) {
            var editImage = document.createElement("img");
            editImage.setAttribute("src", "../images/edit.png");
            editImage.style.cssText = "float: right;";
            adminValues[i].appendChild(editImage);
            editImage.addEventListener("click", function (e) {
                showModal(e);
            }, false);
        }
    }


    function showModal(editImage) {
    	var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];

        var parent = editImage.srcElement.parentElement.parentElement;
        var committee = "Committee: ";
        var description = description = "Description: ";

        var committeeInput = document.createElement("textarea");
        committeeInput.setAttribute("rows", "1");
        committeeInput.setAttribute("cols", "20");
        committeeInput.setAttribute("placeholder", parent.querySelectorAll(":nth-child(1)")[0].textContent);

        var descInput = document.createElement("textarea");
        descInput.setAttribute("rows", "4");
        descInput.setAttribute("cols", "30");
        descInput.setAttribute("placeholder", parent.querySelectorAll(":nth-child(2)")[0].textContent);

        var committeeNode = document.getElementById("committeeInput");
        var descNode = document.getElementById("descInput");


       	document.getElementById("committeeName").innerHTML = committee;
       	committeeNode.appendChild(committeeInput);
       	document.getElementById("description").innerHTML = description;
       	descNode.appendChild(descInput);


        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
            committeeNode.removeChild(committeeNode.firstChild);
            descNode.removeChild(descNode.firstChild);

        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            	committeeNode.removeChild(committeeNode.firstChild);
            	descNode.removeChild(descNode.firstChild);

            }
        }
    }

})();