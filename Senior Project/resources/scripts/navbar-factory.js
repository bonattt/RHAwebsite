window.onload = function () {
	document.getElementById('navBar').innerHTML =
		'    <a href="/" class="rha-image-link">' +
		'        <img src="./images/RHA.jpg" id="rha-image"></img>' +
		'    </a>' +
		'	<div id="links">' +
		'		<div class="dropdown">' +
		'			<button class="dropbtn">Events</button>' +
		'			<div class="dropdown-content">' +
		'				<a href="sign-ups">Sign-Ups</a>' +
		'				<a href="pastEvents">Past Events</a>' +
		'				<a href="proposals">Submit a Proposal</a>' +
		'			</div>' +
		'		</div>' +
		'		<div class="dropdown">' +
		'			<button class="dropbtn">Services</button>' +
		'			<div class="dropdown-content">' +
		'				<a href="subwayCam">Subway Cam</a>' +
		'			</div>' +
		'		</div>' +
		'		<div class="dropdown">' +
		'			<button class="dropbtn">Forms</button>' +
		'			<div class="dropdown-content">' +
		'				<a href="http://www.rose-hulman.edu/rha/downloads/RHA_Reimbursement_Form.xlsm">Reimbursement Form</a>' +
		'				<a href="http://www.rose-hulman.edu/rha/downloads/RHA_Payment_Form.xls">Payment Form</a>' +
		'			</div>' +
		'		</div>' +
		'		<div class="dropdown">' +
		'			<button class="dropbtn">Halls</button>' +
		'			<div class="dropdown-content">' +
		'				<a href="http://www.rose-hulman.edu/offices-and-services/student-life/campus-life/housing-and-residence-life.aspx">About Our Residence Halls</a>' +
		'				<a href="floorMoney">Floor Money</a>' +
		'			</div>' +
		'		</div>' +
		'		<div class="dropdown">' +
		'			<button class="dropbtn">About Us</button>' +
		'			<div class="dropdown-content">' +
		'				<a href="http://www.rose-hulman.edu/rha/constitution.pdf">Constitution</a>' +
		'				<a href="http://www.rose-hulman.edu/rha/procedural.pdf">Procedural Document</a>' +
		'				<a href="officers">Officers</a>' +
		'				<a href="committees">Committees</a>' +
		'				<a href="mailto:rhitrha@gmail.com">Contact Us</a>' +
		'			</div>' +
		'		</div>' +
		'	</div>' +
		'		<button id="login-button">Login</button>';


	var loginButton = document.getElementById("login-button");
	var user = JSON.parse(sessionStorage.getItem("userData"));
	if (user) {
		loginButton.innerHTML = "Logout";
	}
    const registryToken = "c8950f98-0c9c-485a-b0af-754208d11d08";
    $("#login-button").click(function () {
		if (loginButton.innerHTML == "Login") {
			login();
		} else {
			logout();
		}
    });

	function logout() {
		sessionStorage.clear();
		location.reload();
	}

	function login() {
		Rosefire.signIn(registryToken, function (error, rosefireUser) {
			if (error) {
				console.log("Error communicating with Rosefire", error);
				return;
			}
			var userData = JSON.stringify(rosefireUser);
			sessionStorage.setItem("userData", userData);
			location.reload();
			return;
		})
	}
}

