var frameModule = require("ui/frame");
var Activities = require("../../shared/view-models/activities-view-model");
var observableModule = require("data/observable")

var activity = new Activities([]);

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = activity;
};

exports.createActivity = function(){
    activity.save();
    frameModule.topmost().navigate("views/activities/activities");
};
