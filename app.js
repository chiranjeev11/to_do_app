

$(document).ready(function(){

	var uncompleted_task = 0;
	var completed_task = 0;

	$('#completed_task').hide();

	window.onresize = function(){

		var top = $(window).outerHeight()-52;
		$('footer').css('top', top+'px');

	}

	$('#addtask').keypress(function(e){
		var key = e.which;
		if (key==13){
			var value = $('#addtask');
			if (value.val()!=''){
				$('#task').append('<div class="mt-2 priority">\
					<div class="dark d-flex justify-content-between align-items-center flex-wrap disp py-2" style="border-radius: 5px;">\
						<div>\
							<i class="fa fa-bars light px-2" aria-hidden="true"></i>\
							<button class="btn btn-secondary checkbox light"><i class="fa fa-trash-o light px-2" aria-hidden="true"></i></button>\
							<input 	id="taskname" type="text" class="pl-md-2 btn text-white shadow-none change" value='+value.val() +' style="width: '+ Math.min(((value.val().length+5)*8),200) +'px; background:#303030; cursor: text;">\
						</div>\
						<div>\
							<span id="duedate" class="light pr-1"></span>\
						</div>\
					</div>\
					<hr style="background-color: #BEBEBE; width: 100%;" class="m-0">\
					<div class="dark container py-3 content" style="display: none;">\
						<div class="row">\
							<div class="col-md-7">\
								<p class="mb-2 light">Notes</p>\
								<textarea class="textinput text-white" rows="7" cols="50"></textarea>\
							</div>\
							<div class="col-md-5">\
								<p class="mb-0 light">Due Date</p>\
								<input class="btn btn-secondary my-2 datepicker" type="datetime-local" style="width:220px;">\
								<p class="mt-4 mb-2 light">Priority</p>\
								<select style="min-width: 200px" class="select btn btn-secondary p-1">\
									<option value="none">None</option>\
									<option value="low">Low</option>\
									<option value="medium">Medium</option>\
									<option value="high">High</option>\
								</select>\
								<br>\
								<button class="btn btn-danger mt-3 delete">Delete</button>\
							</div>\
						</div>\
					</div>\
					</div>')

				uncompleted_task+=1;
				$('#notask').hide();
				var now = new Date();
		  		var day = ("0" + now.getDate()).slice(-2);
				var month = ("0" + (now.getMonth() + 1)).slice(-2);
				var today = now.getFullYear() + "-" + (month) + "-" + (day);
				$('.checkbox').attr('min', today);
			}
		}

		$(value).val('');


	})



	$(document).on('input','.change',  function(){
			var w = Math.min(((this.value.length + 5) * 8),200);
			this.style.width =  w +'px';
		})

	$(document).on('click', '.disp', function(){
		var content = $(this).siblings('div')[0];
		$(content).slideToggle();
	})

	$(document).on('click', '.delete', function(){
		$(this).parent().parent().parent().parent().remove();
		uncompleted_task-=1;
		if (uncompleted_task==0){
			$('#notask').show();
		}
	})

	$( function() {
	    $( "#task" ).sortable();
	    $( "#task" ).disableSelection();
	    
  	});

  	$(document).on('change', '.select', function(){
  		var value = $(this).val();
  		var parent = $(this).parent().parent().parent().parent();
  		if (value=='low'){
  			$(parent).css('border-left', '5px solid #1589FF');
  		} else if (value=='medium'){
  			$(parent).css('border-left', '5px solid #ffae42');
  		}
  		else if (value=='high') {
  			$(parent).css('border-left', '5px solid red');	
  		}
  		else{
  			$(parent).css('border', 'none');

  		}
  	})

  	$(document).on('click', '.checkbox', function(){
		var task = $(this).parent().parent().parent()
		$('#completed_task').append($(task).html());
		$(task).hide();
		completed_task+=1;
		$('#completed').text(completed_task);
		uncompleted_task-=1;
		if (uncompleted_task==0){
			$('#notask').show();
  		}
  	})

  	$('#done').on('click', function(){
  		$('#completed_task').toggle()
  	})

  	$(document).on('input', '.datepicker', function(){
  		var value = $(this).val();
  		value = value.split('T');
  		var due = $(this).parent().parent().parent().parent().find('#duedate');
  		var txt = value;
  		
		$(due).text(txt);
  	})
})