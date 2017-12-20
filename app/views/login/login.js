var frameModule = require("ui/frame");
var LoginViewModel = require("../../shared/view-models/login-view-model");
var appSettings = require("application-settings");
var dialogsModule = require("ui/dialogs");

var page;
var login = new LoginViewModel();

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = login;
    //appSettings.remove("token");
    //appSettings.remove("id");
    if ((isAlreadyLoggedIn())) {
    	console.log("Already logged in with id: " + appSettings.getString("id"));
    	frameModule.topmost().navigate("views/activities/activities");
    } else {
    	console.log("Not logged in yet");
    }
};

exports.signIn = function() {
	// TODO: Check username & password with API and get access token
	console.log("Logging in with username: " + login.username + " and password: " + login.password);
    //frameModule.topmost().navigate("views/activities/activities");
    if (login.username == "" || login.password == "") {
    	dialogsModule.alert({
    		message: "Please fill in all the fields.",
    		okButtonText: "OK"
    	});
    	frameModule.topmost().navigate("views/activities/activities");
    } else {
    	completeLogin();
    }
};

exports.signUp = function() {
    frameModule.topmost().navigate("views/signup/signup");
};

function isAlreadyLoggedIn() {
	if (appSettings.hasKey("token") || appSettings.hasKey("id")) {
		return true;
	} else {
		return false;
	}
}

function completeLogin() {
    login.login()
	.then(function() {
		dialogsModule.alert("Successfully logged in!")
		.then(function() {
			frameModule.topmost().navigate("views/activities/activities");
		});
	}).catch(function(error) {
		console.log(error);
		dialogsModule.alert({
			message: "Sadly the login failed, try again!",
			okButtonText: "OK"
		});
	})
}