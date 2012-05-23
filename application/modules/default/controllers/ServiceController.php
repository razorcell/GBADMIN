<?php

class ServiceController extends Zend_Controller_Action {
	private $config = NULL;
	private $db = NULL;
	private $writer = NULL;
	private $logger = NULL;
	public function init() {
		$this->ctrl = $this->_request->getControllerName ();
		$this->view->ctrl = $this->ctrl;
		
		$this->writer = new Zend_Log_Writer_Stream ( APPLICATION_PATH . '/../tests/logs' );
		$this->logger = new Zend_Log ( $this->writer );
		
		$this->logger->info ( 'Fonction init() executée' );
		
		$this->config = new Zend_Config_Ini ( APPLICATION_PATH . '/configs/application.ini', APPLICATION_ENV );
		try {
			$this->db = Zend_Db::factory ( $this->config->database );
			$this->db->getConnection ();
			$this->db->getProfiler ()->setEnabled ( true );
		
		} catch ( Zend_Db_Adapter_Exception $e ) {
			echo $e->getMessage ();
		} catch ( Zend_Exception $e ) {
			echo $e->getMessage ();
		}
		$this->view->general_icon = ' ico color location';
	}
	public function indexAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		$this->view->title = 'service';
		
		$sql = 'SELECT * FROM type_service';
		$this->view->list_types_services = $this->db->fetchAssoc ( $sql );
		$sql = 'SELECT * FROM service';
		$this->view->list_services = $this->db->fetchAssoc ( $sql );
		$this->logger->info ( 'get all services : ' . $this->db->getProfiler ()->getLastQueryProfile ()->getQuery () );
		$this->db->getProfiler ()->setEnabled ( false );
	}
	public function addAction() {
		$this->logger->info ( ' service addAction() ' );
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		
		$this->view->general_icon = 'ico color add';
		$this->view->title = 'Ajouter un service';
		$sql = 'SELECT * FROM commande';
		$this->view->list_commandes = $this->db->fetchAssoc ( $sql );
		$sql = 'SELECT * FROM type_service';
		$this->view->list_types_services = $this->db->fetchAssoc ( $sql );
		$sql = 'SELECT * FROM pack';
		$this->view->list_packs = $this->db->fetchAssoc ( $sql );
		$sql = 'SELECT * FROM employe';
		$this->view->list_employes = $this->db->fetchAssoc ( $sql );
		$this->logger->info ( 'get all clients : ' . $this->db->getProfiler ()->getLastQueryProfile ()->getQuery () );
		$this->db->getProfiler ()->setEnabled ( false );
	
	}
	public function updatepackAction() {
		// afficher les packs equivalent au type de service
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$request_body = $this->getRequest ()->getRawBody ();
		$this->logger->info ( 'Request body : ' . $request_body );
		$data_from_user = Zend_Json::decode ( $request_body );
		$type_service_string = $data_from_user ['type_service'];
		// get id_type_service
		if (! empty ( $type_service_string )) {
			$sql = 'SELECT * FROM type_service';
			$list_types_services = $this->db->fetchAssoc ( $sql );
			$type_service_id = NULL;
			foreach ( $list_types_services as $type_service ) {
				if ($type_service ['libelle_type_service'] == $type_service_string) {
					$type_service_id = $type_service ['id_type_service'];
				}
			}
			$sql = "SELECT * FROM pack WHERE id_type_service = $type_service_id";
			$packs = $this->db->fetchAssoc ( $sql );
			$this->logger->info ( 'packs Assoc ' . html_entity_decode ( Zend_Debug::dump ( $packs, $label = null, $echo = false ), ENT_COMPAT, "utf-8" ) );
			
			$json = Zend_Json::encode ( $packs );
			$this->logger->info ( $json );
			$this->db->getProfiler ()->setEnabled ( false );
			echo $json;
		}
	}
	public function submitAction() {
		$this->logger->info ( 'service submitAction()' );
		// stocker les messages d'erreur/succe pour les retourner à
		// l'utilisateur
		// $table_reponse = array ('message' => '');
		$reponse = '';
		
		$this->_helper->layout->disableLayout (); // on veut desactiver
		                                          // l'affichage par défault
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		// SOLUTION 1
		
		// recupperation des valeurs entrer par l'utilisateur
		$request_body = $this->getRequest ()->getRawBody ();
		$this->logger->info ( 'Request body : ' . $request_body );
		$data_from_user = Zend_Json::decode ( $request_body );
		// Activer cette ligne pour voir le resultat du decodage
		
		$this->logger->info ( 'Decoded data from user : ' . html_entity_decode ( Zend_Debug::dump ( $data_from_user, $label = null, $echo = false ), ENT_COMPAT, "utf-8" ) );
		$commande = $data_from_user ['commande'];
		$date_debut = $data_from_user ['date_debut'];
		$date_fin = $data_from_user ['date_fin'];
		$description = $data_from_user ['description'];
		$pack_string = $data_from_user ['pack'];
		$paye = $data_from_user ['paye_hidden'];
		$prix = $data_from_user ['prix'];
		$status = $data_from_user ['status_hidden'];
		$type_service_string = $data_from_user ['type_service'];
		
		// PHASE D INSERTION DE L service DANS LA TABLE 'service'
		
		$this->logger->info ( '*********************PHASE D INSERTION D UNE ENTREPRISE************' );
		$type_service_id = NULL;
		$pack_id = NULL;
		if ($pack_string == 'aucun') { // si pack n'existe pas
			$this->logger->info ( 'pack = aucun');
			$sql = 'SELECT * FROM type_service';
			$list_types_services = $this->db->fetchAssoc ( $sql );
			foreach ( $list_types_services as $type_service ) {
				if ($type_service ['libelle_type_service'] == $type_service_string) {
					$type_service_id = $type_service ['id_type_service'];
					$this->logger->info ( 'id type service trouvé = ' . $type_service_id );
				}
			}
			$service_to_save = array ('description' => $description, 'prix' => $prix, 'date_debut' => $date_debut, 'date_fin' => $date_fin, 'status' => $status, 'id_type_service' => $type_service_id, 'paye' => $paye, 'id_commande' => $commande );
			$this->logger->info ( 'service to save ' . html_entity_decode ( Zend_Debug::dump ( $service_to_save, $label = null, $echo = false ), ENT_COMPAT, "utf-8" ) );
		
		} else {//si pack existe
			$sql = 'SELECT * FROM type_service';
			$list_types_services = $this->db->fetchAssoc ( $sql );
			foreach ( $list_types_services as $type_service ) {
				if ($type_service ['libelle_type_service'] == $type_service_string) {
					$type_service_id = $type_service ['id_type_service'];
					$this->logger->info ( 'id type_service trouvé = ' . $type_service_id );
				}
			}
			$sql = 'SELECT * FROM pack';
			$list_packs = $this->db->fetchAssoc ( $sql );
			foreach ( $list_packs as $pack ) {
				if ($pack ['libelle_pack'] == $pack_string) {
					$pack_id = $pack ['id_pack'];
					$this->logger->info ( 'id pack trouvé = ' . $pack_id );
				}
			}
			$service_to_save = array ('description' => $description, 'prix' => $prix, 'date_debut' => $date_debut, 'date_fin' => $date_fin, 'status' => $status, 'id_type_service' => $type_service_id, 'id_pack' => $pack_id, 'paye' => $paye, 'id_commande' => $commande );
			$this->logger->info ( 'service to save ' . html_entity_decode ( Zend_Debug::dump ( $service_to_save, $label = null, $echo = false ), ENT_COMPAT, "utf-8" ) );
		}
		// construire le tableau pour l'enregistrement de service
		try {
			$this->db->insert ( 'service', $service_to_save );
			$this->logger->info ( 'inserer service : ' . $this->db->getProfiler ()->getLastQueryProfile ()->getQuery () );
			$id_service_enregistrer = $this->db->lastInsertId ();
			$this->logger->info ( 'last inserted ID = ' . $id_service_enregistrer );
			$reponse = 'success';
			$this->logger->info ( 'insertion - service - OUI' );
		} catch ( Zend_Db_Adapter_Exception $e ) {
			$reponse = 'Erreur';
			$this->logger->info ( 'Requete erreur : ' . $e->getMessage () );
		}
		// $json = Zend_Json::encode($table_reponse);
		$this->db->getProfiler ()->setEnabled ( false );
		echo $reponse;
	
	}
	public function modifyformAction() {
		$this->logger->info ( 'service modifyform()' );
		$this->view->general_icon = 'ico color brush';
		$this->view->title = 'Modifier un service';
		
		$this->db->setFetchMode ( Zend_Db::FETCH_OBJ );
		$req_id = $this->getRequest ()->getParam ( 'id' );
		$id = $this->db->quote ( $req_id );
		
		// recupperation des infos de l'service stocker dans la table service
		$sql = 'SELECT * FROM commande';
		$this->view->list_commandes = $this->db->fetchAssoc ( $sql );
		$sql = 'SELECT * FROM type_service';
		$this->view->list_types_services = $this->db->fetchAssoc ( $sql );
		$sql = 'SELECT * FROM pack';
		$this->view->list_packs = $this->db->fetchAssoc ( $sql );
		$sql = "SELECT * FROM service WHERE id_service = $id";
		$service = $this->db->fetchRow ( $sql );
		$this->logger->info ( html_entity_decode ( Zend_Debug::dump ( $service, $label = null, $echo = false ), ENT_COMPAT, "utf-8" ) );
		
		$this->db->setFetchMode ( Zend_Db::FETCH_ASSOC );
		$this->view->service = $service;
	}
	public function modifyAction() { // brush
		if($this->config->info == 0){
			$this->logger->info ( 'service modifyACtion()' );
		}
		
		// stocker les messages d'erreur/succe pour les retourner à
		// l'utilisateur
		// $table_reponse = array ('message' => '');
		$reponse = '';
		
		$this->_helper->layout->disableLayout (); // on veut desactiver
		                                          // l'affichage par défault
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		// SOLUTION 1
		
		// recupperation des valeurs entrer par l'utilisateur
		$request_body = $this->getRequest ()->getRawBody ();
		$this->logger->info ( 'Request body : ' . $request_body );
		$data_from_user = Zend_Json::decode ( $request_body );
		// Activer cette ligne pour voir le resultat du decodage
		
		$this->logger->info ( 'Decoded data from user : ' . html_entity_decode ( Zend_Debug::dump ( $data_from_user, $label = null, $echo = false ), ENT_COMPAT, "utf-8" ) );
		$commande = $data_from_user ['commande'];
		$date_debut = $data_from_user ['date_debut'];
		$date_fin = $data_from_user ['date_fin'];
		$description = $data_from_user ['description'];
		$pack_string = $data_from_user ['pack'];
		$paye = $data_from_user ['paye_hidden'];
		$prix = $data_from_user ['prix'];
		$status = $data_from_user ['status_hidden'];
		$type_service_string = $data_from_user ['type_service'];
		$id = $data_from_user['id'];
		
		// PHASE D INSERTION DE L service DANS LA TABLE 'service'
		
		
		$type_service_id = NULL;
		$pack_id = NULL;
		if ($pack_string == 'aucun') { // si pack n'existe pas
			$this->logger->info ( 'pack = aucun');
			$sql = 'SELECT * FROM type_service';
			$list_types_services = $this->db->fetchAssoc ( $sql );
			foreach ( $list_types_services as $type_service ) {
				if ($type_service ['libelle_type_service'] == $type_service_string) {
					$type_service_id = $type_service ['id_type_service'];
					$this->logger->info ( 'id type service trouvé = ' . $type_service_id );
				}
			}
			$service_to_save = array ('description' => $description, 'prix' => $prix, 'date_debut' => $date_debut, 'date_fin' => $date_fin, 'status' => $status, 'id_type_service' => $type_service_id, 'paye' => $paye, 'id_commande' => $commande );
			$this->logger->info ( 'service to save ' . html_entity_decode ( Zend_Debug::dump ( $service_to_save, $label = null, $echo = false ), ENT_COMPAT, "utf-8" ) );
		
		} else {//si pack existe
			$sql = 'SELECT * FROM type_service';
			$list_types_services = $this->db->fetchAssoc ( $sql );
			foreach ( $list_types_services as $type_service ) {
				if ($type_service ['libelle_type_service'] == $type_service_string) {
					$type_service_id = $type_service ['id_type_service'];
					$this->logger->info ( 'id type_service trouvé = ' . $type_service_id );
				}
			}
			$sql = 'SELECT * FROM pack';
			$list_packs = $this->db->fetchAssoc ( $sql );
			foreach ( $list_packs as $pack ) {
				if ($pack ['libelle_pack'] == $pack_string) {
					$pack_id = $pack ['id_pack'];
					$this->logger->info ( 'id pack trouvé = ' . $pack_id );
				}
			}
			$service_to_save = array ('description' => $description, 'prix' => $prix, 'date_debut' => $date_debut, 'date_fin' => $date_fin, 'status' => $status, 'id_type_service' => $type_service_id, 'id_pack' => $pack_id, 'paye' => $paye, 'id_commande' => $commande );
			$this->logger->info ( 'service to save ' . html_entity_decode ( Zend_Debug::dump ( $service_to_save, $label = null, $echo = false ), ENT_COMPAT, "utf-8" ) );
		}
		// construire le tableau pour l'enregistrement de service
		try {
			$condition = "id_service = $id";
			$this->db->update ( 'service', $service_to_save, $condition );
			$this->logger->info ( 'update service : ' . $this->db->getProfiler ()->getLastQueryProfile ()->getQuery () );
			$reponse = 'success';
			$this->logger->info ( 'insertion - service - OUI' );
		} catch ( Zend_Db_Adapter_Exception $e ) {
			$reponse = 'Erreur';
			$this->logger->info ( 'Requete erreur : ' . $e->getMessage () );
		}
		// $json = Zend_Json::encode($table_reponse);
		$this->db->getProfiler ()->setEnabled ( false );
		echo $reponse;
	}
	
	public function deleteAction() {
		$n_lignes_supprime = NULL;
		$table_reponse = array ('message' => '' );
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$data_from_user = $this->_getAllParams ();
		$condition = 'id_service = ' . $data_from_user ['id'];
		
		try {
			$n_lignes_supprime = $this->db->delete ( 'service', $condition );
			$table_reponse ['message'] = 'Le service a été supprimer';
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
				$condition = 'id_service = ' . $data_from_user [$indice];
				$this->db->delete ( 'service', $condition );
			}
			$table_reponse ['message'] = 'Les services ont été bien supprimés';
		
		} catch ( Zend_Db_Adapter_Exception $e ) {
			$table_reponse ['message'] = $e->getMessage ();
		}
		$json = Zend_Json::encode ( $table_reponse );
		echo $json;
	}

}





