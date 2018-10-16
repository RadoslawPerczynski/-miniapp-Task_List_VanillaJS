//Anchors - variables
const taskInput = document.querySelector('#task');
const addTaskForm = document.querySelector('#task-form');
const listOfTasks = document.querySelector('ul.collection');
const clearTasksBtn = document.querySelector('.clear-tasks');
const filterInput = document.querySelector('#filter');


const taskItemClass = 'collection-item';
const deleteAnchorClass = 'secondary-content delete-item';
const emptyTaskNotificationText = 'Enter the task\'s name.';
const taskCreatedNotificationText = 'Task has been successfuly created!';
const deleteItemConfirmText = 'Are you sure?';
const clearAllTasksConfirmText = 'Delete the whole list?';

const taskRemovedNotificationText = 'Task has been removed.';
const clearedAllTasksNotificationText = 'Tasks have been removed.';

const listOfTasksEmptyNotificationText = 'List of tasks is already empty.';

const dialogAnimationEffect = 'fade';



addEventListeners()

function addEventListeners() {
  addTaskForm.addEventListener('submit', addTask);
  listOfTasks.addEventListener('click', deleteTask);
  clearTasksBtn.addEventListener('click', clearAllTasks);
  filterInput.addEventListener('input', filterTasks)
}


function addTask(e) {
  e.preventDefault();
  const inputValue = taskInput.value;

  if(!inputValue) {
    notifyTheUser(emptyTaskNotificationText, 'error');

  } else {
    createTaskItem(inputValue);
    notifyTheUser(taskCreatedNotificationText)
 
  }
  
}

function createTaskItem(taskName) {
  
  const taskItem = document.createElement('li');
  taskItem.className = taskItemClass;
  taskItem.appendChild(document.createTextNode(taskName));

  const deleteAnchor = document.createElement('a');
  deleteAnchor.className = deleteAnchorClass;
  deleteAnchor.setAttribute('href', '#');
  deleteAnchor.innerHTML = '<i class="material-icons">clear</i>';

  taskItem.appendChild(deleteAnchor);
  listOfTasks.appendChild(taskItem);

}

function deleteTask(e) {
  e.preventDefault();
  const taskItemLi = e.target.parentElement.parentElement;

  if(taskItemLi.classList.contains('collection-item')) {
    
    alertify.confirm(deleteItemConfirmText, function(){ 
        taskItemLi.remove();
        notifyTheUser(taskRemovedNotificationText);
    }).set({transition: dialogAnimationEffect}).setHeader('Confirm');
  }

}

function clearAllTasks() {
  if((listOfTasks === undefined || listOfTasks.childElementCount == 0)) {
    notifyTheUser(listOfTasksEmptyNotificationText, 'warning');
  } else {
    alertify.confirm(clearAllTasksConfirmText, function(){
      i=0;
      while(listOfTasks.firstChild) {
        listOfTasks.removeChild(listOfTasks.firstChild)
      };
      notifyTheUser(clearedAllTasksNotificationText);
  }).set({transition: dialogAnimationEffect}).setHeader('Confirm');
  }
}

function filterTasks(e) {
  const filterInputValue = e.target.value.toLowerCase();

  const tasksArray = Array.from(listOfTasks.children);

  tasksArray.forEach(function(task) {
    let taskName = task.firstChild.textContent;
    if(taskName.toLowerCase().indexOf(filterInputValue) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })


}

//notifications
function notifyTheUser(text = 'Ok', type = 'success') {
  alertify.notify(text, type, 5);
}

// function getAndSetArrayOfTasks() {

//   if(localStorage.getItem('tasks') === 'indefined') {
//     tasks = [];
//   } else {
//     tasks = JSON.parse(localStorage.getItem('tasks'));
//   }

// }
