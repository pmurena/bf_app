var frameModule = require("ui/frame");
var Activities = require("../../shared/view-models/activities-view-model");
var observableModule = require("data/observable")

var activities = new Activities([]);
var pageData = new observableModule.fromObject({
    activities: activities
});

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = pageData;
    activities.empty();
    activities.load();
};

exports.showActivity = function(args){
    frameModule.topmost().navigate({
        moduleName: "views/activity/activity",
        context: activities.getItem(args.index)
    });
};

exports.newActivity = function(){
    frameModule.topmost().navigate("views/newActivity/newActivity");
};


exports.showProfile = function(){
    frameModule.topmost().navigate("views/profile/profile");
};
