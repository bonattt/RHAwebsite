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
        newStuffInput.innerHTML = div.querySelectorAll(":nth-child(2)")[0].innerHTML;

        var descInput = document.createElement("textarea");
        descInput.setAttribute("rows", "4");
        descInput.setAttribute("cols", "20");
        descInput.innerHTML = div.querySelectorAll(":nth-child(3)")[0].innerHTML;

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