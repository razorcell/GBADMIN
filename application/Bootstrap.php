<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {
	
	protected function _initCache() {
		$aFrontendConf = array ('lifetime' => 345600, 'automatic_seralization' => true );
		$aBackendConf = array ('cache_dir' => APPLICATION_PATH . '/../tmp/' );
		$oCache = Zend_Cache::factory ( 'Core', 'File', $aFrontendConf, $aBackendConf );
		$oCache->setOption ( 'automatic_serialization', true );
		Zend_Locale::setCache ( $oCache );
	}
	
	protected function _initAcl() {
		
		$fc = Zend_Controller_Front::getInstance ();
		$fc->registerPlugin ( new Tynex_Plugins_AccessCheck () ); // register
			                                                          // the plugin
	}
}

