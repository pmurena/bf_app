var observableModule = require("data/observable");

function Login(info) {
	info = info || {};

	var viewModel = new observableModule.fromObject({
        email: info.email || "",
        password: info.password || ""
    });

    return viewModel;
}

module.exports = Login;