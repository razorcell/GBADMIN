<?php

class PackController extends Zend_Controller_Action {
	private $config = NULL;
	private $db = NULL;
	public function init() {
		$this->ctrl = $this->_request->getControllerName ();
		$this->view->ctrl = $this->ctrl;
		
		$this->writer = new Zend_Log_Writer_Stream(APPLICATION_PATH.'/../tests/logs');
		$this->logger = new Zend_Log($this->writer);
		
		
		$this->config = new Zend_Config_Ini ( APPLICATION_PATH . '/configs/application.ini', APPLICATION_ENV );
		try {
			$this->db = Zend_Db::factory ( $this->config->database );
			$this->db->getConnection ();
			$this->db->getProfiler()->setEnabled(true);
		} catch ( Zend_Db_Adapter_Exception $e ) {
			echo $e->getMessage ();
		} catch ( Zend_Exception $e ) {
			echo $e->getMessage ();
		}
		$this->view->general_icon = 'ico color shadow point';
	}
	public function indexAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		$this->view->title = 'pack';
		
		$sql = 'SELECT * FROM pack';
		$this->view->list_packs = $this->db->fetchAssoc ( $sql );
		
		$sql = 'SELECT * FROM type_service';
		$this->view->list_types_services = $this->db->fetchAssoc ( $sql );
	}
	public function addAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		
		$this->view->general_icon = 'ico color add';
		$this->view->title = 'Ajouter un pack';
		
		$sql = 'SELECT * FROM type_service';
		$this->view->list_types_services = $this->db->fetchAssoc ( $sql );
	
	}
	public function submitAction() {
		$table_reponse = array ('message' => '' );
		
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		// recupperation des valeurs entrer par l'utilisateur
		$request_body = $this->getRequest ()->getRawBody ();
		$this->logger->info ( 'Request body : ' . $request_body );
		$data_from_user = Zend_Json::decode ( $request_body );
		//chercher id_type_service
		$type_service_string = $data_from_user ['type_service'];
		$nom_pack = $data_from_user ['nom_pack'];
		$sql = 'SELECT * FROM type_service';
		$list_types_services = $this->db->fetchAssoc ( $sql );
		$type_service_id = NULL;
		foreach ($list_types_services as $type_service)
		{
			if($type_service['libelle_type_service'] == $type_service_string)
			{
				$type_service_id = $type_service['id_type_service'];
				$this->logger->info('id type service trouvé = '.$type_service_id);
			}
		}
		$data_to_save = array ('libelle_pack' => $nom_pack, 'id_type_service' => $type_service_id);
		try {
			$this->db->insert ( 'pack', $data_to_save );
			$table_reponse ['message'] = 'Le pack a été bien ajouter ';
		} catch ( Zend_Db_Adapter_Exception $e ) {
			echo $e->getMessage ();
		}
		$json = Zend_Json::encode ( $table_reponse );
		echo $json;
	}
	public function modifyAction() { // brush
		$table_reponse = array ('message' => '' );
		
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		// recupperation des valeurs entrer par l'utilisateur
		$request_body = $this->getRequest ()->getRawBody ();
		$this->logger->info ( 'Request body : ' . $request_body );
		$data_from_user = Zend_Json::decode ( $request_body );
		//chercher id_type_service
		$nom_pack = $data_from_user ['nom_pack'];
		$id_pack = $data_from_user['id'];
		$type_service_string = $data_from_user ['type_service'];
		
		$sql = 'SELECT * FROM type_service';
		$list_types_services = $this->db->fetchAssoc ( $sql );
		$type_service_id = NULL;
		foreach ($list_types_services as $type_service)
		{
			if($type_service['libelle_type_service'] == $type_service_string)
			{
				$type_service_id = $type_service['id_type_service'];
				$this->logger->info('id type service trouvé = '.$type_service_id);
			}
		}
		$data_to_save = array ('libelle_pack' => $nom_pack, 'id_type_service' => $type_service_id);
		try {
			$condition = "id_pack = $id_pack";
			$this->db->update ( 'pack', $data_to_save, $condition );
			$table_reponse ['message'] = 'Le pack a été bien modifier ';
		} catch ( Zend_Db_Adapter_Exception $e ) {
			echo $e->getMessage ();
		}
		$json = Zend_Json::encode ( $table_reponse );
		echo $json;
	}
	public function modifyformAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		$this->view->general_icon = 'ico color brush';
		$this->view->title = 'Modifier une pack';
		
		$this->db->setFetchMode ( Zend_Db::FETCH_OBJ );
		$req_id = $this->getRequest ()->getParam ( 'id' );
		$id = $this->db->quote ( $req_id );
		$sql = "SELECT * FROM pack WHERE id_pack = $id";
		$this->view->pack = $this->db->fetchRow ( $sql );
		$sql = "SELECT * FROM type_service";
		$this->view->list_types_services = $this->db->fetchAssoc ( $sql );
	
	}
	
	public function deleteAction() {
		$n_lignes_supprime = NULL;
		$table_reponse = array ('message' => '' );
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$data_from_user = $this->_getAllParams ();
		$condition = 'id_pack = ' . $data_from_user ['id'];
		try {
			$n_lignes_supprime = $this->db->delete ( 'pack', $condition );
			$table_reponse ['message'] = 'L\'pack a été supprimer';
			$table_reponse ['n_lignes_supprime'] = $n_lignes_supprime;
		} catch ( Zend_Db_Adapter_Exception $e ) {
			$table_reponse ['message'] = $e->getMessage ();
		}
		$json = Zend_Json::encode ( $table_reponse );
		echo $json;
	}
	public function deleteallAction() {
		$n_lignes_supprime = NULL;
		$table_reponse = array ('message' => '' );
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$data_from_user = $this->_getAllParams ();
		$taille = $data_from_user ['taille'];
		try {
			for($i = 0; $i < $taille; $i ++) {
				$indice = 'id' . $i;
				$condition = 'id_pack = ' . $data_from_user [$indice];
				$this->db->delete ( 'pack', $condition );
			}
			$table_reponse ['message'] = 'Les packs ont été bien supprimés';
		
		} catch ( Zend_Db_Adapter_Exception $e ) {
			$table_reponse ['message'] = $e->getMessage ();
		}
		$json = Zend_Json::encode ( $table_reponse );
		echo $json;
	}

}



