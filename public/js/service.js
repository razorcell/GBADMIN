$(document).ready(
		function() {
			$('.prix_service').spinner({ min: 0, max: 1000000, stepping: 50, decimals:2});

			var all_rows_selected = false;
			$('.type_service').change(function(){
				var type_service = $(this).find('span').html();
				if(type_service){//it's equal to null for the first time so we add this conditin to avoid error
					var json_to_send = '{"type_service":"'+type_service+'"}';
					$.ajax({ 
						type : "POST",
						url : "/service/updatepack",
						data : json_to_send,
						success : function(data) {
							if($('div.pack').hasClass('visible')){
								//$('div.pack').fadeOut('fast');
								$( "#selectable" ).selectable("destroy");
								var select_content = null;
								select_content = '<label>Packs<small>Définir le type de pack</small></label><div class="list_packs"><ul id="selectable">';
								var json = $.parseJSON(data);
								if(json.length == 0){
									$('div.pack').fadeOut();
									$('div.pack').removeClass('visible')
								}else{
								$.each(json,function(i,item){
									var libelle_pack = item.libelle_pack;
									select_content = select_content + '<li class="ui-widget-content pack_item">'+libelle_pack+'<li>';
								});
								select_content = select_content + ' </ul></div>';
								$('div.pack').html(select_content);
								$('div.pack').fadeIn('fast');
								$( "#selectable" ).selectable();
								
								//$('div.pack').addClass('visible');
								}
							}else{
								//$('div.pack').fadeOut();
								//$( "#selectable" ).selectable("destroy");
								var select_content = null;
								select_content = '<label>Packs<small>Définir le type de pack</small></label><div class="list_packs"><ul id="selectable">';
								var json = $.parseJSON(data);
								if(json.length == 0){//si aucun pack alors cacher la div
									$('div.pack').fadeOut('fast');
								}else{
								$.each(json,function(i,item){
									var libelle_pack = item.libelle_pack;
									select_content = select_content + '<li class="ui-widget-content pack_item">'+libelle_pack+'<li>';
								});
								select_content = select_content + ' </ul></div>';
								$('div.pack').html(select_content);
								
								$( "#selectable" ).selectable();
								$('div.pack').fadeIn('fast');
								$('div.pack').addClass('visible');
								}
							}//end else
							//$('div.pack').html('');
							
							//select.chosen();
							
						}//end success
					});//end ajax
				}//end type service validation
			});
			var status = $(".status").iphoneStyle({ // the status option
				// function
				checkedLabel : "Actif",
				uncheckedLabel : "Interrompu",
				labelWidth : '85px',
				onChange : function() {
					if(this.elem.is(':checked'))
						{//checked
							$('.status_hidden').attr('value','Actif');
						}
					else{//not checked
						$('.status_hidden').attr('value','Interrompu');
					}
					var chek = $(".status").attr('checked');
					if (chek) {
						$(".disabled_map").fadeOut();
					} else {
						$(".disabled_map").fadeIn();
					}
				}
			});
			
			var paye = $(".paye").iphoneStyle({ // Custom Label With onChange
				// function
				checkedLabel : "Oui",
				uncheckedLabel : "Non",
				labelWidth : '85px',
				onChange : function() {
					if(this.elem.is(':checked'))
						{//checked
							$('.paye_hidden').attr('value','Oui');
						}
					else{//not checked
						$('.paye_hidden').attr('value','Non');
					}
					var chek = $(".paye").attr('checked');
					if (chek) {
						$(".disabled_map").fadeOut();
					} else {
						$(".disabled_map").fadeIn();
					}
				}
			});
			$('.f_e_add').submit(function(e) {
				e.preventDefault();
			});
			$('.f_e_modify').submit(function(e) {
				e.preventDefault();
			});
			$('.edit').click(function(){
				$('.service tbody tr').each(
						function(i, row) {				
								$(this).removeClass('row_selected');
						});
			});
			$('.selectall').click(function(){
				if(all_rows_selected == false)
					{
						$('.service tbody tr').each(
							function(i, row) {
								if($(this).hasClass('row_selected').toString() == 'false'){
									$(this).addClass('row_selected');
								}
								all_rows_selected = true;
							});
					}
				else{
					$('.service tbody tr').each(
							function(i, row) {
								if($(this).hasClass('row_selected').toString() == 'true'){
									$(this).removeClass('row_selected');
								}
								all_rows_selected = false;
							});
				}
			});
			$('.service tr').live('click',function(){
				$(this).toggleClass('row_selected');
			});
		
			$('#reset').click(function() {
				$('input:not(.id_service)').val('');
			//	$('input').val('');
				showError('formulaire vidé', 3000);
			});
			$('.delete_b').click(
					function() {
						
						$('.test').html('');
						var lines_to_delete = [];
						$('.service tbody tr').each(
								function(i, row) {
									if($(this).hasClass('row_selected').toString() == 'true'){
										var id_service_courant = $(this).find('.id_service').html();
										lines_to_delete.push(id_service_courant);
									}
								});
						
						 if(lines_to_delete.length > 0)
							 {
							 	DeleteAll(lines_to_delete,'service');
							 }
						 else
							 {
								showWarning('Vous n\'avez rien selectionné',5000);
							 }
					});
			$('.display tr').click(function() {
			});
			$('.add_service').click(function() {
				var form_data = $('.f_s_add').serializeArray();
				var i=0;
				var pack = null;
				//get pack
				
				//form validation
				var valide = true;
				if($('.prix').value == 0){
						valide = false;
					}
				else if($('.date_debut').val().length == 0){
						valide = false;
					}
				else if($('.date_fin').val().length == 0){
					valide = false;
				}
				var commande = $('.commande').find('span').html();
				if(commande == 'Veuillez choisir une commande...'){
						valide =false;
					}
				var type_service = $('.type_service').find('span').html();
				if(type_service == 'Veuillez choisir un type de service...'){
					valide =false;
				}else{// si type de service choisi
					if($('div.pack').hasClass('visible')){
						if($('.list_packs').find('li.ui-selected').length > 0){
							pack = $('.list_packs').find('li.ui-selected').html();
						}else{//il y a des pack mais auccun choisi
							valide = false;
						}
					}else{//ca marche il n'existe aucun pack
						pack = 'aucun';
					}
				}
				if(valide)
					{
					var json_to_send = '{';
					
					for(i=0;i<form_data.length;i++)
						{
							if(i==0){
									json_to_send = json_to_send + '"'+form_data[i].name+'" : "'+form_data[i].value+'"';
								}
							else{
								if(form_data[i].name == 'prix'){
									var price = form_data[i].value.replace(',','');
									json_to_send = json_to_send + ',"'+form_data[i].name+'" : "'+price+'"';
								}else{
								json_to_send = json_to_send + ',"'+form_data[i].name+'" : "'+form_data[i].value+'"';
								}
							}
						}
					//add commande
					 json_to_send = json_to_send + ',"commande" : "'+commande+'"';
					 //add type service
					//add commande
					 json_to_send = json_to_send + ',"type_service" : "'+type_service+'"';
					// add price
				 json_to_send = json_to_send + ',"pack" : "'+pack+'"';
				i=0;
					json_to_send = json_to_send + '}';
					//$('.test').html(json_to_send);
					//json_to_send = $.parseJSON(json_to_send);
					$.ajax({ 
						type : "POST",
						url : "/service/submit",
						data : json_to_send,
						success : function(data) {
							//alert('success');
							//var json = $.parseJSON(data);
						
							if (data == 'success') {// maintenant on peut
								showSuccess('Service ajouté', 3000);
								
							} else {
								showError(data, 3000);
							}
						}
					});
					}else{
						showError('Veuillez revoir le formulaire', 3000);
					}
			});
			$(".Delete").live('click',function() { 
				$('.service tbody tr').each(
						function(i, row) {				
								$(this).removeClass('row_selected');
				});
				$('.test').html('');
				  var row=$(this).parents('tr');
				
				  var action_destination = '/service/delete';
				
				  var description = row.find('.id_service').html();
				
				  var id_service = row.find('.id_service').html();
				
				  Delete(id_service,description,row,0,action_destination);
			});
			$('.modify_service').click(function() {
				var form_data = $('.f_s_modify').serializeArray();
				var i=0;
				var pack = null;
				//get pack
				
				//form validation
				var valide = true;
				if($('.prix').value == 0){
						valide = false;
					}
				else if($('.date_debut').val().length == 0){
						valide = false;
					}
				else if($('.date_fin').val().length == 0){
					valide = false;
				}
				var commande = $('.commande').find('span').html();
				if(commande == 'Veuillez choisir une commande...'){
						valide =false;
					}
				var type_service = $('.type_service').find('span').html();
				if(type_service == 'Veuillez choisir un type de service...'){
					valide =false;
				}else{// si type de service choisi
					if($('div.pack').hasClass('visible')){
						if($('.list_packs').find('li.ui-selected').length > 0){
							pack = $('.list_packs').find('li.ui-selected').html();
						}else{//il y a des pack mais auccun choisi
							valide = false;
						}
					}else{//ca marche il n'existe aucun pack
						pack = 'aucun';
					}
				}
				if(valide)
					{
					var json_to_send = '{';
					
					for(i=0;i<form_data.length;i++)
						{
							if(i==0){
									json_to_send = json_to_send + '"'+form_data[i].name+'" : "'+form_data[i].value+'"';
								}
							else{
								if(form_data[i].name == 'prix'){
									var price = form_data[i].value.replace(',','');
									json_to_send = json_to_send + ',"'+form_data[i].name+'" : "'+price+'"';
								}else{
								json_to_send = json_to_send + ',"'+form_data[i].name+'" : "'+form_data[i].value+'"';
								}
							}
						}
					//add commande
					 json_to_send = json_to_send + ',"commande" : "'+commande+'"';
					 //add type service
					//add commande
					 json_to_send = json_to_send + ',"type_service" : "'+type_service+'"';
					// add price
				 json_to_send = json_to_send + ',"pack" : "'+pack+'"';
				var id = $('#id').attr('value');
				 json_to_send = json_to_send + ',"id" : "'+id+'"';
				i=0;
					json_to_send = json_to_send + '}';
					//$('.test').html(json_to_send);
					//json_to_send = $.parseJSON(json_to_send);
					$.ajax({ 
						type : "POST",
						url : "/service/modify",
						data : json_to_send,
						success : function(data) {
							//alert('success');
							//var json = $.parseJSON(data);
						
							if (data == 'success') {// maintenant on peut
								showSuccess('Service modifié', 3000);
								
							} else {
								showError(data, 3000);
							}
						}
					});
					}else{
						showError('Veuillez revoir le formulaire', 3000);
					}
			});//end modify.click()
	
		});

