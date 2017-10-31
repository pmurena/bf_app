var Activities = require("../../shared/view-models/activities-view-model");
var observableModule = require("data/observable")

var activities = new Activities([]);
var pageData = new observableModule.fromObject({
    activities: activities
});

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = pageData;
    activities.load();
};
