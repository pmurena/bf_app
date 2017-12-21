var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var fetchModule = require("fetch");
var config = require("../config");

function Profile(items){
  var viewModel = new observableModule.fromObject({
    username: "tomasz",
    firstname: "Thomas",
    lastname: "Kolonko",
    description: "Bacon ipsum dolor amet brisket beef sausage pastrami swine. Bresaola swine cupim boudin ham hock hamburger ham pork chop. Tongue burgdoggen turkey beef ribs andouille pig bresaola pork jowl pancetta tail pork chop capicola. Salami drumstick corned beef venison strip steak biltong.",
    canton: "Bern",
    country: "Switzerland",
    email: "asdf@asdf.com",
    website: "yolo.com",
    phone: "078 788 88 88"
  })
//  viewModel.load = function(){
//        console.log(config.apiUrl + "user/" + name)
//        return fetch(config.apiUrl + "user/" + name)
//            .then(function(response){
//                return response.json();
//            })
//            .then(function(data){
//                console.log("data")
//                data.forEach(function(user){
//                  console.log(usr)
//                  viewModel.push({
//                    name: activity.name,
//                    description: activity.description
//                  });
//                });
//            })
//            .catch(function(error) {
//              console.log(error);
//            });
//  };

  viewModel.empty = function() {
    while (viewModel.length) {
      viewModel.pop();
    }
  };
  return viewModel;
}

module.exports = Profile;
