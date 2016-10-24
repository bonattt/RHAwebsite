(function () {
    var isAdmin = true;

    if (isAdmin) {
        var adminValues = document.getElementsByClassName("edit");
        console.log(adminValues.length);
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
        modal.style.display = "block";
        // editImage.srcElement.setAttribute("src", "");
        var parent = editImage.srcElement.parentElement.innerHTML;
        var split = parent.split(" - ");
        console.log(split);
        document.getElementById("officerTitle").innerHTML = split[1];
        document.getElementById("name").innerHTML += split[0];
        console.log(editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(3)")[0].textContent);
        document.getElementById("email").innerHTML += editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(3)")[0].textContent.split(" ")[1];
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