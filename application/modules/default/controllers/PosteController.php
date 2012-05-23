<?php

class PosteController extends Zend_Controller_Action {
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
		$this->view->general_icon = 'ico color certificate';
	}
	public function indexAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		$this->view->title = 'Poste';
		
		$sql = 'SELECT * FROM poste';
		$this->view->list_postes = $this->db->fetchAssoc ( $sql );
	}
	public function addAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		
		$this->view->general_icon = 'ico color add';
		$this->view->title = 'Ajouter un poste';
	
	}
	public function submitAction() {
		$table_reponse = array ('message' => '' );
		
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$data_from_user = $this->_getAllParams ();
		
		if (! empty ( $data_from_user ['nom_poste'] )) {
			$data_to_save = array ('nom_poste' => $data_from_user ['nom_poste'] );
			try {
				$this->db->insert ( 'poste', $data_to_save );
				$table_reponse ['message'] = 'Le poste a été bien ajouter ';
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
		
		if (! empty ( $data_from_user ['nom_poste'] )) {
			$new_data = array ('nom_poste' => $data_from_user ['nom_poste'] );
			$id_poste = $data_from_user ['id_poste'];
			$condition = "id_poste = $id_poste";
			try {
				$this->db->update ( 'poste', $new_data, $condition );
				$table_reponse ['message'] = 'Le poste a été bien modifier';
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
		$this->view->title = 'Modifier une poste';
		
		$this->db->setFetchMode ( Zend_Db::FETCH_OBJ );
		$req_id = $this->getRequest ()->getParam ( 'id' );
		$id = $this->db->quote ( $req_id );
		$sql = "SELECT id_poste, nom_poste FROM poste WHERE id_poste = $id";
		$this->view->poste = $this->db->fetchRow ( $sql );
	
	}
	
	public function deleteAction() {
		$n_lignes_supprime = NULL;
		$table_reponse = array ('message' => '' );
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$data_from_user = $this->_getAllParams ();
		$condition = 'id_poste = ' . $data_from_user ['id'];
		try {
			$n_lignes_supprime = $this->db->delete ( 'poste', $condition );
			$table_reponse ['message'] = 'L\'poste a été supprimer';
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
				$condition = 'id_poste = ' . $data_from_user [$indice];
				$this->db->delete ( 'poste', $condition );
			}
			$table_reponse ['message'] = 'Les postes ont été bien supprimés';
		
		} catch ( Zend_Db_Adapter_Exception $e ) {
			$table_reponse ['message'] = $e->getMessage ();
		}
		$json = Zend_Json::encode ( $table_reponse );
		echo $json;
	}

}



