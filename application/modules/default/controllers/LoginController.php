<?php 
   
	class LoginController extends Zend_Controller_Action
	{
		
		public function init()
		{
			$this->_helper->layout->setLayout('login');
		}
		
		public function indexAction()
		{
			$this->_forward('login');
		}
     
        public function loginAction()
        {
    
            $loginForm = new Tynex_Forms_Login();
    
            $this->view->loginForm = $loginForm;
     
        }
     
    }