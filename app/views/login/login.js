var frameModule = require("ui/frame");
var LoginViewModel = require("../../shared/view-models/login-view-model");

var page;
var login = new LoginViewModel();

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = login;
};

exports.signIn = function() {
	// TODO: Check username & password with API and get access token
	console.log("Loggin in with email: " + login.email + " and password: " + login.password);
    frameModule.topmost().navigate("views/activities/activities");
};

exports.signUp = function() {
    frameModule.topmost().navigate("views/signup/signup");
};
