<?php

class TypeprojetController extends Zend_Controller_Action {
	private $config = NULL;
	private $db = NULL;
	private $writer = NULL;
	private $logger = NULL;
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
		$this->view->general_icon = 'ico color shadow stop ';
	}
	public function indexAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		$this->view->title = 'type_projet';
		
		$sql = 'SELECT * FROM type_projet';
		$this->view->list_type_projets = $this->db->fetchAssoc ( $sql );
	}
	public function addAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		$this->view->general_icon = 'ico color add';
		$this->view->title = 'Ajouter un type_projet';
	
	}
	public function submitAction() {
		$this->logger->info('type_projet : submitAction()');
		$table_reponse = array ('message' => '' );
		
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$data_from_user = $this->_getAllParams ();
		
		
		if (! empty ( $data_from_user ['nom_type_projet'] )) {
			$data_to_save = array ('nom_type_projet' => $data_from_user ['nom_type_projet'] );
			$this->logger->info(html_entity_decode(Zend_Debug::dump($data_to_save,$label = null,$echo = false), ENT_COMPAT, "utf-8"));
			try {
				$this->db->insert ( 'type_projet', $data_to_save );
				$this->logger->info('update query : '.$this->db->getProfiler()->getLastQueryProfile()->getQuery());
				$this->logger->info('type de projet ajouter : OUI');
				$table_reponse ['message'] = 'Le type de projet a été bien ajouter ';
			} catch ( Zend_Db_Adapter_Exception $e ) {
				echo $e->getMessage ();
			}
		} else {
			$table_reponse ['message'] = 'erreur';
		}
		$this->db->getProfiler()->setEnabled(false);
		$json = Zend_Json::encode ( $table_reponse );
		echo $json;
	}
	public function modifyAction() { // brush
		$table_reponse = array ('message' => '' );
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$data_from_user = $this->_getAllParams ();
		
		if (! empty ( $data_from_user ['nom_type_projet'] )) {
			$new_data = array ('nom_type_projet' => $data_from_user ['nom_type_projet'] );
			$id_type_projet = $data_from_user ['id_type_projet'];
			$condition = "id_type_projet = $id_type_projet";
			try {
				$this->db->update ( 'type_projet', $new_data, $condition );
				$table_reponse ['message'] = 'Le type de projet a été bien modifier';
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
		$this->logger->info('typeprojet modifyform()');
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		$this->view->general_icon = 'ico color brush';
		$this->view->title = 'Modifier une type_projet';
		
		$this->db->setFetchMode ( Zend_Db::FETCH_OBJ );
		$req_id = $this->getRequest()->getParam('id');
		$id = $this->db->quote($req_id);
		$this->logger->info('id = '.$id);
		$sql = "SELECT * FROM type_projet WHERE id_type_projet = $id";
		$this->logger->info('$sql = '.$sql);
		$this->view->type_projet = $this->db->fetchRow ( $sql );
		$this->logger->info('modifyform type projet : '.$this->db->getProfiler()->getLastQueryProfile()->getQuery());
		
		$this->db->getProfiler()->setEnabled(false);
	}
	public function deleteAction() {
		$this->logger->info('typeprojet/Delete');
		$n_lignes_supprime = NULL;
		$table_reponse = array ('message' => '' );
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$data_from_user = $this->_getAllParams ();
		$condition = 'id_type_projet = ' . $data_from_user ['id'];
		$this->logger->info('la condition de suppression : '.$condition);
		try {
			$n_lignes_supprime = $this->db->delete ( 'type_projet', $condition );
			$this->logger->info('update query : '.$this->db->getProfiler()->getLastQueryProfile()->getQuery());
			$table_reponse ['message'] = 'Le type_projet a été supprimer';
			$table_reponse ['n_lignes_supprime'] = $n_lignes_supprime;
		} catch ( Zend_Db_Adapter_Exception $e ) {
			$table_reponse ['message'] = $e->getMessage ();
		}
		$this->db->getProfiler()->setEnabled(false);
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
				$condition = 'id_type_projet = ' . $data_from_user [$indice];
				$this->db->delete ( 'type_projet', $condition );
			}
			$table_reponse ['message'] = 'Les type_projets ont été bien supprimés';
		
		} catch ( Zend_Db_Adapter_Exception $e ) {
			$table_reponse ['message'] = $e->getMessage ();
		}
		$json = Zend_Json::encode ( $table_reponse );
		echo $json;
	}

}



