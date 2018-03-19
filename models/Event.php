<?php
class Event extends Model implements JsonSerializable {

	private $event_id;

	/**
	 * @return mixed
	 */
	public function getEvent_id() {
		return $this->event_id;
	}

	/**
	 * @param mixed $event_id
	 */
	public function setEvent_id( $event_id ): void {
		$this->event_id = $event_id;
	}

	private $event_title;

	/**
	 * @return mixed
	 */
	public function getEvent_title() {
		return $this->event_title;
	}

	/**
	 * @param mixed $event_title
	 */
	public function setEvent_title( $event_title ): void {
		$this->event_title = $event_title;
	}

	private $description;

	/**
	 * @return mixed
	 */
	public function getDescription() {
		return $this->description;
	}

	/**
	 * @param mixed $description
	 */
	public function setDescription( $description ): void {
		$this->description = $description;
	}

	private $address;

	/**
	 * @return mixed
	 */
	public function getAddress() {
		return $this->address;
	}

	/**
	 * @param mixed $address
	 */
	public function setAddress( $address ): void {
		$this->address = $address;
	}

	private $date;

	/**
	 * @return mixed
	 */
	public function getDate() {
		return $this->date;
	}

	/**
	 * @param mixed $date
	 */
	public function setDate( $date ): void {
		$this->date = $date;
	}

	private $category;

	/**
	 * @return mixed
	 */
	public function getCategory() {
		return $this->category;
	}

	/**
	 * @param mixed $category
	 */
	public function setCategory( $category ): void {
		$this->category = $category;
	}

	public function jsonSerialize() {
		return [
			"event_id"      =>$this->event_id,
			"event_title"   =>$this->event_title,
			"description"   =>$this->description,
			"address"       =>$this->address,
			"date"          =>$this->date,
			"category"      =>$this->category
		];
	}
}