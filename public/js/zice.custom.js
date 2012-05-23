function Refresh() {
location.reload();
};

$.fn.imgdata = function(key){//affiche image de avatar
	return this.find('.dataImg li:eq('+key+')').text();
}
$.fn.hdata = function(key){
	return this.find('.dataSet li:eq('+key+')').text();
}
var buttonActions = {
	  'close_windows':function(){
		  $.fancybox.close(); 
		  ResetForm();
	}	
}

$(document).ready(function(){	

	
	// Tabs
	$("ul.tabs li").fadeIn(400); 
	$("ul.tabs li:first").addClass("active").fadeIn(400); 
	$(".tab_content:first").fadeIn(); 
	$("ul.tabs li").live('click',function() {
		  $("ul.tabs li").removeClass("active");						   
		  $(this).addClass("active");  
		  var activeTab = $(this).find("a").attr("href"); 
		  $('.tab_content').fadeOut();		
		  $(activeTab).delay(400).fadeIn();		
		  ResetForm();
		  return false;
	});
	
	
	//DataTable
		/*var oTable;
		var giRedraw = false;
		//khalifa click handler for selectbale row
	$("#DataTables_Table_0 tbody").click(function(event) {
		$(oTable.fnSettings().aoData).each(function (){
			$(this.nTr).removeClass('row_selected');
		});
		$(event.target.parentNode).addClass('row_selected');
	}); */
	
	
	
	$('.data_table').dataTable({
		"sDom": 'f<"clear">rt<"clear">',
		"oTableTools": {"sRowSelect": "single"},
		"aaSorting": [],
		
	});

	$('.data_table2').dataTable({
	"sDom": 'fCl<"clear">rtip',
	"sPaginationType": "full_numbers",
	"oTableTools": {"sRowSelect": "single"},
	 "aaSorting": [],
	 
	});
	
	//khalifa
	
	/*$(".checkAll").live('click',function(){
		  var table=$(this).parents('table').attr('id'); //table = data_table3 
		  var checkedStatus = this.checked; //
		  var id= this.id;//id = checkAll
		 $( "table#"+table+" tbody tr td:first-child input:checkbox").each(function() {
			this.checked = checkedStatus;
				if (this.checked) {
					//$(this).attr('checked', $('.' + id).is(':checked'));
					$('label[for='+$(this).attr('id')+']').addClass('checked ');
				}else{
					//$(this).attr('checked', $('.' + id).is(''));
					$('label[for='+$(this).attr('id')+']').removeClass('checked ');
					}
		});	 
	});*/		
	
	/*$('.display tr').click(function(){	
	//	$(this).find('input').attr('checked', $('.' + id).is(':checked'));
		
		//$('.display tr').removeClass('row_selected');
		//$('.display tr').find('label').removeClass('checked');
		$(this).toggleClass('row_selected');
		$(this).find('label').toggleClass('checked');
		var id_selectionne = $(this).find('#id_occup').html();
		$('#test').html(id_selectionne);
	});*/
	/*/Add a click handler to the rows - this could be used as a callback 
	$(".tbody").click(function(event) {
		$(oTable.fnSettings().aoData).each(function (){
			$(this.nTr).removeClass('row_selected');
		});
		$(event.target.parentNode).addClass('row_selected');
	});
	
	 Add a click handler for the delete row 
	$('#delete').click( function() {
		var anSelected = fnGetSelected( oTable );
		oTable.fnDeleteRow( anSelected[0] );
	} );*/
	$('.static').dataTable({
		"sDom": '',
		"aaSorting": [],
	  "aoColumns": [
				{ "bSortable": false },{ "bSortable": false },{ "bSortable": false },{ "bSortable": false },{ "bSortable": false }
	  ]
	});
	
	$('.data_table3').dataTable({
	"sDom": 'fCl<"clear">rtip',
	"oTableTools": {"sRowSelect": "single"},
	 "aaSorting": [],
	  "aoColumns": [
				{ "bSortable": false },null,null,{ "bSortable": false }
	  ]
	});
	
		
	
	
	
	// Form validationEngine
	$('form#validation').validationEngine();		
	$('form#validation_demo').validationEngine();	
	
	
	
});	


