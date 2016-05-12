var Languages = {
	english: {
		whichemail: "Which email address should be checked?",
		checkemail: "Check!",
		enteremail: "enter email address..",
		nomailhostfound: "This Domain is not configured for receiving mail",
		emailinvalid: "The entered email adress is not valid",
		connectionfailed: "We could not connect to the mailserver",
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
		}
		return value;
	}
};