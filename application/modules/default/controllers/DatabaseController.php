<?php

class DatabaseController extends Zend_Controller_Action {
	private $config = NULL;
	private $db = NULL;
	public function init() {
		//setup database connection parameters
		$this->config = new Zend_Config_Ini ( APPLICATION_PATH . '/configs/application.ini', APPLICATION_ENV );
	}
	public function indexAction() {
		//try connection to database
		try {
			$this->db = Zend_Db::factory($this->config->database);
			$this->db->getConnection ();
		} catch ( Zend_Db_Adapter_Exception $e ) {
			echo $e->getMessage ();
		} catch ( Zend_Exception $e ) {
			echo $e->getMessage ();
		}
		//setup SQL request
		$sql = 'SELECT * FROM clients';
		$this->view->list_clients = $this->db->fetchAssoc ( $sql );
		//maintenant tu peut intercepter le tableau multi dimension dans la vue et voir les resultat de cette facon
		
	}
}
