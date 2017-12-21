var observableModule = require("data/observable");
var fetchModule = require("fetch");
var config = require("../config");
var appSettings = require("application-settings");

function Profile(id){
  if(id === undefined){
    id = appSettings.getString("id")
  }
  var viewModel = observableModule.fromObject({
    id: id || "",
    username: "",
    firstname: "",
    lastname: "",
    description: "",
    canton: "",
    country: "",
    email: "",
    website: "",
    phone: ""
  });

  viewModel.load = function(){
        return fetch(config.apiUrl + "myProfile", {
          method: "POST",
      		body: JSON.stringify({
      			"userToken": appSettings.getString("token")
      		}),
      		headers: {
      			"Content-Type": "application/json",
            'Authorization': 'Bearer ' + appSettings.getString("token")
      		}
      	})
        .then(function(response){
            return response.json();
        })
        .then(function(data){
          viewModel.id = data._id || ""
          viewModel.username = data.username || "";
          viewModel.firstname = data.firstname || "";
          viewModel.lastname = data.lastname || "";
          viewModel.description = data.description || "";
          viewModel.canton = data.canton || "";
          viewModel.country = data.country || "";
          viewModel.email = data.email || "";
          viewModel.website = data.website || "";
          viewModel.phone = data.phon || "";
          console.log(viewModel.id)
        })
        .catch(function(error) {
          console.log(error);
        });
  };

  viewModel.empty = function() {
    while (viewModel.length) {
      viewModel.pop();
    }
  };


  viewModel.save = function(){
    fetch(config.apiUrl + "myProfile/edit", {
      method: "POST",
      body: JSON.stringify({
        "token": appSettings.getString("token") || "",
        "_id": appSettings.getString("id") || "",
        "username": viewModel.username || "",
        "firstname": viewModel.firstname || "",
        "lastname": viewModel.lastname || "",
        "description": viewModel.description || "",
        "canton": viewModel.canton || "",
        "country": viewModel.country || "",
        "email": viewModel.email || "",
        "website": viewModel.website || "",
        "phone": viewModel.phone || ""
      }),
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + appSettings.getString("token")
      }
    })
  };

  return viewModel;
}

module.exports = Profile;