$(function() {		
	LResize();
	$(window).resize(function(){LResize(); });
    $(window).scroll(function (){ scrollmenu(); });//show the image behind the logo in every page DON'T DELETE
		
	  //Close_windows
	  $('.butAcc').live('click',function(e){				   
			  if(buttonActions[this.id]){
				  buttonActions[this.id].call(this);
			  }
			  e.preventDefault();
	  });
  	//datepicker
	$("input.datepicker").datepicker({ 
		autoSize: true,
		appendText: '(dd.mm.yyyy)',
		dateFormat: 'dd.mm.yy'
	});
	$( "div.datepickerInline" ).datepicker({ 
		dateFormat: 'dd-mm-yy',
		numberOfMonths: 1
	});	
	$( "input.birthday" ).datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat:'yy-mm-dd'
    });
	
	//Button Click  Ajax Loading
	$('.loading').live('click',function() { 
		  var str=$(this).attr('title'); 
		  var overlay=$(this).attr('rel'); 
		  loading(str,overlay);
		  setTimeout("unloading()",1500); 
	  });
	$('#preloader').live('click',function(){
			unloading();
	 });
	
	// Submit Form 
	$('a.submit_form').live('click',function(){
		  var form_id=$(this).parents('form').attr('id');
		  $("#"+form_id).submit();
	})	

	// Logout Click  
	$('.logout').live('click',function() { 
		  var str="Logout"; 
		  var overlay="1"; 
		  loading(str,overlay);
		  setTimeout("unloading()",1500);
		  setTimeout( "window.location.href='index.html'", 2000 );
	  });
		
	
	 
	// Tipsy Tootip
	$('.tip a ').tipsy({gravity: 's',live: true});	
	$('.ntip a ').tipsy({gravity: 'n',live: true});	
	$('.wtip a ').tipsy({gravity: 'w',live: true});	
	$('.etip a,.Base').tipsy({gravity: 'e',live: true});	
	$('.netip a ').tipsy({gravity: 'ne',live: true});	
	$('.nwtip a , .setting ').tipsy({gravity: 'nw',live: true});	
	$('.swtip a,.iconmenu li a ').tipsy({gravity: 'sw',live: true});	
	$('.setip a ').tipsy({gravity: 'se',live: true});	
	$('.wtip input').tipsy({ trigger: 'focus', gravity: 'w',live: true });
	$('.etip input').tipsy({ trigger: 'focus', gravity: 'e',live: true });
	$('.iconBox, div.logout').tipsy({gravity: 'ne',live: true });	

	
	
	// Sortable
	$("#picThumb").sortable({
		opacity: 0.6,handle : '.move', connectWith: '.picThumbUpload', items: '.picThumbUpload'
	});
	$("#main_menu").sortable({
		opacity: 0.6,connectWith: '.limenu',items: '.limenu'		
	});
	$( "#sortable" ).sortable({
		opacity: 0.6,revert: true,cursor: "move", zIndex:9000
	});
	

    

	// Dual select boxes
	$.configureBoxes();

	// placeholder text 
	$('input[placeholder], textarea[placeholder]').placeholder();
	
	// Checkbox 
	$('.ck,.chkbox,.checkAll ,input:radio').customInput();	
	
	// Checkbox Limit
	$('.limit3m').limitInput({max:3,disablelabels:true});
	
	// Select boxes
	$(function() {
        $(' select').not("select.chzn-select,select[multiple],select#box1Storage,select#box2Storage").selectmenu({
            style: 'dropdown',
            transferClasses: true,
            width: null
        });
    });

	// Select boxes in Data table
	$(".dataTables_wrapper .dataTables_length select").addClass("small");
	$("table tbody tr td:first-child .custom-checkbox:first-child").css("margin: 0px 3px 3px 3px");
	
	 // Mutiselection
	$(".chzn-select").chosen(); 
	
	// Checkbox iphoneStyle
	$(".on_off_checkbox").iphoneStyle();  // Label On / Off
	
	//khalifa : controlle sur le formulaire de projet
	$(".show_email").iphoneStyle({  //  Custom Label 
		  checkedLabel: "Montrer",
		  uncheckedLabel: "Cacher",
		  labelWidth:'85px',
		  onChange: function() {
			//$(".formEl_b").slideToggle("slow");
		}
	}); 
	
	//khalifa controlle formulaire des services
	$(".show_conmap").iphoneStyle({ //  Custom Label  With  onChange function
		  checkedLabel: "Service",
		  uncheckedLabel: "Projet",
		  labelWidth:'85px',
		  onChange: function() {
				var chek=$(".show_conmap").attr('checked');
					  if(chek){
						  $(".disabled_map").fadeOut();
					  }else{
						 $(".disabled_map").fadeIn();
					  }
				//$("#show_service").click(function () {
      					$(".formEl_b").slideToggle("slow");
    				//});

		}
	});


	 // Checkbox  All in Data Table
	$(".checkAll").live('click',function(){
		  var table=$(this).parents('table').attr('id'); //table = data_table3 
		  var checkedStatus = this.checked; //
		  var id= this.id;//id = checkAll
		 $( "table#"+table+" tbody tr td:first-child input:checkbox").each(function() {
			this.checked = checkedStatus;
				if (this.checked) {
					$(this).attr('checked', $('.' + id).is(':checked'));
					$('label[for='+$(this).attr('id')+']').addClass('checked ');
				}else{
					$(this).attr('checked', $('.' + id).is(''));
					$('label[for='+$(this).attr('id')+']').removeClass('checked ');
					}
		});	 
	});		
	
	// icon  gray Hover
	$('.iconBox.gray').hover(function(){
		  var name=$(this).find('img').attr('alt');
		  $(this).find('img').animate({ opacity: 0.5 }, 0, function(){
			    $(this).attr('src','images/icon/color_18/'+name+'.png').animate({ opacity: 1 }, 700);									 
		 });
	},function(){
		  var name=$(this).find('img').attr('alt');
		  $(this).find('img').attr('src','images/icon/gray_18/'+name+'.png');
	 })
	
	// Animation icon  Logout 
	$('div.logout').hover(function(){
		  var name=$(this).find('img').attr('alt');
		  $(this).find('img').animate({ opacity: 0.4 }, 200, function(){
			    $(this).attr('src','images/'+name+'.png').animate({ opacity: 1 }, 500);									 
		 });
	},function(){
		  var name=$(this).find('img').attr('name');
		  $(this).find('img').animate({ opacity: 0.5 }, 200, function(){
			    $(this).attr('src','images/'+name+'.png').animate({ opacity: 1 }, 500);									 
		 });
	 })
	
	// Animation icon  setting 
	$('div.setting').hover(function(){
		$(this).find('img').addClass('gearhover');
	},function(){
		$(this).find('img').removeClass('gearhover');
	 })
	
	// shoutcutBox   Hover
	$('.shoutcutBox').hover(function(){
		  $(this).animate({ left: '+=15'}, 200);
	},function(){
		$(this).animate({ left: '0'}, 200);
	 })
	
	// shoutcutBox   Hover
	$("#shortcut li").hover(function() {
		  var e = this;
		$(e).find("a").stop().animate({ marginTop: "-7px" }, 200, function() {
		  $(e).find("a").animate({ marginTop: "-5px" }, 200);
		});
	  },function(){
		  var e = this;
		$(e).find("a").stop().animate({ marginTop: "2px" }, 200, function() {
			  $(e).find("a").animate({ marginTop: "0px" }, 200);
		});
	  });
	
	

	// hide notify  Message with click
	$('#alertMessage').live('click',function(){
	  $(this).stop(true,true).animate({ opacity: 0,right: '-20'}, 500,function(){ $(this).hide(); });						 
	});
	
	
	
				  
	


	
	$(".DeleteAll").live('click',function() {			
		  var rel=$(this).attr('rel');	
		  var row=$(this).parents('.tab_content').attr('id');	
		  var row=row+' .load_page ';
		  if(!rel) { 
			  var rel=0;
			  var row=$('#load_data').attr('id');	 
		  }  
		  var dataSet=$('form:eq('+rel+')');					   
		  var	data=$('form:eq('+rel+')').serialize();
		  var name = 'All File Select';
		 Delete(data,name,row,2,dataSet);
	});
	
	
	// Overlay form
	$(".on_load").live('click',function(){	
		$('body').append('<div id="overlay"></div>');
		$('#overlay').css('opacity',0.4).fadeIn(400);
		var activeLoad = $(this).attr("name");		
		var titleTabs = $(this).attr("title");		
		$("ul.tabs li").hide();		
				$('ul.tabs li').each(function(index) {
						var activeTab = $('ul.tabs li:eq('+index+')').find("a").attr("href")			
						if(activeTab==activeLoad){
							$("ul.tabs ").append('<li class=active><a    href="'+activeLoad+'" class=" prev on_prev "  id="on_prev_pro" name="'+activeLoad+'" >'+titleTabs+'</a></li>');
							$("ul.tabs li:last").fadeIn();	
							}
				});
		$('.widget .content').css({'position':'relative','z-index':'1001'});
		$(".load_page").hide();
		$('.show_add').show();
	 });
	$(".on_prev").live('click',function(){	 
		  $("ul.tabs li:last").remove();					 
		  $("ul.tabs li").fadeIn();
		  var pageLoad = $(this).attr("rel");	
		  var activeLoad = $(this).attr("name");		
			$(".show_add, .show_edit").hide();		
			$(".show_edit").html('').hide();		
				$(activeLoad).fadeIn();	
						$(' .load_page').fadeIn(400,function(){   
							   $('#overlay').fadeOut(function(){
										 $('.widget .content').delay(500).css({'z-index':'','box-shadow':'','-moz-box-shadow':'','-webkit-box-shadow':''});
								}); 
					}); 
		  ResetForm();
		 });	
	
	

    function showTooltip(x, y, contents) {
        $('<div id="tooltip" >' + contents + '</div>').css({
            position: 'absolute',
            display: 'none',
            top: y -13,
            left: x + 10
        }).appendTo("body").show();
    }

    var previousPoint = null;
    $(".chart_flot").bind("plothover", function(event, pos, item) {
												
        $("#x").text(pos.x);
        $("#y").text(pos.y);

        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

			$(this).attr('title',item.series.label);
			$(this).trigger('click');
                $("#tooltip").remove();
                var x = item.datapoint[0],
                    y = item.datapoint[1];

                showTooltip(item.pageX, item.pageY, "<b>" + item.series.label + "</b> : " + y);
            }
        }  else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
 // spinner options 
	var itemListspinner = [
		{url: "http://ejohn.org", title: "John Resig"},
		{url: "http://bassistance.de/", title: "J&ouml;rn Zaefferer"},
		{url: "http://snook.ca/jonathan/", title: "Jonathan Snook"},
		{url: "http://rdworth.org/", title: "Richard Worth"},
		{url: "http://www.paulbakaus.com/", title: "Paul Bakaus"},
		{url: "http://www.yehudakatz.com/", title: "Yehuda Katz"},
		{url: "http://www.azarask.in/", title: "Aza Raskin"},
		{url: "http://www.karlswedberg.com/", title: "Karl Swedberg"},
		{url: "http://scottjehl.com/", title: "Scott Jehl"},
		{url: "http://jdsharp.us/", title: "Jonathan Sharp"},
		{url: "http://www.kevinhoyt.org/", title: "Kevin Hoyt"},
		{url: "http://www.codylindley.com/", title: "Cody Lindley"},
		{url: "http://malsup.com/jquery/", title: "Mike Alsup"}
	];
	/*
	var optionspinner = {
		'sDec': {decimals:2},
		'sMinMax':{min: -100, max: 100 },
		'sStep': {stepping: 0.25},
		'sCur': {currency: '$'},
		'sInline': {},
		'sLink': {
			init: function(e, ui) {
				for (var i=0; i<itemListspinner.length; i++) {
					ui.add('<a href="'+ itemListspinner[i].url +'" target="_blank">'+ itemListspinner[i].title +'</a>');
				}
			},
			format: '<a href="%(url)" target="_blank">%(title)</a>',
			items: itemListspinner
		}
	};	
	for (var n in optionspinner){
		$("#"+n).spinner(optionspinner[n]);
	}
*/
	
	
	});//function end		


	// Check browser fixbug
	var mybrowser=navigator.userAgent;
	if(mybrowser.indexOf('MSIE')>0){$(function() {	
			   $('.formEl_b fieldset').css('padding-top', '0');
				$('div.section label small').css('font-size', '10px');
				$('div.section  div .select_box').css({'margin-left':'-5px'});
				$('.iPhoneCheckContainer label').css({'padding-top':'6px'});
				$('.uibutton').css({'padding-top':'6px'});
				$('.uibutton.icon:before').css({'top':'1px'});
				$('.dataTables_wrapper .dataTables_length ').css({'margin-bottom':'10px'});
		});
	}
	if(mybrowser.indexOf('Firefox')>0){ $(function() {	
			   $('.formEl_b fieldset  legend').css('margin-bottom', '0px');	
			   $('table .custom-checkbox label').css('left', '3px');
		  });
	}	
	if(mybrowser.indexOf('Presto')>0){
		$('select').css('padding-top', '8px');
	}
	if(mybrowser.indexOf('Chrome')>0){$(function() {	
				 $('div.tab_content  ul.uibutton-group').css('margin-top', '-40px');
				  $('div.section  div .select_box').css({'margin-top':'0px','margin-left':'-2px'});
				  $('select').css('padding', '6px');
				  $('table .custom-checkbox label').css('left', '3px');
		});
	}		
	if(mybrowser.indexOf('Safari')>0){}		

	  
	 
		  
	  //Delete(id_occup,name,row,0,action_destination);
	  function Delete(id,description,row,type,action_destination){//row = selected row //id = identifiant de l'element //
	$.confirm({
			'title': 'CONFIRMATION DE LA SUPPRESSION','message': " <strong>VOUS VOULLEZ VRAIMMANT SUPPRIMER</strong><br /><font color=red>' "+ id +" ' </font> ",
			'buttons': 
							{'Yes': 
								{//'class': 'morph',
								'class': 'morph pink',
								'action': function(){		
													
													var json_to_send = '{"id" : "'+id+'"}';
													json_to_send = $.parseJSON(json_to_send);											
													//$('.test').append('Donner à envoyer au serveur : ');
													//$.each(json_to_send, function(i, item) {		
													//	$('.test').append(' = > index :'+i+' -  valeur : '+item);
													//});
															$.ajax({ 
																type : "POST",
																url : action_destination,
																data : json_to_send,
																success : function(data) {
																	//$('.test').append(' ------> Réponse du serveur (JSON)= >'+data);
																	var json = $.parseJSON(data);
																	
																	if (json.message == 'erreur') {																													
																				row.slideUp(function(){   showError('message : '+json.message,5000); unloading(); }); return false;			
																	} else {
																			row.slideUp(function(){   showSuccess(json.message,5000); unloading(); }); return false;

																	}
																},
															fail : function() {
																//$('.test').append('failed');
																showError('Operation failed',5000);
																}//end fail
													});//end .ajax()
									}//end action attribut
								},//end YES attribut
								
							'No'	: {'class': 'morph',
										'action': function(){
											showInfo('Opeartion annulée',3000);
								}//end action attribut
							}//end No attribut
					}//end button attribut
			});//end confirm function
	}//end Delete function
	  
	  function DeleteAll(lines_to_delete,controller){

			$.confirm({
					'title': 'CONFIRMATION DE LA SUPPRESSION','message': " <strong>VOUS VOULLEZ VRAIMMANT SUPPRIMER LES ELEMENTS SELECTIONNER</strong><br /><font color=red></font> ",
					'buttons': 
									{'Yes': 
										{'class': 'morph pink',
										'action': function(){
												var json_to_send = '{';
															$.each(lines_to_delete, function(i,id_courant){
																if(i==0)
																	{
																	json_to_send = json_to_send + '"id'+i+'" : "'+id_courant+'"';
																	}
																else
																	{
																	json_to_send = json_to_send + ',"id'+i+'" : "'+id_courant+'"';
																	}
															});
															var json_to_send_length = lines_to_delete.length;
															json_to_send = json_to_send + ',"taille" : "'+json_to_send_length+'"';
															json_to_send = json_to_send + '}';
															//$('.test').append('Donner à envoyer au serveur : ');
															//$('.test').append(json_to_send);
															json_to_send = $.parseJSON(json_to_send);											
															/*$.each(json_to_send, function(i, item) {		
																$('.test').append(' = > index :'+i+' -  valeur : '+item);
															});*/

																	$.ajax({ 
																		type : "POST",
																		url : '/'+controller+'/deleteall',
																		data : json_to_send,
																		success : function(data) {
																			//$('.test').append(' ------> Réponse du serveur (JSON)= >'+data);
																			var json = $.parseJSON(data);
																			if (json.message == 'erreur') {																													
																						showError(json.message,5000);																	
																			} else {
																					showSuccess(json.message,5000);
																					setTimeout("Refresh()", 1000);
																			};
																		},
																	fail : function() {
																		//$('.test').append('failed');
																		showError('Operation failed',5000);
																		}//end fail
															});//end .ajax()
											}//end action attribut
										},//end YES attribut
										
									'No'	: {'class'	: 'morph',
												'action': function(){
													showInfo('Opeartion annulée',3000);
										}//end action attribut
									}//end No attribut
							}//end button attribut
			
					});//end confirm function
			
			}//end Delete function
	  
	  
	  /*//khalifa
		function Delete(data,name,row,type,dataSet){//name = description
				var loadpage = dataSet.hdata(0);
				var url = dataSet.hdata(1);
				var table = dataSet.hdata(2);
				var data = data+"&tabel="+table;
		$.confirm({
		'title': '_DELETE DIALOG BOX','message': " <strong>YOU WANT TO DELETE </strong><br /><font color=red>' "+ name +" ' </font> ",
		'buttons': 
						{'Yes': 
							{'class': 'special',
							'action': function(){
												$('.test').append('you clicked yes');
												loading('Checking');
												$('#preloader').html('Deleting...');
												if(type==0){ row.slideUp(function(){   showSuccess('Success',5000); unloading(); }); return false;}
												if(type==1){ row.slideUp(function(){   showSuccess('Success',5000); unloading(); }); return false;}
														setTimeout("unloading();",900); 		 
										 }},
						'No'	: {'class'	: ''}
						}
				});
		}*/

	 
	  
	  
	  


	  function ResetForm(){
		  $('form').each(function(index) {	  
			var form_id=$('form:eq('+index+')').attr('id');
				  if(form_id){ 
					  $('#'+form_id).get(0).reset(); 
					  $('#'+form_id).validationEngine('hideAll');
							  var editor=$('#'+form_id).find('#editor').attr('id');
							  if(editor){
								   $('#editor').cleditor()[0].clear();
							  }
				  } 
		  });	
	  }
	  
	  function showError(str,delay){	
		  if(delay){
			  $('#alertMessage').removeClass('success info warning').addClass('error').html(str).stop(true,true).show().animate({ opacity: 1,right: '10'}, 500,function(){
					  $(this).delay(delay).animate({ opacity: 0,right: '-20'}, 500,function(){ $(this).hide(); });																														   																											
				});
			  return false;
		  }
			  	$('#alertMessage').addClass('error').html(str).stop(true,true).show().animate({ opacity: 1,right: '10'}, 500);	
	  }
	  function showSuccess(str,delay){
		  if(delay){
			  $('#alertMessage').removeClass('error info warning').addClass('success').html(str).stop(true,true).show().animate({ opacity: 1,right: '10'}, 500,function(){
					  $(this).delay(delay).animate({ opacity: 0,right: '-20'}, 500,function(){ $(this).hide(); });																														   																											
				});
			  return false;
		  }
			  $('#alertMessage').addClass('success').html(str).stop(true,true).show().animate({ opacity: 1,right: '10'}, 500);	
	  }
	  function showWarning(str,delay){
		  if(delay){
			  $('#alertMessage').removeClass('error success  info').addClass('warning').html(str).stop(true,true).show().animate({ opacity: 1,right: '10'}, 500,function(){
					  $(this).delay(delay).animate({ opacity: 0,right: '-20'}, 500,function(){ $(this).hide(); });																														   																											
				});
			  return false;
		  }
			  $('#alertMessage').addClass('warning').html(str).stop(true,true).show().animate({ opacity: 1,right: '10'}, 500);	
	  }
	  function showInfo(str,delay){
		  if(delay){
			  $('#alertMessage').removeClass('error success  warning').html(str).stop(true,true).show().animate({ opacity: 1,right: '10'}, 500,function(){
					  $(this).delay(delay).animate({ opacity: 0,right: '-20'}, 500,function(){ $(this).hide(); });																														   																											
				});
			  return false;
		  }
			  $('#alertMessage').html(str).stop(true,true).show().animate({ opacity: 1,right: '10'}, 500);	
	  }
	  
	  function loading(name,overlay) { 
			$('body').append('<div id="overlay"></div><div id="preloader">'+name+'..</div>');
					if(overlay==1){
					  $('#overlay').css('opacity',0.4).fadeIn(400,function(){  $('#preloader').fadeIn(400);	});
					  return  false;
			   }
			$('#preloader').fadeIn();	  
	   }
	   
	  function unloading() { 
			$('#preloader').fadeOut(400,function(){ $('#overlay').fadeOut(); $.fancybox.close(); }).remove();
	   }
	
	   function imgRow(){	
			  var maxrow=$('.albumpics').width();
			  if(maxrow){
					  maxItem= Math.floor(maxrow/160);
					  maxW=maxItem*160;
					  mL=(maxrow-maxW)/2;
					  $('.albumpics ul').css({
							  'width'	:	maxW	,
							  'marginLeft':mL
			   })
		  }}	
		  
		  function scrollmenu(){	
				  if($(window).scrollTop()>=1){			   
					$("#header ").css("z-index", "50"); 
				}else{
					$("#header ").css("z-index", "47"); 
			   }
		  }

 function LResize(){	
  imgRow(); 
  scrollmenu();
	$("#shadowhead").show();
		if($(window).width()<=480) {
					$(' .albumImagePreview').show();
					$('.screen-msg').hide();
					$('.albumsList').hide();
		}
		if($(window).width()<=768){
			$('body').addClass('nobg');
			$('#content').css({ marginLeft: "70px" });	
			$('#main_menu').removeClass('main_menu').addClass('iconmenu');
					$('#main_menu li').each(function() {	  
							var title=$(this).find('b').text();
							$(this).find('a').attr('title',title);		
					});
					$('#main_menu li a').find('b').hide();	
					$('#main_menu li ').find('ul').hide();
		}else{
			$('body').removeClass('nobg').addClass('dashborad');
			$('#content').css({ marginLeft: "240px" });	
			$('#main_menu').removeClass('iconmenu ').addClass('main_menu');
			$('#main_menu li a').find('b').show();	
			}
		if($(window).width()>1024) {
					$('#main_menu').removeClass('iconmenu ').addClass('main_menu');
					$('#main_menu li a').find('b').show();	
		}
}
