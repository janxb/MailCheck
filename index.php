<?php define('APP_VERSION', '?v' . 1) ?>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<title>MailCheck</title>
		<link rel="stylesheet" href="//cdn.jsdelivr.net/g/bootstrap@3.3.6(css/bootstrap.min.css),sweetalert@1.1.3(sweetalert.css)">
		<link rel="stylesheet" href="//cdn.jsdelivr.net/fontawesome/4.6.2/css/font-awesome.min.css"/>
		<link rel="stylesheet" href="index.css<?= APP_VERSION ?>"/>
	</head>
	<body>
		<div class="panel panel-success">
			<div class="panel-heading">
				<h3 class="panel-title" data-bind="text:Translation.get('whichemail')"></h3>
			</div>
			<div class="panel-body">
				<form data-bind="submit:checkMail" class="form-group">
					<input class="form-control" data-bind="attr: { placeholder:Translation.get('enteremail') }, textInput: email">
					<input data-bind="value:Translation.get('checkemail')" type="submit" class="btn btn-success form-control">
				</form>
			</div>
		</div>


		<div class="panel panel-default" data-bind="visible:resultavailable()">
			<div class="panel-heading">
				<h3 class="panel-title" data-bind="text:Translation.get('result')"></h3>
			</div>
			<div class="panel-body">
				<div class="resultpanel">
					<div class="checksingle">
						<p data-bind="visible:resultSingle()">
							<i class="statusicon fa fa-check-circle-o green"></i>
							<b data-bind="text:Translation.get('emailexisting')"></b>
						</p>
						<p data-bind="visible:!resultSingle()">
							<i class="statusicon fa fa-times-circle-o red"></i>
							<b data-bind="text:Translation.get('emailnotexisting')"></b>
						</p>
					</div>
					<div class="checkwildcard" data-bind="visible:resultSingle()">
						<p data-bind="visible:!resultCatchall()">
							<i class="statusicon fa fa-check-circle-o green"></i>
							<b data-bind="text:Translation.get('catchallnotexisting')"></b>
						</p>
						<p data-bind="visible:resultCatchall()">
							<i class="statusicon fa fa-times-circle-o red"></i>
							<b data-bind="text:Translation.get('catchallexisting')"></b>
						</p>
					</div>
				</div>
			</div>
		</div>


		<div class="panel panel-default" data-bind="visible:resultavailable()">
			<div class="panel-heading">
				<h3 class="panel-title" data-bind="text:Translation.get('smtpdialog')"></h3>
			</div>
			<div class="panel-body" data-bind="foreach:smtpdialogs">
				<div class="smtpdialog">
					<p class="request" data-bind="text:request"></p>
					<p class="response" data-bind="text:response"></p>
				</div>
			</div>
		</div>


		<div data-bind="visible:loading()" class="loading">
			<div class="inner">
				<br>
				<span class="cssload-loader"><span class="cssload-loader-inner"></span></span>
				<br>
				<p data-bind="text:Translation.get('checkingprogress')"></p>
			</div>
		</div>


		<script src="//cdn.jsdelivr.net/g/jquery@2.2.2,knockout@3.4.0,js-cookie@2.2.0,spinjs@2.3.2,sweetalert@1.1.3"></script>
		<script src="config.js"></script>
		<script src="translations.js"></script>
		<script src="index.js"></script>
	</body>
</html>