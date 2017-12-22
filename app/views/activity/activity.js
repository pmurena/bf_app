var observableModule = require("data/observable")
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var config = require("../../shared/config");
var appSettings = require("application-settings");

var Data = new observableModule.fromObject({
    joinButtonText: "Joinnnn"
}); 

var joinButton;
var page;

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = page.navigationContext;
    joinButton = page.getViewById("joinButton");
    if(checkIfAttending()) {
    	joinButton.text = "Leave";
    } else {
    	joinButton.text = "Join";
    }
};

exports.newActivity = function(){
    frameModule.topmost().navigate("views/newActivity/newActivity");
};

exports.join = function() {
	console.log("Join");
	joinActivity();
}

exports.voteDown = function() {
	console.log("voteDown");
}

exports.voteUp = function() {
	console.log("voteUp");
}

function joinActivity() {
	if (!checkIfAttending()) {
		return fetchModule.fetch(config.apiUrl + "activities/" + page.bindingContext.id + "/signUp", {
			method: "POST",
			body: JSON.stringify({
				"userToken": appSettings.getString("token")
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
			console.log("Successfully joined activity: " + data);
			joinButton.text = "Leave";
		})
	} else {
		return fetchModule.fetch(config.apiUrl + "activities/" + page.bindingContext.id + "/signOff", {
			method: "POST",
			body: JSON.stringify({
				"userToken": appSettings.getString("token")
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
			console.log("Successfully left activity: " + data);
			joinButton.text = "Join";
		})
	}
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

function checkIfAttending() {
	var myself = findObjectByKey(page.bindingContext.users, "token", appSettings.getString("token"));
	if (myself == undefined) {
		console.log("Not attending");
		return false;
	} else {
		console.log("Attending");
		return true;
	}
}

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}