var App = function () {
	var self = this;
	self.email = ko.observable("");

	self.ajaxCalls = ko.observable(0);
	self.loading = ko.computed(function () {
		return self.ajaxCalls() > 0;
	}, self);

	self.smtpdialogs = ko.observableArray();
	self.resultSingle = ko.observable(false);
	self.resultCatchall = ko.observable(false);
	self.resultavailable = ko.computed(function () {
		return self.smtpdialogs().length > 0;
	}, self);

	self.availableLanguages = ko.computed(function () {
		var languages = [];
		for (var language in Languages) {
			//noinspection JSUnfilteredForInLoop
			languages.push(language);
		}
		return languages;
	}, self);

	self.changeLanguage = function (language) {
		self.language(language);
		Config.language = self.language();
		Cookies.set('language', language, {expires: 99999});
	};

	self.language = ko.observable(Config.language);
	self.translation = ko.computed(function () {
		Config.language = self.language();
		return Translation;
	}, self);

	self.loadLanguageCookie = function () {
		var language = Cookies.get('language');
		if (language !== null) {
			self.changeLanguage(language);
		}
	};


	self._init = function () {
		self.loadLanguageCookie();
		$(window).on('hashchange', function () {
			self.checkEmailByHash();
		});
		self.checkEmailByHash();
		return self;
	};

	self.changeEmailHash = function () {
		window.location.hash = self.email();
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

	var checkEmailSingle = function () {
		request('api/check_email.php', {email: self.email}, function (data) {
			switch (data.error) {
				case null:
					//noinspection JSUnresolvedVariable
					data.data.dialogs.forEach(function (dialog) {
						self.smtpdialogs.push(dialog);
					});
					if (data.data !== null) {
						//noinspection JSUnresolvedVariable
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
				//noinspection JSUnresolvedVariable
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