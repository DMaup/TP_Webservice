<?php
use RepositoryManager as RM;

class EventController{


	function preflight(){
		$this->response(["success"=>true]);
	}

	function response($status){
		header("Access-Control-Allow-Origin: http://localhost:3000");
		header("Access-Control-Allow-Headers: Content-type");
		header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
		header("Content-type: application/json");


		echo json_encode($status);
	}

	function create(){
		$eventRepository = RM::getInstance()->getEventRepository();
		$event = new Event(Flight::request()->data->getData());

		$success = $eventRepository->createEvent($event);

		$status = [
			"success"=>$success,
			"id"=> $event->get_id(),
			"message"=>"L'évènement " . $event->get_id() . " a bien été créé!"
		];

		$this->response($status);

	}

	function getEventById($id) {
		$eventRepository = RM::getInstance()->getEventRepository();
		$event           = $eventRepository->getEventById( $id );

		$success = false;

		if ( $event ) {
			$success = true;
		}

		$status = [
			"success" => $success,
			"event"   => $event
		];

		$this->response($status);
	}

	function delete($id){
		$eventRepository = RM::getInstance()->getEventRepository();
		$success = $eventRepository->deleteEvent($id);

		$status = [
			"success"=>$success,
			"message"=>"L'évènement " . $id .  " a bien été supprimé!"
		];

		$this->response($status);
	}

	function update($id){
		$eventRepository = RM::getInstance()->getEventRepository();
		$event = new Event(Flight::request()->data->getData());
		$event->setEvent_id($id);

		$success = $eventRepository->updateEvent($event);

		$status = [
			"success"=>$success,
			"message"=>"L'évènement " . $id . " a bien été mis à jour!"
		];

		$this->response($status);

	}

	function getAllEvents($index) {
		if(!$index) $index = 0;
		$eventRepository = RM::getInstance()->getEventRepository();
		$events          = $eventRepository->getAllEvents();

		$success = false;

		if ( $events ) {
			$success = true;
		}

		$status = [
			"success" => $success,
			"events"    => $events
		];

		$this->response($status);
	}

}