$(document).ready(function () {
	//var txt = '    UNAN-Managua >>> Registro-DEDV    ';
	//var wait = 90;
	
	var email = document.getElementById('email-org');
	var personalEmail = document.getElementById('email-generic');
	var phone = document.getElementById('phone');
	var cellphone = document.getElementById('cellphone');
	var enrollmentModal = document.getElementById('enrollmentModal');
	var country = document.getElementById('country');
	var faculty = document.getElementById('faculty');
	var courseType = document.getElementById('courseType');
	var course = document.getElementById('course');
	var fileCertificate = document.getElementById('certificate');
	var recoveryRequestForm = document.getElementById('recoveryRequestForm');
	var recoveryForm = document.getElementById('recoveryForm');
	var passwordForm = document.getElementById('password-form');
	var academicLevel = document.getElementById('academic-level');
	var university = document.getElementById('university');
	var universityMsc = document.getElementById('university-msc-select');
	var universityDr = document.getElementById('university-dr-select');
	var uploadCertificate = document.getElementById('info-upload-certificate');
	var certificateModal = document.getElementById('certificateModal');
	
	$('[data-toggle="popover"]').popover();
	
	//scroll_title();
	
	if (typeof(email) != 'undefined' && email != null) {
		if (typeof(personalEmail) != 'undefined' && personalEmail != null) {
			if (email.value == personalEmail.value) {
				email.value = '';
			}
		}
	}
	
	if (typeof(phone) != 'undefined' && phone != null) {
		if (phone.value == 0) {
			phone.value = '';
		}
	}
	
	if (typeof(cellphone) != 'undefined' && cellphone != null) {
		if (cellphone.value == 0) {
			cellphone.value = '';
			document.getElementById('cellphone-company').removeAttribute('required');
		} else {
			document.getElementById('cellphone-company').setAttribute('required','required');
		}
	}
	
	if (typeof(enrollmentModal) != 'undefined' && enrollmentModal != null) {
		$('#enrollmentModal').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget);
			var modal = $(this);
			
			var id = button.data('topic-id');
			var dataString = 'topicId=' + id;
			
			$.ajax({
				type: 'POST',
				url: "query/get_enrol_data.php",
				data: dataString,
				datatype: 'json',
				success: function(data) {
					
					var courseId = data.courseId;
					var course = data.course;
					var typeId = data.typeId;
					var type = data.type;
					var beginningdate = data.beginningdate;
					var endingdate = data.endingdate;
					var hours = data.hours;
					var topicId = data.topicId;
					var idNumber = data.idNumber;
					var topicName = data.topic;
					
					modal.find('.modal-body #course-name').attr('data-course-id',courseId);
					modal.find('.modal-body #course-name').text(course);
					modal.find('.modal-body #course-type').attr('data-course-type-id',typeId);
					modal.find('.modal-body #course-type').text(type);
					modal.find('.modal-body #course-beginningdate').val(format_date_local(beginningdate));
					modal.find('.modal-body #course-endingdate').val(format_date_local(endingdate));
					modal.find('.modal-body #course-hours').val(hours);
					modal.find('.modal-body #topic-id').val(topicId);
					modal.find('.modal-body #topic-idNumber').val(idNumber);
					modal.find('.modal-body #topic-name').text(topicName);
				}
			});
		});
	}
	
	if (typeof(country) != 'undefined' && country != null) {
		$('#country').change(function() {
			var countryId = $(this).val();
			var dataString = 'countryId=' + countryId;
			
			$.ajax({
				type: 'POST',
				url: "query/get_city_list.php",
				data: dataString,
				cache: false,
				success: function(result) {
					$('#city').html(result);
				}
			});
		});
	}
	
	if (typeof(faculty) != 'undefined' && faculty != null) {
		$('#faculty').change(function() {
			var facultyId = $(this).val();
			var dataString = 'facultyId=' + facultyId;
			
			$.ajax({
				type: 'POST',
				url: "query/get_department_list.php",
				data: dataString,
				cache: false,
				success: function(result) {
					$('#department').html(result);
				}
			});
		});
	}
	
	if (typeof(courseType) != 'undefined' && courseType != null) {
		$('#courseType').change(function() {
			var courseTypeId = $(this).val();
			var dataString = 'courseTypeId=' + courseTypeId;
			
			$.ajax({
				type: 'POST',
				url: "query/get_course_list.php",
				data: dataString,
				cache: false,
				success: function(result) {
					$('#course').html(result);
					$('#topic').html("");
				}
			});
		});
	}
	
	if (typeof(course) != 'undefined' && course != null) {
		$('#course').change(function() {
			var courseId = $(this).val();
			var participantId = $('#participant-id').val();
			
			var dataString = 'courseId=' + courseId + '&participantId=' + participantId;
			
			$.ajax({
				type: 'POST',
				url: "query/get_topic_list.php",
				data: dataString,
				cache: false,
				success: function(result) {
					$('#topic').html(result);
				}
			});
		});
	}
	
	if (typeof(fileCertificate) != 'undefined' && fileCertificate != null) {
		document.getElementById('certificate').addEventListener('change', thumbnail_certificate, false);
	}
	
	if (typeof(recoveryRequestForm) != 'undefined' && recoveryRequestForm != null) {
		$('#recoveryRequestForm').submit(function(event) {
			event.preventDefault();
			
			$.ajax({
				type: 'POST',
				url: 'query/recovery_request.php',				
				data: $('#recoveryRequestForm').serializeArray(),
				dataType: 'json',
				complete: function(data) {
					$('#msg-response').html(data.responseText);
					$('#user').val('');
					$('#email').val('');
					grecaptcha.reset();					
				}
			});			
		});
	}
	
	if (typeof(recoveryForm) != 'undefined' && recoveryForm != null) {
		$('#recoveryForm').submit(function(event) {
			event.preventDefault();
			
			$.ajax({
				type: 'POST',
				url: 'query/recovery_pass.php',				
				data: $('#recoveryForm').serializeArray(),
				dataType: 'json',
				complete: function(data) {
					$('#msg-response').html(data.responseText);
					$('#user').val('');
					$('#email').val('');
				}
			});			
		});
	}
	
	if (typeof(passwordForm) != 'undefined' && passwordForm != null) {
		$('#password-form').submit(function(event) {
			event.preventDefault();
			
			$.ajax({
				type: 'POST',
				url: 'query/update_password.php',				
				data: $('#password-form').serializeArray(),
				dataType: 'json',
				complete: function(data) {
					$('#msg-response').html(data.responseText);
					$('#password').val('');
					$('#password-confirm').val('');
				}
			});			
		});
	}
	
	if (typeof(university) != 'undefined' && university != null) {
		$('#university').change(function() {
			if (university.value == 'ae6ff633-4f82-11e7-9687-005056a0c94e') {
				$('#university').hide();
				$('#university-lic').parent().show();
				document.getElementById('university-lic').setAttribute('required','required');
				university.removeAttribute('required');
			}
		});		
	}
	
	if (typeof(universityMsc) != 'undefined' && universityMsc != null) {
		$('#university-msc-select').change(function() {
			if (universityMsc.value == 'ae6ff633-4f82-11e7-9687-005056a0c94e') {
				$('#university-msc-select').hide();
				$('#university-msc').parent().show();
				document.getElementById('university-msc').setAttribute('required','required');
				universityMsc.removeAttribute('required');
			}
		});		
	}
	
	if (typeof(universityDr) != 'undefined' && universityDr != null) {
		$('#university-dr-select').change(function() {
			if (universityDr.value == 'ae6ff633-4f82-11e7-9687-005056a0c94e') {
				$('#university-dr-select').hide();
				$('#university-dr').parent().show();
				document.getElementById('university-dr').setAttribute('required','required');
				universityDr.removeAttribute('required');
			}
		});		
	}
	
	if (typeof(certificateModal) != 'undefined' && certificateModal != null) {
		$('#certificateModal').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget);
			var modal = $(this);
			
			var personId = button.data('person-id');
			var topicId = button.data('topic-id');
			var dataString = 'personId=' + personId + '&topicId=' + topicId;
			
			$.ajax({
				type: 'POST',
				url: "query/get_this_certificate.php",
				data: dataString,
				datatype: 'json',
				complete: function(data) {
					if (data.status == 200 ) {
						if (data.responseText != "") {
							var idNumber = data.responseJSON.idNumber;
							var cohort = data.responseJSON.sessionCohort;
							var code = data.responseJSON.code;

							var html = '<img src="/certificate/' + idNumber + '/' + cohort + '/' + code + '.jpg" style="width:100%;" class="thumbnail">'

							modal.find('#certificateModalLabel').text(code);
							modal.find('.modal-body').html(html);
						} else {
							modal.find('#certificateModalLabel').text('CERTIFICADO');
							modal.find('.modal-body').html('<div class="no-content">Usted no ha recibido ningún certificado</div>');
						}
					}
				}
			});
		});
	}
	
	/*window.setTimeout(function() {
		$(".alert").fadeTo(500, 0).slideUp(500, function() {
			$(this).remove(); 
		});
	}, 2500);*/

});

