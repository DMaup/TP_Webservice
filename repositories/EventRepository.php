<?php
class EventRepository extends Repository {

	private const EVENTS_BY_PAGE = 10;

	function createEvent( Event $event ) {
		$sql = "INSERT INTO events
				SET event_title =:event_title,
					description	=:description,
					address		=:address,
					date		=:date,				
					category	=:category";

		$statement = $this->pdo->prepare( $sql );
		$result    = $statement->execute( [
			"event_title" => $event->getEvent_title(),
			"description" => $event->getDescription(),
			"address"     => $event->getAddress(),
			"date"        => $event->getDate(),
			"category"    => $event->getCategory()
		] );

		$event_id = 0;

		if ( $result ) {
			$event_id = $this->pdo->lastInsertId();
			$event->set_id( $event_id );
		}

		return (bool) $event_id;
	}

	function getEventById( $id ) {
		$sql       = "SELECT * FROM events WHERE event_id=:id";
		$statement = $this->pdo->prepare( $sql );
		$result    = $statement->execute( [
			"id" => $id
		] );

		$event = null;

		if ( $statement->rowCount() ) {
			$data = $statement->fetch();
			$event = new Event( $data );
		}

		return $event;
	}


	function updateEvent( Event $event ){
		$sql = "UPDATE events
				SET event_title	=:event_title,
					description	=:description,
					address		=:address,
					date		=:date,
					category	=:category
				WHERE event_id=:id";

		$statement = $this->pdo->prepare( $sql );

		$result    = $statement->execute( [
			"id"          => $event->getEvent_id(),
			"event_title" => $event->getEvent_title(),
			"description" => $event->getDescription(),
			"address"     => $event->getAddress(),
			"date"        => $event->getDate(),
			"category"    => $event->getCategory()

		] );

		return (bool) $statement->rowCount();
	}

	function deleteEvent($id){
		$sql = "DELETE FROM events WHERE event_id=:id";
		$statement = $this->pdo->prepare($sql);
		$result = $statement->execute([
			"id"=>$id

		]);
			;
		return (bool) $result && $statement->rowCount();
	}

	function getAllEvents($index = 0) {

		$sql       = "SELECT * FROM events LIMIT :index, :offset";
		$statement = $this->pdo->prepare( $sql );
		$statement->bindValue(":index", $index * self::EVENTS_BY_PAGE, PDO::PARAM_INT);
		$statement->bindValue(":offset", self::EVENTS_BY_PAGE, PDO::PARAM_INT);
		$result    = $statement->execute();

		$events = [];

		if ( $result ) {
			$datas = $statement->fetchAll();
			foreach ( $datas as $data) {
				$events[] = new Event( $data );
			}
		}

		return $events;
	}

}