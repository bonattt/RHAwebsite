function getLoginInfo() {
			var str = 'username: "';
			str += document.getElementById('username-input').value;
			str += '", password: "';
			str += document.getElementById('password-input').value;
			return str + '"';
		}
	
		function handleClick(event)
		{
			alert(getLoginInfo());
			return false; // prevent further bubbling of event
		}