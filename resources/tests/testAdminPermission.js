
window.onload = function() {
	var testOfficersJson = getSampleOfficers();
    // JSON.stringify(testOfficersJson);

	QUnit.test("userIsOfficer", function( assert ) {
	    var fakeLogin = getFakeLoginData();
        sessionStorage.setItem('userData', JSON.stringify(fakeLogin));
        assert.ok(userIsOfficer(JSON.stringify(testOfficersJson)), "officer user is officer");

        fakeLogin.username = 'something'
        sessionStorage.setItem('userData', JSON.stringify(fakeLogin));
        assert.ok(! userIsOfficer(JSON.stringify(testOfficersJson)), "user not logged in not officer");

        sessionStorage.removeItem('userData');
        assert.ok(! userIsOfficer(JSON.stringify(testOfficersJson)), "user not logged in not officer");

	});
}

function getSampleOfficers() {
    return [{
        "user_id": 10,
        "username": "test",
        "firstname": "Testy",
        "lastname": "Testerson",
        "hall": "TestHall",
        "image": "../images/officers/thing.jpeg",
        "membertype": "Test Chair",
        "cm": 9999,
        "phone_number": "911",
        "room_number": "611"
    }];
}

function getFakeLoginData() {
    return {
        "token": "notarealtoken",
        "name": "not a real name",
        "group": "not a real group",
        "email": "notanemail@fake.fake",
        "username": "test"
    }
}
