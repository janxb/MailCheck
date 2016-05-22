<?php

ini_set('display_errors', false);
set_include_path(dirname(__FILE__) . '/../classes');

require_once '../config/config.php';

function __autoload($class_name) {
	$file = dirname(__FILE__) . '/../classes/' . $class_name . '.php';

	if (file_exists($file)) {
		require_once $file;
	}
}

Request::$data = $_REQUEST;

Request::need_parameters('email');
$emailValid = filter_var(Request::$data['email'], FILTER_VALIDATE_EMAIL);

if (!$emailValid) {
	Response::$error = 'email_invalid';
	Response::send();
}

Request::$data['maildomain'] = explode('@', Request::$data['email'])[1];

unset($_REQUEST, $_GET, $_POST);