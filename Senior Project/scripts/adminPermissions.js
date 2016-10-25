(function () {
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
        var nameAndTitle = editImage.srcElement.parentElement.innerHTML;

        var parent = editImage.srcElement.parentElement.parentElement;

        nameAndTitle = nameAndTitle.split(" - ");
        // var name = "Name: " + nameAndTitle[0];
        var name = "Name: "; 
        var title = "Title: " + nameAndTitle[1].split("<")[0];
        var email = "Email: ";
        var phoneNumber = "Phone number: ";
        var room = "Room number: " + parent.querySelectorAll(":nth-child(5)")[0].textContent.split(": ")[1];
        var cm = null;

        var nameInput = document.createElement("textarea");
        nameInput.setAttribute("rows", "1");
        nameInput.setAttribute("cols", "20");
        nameInput.setAttribute("placeholder", nameAndTitle[0]);


        var emailInput = document.createElement("textarea");
        emailInput.setAttribute("rows", "1");
        emailInput.setAttribute("cols", "20");
        emailInput.setAttribute("placeholder", parent.querySelectorAll(":nth-child(3)")[0].textContent.split(" ")[1]);

        var phnNumInput = document.createElement("textarea");
        phnNumInput.setAttribute("rows", "1");
        phnNumInput.setAttribute("cols", "20");
        phnNumInput.setAttribute("placeholder", parent.querySelectorAll(":nth-child(4)")[0].textContent.split(": ")[1]);
        // console.log()

        var CMInput = null;
        if (parent.querySelectorAll(":nth-child(6)")[0]) { 
            cm = "CM: ";
            CMInput = document.createElement("textarea");
            CMInput.setAttribute("rows", "1");
            CMInput.setAttribute("cols", "20");
            CMInput.setAttribute("placeholder", parent.querySelectorAll(":nth-child(6)")[0].textContent.split(": ")[1]);
        } else {
            //do nothing
        }
        // console.log(editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(4)")[0].textContent);


        var nameNode = document.getElementById("nameInput");
        var emailNode = document.getElementById("emailInput");
        var phnNode = document.getElementById("phnNumInput");
        var CMNode = document.getElementById("CMInput");


        document.getElementById("officerTitle").innerHTML = title;
        document.getElementById("name").innerHTML = name;
        nameNode.appendChild(nameInput);
        document.getElementById("email").innerHTML = email;
        emailNode.appendChild(emailInput);
        document.getElementById("phnNum").innerHTML = phoneNumber;
        phnNode.appendChild(phnNumInput);
        document.getElementById("CM").innerHTML = cm;
        if(CMInput) {
            CMNode.appendChild(CMInput);
        }


        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
            nameNode.removeChild(nameNode.firstChild);
            emailNode.removeChild(emailNode.firstChild);
            phnNode.removeChild(phnNode.firstChild);
            if(CMNode.firstChild) {
                CMNode.removeChild(CMNode.firstChild);
            }

        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                nameNode.removeChild(nameNode.firstChild);
                emailNode.removeChild(emailNode.firstChild);
                phnNode.removeChild(phnNode.firstChild);
                if(CMNode.firstChild) {
                    CMNode.removeChild(CMNode.firstChild);
                }
            }
        }
    }






})();