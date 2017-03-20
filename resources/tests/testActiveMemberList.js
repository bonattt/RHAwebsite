$.holdReady(true);

var sampleMember = {
    "user_id": 201,
    "username": "mikew",
    "firstname": "Mike",
    "lastname": "Wasowski",
    "hall": "Apartments E 1",
    "image": null,
    "membertype": null,
    "active": false,
    "trip_eligible": false,
    "meet_attend": {
      "Q1": [0,1,1,0,1,1,1,1,0,0,0,0],
      "Q2": [1,0,0,1,1,1,0,1,0],
      "Q3": [0,0]
    },
    "cm": null,
    "phone_number": null,
    "room_number": null
  }

window.onload = function() {
	QUnit.test( "", function( assert ) {
	  //showModal();
	  assert.ok( 1 == "1", "Sample Test Case!" );
	});

}