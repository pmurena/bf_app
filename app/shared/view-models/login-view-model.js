var observableModule = require("data/observable");
var fetchModule = require("fetch");
var config = require("../config");
var appSettings = require("application-settings");

function Login(info) {
	info = info || {};

	var viewModel = new observableModule.fromObject({
        username: info.username || "",
        password: info.password || ""
    });

    viewModel.login = function() {
    	return fetchModule.fetch(config.apiUrl + "login", {
    		method: "POST",
    		body: JSON.stringify({
    			username: viewModel.get("username"),
    			password: viewModel.get("password")
    		}),
    		headers: {
    			"Content-Type": "application/json"
    		}
    	})
    	.then(handleErrors)
    	.then(function(response) {
    		return response.json();
    	})
    	.then(function(data) {
    		// Save user token
    		console.log("token: " + data.token + " id: " + data.userID);
    		appSettings.setString("token", data.token);
    		appSettings.setString("id", data.userID);
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

module.exports = Login;