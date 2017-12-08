var frameModule = require("ui/frame");

var page;

exports.loaded = function(args){
    page = args.object;
};

exports.signIn = function() {
    frameModule.topmost().navigate("views/activities/activities");
};

exports.signUp = function() {
    frameModule.topmost().navigate("views/signup/signup");
};