function validate_login() {
	if ((document.getElementById("user").value.length == 0) && (document.getElementById("password").value.length == 0)) {
		alert("Favor ingresar sus credenciales de acceso");
		document.getElementById("user").focus();
		return false;
	} else if (document.getElementById("user").value.length == 0) {
		alert("Favor ingresar un usuario");
		document.getElementById("user").focus();
		return false;
	} else if (document.getElementById("password").value.length == 0) {
		alert("Favor ingresar una contraseña");
		document.getElementById("password").focus();
		return false; 
	}	
}

function validate_recovery_request() {
	if ((document.getElementById("user").value.length == 0) && (document.getElementById("email").value.length == 0)) {
		alert("Favor complete los campos solicitados");
		document.getElementById("user").focus();
		return false;
	} else if (document.getElementById("user").value.length == 0) {
		alert("Favor ingrese su nombre usuario");
		document.getElementById("user").focus();
		return false;
	} else if (document.getElementById("email").value.length == 0) {
		alert("Favor ingrese su correo electrónico");
		document.getElementById("email").focus();
		return false; 
	}	
}

function validate_recovery_pass() {
	if ((document.getElementById("password").value.length == 0) && (document.getElementById("password-confirm").value.length == 0)) {
		alert("Favor complete los campos solicitados");
		document.getElementById("password").focus();
		return false;
	} else if (document.getElementById("password").value.length == 0) {
		alert("Favor digite su nueva contraseña");
		document.getElementById("password").focus();
		return false;
	} else if (document.getElementById("password-confirm").value.length == 0) {
		alert("Favor digite nuevamente su nueva contraseña");
		document.getElementById("password-confirm").focus();
		return false; 
	}	
}

