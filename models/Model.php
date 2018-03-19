<?php
abstract class Model{

	protected $id;

	public function get_id() {
		return $this->id;
	}

	public function set_id( $id ): void {
		$this->id = $id;
	}

	function __construct(array $datas = []) {
		$this->hydrate($datas);
	}

	private function hydrate(array $datas){
		foreach ($datas as $key => $value){
			$method = "set" . ucfirst($key);

			if(method_exists($this, $method)){
				$this->$method($value);
			}
		}
	}
}