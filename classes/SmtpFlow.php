<?php

class SmtpFlow {
	public $status;
	public $request;
	public $response;

	public function __construct() {
		return $this;
	}

	public function withStatus($status):SmtpFlow {
		$this->status = $status;
		return $this;
	}

	public function withRequest($request):SmtpFlow {
		$this->request = $request;
		return $this;
	}

	public function withResponse($response):SmtpFlow {
		$this->response = $response;
		return $this;
	}
}