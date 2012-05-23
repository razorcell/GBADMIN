$(document)
		.ready(
				function() {
					$('.prix_projet').spinner({
						min : 0,
						max : 1000000,
						stepping : 100,
						decimals : 2
					});
					var all_rows_selected = false;
					var status = $(".status").iphoneStyle(
							{ // Custom Label With onChange
								// function
								checkedLabel : "Actif",
								uncheckedLabel : "Interrompu",
								labelWidth : '85px',
								onChange : function() {
									if (this.elem.is(':checked')) {// checked
										$('.status_hidden').attr('value',
												'actif');
									} else {// not checked
										$('.status_hidden').attr('value',
												'interrompu');
									}
									var chek = $(".status").attr('checked');
									if (chek) {
										$(".disabled_map").fadeOut();
									} else {
										$(".disabled_map").fadeIn();
									}
								}
							});
					var paye = $(".paye").iphoneStyle({ // Custom Label With
														// onChange
						// function
						checkedLabel : "Oui",
						uncheckedLabel : "Non",
						labelWidth : '85px',
						onChange : function() {
							if (this.elem.is(':checked')) {// checked
								$('.paye_hidden').attr('value', 'Oui');
							} else {// not checked
								$('.paye_hidden').attr('value', 'Non');
							}
							var chek = $(".paye").attr('checked');
							if (chek) {
								$(".disabled_map").fadeOut();
							} else {
								$(".disabled_map").fadeIn();
							}
						}
					});
					$('.f_p_add').submit(function(e) {
						e.preventDefault();
					});
					$('.f_p_modify').submit(function(e) {
						e.preventDefault();
					});
					$('.edit').click(function() {
						$('.projet tbody tr').each(function(i, row) {
							$(this).removeClass('row_selected');
						});
					});
					$('.selectall')
							.click(
									function() {
										if (all_rows_selected == false) {
											$('.projet tbody tr')
													.each(
															function(i, row) {
																if ($(this)
																		.hasClass(
																				'row_selected')
																		.toString() == 'false') {
																	$(this)
																			.addClass(
																					'row_selected');
																}
																all_rows_selected = true;
															});
										} else {
											$('.projet tbody tr')
													.each(
															function(i, row) {
																if ($(this)
																		.hasClass(
																				'row_selected')
																		.toString() == 'true') {
																	$(this)
																			.removeClass(
																					'row_selected');
																}
																all_rows_selected = false;
															});
										}
									});
					$('.projet tr').live('click', function() {
						$(this).toggleClass('row_selected');
					});

					$('#reset').click(function() {
						$('input:not(.id_projet)').val('');
						// $('input').val('');
						showError('formulaire vidé', 3000);
					});
					$('.delete_b')
							.click(
									function() {

										//$('.test').html('');
										var lines_to_delete = [];
										$('.projet tbody tr')
												.each(
														function(i, row) {

															if ($(this)
																	.hasClass(
																			'row_selected')
																	.toString() == 'true') {
																var id_projet_courant = $(
																		this)
																		.find(
																				'.id_projet')
																		.html();
																lines_to_delete
																		.push(id_projet_courant);
															}
														});

										if (lines_to_delete.length > 0) {
											DeleteAll(lines_to_delete, 'project');
										} else {
											showWarning(
													'Vous n\'avez rien selectionné',
													5000);
										}
									});
					$('.display tr').click(function() {
					});
					$('.add_projet')
							.click(
									function() {
										var form_data = $('.f_p_add')
												.serializeArray();
										var i = 0;
										// form validation
										var valide = true;
										if ($('.prix').value == 0) {
											valide = false;
										} else if ($('.date_debut').val().length == 0) {
											valide = false;
										} else if ($('.date_fin').val().length == 0) {
											valide = false;
										}
										var commande = $('.commande').find(
												'span').html();
										if (commande == 'Veuillez choisir une commande...') {
											valide = false;
										}
										var type_projet = $('.type_projet')
												.find('span').html();
										if (type_projet == 'Veuillez choisir un type de projet...') {
											valide = false;
										}
										if (valide) {
											var json_to_send = '{';

											for (i = 0; i < form_data.length; i++) {
												if (i == 0) {
													json_to_send = json_to_send
															+ '"'
															+ form_data[i].name
															+ '" : "'
															+ form_data[i].value
															+ '"';
												} else {
													if (form_data[i].name == 'prix') {
														var price = form_data[i].value
																.replace(',',
																		'');
														json_to_send = json_to_send
																+ ',"'
																+ form_data[i].name
																+ '" : "'
																+ price + '"';
													} else {
														json_to_send = json_to_send
																+ ',"'
																+ form_data[i].name
																+ '" : "'
																+ form_data[i].value
																+ '"';
													}
												}
											}
											// add commande
											json_to_send = json_to_send
													+ ',"commande" : "'
													+ commande + '"';
											// add type projet
											// add commande
											json_to_send = json_to_send
													+ ',"type_projet" : "'
													+ type_projet + '"';

											var progression = $('.progression')
													.attr('value');
											json_to_send = json_to_send
													+ ',"progression" : "'
													+ progression + '"';
											i = 0;
											json_to_send = json_to_send
													+ ',"employes" : [';// open
																		// employe
																		// json
											$('ul.chzn-choices')
													.find('li')
													.each(
															function() {
																if ($(this)
																		.find(
																				'span').length > 0) {
																	if (i == 0) {
																		var projet = $(
																				this)
																				.find(
																						'span')
																				.html();
																		json_to_send = json_to_send
																				+ '{"name " : "'
																				+ projet
																				+ '"}';
																	} else {
																		var projet = $(
																				this)
																				.find(
																						'span')
																				.html();
																		json_to_send = json_to_send
																				+ ',{"name " : "'
																				+ projet
																				+ '"}';
																	}
																	i++;
																}
															});
											json_to_send = json_to_send + ']';// close
																				// employe
																				// json
											json_to_send = json_to_send + '}';
											// $('.test').html(json_to_send);
											// json_to_send =
											// $.parseJSON(json_to_send);
											$
													.ajax({
														type : "POST",
														url : "/project/submit",
														data : json_to_send,
														success : function(data) {
															// alert('success');
															var json = $
																	.parseJSON(data);

															if (json.reponse == 'success') {// maintenant
																							// on
																							// peut
																showSuccess(
																		'Projet ajouté',
																		3000);

															} else {
																showError(
																		json.reponse,
																		3000);
															}
														}
													});
										} else {
											showError(
													'Veuillez revoir le formulaire',
													3000);
										}
									});
					$(".Delete").live(
							'click',
							function() {
								$('.projet tbody tr').each(function(i, row) {
									$(this).removeClass('row_selected');
								});
								$('.test').html('');
								var row = $(this).parents('tr');

								var action_destination = '/project/delete';

								var description = row.find('.id_projet').html();

								var id_projet = row.find('.id_projet').html();

								Delete(id_projet, description, row, 0,
										action_destination);
							});
					$('.modify_projet')
							.click(
									function() {
										var form_data = $('.f_p_modify')
												.serializeArray();
										var i = 0;
										// form validation
										var valide = true;
										if ($('.prix').value == 0) {
											valide = false;
										} else if ($('.date_debut').val().length == 0) {
											valide = false;
										} else if ($('.date_fin').val().length == 0) {
											valide = false;
										}
										var commande = $('.commande').find(
												'span').html();

										var type_projet = $('.type_projet')
												.find('span').html();

										if (valide) {
											var json_to_send = '{';

											for (i = 0; i < form_data.length; i++) {
												if (i == 0) {
													json_to_send = json_to_send
															+ '"'
															+ form_data[i].name
															+ '" : "'
															+ form_data[i].value
															+ '"';
												} else {
													if (form_data[i].name == 'prix') {
														var price = form_data[i].value
																.replace(',',
																		'');
														json_to_send = json_to_send
																+ ',"'
																+ form_data[i].name
																+ '" : "'
																+ price + '"';
													} else {
														json_to_send = json_to_send
																+ ',"'
																+ form_data[i].name
																+ '" : "'
																+ form_data[i].value
																+ '"';
													}
												}
											}//add id
											var id = $('.id_projet').attr('value');
											 json_to_send = json_to_send + ',"id" : "'+id+'"';
											// add commande
											json_to_send = json_to_send
													+ ',"commande" : "'
													+ commande + '"';
											// add type projet
											// add commande
											json_to_send = json_to_send
													+ ',"type_projet" : "'
													+ type_projet + '"';

											var progression = $('a.progression')
													.attr('value');
											json_to_send = json_to_send
													+ ',"progression" : "'
													+ progression + '"';
											i = 0;
											if ($('ul.chzn-choices').find('li').length > 1) {
												json_to_send = json_to_send
														+ ',"employes" : [';// open
																			// employe
																			// json
												$('ul.chzn-choices')
														.find('li')
														.each(
																function() {
																	if ($(this)
																			.find(
																					'span').length > 0) {
																		if (i == 0) {
																			var projet = $(
																					this)
																					.find(
																							'span')
																					.html();
																			json_to_send = json_to_send
																					+ '{"name " : "'
																					+ projet
																					+ '"}';
																		} else {
																			var projet = $(
																					this)
																					.find(
																							'span')
																					.html();
																			json_to_send = json_to_send
																					+ ',{"name " : "'
																					+ projet
																					+ '"}';
																		}
																		i++;
																	}
																});
												json_to_send = json_to_send
														+ ']';// close employe
																// json
											}
											json_to_send = json_to_send + '}';
											// $('.test').html(json_to_send);
											// json_to_send =
											// $.parseJSON(json_to_send);
											$
													.ajax({
														type : "POST",
														url : "/project/modify",
														data : json_to_send,
														success : function(data) {
															// alert('success');
															var json = $
																	.parseJSON(data);

															if (json.reponse == 'success') {// maintenant
																							// on
																							// peut
																showSuccess(
																		'Projet bien modifié',
																		3000);

															} else {
																showError(
																		json.reponse,
																		3000);
															}
														}
													});
										} else {
											showError(
													'Veuillez revoir le formulaire',
													3000);
										}
									});// end modify .click

				});
