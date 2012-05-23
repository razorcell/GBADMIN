<?php

class IndexController extends Zend_Controller_Action {
	private $config = NULL;
	private $db = NULL;
	private $writer = NULL;
	private $logger = NULL;
	public function init() {

		$this->ctrl = $this->_request->getControllerName ();
		$this->view->ctrl = $this->ctrl;
		$this->writer = new Zend_Log_Writer_Stream ( APPLICATION_PATH . '/../tests/logs' );
		$this->logger = new Zend_Log ( $this->writer );
		
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
		$this->logger->info ( 'IndexController : Fonction init() executée' );
		$this->view->general_icon = 'ico color home';
		$this->view->title = 'Administration de Tynex Media';
	}
	public function indexAction() {
		$this->logger->info ( 'IndexConroller : Fonction index() executée' );
		$this->db->setFetchMode ( Zend_Db::FETCH_OBJ );
		// service actif
		$sql = 'SELECT count( id_service ) AS totale
					FROM service
					WHERE STATUS = \'Actif\'';
		$this->view->services_actifs = $this->db->fetchRow ( $sql );
		// service interrompu
		
		$sql = 'SELECT count( id_service ) AS totale
		FROM service
		WHERE STATUS = \'Interrompu\'';
		$this->view->services_interrompus = $this->db->fetchRow ( $sql );
		// projets actif
		$sql = 'SELECT count( id_projet ) AS totale
		FROM projet
		WHERE STATUS = \'Actif\'';
		$this->view->projets_actifs = $this->db->fetchRow ( $sql );
		// projets interrompu
		
		$sql = 'SELECT count( id_projet ) AS totale
		FROM projet
		WHERE STATUS = \'Interrompu\'';
		$this->view->projets_interrompus = $this->db->fetchRow ( $sql );
		
		
		//service non payes
		$sql = 'SELECT count( id_service ) AS totale
		FROM service
		WHERE paye = \'Non\'';
		$this->view->services_non_paye = $this->db->fetchRow ( $sql );
		//projet non payes
		$sql = 'SELECT count( id_projet ) AS totale
		FROM projet
		WHERE paye = \'Non\'';
		$this->view->projets_non_paye = $this->db->fetchRow ( $sql );
		
		$projet_en_cour = 0;
		$projet_fini = 0;
		$sql = 'SELECT *
		FROM projet';
		$list_projets = $this->db->fetchAssoc ( $sql );
		foreach ( $list_projets as $projet ) {
			if ($projet ['progression'] == 100) {
				$projet_fini ++;
			} else {
				$projet_en_cour ++;
			}
		
		}
		$this->view->projets_fini = $projet_fini;
		$this->view->projets_en_cour = $projet_en_cour;
		//total employes
		$sql = 'SELECT count( id_employe ) AS totale FROM employe';
		$this->view->employes = $this->db->fetchRow ( $sql );
		
		$sql = 'SELECT date_debut
		FROM service WHERE id_service = 4';
		//Traitement d'expiration
		//current_date
		
		//$this->logger->info(html_entity_decode('Commande to save : '.Zend_Debug::dump(Zend_Locale::getLocaleList(),$label = null,$echo = false), ENT_COMPAT, "utf-8"));
		$this->logger->info ('locale creation');
		$locale1 = new Zend_Locale("fr_FR");
		$services_expired = array();
		$this->logger->info ('current date creation');
		$current_date = Zend_Date::now($locale1);
		$this->logger->info ($locale1->toString());
		
		//$current_date = new Zend_Date($current_date,'dd.MM.yyyy',$locale1);
		$this->logger->info ( 'current date  : '.$current_date->__toString());
		
		
		//get the services that will expire in 1 month
		$this->db->setFetchMode ( Zend_Db::FETCH_ASSOC );
		$sql = 'SELECT * FROM service WHERE status = \'Actif\'';		
		$list_services = $this->db->fetchAll ( $sql );
		$this->logger->info ( "foreach : ");
		foreach($list_services as $service){
			$date_fin_string = $service['date_fin'];
			$date_fin = new Zend_Date($date_fin_string,'dd.MM.yyyy',$locale1);
			$this->logger->info ( $date_fin->__toString());
			$diff = $date_fin->sub($current_date)->toValue();
			$months = floor(((($diff/60)/60)/24)/30);
			if($months <= 1 && $months >= 0){
				array_push($services_expired, array('id_service' => $service['id_service'],
																		'diff' => $diff));
			}
		}
		$this->logger->info(html_entity_decode('Commande to save : '.Zend_Debug::dump($services_expired,$label = null,$echo = false), ENT_COMPAT, "utf-8"));
		
		$this->view->services_expired = $services_expired;
		$this->db->setFetchMode ( Zend_Db::FETCH_ASSOC );
		//send list of services and type_service to view
		$sql = 'SELECT *
		FROM service NATURAL JOIN type_service';
		$this->view->services__types = $this->db->fetchAll ( $sql );
		
		
		
	}
}
