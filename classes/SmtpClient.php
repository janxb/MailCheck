<?php
ini_set('default_socket_timeout', 3);

class SmtpClient {
	private $host;
	private $port;
	private $socket;

	function __construct($host, $port) {
		$this->host = $host;
		$this->port = $port;
	}

	function connect() {
		$this->disconnect();
		$this->socket = fsockopen($this->host, $this->port);
		$this->readSocket();
	}

	function command($command) :SmtpFlow {
		fwrite($this->socket, "$command\r\n");
		return $this->readSocket()->withRequest($command);
	}

	private function readSocket() {
		$completeOutput = '';
		$currentResponseLine = 0;
		$maxResponseLines = 10;

		do {
			if (++$currentResponseLine > $maxResponseLines) {
				break;
			}
			$output = fgets($this->socket, 4000);
			$completeOutput .= $output;
			$status = intval(substr($output, 0, 3));
		} while (substr($output, 3, 1) != ' ');

		return (new SmtpFlow())->withStatus($status)->withResponse($completeOutput);
	}

	function disconnect() {
		if ($this->isConnected()) {
			fclose($this->socket);
			unset($this->socket);
		}
	}

	function isConnected() {
		return $this->socket !== null
		&& $this->socket !== false;
	}


}