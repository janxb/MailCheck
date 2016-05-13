var App = function () {
	var self = this;
	self.email = ko.observable("");

	self.ajaxCalls = ko.observable(0);
	self.loading = ko.computed(function () {
		return self.ajaxCalls() > 0;
	}, self);

	self.smtpdialogs = ko.observableArray();
	self.resultavailable = ko.computed(function () {
		return self.smtpdialogs().length > 0;
	}, self);

	self.resultSingle = ko.observable(false);
	self.resultCatchall = ko.observable(false);

	self.enableHashUpdate = ko.observable(true);

	self.changeEmailHash = function(){
		window.location.hash = self.email();
	}

	self._init = function () {
		$(window).on('hashchange', function () {
			if (self.enableHashUpdate()) {
				self.checkEmailByHash();
			}
		});
		self.checkEmailByHash();
		return self;
	};

	self.checkEmailByHash = function () {
		var hash = window.location.hash.substring(1);
		self.email(hash);
		self.smtpdialogs.removeAll();
		if (hash !== '') {
			self.checkMail();
		}
	};

	self.checkMail = function () {
		checkEmailSingle();
		checkEmailCatchall();
	};

	var validateEmail = function (email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}

	var checkEmailSingle = function () {
		request('api/check_email.php', {email: self.email}, function (data) {
			switch (data.error) {
				case null:
					data.data.dialogs.forEach(function (dialog) {
						self.smtpdialogs.push(dialog);
					});
					if (data.data !== null) {
						self.resultSingle(data.data.mail_accepted);
					} else {
						self.resultSingle(false);
					}
					break;
				case 'email_invalid':
					showError(Translation.get('emailinvalid'));
					break;
				case 'connection_failed':
					showError(Translation.get('connectionfailed'));
					break;
				case 'no_mailhost_found':
					showError(Translation.get('nomailhostfound'));
					break;
			}
		});
	};

	var checkEmailCatchall = function () {
		request('api/check_catchall.php', {email: self.email}, function (data) {
			if (data.data !== null) {
				self.resultCatchall(data.data.mail_accepted);
			} else {
				self.resultCatchall(false);
			}
		});
	};

	var showInfo = function (text) {
		showPopup(text, 'success');
	};

	var showError = function (text) {
		showPopup(text, 'error');
	};

	var showPopup = function (text, type) {
		sweetAlert("", text, type);
	};

	var request = function (url, data, responseMethod) {
		self.ajaxCalls(self.ajaxCalls() + 1);
		$.post(url, data, function (data) {
			data = $.parseJSON(data);
			responseMethod(data);
			self.ajaxCalls(self.ajaxCalls() - 1);
		});
	};
};

ko.applyBindings(new App()._init());