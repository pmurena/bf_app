var frameModule = require("ui/frame");
var observableModule = require("data/observable");

var page;

var signUpCredentials = new observableModule.fromObject({
    username: "",
    email: "",
    password: "",
    password_confirm: ""
});

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = signUpCredentials;
};

exports.signUp = function() {
	// TODO: Check if user credentials already taken and get access token
	console.log("Signing up with username: " + signUpCredentials.username + " and email: " + signUpCredentials.email + " and password: " + signUpCredentials.password);
    frameModule.topmost().navigate("views/activities/activities");
};