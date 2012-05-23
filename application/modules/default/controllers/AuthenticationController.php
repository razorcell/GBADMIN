<?php

class AuthenticationController extends Zend_Controller_Action {
	private $config = NULL;
	private $db = NULL;
	public function init() {
		$this->writer = new Zend_Log_Writer_Stream ( APPLICATION_PATH . '/../tests/logs' );
		$this->logger = new Zend_Log ( $this->writer );
		
		$this->logger->info ( 'Authentication : Fonction init() executée' );
		
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
	}
	public function indexAction() {
		$this->_forward ( 'login' );
	}
	public function loginAction() {
		$this->_helper->layout->disableLayout ();
		//$this->_helper->layout->setLayout ( 'login' );
			$request = $this->getRequest ();
			if ($request->isPost ()) {
					$data_from_user = $this->getRequest()->getParams();
					$username = $data_from_user['username'];
					$password = $data_from_user['password'];
					
					$authAdapter = $this->getAuthAdapter ();//look down to see the definition of this function
					$authAdapter->setIdentity ( $username )->setCredential ( sha1($password) );
					$this->logger->info ( sha1($password)  );
					
					$auth = Zend_Auth::getInstance ();
					$result = $auth->authenticate ( $authAdapter );
					
					if ($result->isValid ()) { // identification correct
						$identity = $authAdapter->getResultRowObject (null,'password');
						$auth->getStorage ()->write ( $identity );
					//	$this->view->message = 'Authentification réussie, cliquer sur <strong>logout</strong> en haut à droite pour se déconnecter';
						$this->_redirect ( '/' );
						$this->logger->info ( 'LOGED IN' );
						
						// $this->render('loggedin');
					} else { // rong identification
						$this->view->message = 'Identification incorrecte';
						// $this->_redirect('/Authentication/login');
						// $this->render('logout');
					}
			} // end if request isPost()
		
	}
	public function logoutAction() {
		$auth = Zend_Auth::getInstance ();
		$auth->clearIdentity ();
		$this->view->message = 'you are logged out';
		$this->_redirect ( '/' );
		// $this->render('logout');
	}
	public function getAuthAdapter() {
		//$authAdapter = new Zend_Auth_Adapter_DbTable ( Zend_Db_Table::getDefaultAdapter () );
		$authAdapter = new Zend_Auth_Adapter_DbTable ( $this->db );
		$authAdapter->setTableName ( 'employe' )->setIdentityColumn ( 'username' )->setCredentialColumn ( 'password' );
		return $authAdapter;
	}
}



