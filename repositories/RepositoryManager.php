<?php
class RepositoryManager{

	private static $instance = null;
	static function getInstance(){

		if(!self::$instance){
			self::$instance = new RepositoryManager();
		}

		return self::$instance;
	}

	private $eventRepository;

	public function getEventRepository() {
		return $this->eventRepository;
	}

	private function __construct() {

		$pdo = (new Bdd()) -> getPdo();
		$this->eventRepository = new EventRepository($pdo);
	}
}