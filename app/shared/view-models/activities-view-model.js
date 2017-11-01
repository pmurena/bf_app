var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var fetchModule = require("fetch");
var config = require("../config");


function Activities(items){
    var viewModel = new ObservableArray(items);
    viewModel.load = function(){
        return fetch(config.apiUrl + "activities")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                data.forEach(function(activity){
                    viewModel.push({
                        name: activity.name,
                        description: activity.description
                    });
                });
            });
    };

    viewModel.save = function(){
        fetch(config.apiUrl + "activities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: viewModel.name, description: viewModel.description})
        });
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };


    return viewModel;
}

module.exports = Activities;
