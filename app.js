//Anchors - variables
const taskInput = document.querySelector('#task');
const addTaskForm = document.querySelector('#task-form');
const listOfTasks = document.querySelector('ul.collection');

const taskItemClass = 'collection-item';
const deleteAnchorClass = 'secondary-content delete-item';
const emptyTaskMessageText = 'A task cannot be empty. Enter the name.';

var elem;
var modal;

addEventListeners()

function addEventListeners() {
  addTaskForm.addEventListener('submit', addTask);
  listOfTasks.addEventListener('click', deleteTask);


  //modal initialize
  elem = document.querySelector('.modal');
  modal = M.Modal.init(elem);
}

function openDialog(text) {
  const modalText = document.querySelector('.modal-content p');
  modalText.textContent = text;
  modal.open();
}

function addTask(e) {
  e.preventDefault();
  const inputValue = taskInput.value;

  if(!inputValue) {
    openDialog(emptyTaskMessageText);

  } else {
    var newTask = createTaskItem(inputValue);
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

  if(e.target.parentElement.classList.contains('delete-item')) {
    
    if(confirm('Are you sure?')) {
      taskItemLi.remove();
    }
    
  }

}
