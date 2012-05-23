$(document)
		.ready(
				function() {
					// initialize
					// id_commande input
					// value
					var all_rows_selected = false;
					$('form#add_projet').validationEngine();
					$('form#add_service').validationEngine();
					
					$("input.commande_add").iphoneStyle({ // Custom Label With onChange
						// function
						checkedLabel : "montrer",
						uncheckedLabel : "Cacher",
						labelWidth : '85px',
						onChange : function() {
							if(this.elem.is(':checked')){//services
								$('div.commande_add').show();

								}
							else{//projets
								$('div.commande_add').hide();
				
							}
							var chek = $(".input.commande_add").attr('checked');
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
						checkedLabel : "Service",
						uncheckedLabel : "Projet",
						labelWidth : '85px',
						onChange : function() {
							if (this.elem.is(':checked')) {// add service
								$('#add_projet').removeClass('visible');
								$('#add_service').addClass('visible');
								$('#add_projet').validationEngine('hideAll');
								$('#add_service').fadeIn();
								$('#add_projet').fadeOut();
								// $('.request_type').attr('value', 'service');
							} else {// add project
								$('#add_service').removeClass('visible');
								$('#add_projet').addClass('visible');
								$('#add_service').validationEngine('hideAll');
								$('#add_service').fadeOut();
								$('#add_projet').fadeIn();
								// $('.request_type').attr('value', 'projet');
							}
							$('#validation').validationEngine('hideAll');

							var chek = $(".type").attr('checked');
							if (chek) {
								$(".disabled_map").fadeOut();
							} else {
								$(".disabled_map").fadeIn();
							}
							// $("#show_service").click(function () {
							// $(".formEl_b").slideToggle("slow");
							// });
						}
					});
					//modify form
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

					$('.edit').live('click',function() {
						$('.commande tbody tr').each(function(i, row) {
							$(this).removeClass('row_selected');
						});
					});
					$('.edit_projets').live('click',function() {
						$('.projet tbody tr').each(function(i, row) {
							$(this).removeClass('row_selected');
						});
					});
					$('.edit_services').live('click',function() {
						$('.service tbody tr').each(function(i, row) {
							$(this).removeClass('row_selected');
						});
					});
					$('.commande tr').live('click', function() {
						$(this).toggleClass('row_selected');
					});
					$('.commande_projet tr').live('click', function() {
						$(this).toggleClass('row_selected');
					});
					$('.commande_service tr').live('click', function() {
						$(this).toggleClass('row_selected');
					});
					$('#reset_p').click(function() {
						$('input:not(.id_commande_p)').val('');// ne pas
						// supprimer
						// id_commande
						showError('formulaire vidé', 3000);
					});
					$('#reset_e').click(function() {
						$('input:not(.id_commande_e)').val('');

						// $('input').val('');
						showError('formulaire vidé', 3000);
					});
					$(".Delete").live(
							'click',
							function() {
								$('.commande tbody tr').each(function(i, row) {
									$(this).removeClass('row_selected');
								});
							
								var row = $(this).parents('tr');

								var action_destination = '/commande/delete';

								var description = row.find('.nom').html();

								var id_commande = row.find('.id_commande')
										.html();

								Delete(id_commande, description, row, 0,
										action_destination);
							});
					$(".Delete_projet").live(
							'click',
							function() {
								$('.commande_projet tbody tr').each(function(i, row) {
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
								$('.commande_service tbody tr').each(function(i, row) {
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
											$('.commande tbody tr')
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
											$('.commande tbody tr')
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
					$('.selectall_projet')
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
					$('.selectall_service')
					.click(
							function() {
								if (all_rows_selected == false) {
									$('.service tbody tr')
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
									$('.service tbody tr')
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
					
					
					$('.delete_b_commande')//liste des commandes
							.click(
									function() {
	
										var lines_to_delete = [];
										$('.commande tbody tr')
												.each(
														function(i, row) {

															if ($(this)
																	.hasClass(
																			'row_selected')
																	.toString() == 'true') {
																var id_commande_courant = $(
																		this)
																		.find(
																				'.id_commande')
																		.html();
																lines_to_delete
																		.push(id_commande_courant);
															}

														});

										if (lines_to_delete.length > 0) {
											DeleteAll(lines_to_delete,
													'commande');
										} else {
											showWarning(
													'Vous n\'avez rien selectionné',
													5000);
										}

									});
					$('.delete_b_commande_projet')
					.click(
							function() {
								var lines_to_delete = [];
								$('.commande_projet tbody tr')
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
								$('.commande_service tbody tr')
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
					$('.display tr').click(function() {

					});
					$('.test_alert').click(function(){
						alert($('.id_commande').find('input#id_commande').attr('value'));
					});
					$('.add_commande_projet')
							.click(
									function() {
										var id_commande = null;
										var form_data = $('.f_p_add')
												.serializeArray();
										var i = 0;
										// form validation
										var valide = true;
										if ($('.prix_projet').value == 0) {
											valide = false;
										} else if ($('.date_debut').val().length == 0) {
											valide = false;
										} else if ($('.date_fin').val().length == 0) {
											valide = false;
										}
										var type_projet = $('.type_projet')
												.find('span').html();
										if (type_projet == 'Veuillez choisir un type de projet...') {
											valide = false;
										}
										var client = $('.client')// add
										// client
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
													if (form_data[i].name == 'prix_projet') {
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
											// add request_type

											json_to_send = json_to_send
													+ ',"request_type" : "'
													+ 'projet' + '"';
											// add client
											json_to_send = json_to_send
													+ ',"client" : "' + client
													+ '"';
											// add commande
											if ($('.id_commande').find('input#id_commande').attr('value') > 0) {
												id_commande = $('.id_commande').find('input#id_commande')
												.attr('value');
												json_to_send = json_to_send
														+ ',"id_commande" : "'
														+ id_commande
														+ '"';
											}

											// add type projet

											json_to_send = json_to_send
													+ ',"type_projet" : "'
													+ type_projet + '"';
											// add progression
											var progression = $('.progression')
													.attr('value');
											json_to_send = json_to_send
													+ ',"progression" : "'
													+ progression + '"';
											var description_commande = $(
													'.description_commande')
													.val();
											json_to_send = json_to_send
													+ ',"description_commande" : "'
													+ description_commande
													+ '"';
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
																		var employe = $(
																				this)
																				.find(
																						'span')
																				.html();
																		json_to_send = json_to_send
																				+ '{"name " : "'
																				+ employe
																				+ '"}';
																	} else {
																		var employe = $(
																				this)
																				.find(
																						'span')
																				.html();
																		json_to_send = json_to_send
																				+ ',{"name " : "'
																				+ employe
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
														url : "/commande/submit",
														data : json_to_send,
														success : function(data) {
															// alert('success');
															var json = $
																	.parseJSON(data);

															if (json.message == 'success') {// COMMANDE
																// PROJET
																// SI
																// id_commande
																// exists
																var type_form = $('.type_form').attr('value');
																if(type_form == 'add'){
																	$('div.client').hide();
																	$('.commande_description').hide();
																}
																if(json.commande_exists == 'non'){//si commande nouvelle
																	$(
																			'.id_commande')
																			.find(
																					'input#id_commande')
																			.attr(
																					'value',
																					json.id_commande);
																	$(
																			'.id_commande')
																			.css(
																					{
																						'display' : ''
																					});
																	showSuccess(
																			'Commande et Projet ajoutés',
																			3000);
															}else{
																//si commande existe deja
														showSuccess(
																'Projet ajouté',
																3000);
															}
															} else {// SI ERROR
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
					$('.add_commande_service')
							.click(
									function() {
										var id_commande = null;
										var form_data = $('.f_s_add')
												.serializeArray();
										var i = 0;
										var pack = null;
										// get pack

										// form validation
										var valide = true;
										if ($('.prix_service').value == 0) {
											valide = false;
										} else if ($('.date_debut_service').val().length == 0) {
											valide = false;
										} else if ($('.date_fin_service').val().length == 0) {
											valide = false;
										}
										var client = $('.client')// add
										// client
										.find('span').html();
										var type_service = $('.type_service')
												.find('span').html();
										if (type_service == 'Veuillez choisir un type de service...') {
											valide = false;
										} else {// si type de service choisie
											if ($('div.pack').hasClass(
													'visible')) {
												if ($('.list_packs').find(
														'li.ui-selected').length > 0) {
													pack = $('.list_packs')
															.find(
																	'li.ui-selected')
															.html();
												} else {// il y a des pack mais
													// auccun choisi
													valide = false;
												}
											} else {// ca marche il n'existe
												// aucun pack
												pack = 'aucun';
											}
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
													if (form_data[i].name == 'prix_service') {
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
											// add request_type

											json_to_send = json_to_send
													+ ',"request_type" : "'
													+ 'service' + '"';
											// add client
											json_to_send = json_to_send
													+ ',"client" : "' + client
													+ '"';
											// add commande
											if ($('.id_commande').find('input#id_commande').attr('value') > 0) {
												id_commande = $('.id_commande').find('input#id_commande')
												.attr('value');
												json_to_send = json_to_send
														+ ',"id_commande" : "'
														+ id_commande
														+ '"';
											}
											// add description_commande
											var description_commande = $(
													'.description_commande')
													.val();
											json_to_send = json_to_send
													+ ',"description_commande" : "'
													+ description_commande
													+ '"';
											// add type service
											json_to_send = json_to_send
													+ ',"type_service" : "'
													+ type_service + '"';
											// add price
											json_to_send = json_to_send
													+ ',"pack" : "' + pack
													+ '"';
											i = 0;
											json_to_send = json_to_send + '}';
											// $('.test').html(json_to_send);
											// json_to_send =
											// $.parseJSON(json_to_send);
											$
													.ajax({
														type : "POST",
														url : "/commande/submit",
														data : json_to_send,
														success : function(data) {
															// alert('success');
															var json = $
																	.parseJSON(data);
															if (json.message == 'success') {// COMMANDE
																// PROJET
																// SI
																// id_commande
																// exists
																var type_form = $('.type_form').attr('value');
																if(type_form == 'add'){
																	$('div.client').hide();
																	$('.commande_description').hide();
																}
																if (json.commande_exists == 'non') {// SI
																	// NOUVELLE
																	// COMMANDE
																	$(
																			'.id_commande')
																			.find(
																					'input#id_commande')
																			.attr(
																					'value',
																					json.id_commande);
																	$(
																			'.id_commande')
																			.css(
																					{
																						'display' : ''
																					});
																	showSuccess(
																			'Commande et Service ajoutés',
																			3000);
																} else { // SI
																	// COMMANDE
																	// EXISTSTE
																	// DEJA
																	showSuccess(
																			'Service ajouté',
																			3000);
																}
															} else {// SI ERROR
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
					var type_form = $('.type_form').attr('value');
					if(type_form == 'add'){
						$('#id_commande').attr('value','');//clear id after page refresh IF ADD form
					}
				});