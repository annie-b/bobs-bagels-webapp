var registration = (function (module) {

	var authToken;

	module.submitRegistration = function () {
		$.ajax({
				url: 'http://localhost:3000/users',
				type: 'POST',
				data: {user: {
				first_name: $('#first-name').val(),
				last_name: $('#last-name').val(),
				email: $('#email').val(),
				password: $('#password').val()}},
			}).done(registration.loginSuccess).fail(registration.acceptFailure);

		return false;
	};

	module.loginSuccess = function (userData) {
		localStorage.setItem('authToken', userData.token);
		console.log('logged in!');
		window.location.href = '/';
	};

	module.submitLogin = function (event) {
		var $form;
		$form = $(this);
		debugger;
		$.ajax({
				url: 'http://localhost:3000/users/sign_in',
				type: 'POST',
				data: {email: $('#email').val(), password: $('#password').val()},
			}).done(registration.loginSuccess).fail(registration.acceptFailure);

		return false;
	};

	module.setupAjaxRequests = function () {
		$.ajaxPrefilter(function (options) {
			options.headers = {};
			options.headers['AUTHORIZATION'] = "Token token=" + authToken; // this is weird
		});
	};

	module.acceptFailure = function (error) {
		if (error.status === 401) { // 401 is unauthorized
			console.log('SEND TO LOGIN SCREEN');
			window.location.href = '#/registration';
		};
	};

	module.init = function () {
		console.log('yo in the registration');
		authToken = localStorage.getItem('authToken');

		registration.setupAjaxRequests();

		$('#content').on('click', '#registration-submit', function(event){
			event.preventDefault();
			registration.submitRegistration();
		});

		$('#content').on('submit', '#login-form', function(event){
			event.preventDefault();
			registration.submitLogin();

		});
	};

	return module;

})(registration || {});
