var frameModule = require("ui/frame");
var SignupViewModel = require("../../shared/view-models/signup-view-model");
var dialogsModule = require("ui/dialogs");

var page;
var signup = new SignupViewModel();

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = signup;
};

exports.signUp = function() {
	// TODO: Check if user credentials already taken and get access token
	console.log("Signing up with username: " + signup.username + " and email: " + signup.email + " and password: " + signup.password);
    //frameModule.topmost().navigate("views/activities/activities");
    if (signup.username == "" || signup.email == "" || signup.password == "" || signup.password_confirm == "") {
    	dialogsModule.alert({
    		message: "Please fill in all the fields.",
    		okButtonText: "OK"
    	});
    } else {
    	if (signup.password.length < 6) {
    		dialogsModule.alert({
	    		message: "Please choose a password with 6 or more characters.",
	    		okButtonText: "OK"
	    	});
    	} else {
    		completeSignup();
    	}
    }
};

function completeSignup() {
	signup.register()
	.then(function() {
		dialogsModule.alert("Successfully signed up. Welcome!")
		.then(function() {
			frameModule.topmost().navigate("views/activities/activities");
		});
	}).catch(function(error) {
		console.log(error);
		dialogsModule.alert({
			message: "Sadly we were unable to create your account, try again!",
			okButtonText: "OK"
		});
	})
}