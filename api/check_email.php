<?php
require_once '_bootstrap.php';
Request::need_parameters('email');

$mailHostList = DnsLookup::mx(Request::$data['maildomain']);
$mailHostFound = sizeof($mailHostList) > 0;

if ($mailHostFound) {
	$mailHost = $mailHostList[0];
} else {
	Response::$error = 'no_mailhost_found';
	Response::send();
}

$client = new SmtpClient($mailHost, 25);
$client->connect();

if (!$client->isConnected()) {
	Response::$error = 'connection_failed';
	Response::send();
}

$dialogs = array();

array_push($dialogs, $client->command('HELO ' . $config['hostname'] . ''));
array_push($dialogs, $client->command('MAIL FROM:<' . $config['mailfrom'] . '>'));
array_push($dialogs, $client->command('RCPT TO:<' . Request::$data['email'] . '>'));
array_push($dialogs, $client->command('QUIT'));
$client->disconnect();

Response::$data['dialogs'] = $dialogs;

$response = $dialogs[count($dialogs) - 2];
if ($response->status > 500) {
	Response::$data['mail_accepted'] = false;
} else {
	Response::$data['mail_accepted'] = true;
}

Response::send();