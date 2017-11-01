var observableModule = require("data/observable")
var frameModule = require("ui/frame");

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = page.navigationContext;
};

exports.newActivity = function(){
    frameModule.topmost().navigate("views/newActivity/newActivity");
};
