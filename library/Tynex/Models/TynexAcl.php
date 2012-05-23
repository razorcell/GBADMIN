<?php
// video 1
class Tynex_Models_TynexAcl extends Zend_Acl {
	public function __construct() {
		$controllers = array ('error', 'index', 'client', 'project', 'service', 'commande', 'employe', 'occupation', 'pack', 'poste', 'typeprojet', 'typeservice', 'authentication' );
		$roles = array ('administrateur', 'invite');
		
		foreach ( $roles as $role ) {
			$this->addRole ( new Zend_Acl_Role ( $role ) );
		}
		foreach ( $controllers as $controller ) {
			$this->add ( new Zend_Acl_Resource ( $controller ) );
		}
		$this->allow ( 'administrateur' );
		$this->allow ( 'invite', null, 'index' );
		$this->allow ( 'invite', 'authentication' );
	}
}