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
        var name = "Name: " + nameAndTitle[0];
        var title = "Title: " + nameAndTitle[1].split("<")[0];
        var email = "Email: " + parent.querySelectorAll(":nth-child(3)")[0].textContent.split(" ")[1];
        var phoneNumber = "Phone number: " + parent.querySelectorAll(":nth-child(4)")[0].textContent.split(": ")[1];
        var room = "Room number: " + parent.querySelectorAll(":nth-child(5)")[0].textContent.split(": ")[1];
        var cm = null;

        if (parent.querySelectorAll(":nth-child(6)")[0]) { 
            cm = "CM: " + parent.querySelectorAll(":nth-child(6)")[0].textContent.split(": ")[1];
        } else {
            //do nothing
        }
        // console.log(editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(4)")[0].textContent);

        document.getElementById("name").innerHTML = name;
        document.getElementById("officerTitle").innerHTML = title;
        document.getElementById("email").innerHTML = email;
        document.getElementById("phnNum").innerHTML = phoneNumber;
        document.getElementById("CM").innerHTML = cm;

        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }






})();