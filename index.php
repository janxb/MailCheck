<?php
define('APP_VERSION', '?_v=' . str_replace("\n", '', `svn info 2>/dev/null . | grep "Revision" | awk '{print $2}'`));
require_once 'config/config.php';
?>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<title><?= $config['pagetitle'] ?></title>
		<link rel="stylesheet" href="//cdn.jsdelivr.net/g/bootstrap@3.3.6(css/bootstrap.min.css),sweetalert@1.1.3(sweetalert.css)">
		<link rel="stylesheet" href="//cdn.jsdelivr.net/fontawesome/4.6.2/css/font-awesome.min.css"/>
		<link rel="stylesheet" href="index.css<?= APP_VERSION ?>"/>
	</head>
	<body>
		<div class="panel panel-success">
			<div class="panel-heading">
				<h3 class="panel-title" data-bind="text:translation().get('whichemail')"></h3>
			</div>
			<div class="panel-body">
				<form data-bind="submit:changeEmailHash" class="form-group">
					<input class="form-control" data-bind="attr: { placeholder:translation().get('enteremail') }, textInput: email">
					<input data-bind="value:translation().get('checkemail')" type="submit" class="btn btn-success form-control">
				</form>
			</div>
		</div>

		<div class="panel panel-default" data-bind="visible:!resultavailable()">
			<div class="panel-heading">
				<h3 class="panel-title" data-bind="text:translation().get('whatisthis')"></h3>
			</div>
			<div class="panel-body description" data-bind="html:translation().get('description')">
			</div>
		</div>


		<div class="panel panel-default" data-bind="visible:resultavailable()">
			<div class="panel-heading">
				<h3 class="panel-title" data-bind="text:translation().get('result')"></h3>
			</div>
			<div class="panel-body">
				<div class="resultpanel">
					<table class="checksingle">
						<tr data-bind="visible:resultSingle()">
							<td><i class="statusicon fa fa-check-circle-o green"></i></td>
							<td><b data-bind="text:translation().get('emailexisting')"></b></td>
						</tr>
						<tr data-bind="visible:!resultSingle()">
							<td><i class="statusicon fa fa-times-circle-o red"></i></td>
							<td><b data-bind="text:translation().get('emailnotexisting')"></b></td>
						</tr>
					</table>
					<table class="checkwildcard" data-bind="visible: resultSingle()">
						<tr data-bind="visible:!resultCatchall()">
							<td><i class="statusicon fa fa-check-circle-o green"></i></td>
							<td><b data-bind="text:translation().get('catchallnotexisting')"></b></td>
						</tr>
						<tr data-bind="visible:resultCatchall()">
							<td><i class="statusicon fa fa-times-circle-o red"></i></td>
							<td><b data-bind="text:translation().get('catchallexisting')"></b></td>
						</tr>
					</table>
				</div>
			</div>
		</div>


		<div class="panel panel-default" data-bind="visible:resultavailable()">
			<div class="panel-heading">
				<h3 class="panel-title" data-bind="text:translation().get('smtpdialog')"></h3>
			</div>
			<div class="panel-body" data-bind="foreach:smtpdialogs">
				<div class="smtpdialog">
					<pre class="request" data-bind="text:request"></pre>
					<pre class="response" data-bind="text:response"></pre>
				</div>
			</div>
		</div>

		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title" data-bind="text:translation().get('language')"></h3>
			</div>
			<div class="panel-body" data-bind="foreach:availableLanguages()">
				<button class="btn btn-default" data-bind="text:$data, event: { click: $root.changeLanguage }, css: { 'btn-primary': $root.language() === $data }">
				</button>
			</div>
		</div>


		<div data-bind="visible:loading()" class="loading">
			<div class="inner">
				<br>
				<span class="cssload-loader"><span class="cssload-loader-inner"></span></span>
				<br>
				<p data-bind="text:translation().get('checkingprogress')"></p>
			</div>
		</div>


		<script src="//cdn.jsdelivr.net/g/jquery@2.2.2,knockout@3.4.0,js-cookie@2.2.0,spinjs@2.3.2,sweetalert@1.1.3"></script>
		<script src="config/config.js<?= APP_VERSION ?>"></script>
		<script src="translations.js<?= APP_VERSION ?>"></script>
		<script src="index.js<?= APP_VERSION ?>"></script>
	</body>
</html>