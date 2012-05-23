<?php
class Tynex_Plugins_AccessCheck extends Zend_Controller_Plugin_Abstract {
	private $config = NULL;
	private $db = NULL;
	private $writer = NULL;
	private $logger = NULL;
	
	public function init() {
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
		$this->logger->info ( 'Tynex_Plugins_AccessCheck : Fonction init() executée' );
		
	}
public function preDispatch(Zend_Controller_Request_Abstract $request)
    {
        $loginController = 'authentication';
        $loginAction     = 'login';

        $auth = Zend_Auth::getInstance();

        // If user is not logged in and is not requesting login page
        // - redirect to login page.
        if (!$auth->hasIdentity()
                && $request->getControllerName() != $loginController
                && $request->getActionName()     != $loginAction) {

            $redirector = Zend_Controller_Action_HelperBroker::getStaticHelper('Redirector');
            $redirector->gotoSimpleAndExit($loginAction, $loginController);
        }

        // User is logged in or on login page.

        if ($auth->hasIdentity()) {
            // Is logged in
            // Let's check the credential
        	$acl = new Tynex_Models_TynexAcl ();
		
            $identity = $auth->getIdentity();
            // role is a column in the user table (database)
            $isAllowed = $acl->isAllowed($identity->role,
                                         $request->getControllerName(),
                                         $request->getActionName());
            if (!$isAllowed) {
                $redirector = Zend_Controller_Action_HelperBroker::getStaticHelper('Redirector');
                $redirector->gotoUrlAndExit('/');
            }
        }
    }
	
}
