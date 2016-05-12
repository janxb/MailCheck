var Languages = {
	english: {
		whichemail: "Which email address should be checked?",
		checkemail: "Check!",
		enteremail: "enter email address..",

		nomailhostfound: "This Domain is not configured for receiving mail",
		emailinvalid: "The entered email adress is not valid",
		connectionfailed: "We could not connect to the mailserver",

		emailnotexisting: "The email adress is not existing on the server.",
		emailexisting: "The email adress is existing on the server.",
		catchallexisting: "The server has a catchall adress activated. All adresses will be accepted.",
		catchallnotexisting: "The server has to catchall adress, only selected adresses will be accepted.",

		smtpdialog: "SMTP Dialog with Server",
		result: "Email Check Results",
		checkingprogress:"Please Wait, checking Email.."
	},
	german: {
		whichemail: "Welche Email-Adresse soll überprüft werden?"
	}
};

var Translation = {
	get: function (key) {
		var value = Languages[Config.language][key];
		if (value === undefined) {
			console.error("Missing Translation for '" + key + "' at Language '" + Config.language + "'");
			value = Languages['english'][key];
			if (value === undefined) {
				value = '== MISSING TRANSLATION: ' + key + ' ==';
			}
		}
		return value;
	}
};