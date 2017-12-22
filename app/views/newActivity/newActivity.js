var frameModule = require("ui/frame");
var Activities = require("../../shared/view-models/activities-view-model");
var observableModule = require("data/observable")
var ActivityViewModel = require("../../shared/view-models/activity-view-model");
var dialogsModule = require("ui/dialogs");

var activity = new ActivityViewModel();

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = activity;
};

exports.createActivity = function(){
    activity.save()
    .then(function() {
		dialogsModule.alert("Successfully created activity!");
		frameModule.topmost().navigate("views/activities/activities");
	});
};
