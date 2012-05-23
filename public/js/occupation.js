$(document).ready(
		function() {
			var all_rows_selected = false;//pour savoir si tous le elements sont selectionné ou pas (index)
			$('.f_o_add').submit(function(e) {
				// On désactive le comportement par défaut du navigateur
				// (qui consiste à appeler la page action du formulaire) pour
				// empecher
				// le chargement de la page aprés que l'utilisateur click sur
				// 'envoyer'
				e.preventDefault();
			});
			$('.f_o_modify').submit(function(e) {
				// On désactive le comportement par défaut du navigateur
				// (qui consiste à appeler la page action du formulaire) pour
				// empecher
				// le chargement de la page aprés que l'utilisateur click sur
				// 'envoyer'
				e.preventDefault();
			});
			
			//configuration des liens de modification
			/*$('.edit').each(function(){
				 var new_href = $(this).attr('href');
				 var row = $(this).parents('tr');
				 var id_occup = row.find('.id_occup').html();
				 new_href = new_href + id_occup;
				$(this).attr('href',new_href);
			});*/
			
		
			$('.edit').click(function(){
				$('.occupation tbody tr').each(
						function(i, row) {				
								$(this).removeClass('row_selected');
						});
			});

			$('.selectall').click(function(){
				if(all_rows_selected == false)
					{
						$('.occupation tbody tr').each(
							function(i, row) {
								if($(this).hasClass('row_selected').toString() == 'false'){
									$(this).addClass('row_selected');
								}
								all_rows_selected = true;
							});
					}
				else{
					$('.occupation tbody tr').each(
							function(i, row) {
								if($(this).hasClass('row_selected').toString() == 'true'){
									$(this).removeClass('row_selected');
								}
								all_rows_selected = false;
							});
				}
			});
			
			$('.occupation tr').live('click',function(){
				$(this).toggleClass('row_selected');
			});
			/*
			$('.occupation tr').click(function(){	
			
				//	$(this).find('input').attr('checked', $('.' + id).is(':checked'));
					
					//$('.display tr').removeClass('row_selected');
					//$('.display tr').find('label').removeClass('checked');
					$(this).toggleClass('row_selected');
					//$(this).find('label').toggleClass('checked');
					//var id_selectionne = $(this).find('#id_occup').html();
					//$('#test').html(id_selectionne);
				});*/
			

			$('#reset').click(function() {
				$('input').val('');
				showError('formulaire vidé', 3000);
			});
			$('.delete_b').click(
					function() {
						
						$('.test').html('');
						var lines_to_delete = [];
						$('.occupation tbody tr').each(
								function(i, row) {
									
									if($(this).hasClass('row_selected').toString() == 'true'){
										var id_occupation_courant = $(this).find('.id_occup').html();
										lines_to_delete.push(id_occupation_courant);
									}
								
								});
						
						 if(lines_to_delete.length > 0)
							 {
							 DeleteAll(lines_to_delete,'occupation');
							 }
						 else
							 {
							 showWarning('Vous n\'avez rien selectionné',5000);
							 }
				 
				
						/*$('.test').append('les lignes à supprimer : ');
						$.each(lines_to_delete, function(i, item) {
							
							$('.test').append(item);
							$('.test').append(' - ');
						});*/
					});
			$('.display tr').click(function() {
				// $(this).find('input').attr('checked', $('.' +
				// id).is(':checked'));

			});
			$('.add_occup').click(function() {
				var data = $('.f_o_add').serializeArray();// convertir les
				// données du
				// formulaire vers un
				// tableau
				$.ajax({ // la fonction qui fait la magie
					type : "POST",// définir le type de requete
					url : "/occupationsubmit",// definir la destination qui va
					// intercepter les données(data)
					data : data,// définir les données
					success : function(data) {
						var json = $.parseJSON(data);// converstion d'un
						// format JSON
						// propre(respect le standart)
						// vers un OBJET JSON
						if (json.message == 'erreur') {// maintenant on peut
							// acceder au
							// variable 'message' avec la
							// notation pointé
							showError(json.message, 3000);
						} else {
							showSuccess(json.message, 3000);
						}
						;
					}
				});
			});
			// Confirm Delete.
			$(".Delete").live('click',function() { 
				$('.occupation tbody tr').each(
						function(i, row) {				
								$(this).removeClass('row_selected');
				});
				$('.test').html('');
				  var row=$(this).parents('tr');
				 // var dataSet=$(this).parents('form');
				  var action_destination = '/occupation/delete';
				 // var id = $(this).attr("id");
				  var description = row.find('.nom_occup').html();//send description
				  // var name = $(this).attr("name");
				  var id_occup = row.find('.id_occup').html();//send id_occup
				  //Delete(id_occup,name,row,0,dataSet);
				  Delete(id_occup,description,row,0,action_destination);
			});
			$('.modify_occup').click(function() {
				var data = $('.f_o_modify').serializeArray();// convertir les
				// données du
				// formulaire vers un
				// tableau
				
				$.ajax({ // la fonction qui fait la magie
					type : "POST",// définir le type de requete
					url : "/occupationupdate",// definir la destination qui va
					// intercepter les données(data)
					data : data,// définir les données
					success : function(data) {
						var json = $.parseJSON(data);// converstion d'un
						// format JSON
						// propre(respect le standart)
						// vers un OBJET JSON
						if (json.message == 'erreur') {// maintenant on peut
							// acceder au
							// variable 'message' avec la
							// notation pointé
							showError(json.message, 3000);
						} else {
							showSuccess(json.message, 3000);
						}
						;
					}
				});
			});
			
			
			
			
			
			
			
			
			
			
			
			
		});//end ready

/*
function Delete(data,name,row,type,dataSet){//name = description //row = selected row
	var loadpage = dataSet.hdata(0);
	var url = dataSet.hdata(1);
	var table = dataSet.hdata(2);
	var data = data+"&tabel="+table;
$.confirm({
'title': 'CONFIRMATION DE LA SUPPRESSION','message': " <strong>VOUS VOULLEZ VRAIMMANT SUPPRIMER</strong><br /><font color=red>' "+ name +" ' </font> ",
'buttons': 
			{'Yes': 
				{'class': 'special',
				'action': function(){
									var data_to_send = [];
									var id_selectionne = row.find('.id_occup').html();
									data_to_send.push({'id_occup':id_selectionne});
									var data = $('.f_o_add').serializeArray();// convertir les
									// données du
									// formulaire vers un
									// tableau
									$.ajax({ // la fonction qui fait la magie
										type : "POST",// définir le type de requete
										url : "/occupation/submit",// definir la destination qui va
										// intercepter les données(data)
										data : data,// définir les données
										success : function(data) {
											var json = $.parseJSON(data);// converstion d'un
											// format JSON
											// propre(respect le standart)
											// vers un OBJET JSON
											if (json.message == 'erreur') {// maintenant on peut
												// acceder au
												// variable 'message' avec la
												// notation pointé
												showError(json.message, 3000);
											} else {
												showSuccess(json.message, 3000);
											}
											;
										}
									});
									
									
									
									loading('Checking');
									$('#preloader').html('Deleting...');
									if(type==0){ 	$('.test').append('Suppression de : '+id_selectionne); 
															row.slideUp(function(){   showSuccess('Success',5000); unloading(); }); return false;
														}
									if(type==1){ row.slideUp(function(){   showSuccess('Success',5000); unloading(); }); return false;}
											setTimeout("unloading();",900); 		 
							 }},
			'No'	: {'class'	: ''}
			}
	});*/

