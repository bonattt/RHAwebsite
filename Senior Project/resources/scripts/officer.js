(function () {
    "use strict";
    var apiUrl = "http://localhost:8000/";
    var officer;
    var editForm = false;
    // FormsFields will be used when creating the forms
    var formFields = [
        { name: "firstName", des: "First Name *", type: "text", required: true },
        { name: "lastName", des: "Last Name *", type: "text", required: true },
        { name: "email", des: "Email", type: "email", required: false },
        { name: "homePhone", des: "Home Phone", type: "tel", required: false },
        { name: "cellPhone", des: "Cell Phone", type: "tel", required: false },
        { name: "birthDay", des: "Birth Day", type: "date", required: false },
        { name: "website", des: "wWbsite", type: "url", required: false },
        { name: "address", des: "Address", type: "text", required: false }
    ];

    // Load contact from browser session storage
    function loadOfficer() {
        var error = false;
        var contactToUpdateString;
        try {
            contactToUpdateString = sessionStorage.getItem("contactToUpdate");
        } catch (e) {
            alert("Error when reading from Session Storage " + e);
            error = true;
            window.location = "index.html";
            return false;
        }
        if (!error) {
            contact = JSON.parse(contactToUpdateString);
            $('#contactName').text(contact.firstName + " " + contact.lastName);
        }
    }

    // Update contact and display name on input change
    function inputHandler(property, value) {
        console.log(value);
        contact[property] = value;
        $('#contactName').text((contact.firstName || " ") + " " + (contact.lastName || " "));
    }

    // Add update button and delete button
    function addUpdateAndDeleteButtons(formElement) {
        formElement.append('<button type="submit" id="update-contact-button"> Update Contact </button>');
        $('#update-contact-button').click(function (e) {
            e.preventDefault(); // Prevent querystring from showing up in address bar
            saveContact();
        });

        formElement.append('<button type="submit" id="delete-contact-button"> Delete Contact </button>');
        $('#delete-contact-button').click(function (e) {
            e.preventDefault(); // Prevent querystring from showing up in address bar
            deleteContact();
        });
    }

    // Add create new contact button
    function addNewButton(formElement) {
        formElement.append('<button type="submit" id="new-contact-button"> Create New Contact </button>');
        $('#new-contact-button').click(function (e) {
            e.preventDefault(); // Prevent querystring from showing up in address bar
            createContact();
        });
    }

    // populate the contact form with the necessary fields
    function createForm() {
        var formElement = $("[name='contactForm']").empty();
        // Add form elements and their event listeners
        formFields.forEach(function (formField) {
            var labelElement = $("<label>")
                .attr("for", formField.name)
                .text(formField.des);
            formElement.append(labelElement);
            var inputElement = $("<input>")
                .attr("type", formField.type)
                .attr("name", formField.name)
                .attr("value", (contact[formField.name] || ""));
            if (formField.required) {
                inputElement.prop("required", true).attr("aria-required", "true");
            }
            formElement.append(inputElement);
            inputElement.on('input', function () {
                var thisField = $(this);
                inputHandler(formField.name, thisField.val());
            });
            // clear the horizontal and vertical space next to the 
            // previous element
            formElement.append('<div style="clear:both"></div>');
        });
        if (editForm) {
            addUpdateAndDeleteButtons(formElement);
        } else {
            addNewButton(formElement);
        }

    }

    // make ajax call to update this contact
    function saveOfficer() {
        $.ajax({
            url: apiUrl + contact._id,
            type: 'PUT',
            data: contact,
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    //redirect to index.html
                    window.location.href = './index.html';
                    return false;
                } else {
                    console.log("Contact not successfully updated");
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        });
        return;
    }

    // make ajax call to add new contact to db
    function createOfficer() {
        $.ajax({
            url: apiUrl,
            type: 'POST',
            data: contact,
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    //redirect to index.html
                    window.location.href = './index.html';
                    return false;
                } else {
                    console.log('Contact could not be created.');
                }
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        })
    }

    // make ajax call to delete this contact
    function deleteOfficer() {
        $.ajax({
            url: apiUrl + contact._id,
            type: 'DELETE',
            data: contact,
            dataType: 'JSON',
            success: function () {
                window.location.href = './index.html';
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        })
    }

    $(document).ready(function () {
        //load contact data from browser storage if editing contact
        if (window.location.pathname.indexOf('update.html') > -1) {
            editForm = true;
            loadContact();
        } else {
            contact = {};
        }
        createForm();
    });

})();

