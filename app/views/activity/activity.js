var observableModule = require("data/observable")
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var config = require("../../shared/config");
var appSettings = require("application-settings");
var dialogsModule = require("ui/dialogs");

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
	dislikeActivity();
}

exports.voteUp = function() {
	console.log("voteUp");
	likeActivity();
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

function likeActivity() {
	if (!checkIfLiked()) {
		return fetchModule.fetch(config.apiUrl + "activities/" + page.bindingContext.id + "/upvoteActivity", {
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
			console.log("Successfully liked activity: " + data);
			dialogsModule.alert({
	    		message: "You now like this activity!",
	    		okButtonText: "OK"
	    	});
		})
	} else {
		dialogsModule.alert({
    		message: "You already like this activity. You can only like an activity once.",
    		okButtonText: "OK"
    	});
	}
}

function dislikeActivity() {
	if (!checkIfDisliked()) {
		return fetchModule.fetch(config.apiUrl + "activities/" + page.bindingContext.id + "/downvoteActivity", {
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
			console.log("Successfully disliked activity: " + data);
			dialogsModule.alert({
	    		message: "You now dislike this activity!",
	    		okButtonText: "OK"
	    	});
		})
	} else {
		dialogsModule.alert({
    		message: "You already dislike this activity. You can only dislike an activity once.",
    		okButtonText: "OK"
    	});
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

function checkIfLiked() {
	if (page.bindingContext.likes != undefined) {
		var myself = findObjectByKey(page.bindingContext.likes, "userID", appSettings.getString("id"));
		if (myself == undefined) {
			console.log("Not liked");
			return false;
		} else {
			console.log("liked");
			return true;
		}
	} else {
		console.log("Not liked");
		return false;
	}
}

function checkIfDisliked() {
	if (page.bindingContext.dislikes != undefined) {
		var myself = findObjectByKey(page.bindingContext.dislikes, "userID", appSettings.getString("id"));
		if (myself == undefined) {
			console.log("Not disliked");
			return false;
		} else {
			console.log("disliked");
			return true;
		}
	} else {
		console.log("Not disliked");
		return false;
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