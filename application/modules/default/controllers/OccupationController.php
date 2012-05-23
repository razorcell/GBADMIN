<?php

class OccupationController extends Zend_Controller_Action {
	private $config = NULL;
	private $db = NULL;
	public function init() {
		$this->ctrl = $this->_request->getControllerName ();
		$this->view->ctrl = $this->ctrl;
		// setup database connection parameters
		$this->config = new Zend_Config_Ini ( APPLICATION_PATH . '/configs/application.ini', APPLICATION_ENV );
		// try connection to database
		try {
			$this->db = Zend_Db::factory ( $this->config->database );
			$this->db->getConnection ();
		} catch ( Zend_Db_Adapter_Exception $e ) {
			echo $e->getMessage ();
		} catch ( Zend_Exception $e ) {
			echo $e->getMessage ();
		}
		$this->view->general_icon = 'ico color hammer';
	}
	public function indexAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		$this->view->title = 'Occupation';
		
		$sql = 'SELECT * FROM occupation';
		$this->view->list_occupations = $this->db->fetchAssoc ( $sql );
	}
	public function addAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		/*
		 * $params = NULL; if($this->getRequest()->isPost()) {//if envoyer is
		 * clicked $params = $this->getRequest()->getParams(); }
		 * $this->view->data = $params;
		 */
		$this->view->general_icon = 'ico color add';
		$this->view->title = 'Ajouter une occupation';
	
	}
	public function submitAction() {
		$table_reponse = array ('message' => '' );
		// desactivation des layouts pour que rien ne s'affiche
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		// recuperration des valeurs entré par l'utilisateur depuis la requete
	
		$data_from_user = $this->_getAllParams ();
		// preparation d'une requete 'insert' pour l'envoyer à la base de
		// données
		if (! empty ( $data_from_user ['nom_occup'] )) {
			$data_to_save = array ('nom_occup' => $data_from_user ['nom_occup'] );
			try {
				// envoi de la requete a la base de données
				$this->db->insert ( 'occupation', $data_to_save );
				$table_reponse ['message'] = 'L\'occupation a été bien ajouter ';
			} catch ( Zend_Db_Adapter_Exception $e ) {
				echo $e->getMessage ();
			}
		} else { // le nom est vide
			$table_reponse ['message'] = 'erreur';
		}
		$json = Zend_Json::encode ( $table_reponse );
		// $this->_response->appendBody($json); NE PAS SUPPRIMER SVP
		echo $json;
	}
	public function modifyAction() { // brush
	
	
		$table_reponse = array ('message' => '' );
		// desactivation des layouts pour que rien ne s'affiche
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		// recuperration des valeurs entré par l'utilisateur depuis la requete
		
		$data_from_user = $this->_getAllParams ();
		
		
		if (! empty ( $data_from_user ['nom_occup'] )) {
			//$nouveau_nom = $this->db->quote($data_from_user ['nom_occup']);
			//$new_data = array('nom_occup' => $nouveau_nom);
			
			$new_data = array('nom_occup' => $data_from_user ['nom_occup']);//get the new typed name
			$id_occup = $data_from_user['id_occup'];//recupperation de id_occup pour la condition dans la requete
			$condition = "id_occup = $id_occup";
			try {
				// envoi de la requete a la base de données
				$this->db->update ( 'occupation', $new_data,  $condition);
				$table_reponse ['message'] = 'L\'occupation a été bien modifier';
			} catch ( Zend_Db_Adapter_Exception $e ) {
				echo $e->getMessage ();
			}
		} else { // le nom est vide
			$table_reponse ['message'] = 'erreur';
		}
		$json = Zend_Json::encode ( $table_reponse );
		// $this->_response->appendBody($json); NE PAS SUPPRIMER SVP
		echo $json;
	}
	public function modifyformAction()
	{
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		$this->view->general_icon = 'ico color brush';
		$this->view->title = 'Modifier une occupation';
		
		$this->db->setFetchMode(Zend_Db::FETCH_OBJ);
		$req_id = $this->getRequest()->getParam('id');
		$id = $this->db->quote($req_id);
		$sql = "SELECT id_occup, nom_occup FROM occupation WHERE id_occup = $id";
		$this->view->occupation = $this->db->fetchRow ( $sql );
		 
	}
	
	public function deleteAction() {
		$n_lignes_supprime = NULL;
		$table_reponse = array ('message' => '' );
		// desactivation des layouts pour que rien ne s'affiche
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		// recuperration des valeurs entré par l'utilisateur depuis la requete
		
		$data_from_user = $this->_getAllParams ();
		// preparation d'une requete 'insert' pour l'envoyer à la base de
		// données
			$condition = 'id_occup = '.$data_from_user ['id'];
			try {
				// envoi de la requete a la base de données
				$n_lignes_supprime = $this->db->delete ( 'occupation', $condition );
				$table_reponse ['message'] = 'L\'occupation a été supprimer';
				$table_reponse['n_lignes_supprime'] = $n_lignes_supprime;
			} catch ( Zend_Db_Adapter_Exception $e ) {
				//echo $e->getMessage ();
				$table_reponse ['message'] = $e->getMessage ();
			}
		$json = Zend_Json::encode ( $table_reponse );
		// $this->_response->appendBody($json); NE PAS SUPPRIMER SVP
		//echo $condition;
		echo $json;
	}
	public function deleteallAction()
	{
		$n_lignes_supprime = NULL;
		$table_reponse = array ('message' => '' );
		// desactivation des layouts pour que rien ne s'affiche
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		// recuperration des valeurs entré par l'utilisateur depuis la requete
		
		$data_from_user = $this->_getAllParams ();
		// preparation d'une requete 'insert' pour l'envoyer à la base de
		// données
		$taille = $data_from_user ['taille'];
		try {
			// envoi de la requete a la base de données
			for($i=0;$i<$taille;$i++)
			{
				$indice = 'id'.$i;
				$condition = 'id_occup = '.$data_from_user [$indice];
				$this->db->delete ( 'occupation', $condition );
			}
			$table_reponse ['message'] = 'Les occupations ont été bien supprimés';
			
		} catch ( Zend_Db_Adapter_Exception $e ) {
			//echo $e->getMessage ();
			$table_reponse ['message'] = $e->getMessage ();
		}
		$json = Zend_Json::encode ( $table_reponse );
		// $this->_response->appendBody($json); NE PAS SUPPRIMER SVP
		//echo $condition;
		echo $json;
	}
	

}



