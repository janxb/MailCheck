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
	self.resultWildcard = ko.observable(false);


	self._init = function () {
		return self;
	};

	self.checkMail = function () {
		self.smtpdialogs.removeAll();
		self.checkEmailStrict();
		self.checkEmailCatchall();
	};

	self.checkEmailStrict = function () {
		request('api/check_email.php', {email: self.email}, function (data) {
			switch (data.error) {
				case null:
					data.data.dialogs.forEach(function (dialog) {
						self.smtpdialogs.push(dialog);
					});
					if (data.data.hasOwnProperty('mail_accepted')) {
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

	self.checkEmailCatchall = function () {
		request('api/check_catchall.php', {email: self.email}, function (data) {
			if (data.data.hasOwnProperty('mail_accepted')) {
				self.resultWildcard(data.data.mail_accepted);
			} else {
				self.resultWildcard(false);
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