(function() {
	var isAdmin = true;

	if (isAdmin) {
        var adminValues = document.getElementsByClassName("edit");
        for (var i = 0; i < adminValues.length; i++) {
            var editImage = document.createElement("img");
            editImage.setAttribute("src", "../images/edit.png");
            adminValues[i].appendChild(editImage);
            editImage.addEventListener("click", function (e) {
                showModal(e);
            }, false);
        }
    }


    function showModal(editImage) {
    	var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];

        var newStuff = "Header: ";
        var newStuffDesc = "Description: ";

        var newStuffInput = document.createElement("textarea");
        newStuffInput.setAttribute("rows", "1");
        newStuffInput.setAttribute("cols", "20");
        newStuffInput.innerHTML = editImage.srcElement.parentElement.innerHTML.split("<")[0];

        var descInput = document.createElement("textarea");
        descInput.setAttribute("rows", "4");
        descInput.setAttribute("cols", "20");
        descInput.innerHTML = editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(2)")[0].innerHTML;

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
        submit.addEventListener("click", )

        
        function submitChanges(header, description) {
            
        }
    }


})();