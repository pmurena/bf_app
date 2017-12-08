var frameModule = require("ui/frame");

var page;

exports.loaded = function(args){
    page = args.object;
};

exports.signUp = function() {
	// TODO: Check if user credentials already taken and get access token
    frameModule.topmost().navigate("views/activities/activities");
};