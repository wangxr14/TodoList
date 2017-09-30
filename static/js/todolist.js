$(function(){

// selected item
var selectedItems = [];


$("#saveBtn").click(function(){
	var tmpStr = $('#newTaskInfo').val();
	selectedItems.push(tmpStr);
	var tmpEle = $('<a href="#" class="list-group-item"><input type="checkbox">'+tmpStr+'</a>');
	$('#taskList').append(tmpEle);
})
  
});
