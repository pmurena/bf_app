var frameModule = require("ui/frame");
var observableModule = require("data/observable");

var page;

var loginCredentials = new observableModule.fromObject({
    email: "",
    password: ""
});

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = loginCredentials;
};

exports.signIn = function() {
	// TODO: Check username & password with API and get access token
	console.log("Loggin in with email: " + loginCredentials.email + " and password: " + loginCredentials.password);
    frameModule.topmost().navigate("views/activities/activities");
};

exports.signUp = function() {
    frameModule.topmost().navigate("views/signup/signup");
};
