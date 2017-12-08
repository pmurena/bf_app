var observableModule = require("data/observable");

function SignUp(info) {
	info = info || {};

	var viewModel = new observableModule.fromObject({
        username: info.username || "",
        email: info.email || "",
        password: info.password || "",
        password_confirm: info.password_confirm || ""
    });

    return viewModel;
}

module.exports = SignUp;