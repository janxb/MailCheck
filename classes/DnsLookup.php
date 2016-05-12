<?php

class DnsLookup {
	public static function mx($host) {
		$result = array();
		foreach (dns_get_record($host, DNS_MX) as $record) {
			array_push($result, $record['target']);
		}
		return $result;
	}

	public static function ip($host) {
		$result = array();
		foreach (dns_get_record($host, DNS_AAAA) as $record) {
			array_push($result, $record['ipv6']);
		}
		foreach (dns_get_record($host, DNS_A) as $record) {
			array_push($result, $record['ip']);
		}
		return $result;
	}

	public static function mx_ip($host) {
		return self::ip(self::mx($host)[0]);
	}
}