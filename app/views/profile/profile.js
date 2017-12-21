var frameModule = require("ui/frame");
var Profile = require("../../shared/view-models/profile-view-model");
var observableModule = require("data/observable")
var appSettings = require("application-settings");

var profile = new Profile();
var pageData = new observableModule.fromObject({
    profile,
    setEditable: false,
    editSwitch: "editOff",
    myProfile: profile.id == appSettings.getString("id") ? true: false
});

exports.loaded = function(args){
  page = args.object;
  page.bindingContext = pageData;
  profile.load();
};

exports.edit = function(){
  if(pageData.setEditable){
    page.bindingContext.set("editSwitch", "editOff");
    page.bindingContext.set('setEditable', false);
    profile.save()
  }else{
    page.bindingContext.set("setEditable", true);
    page.bindingContext.set("editSwitch", "editOn");
  }
}
