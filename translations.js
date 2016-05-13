var Languages = {
	english: {
		whichemail: "Which email address should be checked?",
		checkemail: "Check!",
		enteremail: "enter email address..",

		nomailhostfound: "This Domain is not configured for receiving mail",
		emailinvalid: "The entered email address is not valid",
		connectionfailed: "We could not connect to the mailserver",

		emailnotexisting: "The email address is not existing on the server.",
		emailexisting: "The email address is existing on the server.",
		catchallexisting: "The server has a catchall address activated. All addresses will be accepted.",
		catchallnotexisting: "The server has to catchall address, only selected addresses will be accepted.",

		smtpdialog: "SMTP Dialog with Server",
		result: "Email Check Results",
		checkingprogress: "Please wait, checking Email..",

		whatisthis: "How is this tool working?",
		description: "This tools asks the receiving mail server, if he would take the address you provided.<br>" +
		"If he accepts to take the mail, the tool aborts the communication before any mail is sent.<br>" +
		"Because of the way it works, the recipient has no idea that you checked his account!"
	},
	german: {
		whichemail: "Welche Email Addresse soll überprüft werden?",
		checkemail: "Adresse überprüfen!",
		enteremail: "Email Adresse eingeben..",

		nomailhostfound: "Die Domain ist für den Email-Empfang nicht konfiguriert!",
		emailinvalid: "Die eingegebene Adresse ist nicht korrekt!",
		connectionfailed: "Verbindung zum Mailserver fehlgeschlagen!",

		emailnotexisting: "Die Adresse wurde vom Mailserver nicht akzeptiert.",
		emailexisting: "Die Adresse wurde vom Mailserver akzeptiert.",
		catchallexisting: "Es ist eine Catchall-Adresse eingerichtet. Alle Empfänger werden vom Server akzeptiert.",
		catchallnotexisting: "Es ist keine Catchall-Adresse eingerichtet. Nur existierende Empfänger werden vom Server akzeptiert.",

		smtpdialog: "SMTP-Dialog mit dem Mailserver",
		result: "Ergebnisse der Email-Überprüfung",
		checkingprogress: "Bitte warten, Adresse wird überprüft..",

		whatisthis: "Wie funktioniert das hier?",
		description: "Dieses Tool fragt beim empfangenden Mailserver nach, ob er die angegebene Adresse akzeptiert.<br>" +
		"Wenn er bestätigt, die Email anzunehmen, wird die Kommunikation abgebrochen.<br>" +
		"Durch den Abbruch bevor eine Nachricht gesendet wird, erfährt der Empfänger nicht, dass sein Account überprüft wurde!"
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