function validate_email_register() {
	if(document.getElementById("email-org").value.length == 0)
	{
		if(document.getElementById("email-generic").value.length == 0)
		{
			alert("Favor ingresar al menos uno de los correos electrónicos solicitados");
			document.getElementById("email-org").focus();
			return false;
		}
	}	
}

function validate_password_confirm() {
	var pwd1 = document.getElementById("password");
	var pwd2 = document.getElementById("password-confirm");
	
	if (pwd1.value != pwd2.value) {
		pwd2.setCustomValidity('Las constraseñas no coinciden');
	} else {
		pwd2.setCustomValidity('');
	}
}

function thumbnail_profile_picture(input) {	
	if (input.files && input.files[0]) {
		var reader = new FileReader();		
		reader.onload = function (e) {
			$('.picture-profile').attr('src', e.target.result);
		};		
		reader.readAsDataURL(input.files[0]);
	}
}

function thumbnail_dni_picture(input) {	
	if (input.files && input.files[0]) {
		var reader = new FileReader();		
		reader.onload = function (e) {
			$('.picture-dni').attr('src', e.target.result);
		};		
		reader.readAsDataURL(input.files[0]);
	}
}

function thumbnail_dni_picture_2(input) {	
	if (input.files && input.files[0]) {
		var reader = new FileReader();		
		reader.onload = function (e) {
			$('.picture-dni-2').attr('src', e.target.result);
		};		
		reader.readAsDataURL(input.files[0]);
	}
}

function thumbnail_certificate(evt) {
	var files = evt.target.files;
	var output = [];
	
	for (var i = 0, f; f = files[i]; i++) {
		output.push('<li><strong>', escape(f.name), '</strong> | ', f.type || 'n/a', ' | ', f.size, ' bytes', '</li>');
	}
	
	if (typeof(uploadCertificate) != 'undefined' && uploadCertificate != null) {
		document.getElementById('info-upload-certificate').innerHTML = '<ul>' + output.join('') + '</ul>';
	}
}

