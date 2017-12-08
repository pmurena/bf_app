var frameModule = require("ui/frame");
var SignupViewModel = require("../../shared/view-models/signup-view-model");

var page;
var signup = new SignupViewModel();

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = signup;
};

exports.signUp = function() {
	// TODO: Check if user credentials already taken and get access token
	console.log("Signing up with username: " + signup.username + " and email: " + signup.email + " and password: " + signup.password);
    frameModule.topmost().navigate("views/activities/activities");
};