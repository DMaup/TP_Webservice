<?php
abstract class Repository {

	protected $pdo;

	function __construct(PDO $pdo) {
		$this->pdo = $pdo;
	}

}