// console.log('hello');
var header = $('.page-title');
var toDoList = $('.toDo-list');
var container = $('.container');

function renderForm(){
  var form = $('<form class="new-toDo">'+'<input type="text" class="newTask">'+'<button class="add">'+'<i class="fa fa-plus" aria-hidden="true"></i>'+'</button>'+'</form>');
  container.append(form);
  form.find('.add').on('click', function(e) {
    e.preventDefault();
    var newTask = {
      importance: 'normal',
      todo: form.find('.newTask').val(),
      status: 'incomplete'
    };
    var settings = {
        url: 'http://tiny-za-server.herokuapp.com/collections/max-todos',
        type: 'POST',
        success: function(data, status, xhr) {
          console.log('successful');
          renderCurrentTasks();
        },
        error: function() {
          // log an error
          console.log('the post didn\'t work');
        },
        contentType: 'application/json',
        data: JSON.stringify(newTask)
      };
      console.log(newTask);
      $.ajax(settings);
    });
}

function renderCurrentTasks(){
  toDoList.empty();
  header.empty();
  var newTitle = $('<h2>Current Tasks</h2>');
  //display all current tasks only
  var settings = {
  		url: 'http://tiny-za-server.herokuapp.com/collections/max-todos',
  		type: 'GET',
  		success: function(data, status, xhr) {
  			data.forEach(function(toDo, i, arr) {
  				// make an li + add an importance sub line if an importance is added
          if (toDo.importance === 'high' && toDo.status === 'incomplete') {
            var newTask = $('<li class="' + toDo._id + '">' + toDo.todo + '<span><i class="fa fa-exclamation-circle" aria-hidden="true"></i></span>' + '</li><button class="delete ' + toDo._id + '"><i class="fa fa-trash" aria-hidden="true"></i></button>');
    				toDoList.append(newTask);
            console.log('importance added');
          } else if (toDo.importance === 'normal' && toDo.status === 'incomplete') {
            var newTask = $('<li class="' + toDo._id + '">' + toDo.todo + '</li><button class="delete ' + toDo._id + '"><i class="fa fa-trash" aria-hidden="true"></i></button>');
    				toDoList.append(newTask);
            console.log('no importance added');
          } else if (toDo.status === 'complete'){
            console.log('do not add');
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
  toDoList.empty();
  header.empty();
  var newTitle = $('<h2>Completed Tasks</h2>');
  var settings = {
      url: 'http://tiny-za-server.herokuapp.com/collections/max-todos',
      type: 'GET',
      success: function(data, status, xhr) {
        data.forEach(function(toDo, i, arr) {
          if (toDo.importance === 'high' && toDo.status === 'complete') {
            var newTask = $('<li class="' + toDo._id + '">' + toDo.todo + '<span><i class="fa fa-exclamation-circle" aria-hidden="true"></i></span>' + '</li><button class="delete ' + toDo._id + '"><i class="fa fa-trash" aria-hidden="true"></i></button>');
            toDoList.append(newTask);
            console.log('importance added');
          } else if (toDo.importance === 'normal' && toDo.status === 'complete') {
            var newTask = $('<li class="' + toDo._id + '">' + toDo.todo + '</li><button class="delete ' + toDo._id + '"><i class="fa fa-trash" aria-hidden="true"></i></button>');
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

function renderAllTasks(){
  //display all current and complete tasks
}

renderForm();
// renderCurrentTasks();
renderCompleteTasks();