function addEvent(){
        var modal = document.getElementById('editModal');
        var span = document.getElementsByClassName("closeEdit")[0];

        var name = "Event name: ";
        var price = "Price: ";
        var image = "Image: ";
        var description = "Description: ";
        var signUpCloseDate = "Sign-up close date: ";

        var nameInput = document.createElement("textarea");
        nameInput.setAttribute("rows", "1");
        nameInput.setAttribute("cols", "30");

        var priceInput = document.createElement("textarea");
        priceInput.setAttribute("rows", "1");
        priceInput.setAttribute("cols", "30");

        var descriptionInput = document.createElement("textarea");
        descriptionInput.setAttribute("rows", "4");
        descriptionInput.setAttribute("cols", "30");

        var signUpCloseDateInput = document.createElement("textarea");
        signUpCloseDateInput.setAttribute("rows", "1");
        signUpCloseDateInput.setAttribute("cols", "30");

        var imageInput = document.createElement("textarea");
        imageInput.setAttribute("rows", "1");
        imageInput.setAttribute("cols", "30");

        var nameNode = document.getElementById("nameInput");
        var priceNode = document.getElementById("priceInput");
        var imageNode = document.getElementById("imageInput");
        var descriptionNode = document.getElementById("descriptionInput");
        var signUpCloseDateNode = document.getElementById("signUpCloseDateInput");


        document.getElementById("name").innerHTML = name;
        nameNode.appendChild(nameInput);
        document.getElementById("price").innerHTML = price;
        priceNode.appendChild(priceInput);
        document.getElementById("image").innerHTML = image;
        imageNode.appendChild(imageInput);
        document.getElementById("description").innerHTML = description;
        descriptionNode.appendChild(descriptionInput);
        document.getElementById("signUpCloseDate").innerHTML = signUpCloseDate;
        signUpCloseDateNode.appendChild(signUpCloseDateInput);


        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
            nameNode.removeChild(nameNode.firstChild);
            priceNode.removeChild(priceNode.firstChild);
            imageNode.removeChild(imageNode.firstChild);
            descriptionNode.removeChild(descriptionNode.firstChild);
            signUpCloseDateNode.removeChild(signUpCloseDateNode.firstChild);

        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                nameNode.removeChild(nameNode.firstChild);
                priceNode.removeChild(priceNode.firstChild);
            imageNode.removeChild(imageNode.firstChild);
                descriptionNode.removeChild(descriptionNode.firstChild);
                signUpCloseDateNode.removeChild(signUpCloseDateNode.firstChild);
            }
        }
}

	<div id="editModal" class="modal">
		<div class="modal-content">
			<span class="closeEdit">x</span>
			<table class="modalTable">
				<tr>
					<td id="name" class="title"></td>
					<td id="nameInput" class="textArea"></td>
				</tr>
				<tr>
					<td id="price" class="title"></td>
					<td id="priceInput" class="textArea"></td>
				</tr>
				<tr>
					<td id="image" class="title"></td>
					<td id="imageInput" class="textArea"></td>
				</tr>
				<tr>
					<td id="description" class="title"></td>
					<td id="descriptionInput" class="textArea"></td>
				</tr>
				<tr>
					<td id="signUpCloseDate" class="title"></td>
					<td id="signUpCloseDateInput" class="textArea"></td>
				</tr>
			</table>
		</div>
	</div>