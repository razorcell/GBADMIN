$(document).ready(
		function() {
			var all_rows_selected = false;
			$('.f_p_add').submit(function(e) {
				e.preventDefault();
			});
			$('.f_p_modify').submit(function(e) {
				e.preventDefault();
			});
			$('.edit').click(function(){
				$('.typeservice tbody tr').each(
						function(i, row) {				
								$(this).removeClass('row_selected');
						});
			});
			$('.selectall').click(function(){
				if(all_rows_selected == false)
					{
						$('.typeservice tbody tr').each(
							function(i, row) {
								if($(this).hasClass('row_selected').toString() == 'false'){
									$(this).addClass('row_selected');
								}
								all_rows_selected = true;
							});
					}
				else{
					$('.typeservice tbody tr').each(
							function(i, row) {
								if($(this).hasClass('row_selected').toString() == 'true'){
									$(this).removeClass('row_selected');
								}
								all_rows_selected = false;
							});
				}
			});
			
			$('.typeservice tr').live('click',function(){
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
						$('.typeservice tbody tr').each(
								function(i, row) {
									
									if($(this).hasClass('row_selected').toString() == 'true'){
										var id_typeservice_courant = $(this).find('.id_typeservice').html();
										lines_to_delete.push(id_typeservice_courant);
									}
								
								});
						
						 if(lines_to_delete.length > 0)
							 {
							 DeleteAll(lines_to_delete,'typeservice');
							 }
						 else
							 {
							 showWarning('Vous n\'avez rien selectionné',5000);
							 }
				 
				
						
					});
			$('.display tr').click(function() {
				
			});
			$('.add_typeservice').click(function() {
				var data = $('.f_t_s_add').serializeArray();
				$.ajax({ 
					type : "POST",
					url : "/typeservice/submit",
				
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
		
			$(".Delete").live('click',function() { 
				$('.typeservice tbody tr').each(
						function(i, row) {				
								$(this).removeClass('row_selected');
				});
				$('.test').html('');
				  var row=$(this).parents('tr');
				
				  var action_destination = '/typeservice/delete';
				
				  var description = row.find('.nom_typeservice').html();
				
				  var id_typeservice = row.find('.id_typeservice').html();
				
				  Delete(id_typeservice,description,row,0,action_destination);
			});
			$('.modify_typeservice').click(function() {
				var data = $('.f_t_s_modify').serializeArray();	
				$.ajax({ 
					type : "POST",
					url : "/typeservice/modify",
					
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

