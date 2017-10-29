var Firebase = require('firebase');
var FirebaseRef = new Firebase("https://sabps-cd1b7.firebaseio.com");

var usersRef = FirebaseRef.child("Users");
usersRef.set({
	manolis: {
		age: "21"
	}
});