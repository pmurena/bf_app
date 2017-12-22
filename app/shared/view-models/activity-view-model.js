var observableModule = require("data/observable");
var fetchModule = require("fetch");
var config = require("../config");
var appSettings = require("application-settings");

function Activity(info) {
	info = info || {};

	var viewModel = new observableModule.fromObject({
        name: info.name || "", 
        description: info.description || "",
        location: info.location || "",
        date: info.date || "",
        time: info.time || "",
        tag: info.tag || ""
    });

    viewModel.save = function() {
    	return fetchModule.fetch(config.apiUrl + "activities", {
    		method: "POST",
    		body: JSON.stringify({
                name: viewModel.get("name"), 
                description: viewModel.get("description"),
                location: viewModel.get("location"),
                date: viewModel.get("date"),
                time: viewModel.get("time"),
                tag: viewModel.get("tag"),
                users: [],
                img: viewModel.get("img") || "http://old.lhep.unibe.ch/cyclotron/bern_728x490.jpg"
    		}),
    		headers: {
    			"Content-Type": "application/json",
                "Authorization": "Bearer " + appSettings.getString("token")
    		}
    	})
    	.then(handleErrors)
    	.then(function(response) {
    		return response.json();
    	})
    	.then(function(data) {
    		// Save user token
    		console.log("Added activity: " + data.name);
    	})
    }

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = Activity;