var observableModule = require("data/observable");
var fetchModule = require("fetch");
var config = require("../config");
var appSettings = require("application-settings");

function SignUp(info) {
	info = info || {};

	var viewModel = new observableModule.fromObject({
        username: info.username || "",
        email: info.email || "",
        password: info.password || "",
        password_confirm: info.password_confirm || ""
    });

    viewModel.register = function() {
    	return fetchModule.fetch(config.apiUrl + "register", {
    		method: "POST",
    		body: JSON.stringify({
    			username: viewModel.get("username"),
    			email: viewModel.get("email"),
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
    		console.log("token: " + data.token + " id: " + data._id);
    		appSettings.setString("token", data.token);
    		appSettings.setString("id", data._id);
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

module.exports = SignUp;