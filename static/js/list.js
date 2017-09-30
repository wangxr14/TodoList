$(document).ready(function(){

	$("#saveBtn").click(function(){
		var tmpStr = $('#newTaskInfo').val();
		var tmpEle = $('<a href="#" class="list-group-item"><input type="checkbox"></input>'+tmpStr+'<button type="button" class="btn btn-info editBtn">Edit</button></a>');
		$('#taskList').append(tmpEle);
		
		$.ajax({
		  type: "POST",
		  url: "/addtask/",
		  data: {
			"info":tmpStr
		  },
          success: function(data) {
			console.log(data)
		  },
		  error: function(e){
            console.log(e)
          }
		});		
		$('#AddTaskModal').modal('hide')
	});
  
	$("#delBtn").click(function(){
		$("input[type='checkbox']:checked").each(function() {
		var tmpEle = $(this).parent();
          $.ajax({
			  type: "POST",
			  url: "/deltask/",
			  data: {
				"info":tmpEle.text().substring(0,tmpEle.text().length-4)
			  },
			  success: function(data) {
				console.log(data)
				
			  },
			  error: function(e){
				console.log(e)
			  }
			});		
		tmpEle.remove();	
        });
	});
	
	$("#doneBtn").click(function(){
		$("input[type='checkbox']:checked").each(function() {
			var tmpEle = $(this).parent();
            var doneItem = $(this).parent().clone();
			$.ajax({
			  type: "POST",
			  url: "/donetask/",
			  data: {
				"info":tmpEle.text().substring(0,tmpEle.text().length-4)
			  },
			  success: function(data) {
				console.log(data)
			  },
			  error: function(e){
				console.log(e)
			  }
			});		
			$('#doneList').append(doneItem);
			tmpEle.remove();
        });
	});
	
	var pointer;
	var preInfo;
	$("ul").on("click",".editBtn",function(){
		preInfo = $(this).parent().text().substring(0,$(this).parent().text().length-4);
		$('#preTaskInfo').attr('placeholder', preInfo);
		pointer = $(this).parent();
		$('#EditTaskModal').modal('show')
	});
	
	$("#saveEditionBtn").click(function(){
		var tmpStr = $('#preTaskInfo').val();
		console.log(preInfo)
		$.ajax({
			  type: "POST",
			  url: "/edittask/",
			  data: {
				"info":tmpStr,
				"preInfo":preInfo
			  },
			  success: function(data) {
				pointer.html('<input type="checkbox"></input>'+tmpStr+'<button type="button" class="btn btn-info editBtn">Edit</button>')
				$('#EditTaskModal').modal('hide')
			  },
			  error: function(e){
				console.log(e)
			  }
			});		
	});
});
