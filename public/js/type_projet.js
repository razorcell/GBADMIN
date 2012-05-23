$(document).ready(
		function() {
			var all_rows_selected = false;
			$('.f_t_p_add').submit(function(e) {
			
				e.preventDefault();
			});
			$('.f_t_p_modify').submit(function(e) {
			
				e.preventDefault();
			});
			
			$('.edit').click(function(){
				$('.type_projet tbody tr').each(
						function(i, row) {				
								$(this).removeClass('row_selected');
						});
			});

			$('.selectall').click(function(){
				if(all_rows_selected == false)
					{
						$('.type_projet tbody tr').each(
							function(i, row) {
								if($(this).hasClass('row_selected').toString() == 'false'){
									$(this).addClass('row_selected');
								}
								all_rows_selected = true;
							});
					}
				else{
					$('.type_projet tbody tr').each(
							function(i, row) {
								if($(this).hasClass('row_selected').toString() == 'true'){
									$(this).removeClass('row_selected');
								}
								all_rows_selected = false;
							});
				}
			});
			
			$('.type_projet tr').live('click',function(){
				$(this).toggleClass('row_selected');
			});
			$('#reset').click(function() {
				$('input').val('');
				showError('formulaire vidé', 3000);
			});
			$('.delete_b').click(
					function() {
						
						$('.test').html('');
						var lines_to_delete = [];
						$('.type_projet tbody tr').each(
								function(i, row) {
									
									if($(this).hasClass('row_selected').toString() == 'true'){
										var id_type_projet_courant = $(this).find('.id_type_projet').html();
										lines_to_delete.push(id_type_projet_courant);
									}
								
								});
						
						 if(lines_to_delete.length > 0)
							 {
							 DeleteAll(lines_to_delete,'typeprojet');
							 }
						 else
							 {
							 showWarning('Vous n\'avez rien selectionné',5000);
							 }
				 
				
						
					});
			$('.display tr').click(function() {
				
			});
			$('.add_type_projet').click(function() {
				var data = $('.f_t_p_add').serializeArray();// convertir les
			
				$.ajax({ 
					type : "POST",
					url : "/typeprojet/submit",
				
					data : data,
					success : function(data) {
						var json = $.parseJSON(data);
					
						if (json.message == 'erreur') {// maintenant on peut
						
							showError(json.message, 3000);
						} else {
							showSuccess(json.message, 3000);
						}
						;
					}
				});
			});
		
			$(".Delete").live('click',function() { 
				$('.type_projet tbody tr').each(
						function(i, row) {				
								$(this).removeClass('row_selected');
				});
				$('.test').html('');
				  var row=$(this).parents('tr');
				
				  var action_destination = '/typeprojet/delete';
				
				  var description = row.find('.nom_type_projet').html();
				
				  var id_type_projet = row.find('.id_type_projet').html();
				
				  Delete(id_type_projet,description,row,0,action_destination);
			});
			$('.modify_type_projet').click(function() {
				var data = $('.f_t_p_modify').serializeArray();	
				$.ajax({ 
					type : "POST",
					url : "/typeprojet/modify",
					
					data : data,
					success : function(data) {
						var json = $.parseJSON(data);
					
						if (json.message == 'erreur') {
						
							showError(json.message, 3000);
						} else {
							showSuccess(json.message, 3000);
						}
						;
					}
				});
			});
	
		});

