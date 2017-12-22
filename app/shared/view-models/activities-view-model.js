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
                        id: activity._id,
                        name: activity.name,
                        location: activity.location,
                        description: activity.description,
                        tag: activity.tag || "Random",
                        datetime: activity.date + " " + activity.time,
                        usercount: "Attending: " + activity.users.length,
                        img: activity.img || "http://old.lhep.unibe.ch/cyclotron/bern_728x490.jpg",
                        users: activity.users,
                        likes: activity.upvotedBy,
                        dislikes: activity.downvotedBy
                    });
                });
            });
    };

    viewModel.save = function(){
        fetch(config.apiUrl + "activities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                name: viewModel.name, 
                description: viewModel.description,
                location: viewModel.location,
                date: viewModel.date,
                time: viewModel.time,
                tag: viewModel.tag
            })
        });
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    viewModel.sayHello = function() {
        console.log("Hello!");
    }


    return viewModel;
}

module.exports = Activities;
