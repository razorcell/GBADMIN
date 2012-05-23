<?php
class Tynex_Forms_Login extends Zend_Form
{
	public function init()
  	{
  		$this->setMethod('post');
  		$this->setAction('/login');
  		
  		$this->setOptions(array('class' => 'niceform','id' => 'form1'));
  		$this->setDecorators(array(
  				'FormElements',
  				array('HtmlTag', array('tag' => 'table')),
  				'Form',
  		));
  		//$this->getDecorator('HtmlTag')->setOptions(array('tag' => 'fieldset'));
  		/*$this->setDecorators(array(
  				'Errors',
    			'FormElements',
   				array('HtmlTag', array('tag' => 'fieldset')),
    			'Form'
		));*/
		  $username = new Zend_Form_Element_Text('username');
		  $username->setLabel('username');
		  $username->setRequired(true);
		  $username->setDecorators(array(
		  		'ViewHelper',
		  		'Errors',
		  		array(array('data' => 'HtmlTag'), array('tag' => 'td', 'class' => 'element')),
		  		array('Label', array('tag' => 'td'),
		  		array(array('row' => 'HtmlTag'), array('tag' => 'tr')),
		  		)));
		  
		  
		  $pass = new Zend_Form_Element_Password('password');
		  $pass->setlabel('password');
		  $pass->setRequired(true);
		  $pass->setDecorators(array(
		  		'ViewHelper',
		  		'Errors',
		  		array(array('data' => 'HtmlTag'), array('tag' => 'td', 'class' => 'element')),
		  		array('Label', array('tag' => 'td'),
		  				array(array('row' => 'HtmlTag'), array('tag' => 'tr')),
		  		)));
		  /*
		  $pass->setDecorators(array(
	      		'ViewHelper',
		   		'Errors',
	      		array(array('data' => 'HtmlTag'), array('tag' => 'td', 'class' => 'element')),
	      		array(array('label' => 'HtmlTag'), array('tag' => 'td', 'placement' => 'prepend')),
	      		array(array('row' => 'HtmlTag'), array('tag' => 'tr')),
	      ));
		  */

	      $submit = new Zend_Form_Element_Submit('login');
	      $submit->setLabel('login');
	      $submit->setDecorators(array(
	      		'ViewHelper',
	      		array(array('data' => 'HtmlTag'), array('tag' => 'td', 'class' => 'element')),
	      		array(array('label' => 'HtmlTag'), array('tag' => 'td', 'placement' => 'prepend')),
	      		array(array('row' => 'HtmlTag'), array('tag' => 'tr')),
	      ));
	     

		  $this->addElements(array($username,$pass,$submit));
  	}
}

