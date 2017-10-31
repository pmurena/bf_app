var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var fetchModule = require("fetch");
var config = require("../config");


function Activities(items){
    var viewModel = new ObservableArray(items);
    viewModel.load = function(){
        return fetch(config.apiUrl + "hello")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                viewModel.push(data);
            });
    };
    return viewModel;
}

module.exports = Activities;