function validate_cellphone_company_required() {
	var cellphoneLength = document.getElementById('cellphone').value.length;
	var cellphoneCompany = document.getElementById('cellphone-company');
	
	if(cellphoneLength < 1) {
		cellphoneCompany.removeAttribute('required');
	} else {
		cellphoneCompany.setAttribute('required','required');
	}
}

function format_date_local(date) {
	var d = new Date(date);
	return d.toLocaleDateString();
}

var specialties = 1;
function add_more_specialties() {
	if (specialties < 5) {
		var objTo = document.getElementById('specialties_fields');
		var divtest = document.createElement("div");
		
		divtest.setAttribute("class", "removeclass" + specialties);
		
		var rdiv = 'removeclass' + specialties;
		
		divtest.innerHTML = '<div class="col-lg-3 col-sm-4"><div class="form-group"><div class="input-group"><input class="form-control" id="specialty_' + specialties + '" name="specialty[]" type="text" placeholder="Asignatura que imparte" required /><span class="input-group-btn"><button class="btn btn-danger" type="button" onClick="remove_specialty(' + specialties + ');"><span class="glyphicon glyphicon-minus"></span></button></span></div></div></div>';
		
		objTo.appendChild(divtest);
		
		specialties++;
	}
}

var specialtiesVariant = 0;
function add_more_specialties_variant() {
	var total = $('.new-specialty').length;
	
	if(specialtiesVariant == 0) {
		specialtiesVariant = 5-total;
	}
	
	if (total < 5) {
		var objTo = document.getElementById('specialties_fields');
		var divtest = document.createElement("div");
		
		divtest.setAttribute("class", "new-specialty sp" + specialtiesVariant);
		
		divtest.innerHTML = '<div class="col-lg-3 col-sm-4"><div class="form-group"><div class="input-group"><input class="form-control" id="specialty_' + specialtiesVariant + '" name="specialty[]" type="text" placeholder="Asignatura que imparte" required /><span class="input-group-btn"><button class="btn btn-danger" type="button" onClick="remove_specialty_variant(' + specialtiesVariant + ');"><span class="glyphicon glyphicon-minus"></span></button></span></div></div></div>';
		
		objTo.appendChild(divtest);
		
		specialtiesVariant--;
	}
}

function remove_specialty(rid) {
	$('.removeclass' + rid).remove();
	specialties--;
}

function remove_specialty_variant(rid) {
	$('#specialty_' + rid).parents(".new-specialty").remove();
	//specialtiesVariant++;
}

function back_to_select_university(id) {
	switch (id) {
		case 1:
			$('#university-lic').val('');
			$('#university-lic').parent().hide();
			$('#university').val('');
			$('#university').show();
			document.getElementById('university-lic').removeAttribute('required');
			document.getElementById('university').setAttribute('required','required');
			break;
			
		case 2:
			$('#university-msc').val('');
			$('#university-msc').parent().hide();
			$('#university-msc-select').val('');
			$('#university-msc-select').show();
			document.getElementById('university-msc').removeAttribute('required');
			document.getElementById('university-msc-select').setAttribute('required','required');
			break;
			
		case 3:
			$('#university-dr').val('');
			$('#university-dr').parent().hide();
			$('#university-dr-select').val('');
			$('#university-dr-select').show();
			document.getElementById('university-dr').removeAttribute('required');
			document.getElementById('university-dr-select').setAttribute('required','required');
			break;
	}	
}

/*function scroll_title() {
	window.status = txt.substring (wait, txt.length) + txt.substring(0, wait);
	if (wait < txt.length) {
		wait++
	} else {
		wait = 0
	}
	setTimeout("scroll_title()", 150);
}*/

/*function register_submit() {	
	var data = $('#register-form').serialize();
	var participantId = $('#register-form').data('participant-id');
	data+="&participant-id="+participantId;
	
	$.ajax({
		url: "query/add_register.php",
		type: "POST",
		data: data,
		success: function(response) {
			//alert("Envio Correcto: "+data);
		},
		error: function(e) {
			nubia = e;
			//alert("Error: " + e);
		}
	});
}*/

/*
$("#country").change(function() {
		selectedCountry = this.options[this.selectedIndex].value;		
	});	
	
function getCountry() {
	//var selectedCity = $("#country").options[$("#country").selectedIndex].value;
	return $("#country").val();
}
*/
