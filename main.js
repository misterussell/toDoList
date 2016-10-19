// console.log('hello');
var header = $('.page-title');
var toDoList = $('.toDo-list');
var container = $('.container');

//filters
var currentTasks = $('current');
var completedTasks = $('complete');
var allTasks = $('allTasks');

function renderForm(){
  var form = $('<form class="new-toDo">'
  +'<input type="text" class="newTask">'
  +'<button class="add">'
  +'<i class="fa fa-plus" aria-hidden="true"></i>'
  +'</button>'
  +'</form>');
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
  var newTitle = $('<h1>Current Tasks</h1>');
  //display all current tasks only
  var settings = {
  		url: 'http://tiny-za-server.herokuapp.com/collections/max-todos',
  		type: 'GET',
  		success: function(data, status, xhr) {
  			data.forEach(function(toDo, i, arr) {
  				// make an li + add an importance sub line if an importance is added
          if (toDo.importance === 'high' && toDo.status === 'incomplete') {
            var newHighTask = $('<li>' + toDo.todo +
            '<span><i class="fa fa-exclamation-circle" aria-hidden="true"></i></span>'
            + '<button class="delete ' + toDo._id + '">'
            + '<i class="fa fa-trash" aria-hidden="true"></i>'
            + '</button></li>');
    				toDoList.append(newHighTask);
            // newHighTask.find('.' + toDo._id).on('click', deleteClick(toDo._id));
            // console.log('importance added');
          } else if (toDo.importance === 'normal' && toDo.status === 'incomplete') {
            var newNormalTask = $('<li>' + toDo.todo
            + '<button class="delete ' + toDo._id + '"><i class="fa fa-trash" aria-hidden="true"></i></button></li>');
    				toDoList.append(newNormalTask);
            // newNormalTask.find('.' + toDo._id).on('click', deleteClick(toDo._id));
            // console.log('no importance added');
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
  window.location.hash = '#complete';
  //display all completed tasks
  toDoList.empty();
  header.empty();
  var newTitle = $('<h1>Completed Tasks</h1>');
  var settings = {
      url: 'http://tiny-za-server.herokuapp.com/collections/max-todos',
      type: 'GET',
      success: function(data, status, xhr) {
        data.forEach(function(toDo, i, arr) {
          if (toDo.importance === 'high' && toDo.status === 'complete') {
            var newHighTask = $('<li class="' + toDo._id + '">' + toDo.todo
            + '<span><i class="fa fa-exclamation-circle" aria-hidden="true"></i></span>'
            + '<i class="fa fa-check" aria-hidden="true"></i></li>');
            toDoList.append(newHighTask);
            // console.log('importance added');
          } else if (toDo.importance === 'normal' && toDo.status === 'complete') {
            var newNormalTask = $('<li class="' + toDo._id + '">' + toDo.todo + '<i class="fa fa-check" aria-hidden="true"></i></li>');
            toDoList.append(newNormalTask);
            // console.log('no importance added');
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


//function that moves the add listener for delete button
function deleteClick(e, postID) {
  console.log('delete ran');
  e.preventDefault();
  var deletePost = postID;
  var settings = {
      url: 'http://tiny-za-server.herokuapp.com/collections/max-todos/' + deletePost,
      type: 'DELETE',
      success: function(data, status, xhr) {
        console.log('deleted!');
        renderCurrentTasks();
      },
      error: function() {
        // log an error
        console.log('did not delete');
      },
      contentType: 'application/json',
    };
    $.ajax(settings);
  }


// TO edit status of task
// var settings = {
//     url: 'http://tiny-za-server.herokuapp.com/collections/max-todos',
//     type: 'PUT',
//     success: function(data, status, xhr) {
//     },
//     error: function() {
//       console.log('could not complete post');
//     }
//   };
//   $.ajax(settings);
//

function renderAllTasks(){
  //display all current and complete tasks
  window.location.hash = '#all-tasks';
  //display all completed tasks
  toDoList.empty();
  header.empty();
  var newTitle = $('<h1>All Tasks</h1>');
  var settings = {
      url: 'http://tiny-za-server.herokuapp.com/collections/max-todos',
      type: 'GET',
      success: function(data, status, xhr) {
        data.forEach(function(toDo, i, arr) {
          if (toDo.status === 'complete') {
            var newHighTask = $('<li class="' + toDo._id + '">' + toDo.todo
            + '<i class="fa fa-check" aria-hidden="true"></i></li>');
            toDoList.append(newHighTask);
            // console.log('importance added');
          } else if (toDo.status === 'incomplete') {
            var newNormalTask = $('<li class="' + toDo._id + '">' + toDo.todo + '</li>');
            toDoList.append(newNormalTask);
            // console.log('no importance added');
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

renderForm();

function handleHashChange(e) {
	var requestedTasks = location.hash;

	if (requestedTasks === '#complete') {
		// put the form on the page
		renderCompleteTasks();
	} else if (requestedTasks === '') {
		renderCurrentTasks();
	} else if (requestedTasks === "#all-tasks") {
    renderAllTasks();
  }
}

$(window).on('hashchange', handleHashChange);

handleHashChange();
