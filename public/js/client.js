$(document)
		.ready(
				function() {
					
					var all_rows_selected = false;
					$('form#entreprise').validationEngine();
					$('form#particulier').validationEngine();
					$(".liste_type").iphoneStyle({ // Custom Label With onChange
						// function
						checkedLabel : "Services",
						uncheckedLabel : "Projets",
						labelWidth : '85px',
						onChange : function() {
							if(this.elem.is(':checked')){//services
								$('div#services').show();
								$('div#projets').hide();
								}
							else{//projets
								$('div#services').hide();
								$('div#projets').show();
							}
							var chek = $(".list_type").attr('checked');
							if (chek) {
								$(".disabled_map").fadeOut();
							} else {
								$(".disabled_map").fadeIn();
							}
							// $("#show_service").click(function () {
							//$(".formEl_b").slideToggle("slow");
							// });
						}
					});
					$(".type").iphoneStyle({ // Custom Label With onChange
						// function
						checkedLabel : "Particulier",
						uncheckedLabel : "Entreprise",
						labelWidth : '85px',
						onChange : function() {
							if(this.elem.is(':checked'))
								{//particulier
								$('#entreprise').removeClass('visible');
								$('#particulier').addClass('visible');
								$('#entreprise').validationEngine('hideAll');
								$('#particulier').fadeIn();
								$('#entreprise').fadeOut();
								}
							else{//entreprise
								$('#particulier').removeClass('visible');
								$('#entreprise').addClass('visible');
								$('#particulier').validationEngine('hideAll');
								$('#particulier').fadeOut();
								$('#entreprise').fadeIn();
							}
							$('#validation').validationEngine('hideAll');

							var chek = $(".type").attr('checked');
							if (chek) {
								$(".disabled_map").fadeOut();
							} else {
								$(".disabled_map").fadeIn();
							}
							// $("#show_service").click(function () {
							//$(".formEl_b").slideToggle("slow");
							// });
						}
					});

					$('.f_c_e_add').submit(function(e) {

						e.preventDefault();
					});
					$('.f_c_p_add').submit(function(e) {

						e.preventDefault();
					});
					$('.f_c_e_modify').submit(function(e) {

						e.preventDefault();
					});
					$('.f_c_p_modify').submit(function(e) {

						e.preventDefault();
					});
					//select rows in tables
					$('.client_projet tr').live('click', function() {
						$(this).toggleClass('row_selected');
					});
					$('.client_service tr').live('click', function() {
						$(this).toggleClass('row_selected');
					});
					//select all buttons
					$('.selectall_projet')
					.click(
							function() {
								if (all_rows_selected == false) {
									$('.client_projet tbody tr')
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
									$('.client_projet tbody tr')
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
					$('.selectall_service')
					.click(
							function() {
								if (all_rows_selected == false) {
									$('.client_service tbody tr')
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
									$('.client_service tbody tr')
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
					$('.edit').click(function() {
						$('.client tbody tr').each(function(i, row) {
							$(this).removeClass('row_selected');
						});
					});
					//delete buttons
					$('.delete_b_commande_projet')
					.click(
							function() {
								var lines_to_delete = [];
								$('.client_projet tbody tr')
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
									DeleteAll(lines_to_delete,
											'project');
								} else {
									showWarning(
											'Vous n\'avez rien selectionné',
											5000);
								}

							});
					$('.delete_b_commande_service')
					.click(
							function() {
								
								var lines_to_delete = [];
								$('.client_service tbody tr')
										.each(
												function(i, row) {

													if ($(this)
															.hasClass(
																	'row_selected')
															.toString() == 'true') {
														var id_service_courant = $(
																this)
																.find(
																		'.id_service')
																.html();
														lines_to_delete
																.push(id_service_courant);
													}

												});

								if (lines_to_delete.length > 0) {
									DeleteAll(lines_to_delete,
											'service');
								} else {
									showWarning(
											'Vous n\'avez rien selectionné',
											5000);
								}

							});
					//delete tips buttons
					$(".Delete_projet").live(
							'click',
							function() {
								$('.client_projet tbody tr').each(function(i, row) {
									$(this).removeClass('row_selected');
								});
							
								var row = $(this).parents('tr');

								var action_destination = '/project/delete';

								var description = row.find('.nom').html();

								var id_projet = row.find('.id_projet')
										.html();
								
								Delete(id_projet, description, row, 0,
										action_destination);
							});
					$(".Delete_service").live(
							'click',
							function() {
								$('.client_service tbody tr').each(function(i, row) {
									$(this).removeClass('row_selected');
								});
							
								var row = $(this).parents('tr');

								var action_destination = '/service/delete';

								var description = row.find('.nom').html();

								var id_service = row.find('.id_service')
										.html();

								Delete(id_service, description, row, 0,
										action_destination);
							});
					$('.selectall')
							.click(
									function() {
										if (all_rows_selected == false) {
											$('.client tbody tr')
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
											$('.client tbody tr')
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

					$('.client tr').live('click', function() {
						$(this).toggleClass('row_selected');
					});

					$('#reset_p').click(function() {
						$('input:not(.id_client_p)').val('');//ne pas supprimer id_client

						// $('input').val('');
						showError('formulaire vidé', 3000);
					});
					$('#reset_e').click(function() {
						$('input:not(.id_client_e)').val('');

						// $('input').val('');
						showError('formulaire vidé', 3000);
					});

					
					$('.delete_b')
							.click(
									function() {

										$('.test').html('');
										var lines_to_delete = [];
										$('.client tbody tr')
												.each(
														function(i, row) {

															if ($(this)
																	.hasClass(
																			'row_selected')
																	.toString() == 'true') {
																var id_client_courant = $(
																		this)
																		.find(
																				'.id_client')
																		.html();
																lines_to_delete
																		.push(id_client_courant);
															}

														});

										if (lines_to_delete.length > 0) {
											DeleteAll(lines_to_delete, 'client');
										} else {
											showWarning(
													'Vous n\'avez rien selectionné',
													5000);
										}

									});
					$('.display tr').click(function() {

					});
					$('.add_client_entreprise').click(function() {
						
										var form_data;
										var json_to_send = '{';
										var i = 0;
										var valide = true;

										//$('.test').html('entreprise');
										// client est une entreprise
										
										form_data = $('.f_c_e_add')
												.serializeArray();
										if ($('.nom_e').val().length == 0) {
											valide = false;
										} else if ($('.email_e').val().length == 0) {
											valide = false;
										} else if ($('.tel_e').val().length == 0) {
											valide = false;
										} else if ($('.nom_r').val().length == 0) {
											valide = false;
										}
										if (valide) {
											for (i = 0; i < form_data.length; i++) {
												if (i == 0) {
													json_to_send = json_to_send
															+ '"'
															+ form_data[i].name
															+ '" : "'
															+ form_data[i].value
															+ '"';
												} else {
													json_to_send = json_to_send
															+ ',"'
															+ form_data[i].name
															+ '" : "'
															+ form_data[i].value
															+ '"';
												}
											}
											json_to_send = json_to_send
													+ ',"type":"entreprise"';
											json_to_send = json_to_send + '}';
											$
													.ajax({
														type : "POST",
														url : "/client/submit",
														data : json_to_send,
														success : function(data) {
															// var json =
															// $.parseJSON(data);

															if (data == 'success') {// maintenant
																// on
																// peut
																showSuccess(
																		'Entreprise cliente ajoutée',
																		3000);
															} else {
																showError(data,
																		3000);
															}
														}
													});
										} else {
											showError(
													'Veuillez revoir le formulaire de l\'entreprise',
													3000);
										}
									});
					$('.add_client_particulier')
							.click(
									function() {
										var form_data;
										var json_to_send = '{';
										var i = 0;
										var valide = true;
										//$('.test').html('particulier');
										form_data = $('.f_c_p_add')
												.serializeArray();

										if ($('.nom_p').val().length == 0) {
											valide = false;
										}
										if ($('.email_p').val().length == 0) {
												if ($('.tel_p').val().length == 0) {
													valide = false;
											} 
										} 
										if (valide) {
											for (i = 0; i < form_data.length; i++) {
												if (i == 0) {
													json_to_send = json_to_send
															+ '"'
															+ form_data[i].name
															+ '" : "'
															+ form_data[i].value
															+ '"';
												} else {
													json_to_send = json_to_send
															+ ',"'
															+ form_data[i].name
															+ '" : "'
															+ form_data[i].value
															+ '"';
												}
											}
											json_to_send = json_to_send
													+ ',"type":"particulier"';
											json_to_send = json_to_send + '}';
											$
													.ajax({
														type : "POST",
														url : "/client/submit",
														data : json_to_send,
														success : function(data) {
															// var json =
															// $.parseJSON(data);

															if (data == 'success') {// maintenant
																// on
																// peut
																showSuccess(
																		'Client particulier ajouté',
																		3000);
															} else {
																showError(data,
																		3000);
															}
														}
													});
										} else {
											showError(
													'Veuillez revoir le formulaire du client particulier',
													3000);
										}

									});

					$(".Delete").live(
							'click',
							function() {
								$('.client tbody tr').each(function(i, row) {
									$(this).removeClass('row_selected');
								});
								$('.test').html('');
								var row = $(this).parents('tr');

								var action_destination = '/client/delete';

								var description = row.find('.nom').html();

								var id_client = row.find('.id_client').html();

								Delete(id_client, description, row, 0,
										action_destination);
							});
					$('.modify_client_entreprise').click(function() {
						var form_data;
						var json_to_send = '{';
						var i = 0;
						var valide = true;

						//$('.test').html('entreprise');
						// client est une entreprise
						
						form_data = $('.f_c_e_modify')
								.serializeArray();
						if ($('.nom_e').val().length == 0) {
							valide = false;
						} else if ($('.email_e').val().length == 0) {
							valide = false;
						} else if ($('.tel_e').val().length == 0) {
							valide = false;
						} else if ($('.nom_r').val().length == 0) {
							valide = false;
						}
						if (valide) {
							for (i = 0; i < form_data.length; i++) {
								if (i == 0) {
									json_to_send = json_to_send
											+ '"'
											+ form_data[i].name
											+ '" : "'
											+ form_data[i].value
											+ '"';
								} else {
									json_to_send = json_to_send
											+ ',"'
											+ form_data[i].name
											+ '" : "'
											+ form_data[i].value
											+ '"';
								}
							}
							//add id value
							var id = $('.id_client').attr('value');
							 json_to_send = json_to_send + ',"id" : "'+id+'"';
							 //gender
							 if($('label[for="radio-1"]').hasClass('checked')) {
								 json_to_send = json_to_send + ',"gender_r" : "0"';
								 }
							 else{
								 json_to_send = json_to_send + ',"gender_r" : "1"';
							 }
							 
							json_to_send = json_to_send
									+ ',"type":"entreprise"';
							json_to_send = json_to_send + '}';
							$
									.ajax({
										type : "POST",
										url : "/client/modify",
										data : json_to_send,
										success : function(data) {
											// var json =
											// $.parseJSON(data);

											if (data == 'success') {// maintenant
												// on
												// peut
												showSuccess(
														'Modification de l\'entreprise réussie',
														3000);
											} else {
												showError(data,
														3000);
											}
										}
									});
						} else {
							showError(
									'Veuillez revoir le formulaire de l\'entreprise',
									3000);
						}

					});// end modify_client_entreprise.click()
					$('.modify_client_particulier')
					.click(
							function() {
								var form_data;
								var json_to_send = '{';
								var i = 0;
								var valide = true;
								//$('.test').html('particulier');
								form_data = $('.f_c_p_modify')
										.serializeArray();

								if ($('.nom_p').val().length == 0) {
									valide = false;
								}
								if ($('.email_p').val().length == 0) {
										if ($('.tel_p').val().length == 0) {
											valide = false;
									} 
								} 
								if (valide) {
									for (i = 0; i < form_data.length; i++) {
										if (i == 0) {
											json_to_send = json_to_send
													+ '"'
													+ form_data[i].name
													+ '" : "'
													+ form_data[i].value
													+ '"';
										} else {
											json_to_send = json_to_send
													+ ',"'
													+ form_data[i].name
													+ '" : "'
													+ form_data[i].value
													+ '"';
										}
									}
									//add id value
									var id = $('.id_client').attr('value');
									 json_to_send = json_to_send + ',"id" : "'+id+'"';
									 //gender
									 if($('label[for="radio-1"]').hasClass('checked')) {
										 json_to_send = json_to_send + ',"gender_p" : "0"';
										 }
									 else{
										 json_to_send = json_to_send + ',"gender_p" : "1"';
									 }
									json_to_send = json_to_send
											+ ',"type":"particulier"';
									json_to_send = json_to_send + '}';
									$
											.ajax({
												type : "POST",
												url : "/client/modify",
												data : json_to_send,
												success : function(data) {
													// var json =
													// $.parseJSON(data);

													if (data == 'success') {// maintenant
														// on
														// peut
														showSuccess(
																'Modification réussie',
																3000);
													} else {
														showError(data,
																3000);
													}
												}
											});
								} else {
									showError(
											'Veuillez revoir le formulaire de particulier',
											3000);
								}
							});//end modify client particulier
				});