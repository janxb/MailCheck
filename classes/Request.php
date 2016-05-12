<?php

class Request
{
	public static $data;

	public static function need_parameters(...$parameters)
	{
		foreach ($parameters as $parameter) {
			if (!isset(self::$data[$parameter])) {
				Response::$error = 'missing_parameter';
				Response::$data = $parameter;
				Response::send();
			}
		}
	}
}