<?php

class TypeserviceController extends Zend_Controller_Action {
	private $config = NULL;
	private $db = NULL;
	public function init() {
		$this->ctrl = $this->_request->getControllerName ();
		$this->view->ctrl = $this->ctrl;
		$this->config = new Zend_Config_Ini ( APPLICATION_PATH . '/configs/application.ini', APPLICATION_ENV );
		
		try {
			$this->db = Zend_Db::factory ( $this->config->database );
			$this->db->getConnection ();
		} catch ( Zend_Db_Adapter_Exception $e ) {
			echo $e->getMessage ();
		} catch ( Zend_Exception $e ) {
			echo $e->getMessage ();
		}
		$this->view->general_icon = 'ico color shadow coin';
	}
	public function indexAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		$this->view->title = 'Type service';
		
		$sql = 'SELECT * FROM type_service';
		$this->view->list_typeservices = $this->db->fetchAssoc ( $sql );
	}
	public function addAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		
		$this->view->general_icon = 'ico color add';
		$this->view->title = 'Ajouter un type de service';
	
	}
	public function submitAction() {
		$table_reponse = array ('message' => '' );
		
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$data_from_user = $this->_getAllParams ();
		
		if (! empty ( $data_from_user ['libelle_typeservice'] )) {
			$data_to_save = array ('libelle_type_service' => $data_from_user ['libelle_typeservice'] );
			try {
				$this->db->insert ( 'type_service', $data_to_save );
				$table_reponse ['message'] = 'Le type de service a été bien ajouter ';
			} catch ( Zend_Db_Adapter_Exception $e ) {
				echo $e->getMessage ();
			}
		} else {
			$table_reponse ['message'] = 'erreur';
		}
		$json = Zend_Json::encode ( $table_reponse );
		echo $json;
	}
	public function modifyAction() { // brush
		$table_reponse = array ('message' => '' );
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$data_from_user = $this->_getAllParams ();
		
		if (! empty ( $data_from_user ['libelle_type_service'] )) {
			$new_data = array ('libelle_type_service' => $data_from_user ['libelle_type_service'] );
			$id_typeservice = $data_from_user ['id_type_service'];
			$condition = "id_type_service = $id_typeservice";
			try {
				$this->db->update ( 'type_service', $new_data, $condition );
				$table_reponse ['message'] = 'Le type de service a été bien modifier';
			} catch ( Zend_Db_Adapter_Exception $e ) {
				echo $e->getMessage ();
			}
		} else {
			$table_reponse ['message'] = 'erreur';
		}
		$json = Zend_Json::encode ( $table_reponse );
		echo $json;
	}
	public function modifyformAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		$this->view->general_icon = 'ico color brush';
		$this->view->title = 'Modifier un type de service';
		
		$this->db->setFetchMode ( Zend_Db::FETCH_OBJ );
		$req_id = $this->getRequest ()->getParam ( 'id' );
		$id = $this->db->quote ( $req_id );
		$sql = "SELECT * FROM type_service WHERE id_type_service = $id";
		$this->view->typeservice = $this->db->fetchRow ( $sql );
	
	}
	
	public function deleteAction() {
		$n_lignes_supprime = NULL;
		$table_reponse = array ('message' => '' );
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$data_from_user = $this->_getAllParams ();
		$condition = 'id_type_service = ' . $data_from_user ['id'];
		try {
			$n_lignes_supprime = $this->db->delete ( 'type_service', $condition );
			$table_reponse ['message'] = 'L\'type de service a été supprimer';
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
				$condition = 'id_type_service = ' . $data_from_user [$indice];
				$this->db->delete ( 'type_service', $condition );
			}
			$table_reponse ['message'] = 'Les types de services ont été bien supprimés';
		
		} catch ( Zend_Db_Adapter_Exception $e ) {
			$table_reponse ['message'] = $e->getMessage ();
		}
		$json = Zend_Json::encode ( $table_reponse );
		echo $json;
	}

}



