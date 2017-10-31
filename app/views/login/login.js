var frameModule = require("ui/frame");

var page;

exports.loaded = function(args){
    page = args.object;
    frameModule.topmost().navigate("views/activities/activities");
};
