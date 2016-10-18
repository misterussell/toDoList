// console.log('hello');
var header = $('.page-title');
var newToDo = $('.new-toDo');
var toDoList = $('.toDo-list');
var currentLocation = $(window.location);

function renderForm(){
  var $createForm = $('<input type="text" class="newTask">'+'<button class="add"><i class="fa fa-plus" aria-hidden="true"></i></button>');
  newToDo.append($createForm);
}

function renderCurrentTasks(){
  header.empty();
  toDoList.empty();
  var newTitle = $('<h2>Current Tasks</h2>');
  //display all current tasks only
  var settings = {
  		url: 'http://tiny-za-server.herokuapp.com/collections/max-todos',
  		type: 'GET',
  		success: function(data, status, xhr) {
  			data.forEach(function(toDo, i, arr) {
  				// make an li + add an importance sub line if an importance is added
          if (!toDo.importance) {
            console.log('importance added');
          } else {
          var newTask = $('<li>' + toDo.todo + '</li><button><i class="fa fa-trash" aria-hidden="true"></i></button>');
  				toDoList.append(newTask);
          console.log('no importance added');
          }
  			});
  		},
  		error: function() {
  			console.log('get request did not work');
  		}
  	};
  	$.ajax(settings);
    header.append(newTitle);
}

function renderCompleteTasks(){
  //display all completed tasks
}

function renderAllTasks(){
  //display all current and complete tasks
}

renderForm();
renderCurrentTasks();
