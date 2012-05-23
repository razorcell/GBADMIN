<?php

class CommandeController extends Zend_Controller_Action {
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
		$this->view->general_icon = 'ico color shadow list' ;
	}
	public function indexAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		$this->view->title = 'Commande';
		
		$sql = 'SELECT * FROM commande';
		$this->view->list_commandes = $this->db->fetchAssoc ( $sql );
		
		$sql = 'SELECT * FROM client';
		$this->view->list_clients = $this->db->fetchAssoc ( $sql );
	}
	public function addAction() {
		$this->action = $this->_request->getActionName ();
		$this->view->action = $this->action;
		
		$this->view->general_icon = 'ico color add';
		$this->view->title = 'Ajouter une commande';
		$sql = 'SELECT * FROM type_projet';
		$this->view->list_types_projets = $this->db->fetchAssoc ( $sql );
		$sql = 'SELECT * FROM type_service';
		$this->view->list_types_services = $this->db->fetchAssoc ( $sql );
		$sql = 'SELECT * FROM employe';
		$this->view->list_employes = $this->db->fetchAssoc ( $sql );
		$sql = 'SELECT * FROM client';
		$this->view->list_clients = $this->db->fetchAssoc ( $sql );
	
	}
	public function submitAction() {
		$reponse = array ('message' => '',
													'id_commande'=> '',
													'commande_exists' => 'non' );
		
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		// recupperation des valeurs entrer par l'utilisateur
		$request_body = $this->getRequest ()->getRawBody ();
		$this->logger->info ( 'Request body : ' . $request_body );
		$data_from_user = Zend_Json::decode ( $request_body );
		
		$client_id = NULL;
		$id_commande = NULL;
		//chercher id_type_service
		$this->logger->info ( 'PART 1 SOLVE COMMANDE');
		if(isset($data_from_user['id_commande'])){//si commande existe
			$this->logger->info ('COMMANDE EXIST');
			$reponse['commande_exists'] = 'oui';
			$id_commande = $data_from_user['id_commande'];
			$reponse['id_commande'] = $id_commande;
		}else{//inserer nouvelle commande
			
			$this->logger->info ( 'NEW COMMANDE');
			$client_string = $data_from_user ['client'];
			//get the client id
			$sql = 'SELECT * FROM client';
			$list_clients = $this->db->fetchAssoc ( $sql );
			
			foreach ($list_clients as $client){
				if($client['type'] == 'Entreprise'){
					//client est entreprise comparer la colone societe
					if($client['societe'] == $client_string){
						$client_id = $client['id_client'];
						$this->logger->info('client_id trouvé = '.$client_id);
					}				
				}else if($client['type'] == 'Particulier'){
					//client est entreprise comparer la colone societe
					if($client['nom'] == $client_string){
						$client_id = $client['id_client'];
						$this->logger->info('client_id trouvé = '.$client_id);
					}				
				
				}
			}//client id found
			$description = $data_from_user['description_commande'];
			$commande_to_save = array('id_client' => $client_id,
					'libelle_commande' => $description
					);
			$this->logger->info(html_entity_decode('Commande to save : '.Zend_Debug::dump($commande_to_save,$label = null,$echo = false), ENT_COMPAT, "utf-8"));
			try {//insertion de commande
				$this->db->insert ( 'commande', $commande_to_save );
				$id_commande = $this->db->lastInsertId();
				$this->logger->info('add commande : '.$this->db->getProfiler()->getLastQueryProfile()->getQuery());
				$this->logger->info('last inserted ID = '.$id_commande);
				$reponse['message'] = 'success';
				$reponse['id_commande'] = $id_commande;
				$this->logger->info('insertion - COMMANDE - OUI');
			} catch ( Zend_Db_Adapter_Exception $e ) {
				$reponse['message']= 'Erreur';
				$this->logger->info('Requete erreur : '.$e->getMessage());
			}
			
		}
		//getting out of here we must return id_commande NEW or FORM GIVEN
		//insert the right data Service or project
		if($data_from_user['request_type'] == 'projet'){//INSERT A PROJECT
			$this->logger->info ('INSERT PROJET');
			$id_projet_enregistrer = NULL;//on va l'utiliser pour se rappeller de l'id de l'employe enregistrer dans la BD
			$commande = $id_commande;
			$date_debut = $data_from_user ['date_debut'];
			$date_fin = $data_from_user ['date_fin'];
			$description = $data_from_user ['description_projet'];
			$progression = $data_from_user ['progression'];
			$paye = $data_from_user ['paye_hidden'];
			$prix = $data_from_user ['prix_projet'];
			$status = $data_from_user ['status_hidden'];
			$type_projet_string = $data_from_user ['type_projet'];//jusqu'ici il ne reste que les employes
			
			
			//PHASE D INSERTION DE DU PROJET DANS LA TABLE 'projet'
			//recupperation de id_type_projet equivalent au type_projet_string
			$this->logger->info('*********************PHASE D INSERTION DU PROJET************');
			$sql = 'SELECT * FROM type_projet';
			$list_types_projets = $this->db->fetchAssoc ( $sql );
			$type_projet_id = NULL;
			foreach ($list_types_projets as $type_projet){
				//$this->logger->info('current nom_type_projet = '.$type_projet['nom_type_projet'].' <--> current_type_projet =  '.$type_projet_string);
				if($type_projet['nom_type_projet'] == $type_projet_string){
					$type_projet_id = $type_projet['id_type_projet'];
					$this->logger->info('type_projet_id trouvé = '.$type_projet_id);
				}
			}
			//construire le tableau pour l'enregistrement du projet
			$project_to_save = array ('description' => $description,
					'prix' => $prix,
					'progression' => $progression,
					'status' => $status,
					'date_debut' => $date_debut,
					'date_fin' => $date_fin,
					'id_type_projet' => $type_projet_id,
					'paye' => $paye,
					'id_commande' => $commande );
			$this->logger->info(html_entity_decode(Zend_Debug::dump($project_to_save,$label = null,$echo = false), ENT_COMPAT, "utf-8"));
			try {
				$this->db->insert ( 'projet', $project_to_save );
				$id_projet_enregistrer = $this->db->lastInsertId();
				$this->logger->info('add a project : '.$this->db->getProfiler()->getLastQueryProfile()->getQuery());
				$this->logger->info('last inserted ID = '.$id_projet_enregistrer);
				$reponse['message'] = 'success';
				$this->logger->info('insertion - PROJET - OUI');
			} catch ( Zend_Db_Adapter_Exception $e ) {
				$reponse['message']= 'Erreur';
				$this->logger->info('Requete erreur : '.$e->getMessage());
			}
			//PHASE D INSERTION DES TUPLES id_projet | id_employe DANS LA TABLE 'INTERVENIR'
			$this->logger->info('*****************HASE D INSERTION DES TUPLES id_projet | id_employe************');
			//recupperer la liste des employe
			$sql = 'SELECT * FROM employe';
			$list_employes = $this->db->fetchAssoc ( $sql );
			
			foreach($data_from_user ['employes'] as $table_employe)// !!!!!!!!!!!!!!!!!! $data_from_user ['employes'] : Tableau des tableaux des employes
			{//itterrer dans le champs des employes de l'employe
			foreach ($table_employe as $employe){//$table_employe : tableau des employes
				//itterer dans tous les employes de l'employe
				foreach ($list_employes as $employe_from_db)
				{//itterer dans les employe de la BD
					if($employe_from_db['nom'] == $employe){// !!!!!!!!!!!!!!!!!!						{//l'employe a cette employe, on cherche id_occup equivalent et on insert dans la BD
						$id_employe_courant = $employe_from_db['id_employe'];
						$this->logger->info('MATCH FOUND : nom employe trouvé '.$employe_from_db['nom'] .'<-------> nom employe from user '.$employe);
						//construire le tableau pour l'enregistrement du tuple id_employe | id_occup
						$tuple_employe_projet = array('id_projet' => $id_projet_enregistrer,
								'id_employe' => $id_employe_courant);
						try {
							$this->logger->info(html_entity_decode(Zend_Debug::dump($tuple_employe_projet,$label = null,$echo = false), ENT_COMPAT, "utf-8"));
							$this->db->insert ( 'intervention', $tuple_employe_projet );
							$this->logger->info('add intervention : '.$this->db->getProfiler()->getLastQueryProfile()->getQuery());
							$this->logger->info('insertion - INTERVENTION - OUI                FIN');
							$reponse['message'] = 'success';
						} catch ( Zend_Db_Adapter_Exception $e ) {
							$this->logger->info($e->getMessage ());
						}
					}
				}
			}	//foreach employe in data_from_user
			}
		}//end COMMANDE PROJET INSERT 
		else if($data_from_user['request_type'] == 'service'){//INSERT A SERVICE
			$this->logger->info ( 'INSERT SERVICE');
			$commande = $id_commande;
			$date_debut = $data_from_user ['date_debut_service'];
			$date_fin = $data_from_user ['date_fin_service'];
			$description = $data_from_user ['description_service'];
			$pack_string = $data_from_user ['pack'];
			$paye = $data_from_user ['paye_hidden'];
			$prix = $data_from_user ['prix_service'];
			$status = $data_from_user ['status_hidden'];
			$type_service_string = $data_from_user ['type_service'];
			
			// PHASE D INSERTION DE L service DANS LA TABLE 'service'
			
			$this->logger->info ( '*********************PHASE D INSERTION SERVICE************' );
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
				$reponse['message'] = 'success';
				$reponse['id_commande'] = $id_commande;
				$this->logger->info ( 'insertion - service - OUI' );
			} catch ( Zend_Db_Adapter_Exception $e ) {
				$reponse['message'] = 'Erreur';
				$this->logger->info ( 'Requete erreur : ' . $e->getMessage () );
			}
		}//end COMMANDE SERVICE INSERT
		$json = Zend_Json::encode($reponse);
		$this->db->getProfiler()->setEnabled(false);
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
		$nom_commande = $data_from_user ['nom_commande'];
		$id_commande = $data_from_user['id'];
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
		$data_to_save = array ('libelle_commande' => $nom_commande, 'id_type_service' => $type_service_id);
		try {
			$condition = "id_commande = $id_commande";
			$this->db->update ( 'commande', $data_to_save, $condition );
			$table_reponse ['message'] = 'Le commande a été bien modifier ';
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
		$this->view->title = 'Modifier une commande';
		
		$this->db->setFetchMode ( Zend_Db::FETCH_OBJ );
		$req_id = $this->getRequest ()->getParam ( 'id' );
		$id = $this->db->quote ( $req_id );
		$sql = "SELECT * FROM commande WHERE id_commande = $id";
		$this->view->commande = $this->db->fetchRow ( $sql );
		$this->db->setFetchMode ( Zend_Db::FETCH_ASSOC );
		//get projects list
		$sql = "SELECT * FROM projet WHERE id_commande = $id";
		$this->view->list_projets = $this->db->fetchAssoc ( $sql );
		$sql = "SELECT * FROM type_projet";
		$this->view->list_types_projets = $this->db->fetchAssoc ( $sql );
		//get services list
		$sql = "SELECT * FROM service WHERE id_commande = $id";
		$this->view->list_services = $this->db->fetchAssoc ( $sql );
		$sql = "SELECT * FROM type_service";
		$this->view->list_types_services = $this->db->fetchAssoc ( $sql );
		//get clients list
		$sql = "SELECT * FROM client";
		$this->view->list_clients = $this->db->fetchAssoc ( $sql );
		//get employes list
		$sql = "SELECT * FROM employe";
		$this->view->list_employes = $this->db->fetchAssoc ( $sql );
	}
	
	public function deleteAction() {
		$n_lignes_supprime = NULL;
		$table_reponse = array ('message' => '' );
		$this->_helper->layout->disableLayout ();
		$this->_helper->viewRenderer->setNoRender ( TRUE );
		
		$data_from_user = $this->_getAllParams ();
		$condition = 'id_commande = ' . $data_from_user ['id'];
		try {
			$n_lignes_supprime = $this->db->delete ( 'commande', $condition );
			$table_reponse ['message'] = 'L\'commande a été supprimer';
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
				$condition = 'id_commande = ' . $data_from_user [$indice];
				$this->db->delete ( 'commande', $condition );
			}
			$table_reponse ['message'] = 'Les commandes ont été bien supprimés';
		
		} catch ( Zend_Db_Adapter_Exception $e ) {
			$table_reponse ['message'] = $e->getMessage ();
		}
		$json = Zend_Json::encode ( $table_reponse );
		echo $json;
	}
	public function factureAction(){
		$this->_helper->layout->disableLayout();
		//get the equivalent id_commande
		
		$req_id = $this->getRequest ()->getParam ( 'id' );
		$id = $this->db->quote ( $req_id );
		$sql = "SELECT * FROM commande WHERE id_commande = $id";
		$this->db->setFetchMode ( Zend_Db::FETCH_OBJ );
		$commande = $this->db->fetchRow ( $sql );
		$this->view->commande = $commande;
		
		//get the client data
		$id_client = $commande->id_client;
		$sql = "SELECT * FROM client WHERE id_client = $id_client";
		$client = $this->db->fetchRow ( $sql );
		$this->view->client = $client;
		//get projects list
		$condition = $this->db->quote ( 'Non' );
		$this->db->setFetchMode ( Zend_Db::FETCH_ASSOC );
		$sql = "SELECT * FROM projet WHERE id_commande = $id AND paye = $condition";
		$this->view->list_projets = $this->db->fetchAssoc ( $sql );
		$sql = "SELECT * FROM type_projet";
		$this->view->list_types_projets = $this->db->fetchAssoc ( $sql );
		
		
		//get services list
		$sql = "SELECT * FROM service WHERE id_commande = $id AND paye = $condition";
		$this->view->list_services = $this->db->fetchAssoc ( $sql );
		$sql = "SELECT * FROM type_service";
		$this->view->list_types_services = $this->db->fetchAssoc ( $sql );
		$sql = "SELECT * FROM pack";
		$this->view->list_packs = $this->db->fetchAssoc ( $sql );
		
	}
	public function reglementAction(){
		$this->_helper->layout->disableLayout();
		//get the equivalent id_commande
	
		$req_id = $this->getRequest ()->getParam ( 'id' );
		$id = $this->db->quote ( $req_id );
		$sql = "SELECT * FROM commande WHERE id_commande = $id";
		$this->db->setFetchMode ( Zend_Db::FETCH_OBJ );
		$commande = $this->db->fetchRow ( $sql );
		$this->view->commande = $commande;
	
		//get the client data
		$id_client = $commande->id_client;
		$sql = "SELECT * FROM client WHERE id_client = $id_client";
		$client = $this->db->fetchRow ( $sql );
		$this->view->client = $client;
		//get projects list
		$condition = $this->db->quote ( 'Non' );
		$this->db->setFetchMode ( Zend_Db::FETCH_ASSOC );
		$sql = "SELECT * FROM projet WHERE id_commande = $id AND paye = $condition";
		$this->view->list_projets = $this->db->fetchAssoc ( $sql );
		$sql = "SELECT * FROM type_projet";
		$this->view->list_types_projets = $this->db->fetchAssoc ( $sql );
	
	
		//get services list
		$sql = "SELECT * FROM service WHERE id_commande = $id AND paye = $condition";
		$this->view->list_services = $this->db->fetchAssoc ( $sql );
		$sql = "SELECT * FROM type_service";
		$this->view->list_types_services = $this->db->fetchAssoc ( $sql );
		$sql = "SELECT * FROM pack";
		$this->view->list_packs = $this->db->fetchAssoc ( $sql );
	
	}

}



