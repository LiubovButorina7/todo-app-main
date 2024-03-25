import iconCross from '../images/icon-cross.svg';
import iconCheck from '../images/icon-check.svg';

const iconMoon = document.querySelector('.icon-moon');
const iconSun = document.querySelector('.icon-sun');
const done = document.querySelector('.done');
const iconDone = document.querySelector('.icon-done');
const countUndone = document.querySelector('.undone-quantity');

const list = document.querySelector('.list');

const ulList = document.querySelector('ul');

const newTodoContainer = document.querySelector('.newTodo');

const newTodo = document.querySelector('#new-todo');

const footer = document.querySelector('.footer');

const stateStatus = document.querySelector('.state');

const stateAll = document.querySelector('.all');
const stateActive = document.querySelector('.undone');
const stateCompleted = document.querySelector('.completed-items');

const clearCompleted = document.querySelector('.clear-completed');

const mobileSection = document.querySelector('.mobile');

const attribution = document.querySelector('.attribution');

let todoList = [];
let counter = 0;

document.addEventListener('DOMContentLoaded', initTodoListFromStorage);
document.addEventListener('DOMContentLoaded', resetInitData);

iconMoon.addEventListener('click', handleClickMode);
iconSun.addEventListener('click', handleClickMode);

iconDone.addEventListener('click', handleClickDone);
iconDone.addEventListener('mouseover', handleIconDoneHover);
iconDone.addEventListener('mouseout', handleIconDoneLostHover);

done.addEventListener('click', handleClickDone);
done.addEventListener('mouseover', handleIconDoneHover);
done.addEventListener('mouseout', handleIconDoneLostHover);

newTodo.addEventListener('keydown', handleEnter);

stateAll.addEventListener('click', handleStateStatus);
stateActive.addEventListener('click', handleStateStatus);
stateCompleted.addEventListener('click', handleStateStatus);

clearCompleted.addEventListener('click', handleClickClearCompleted);

window.addEventListener('resize', handleResizeScreen);

function initTodoListFromStorage() {
  const todoListStorage = JSON.parse(window.localStorage.getItem("todoList"));
  if (todoListStorage) {
    todoListStorage.forEach((item) => createTodo(item));
    countUndoneItems();
  }
}

function handleResizeScreen() {
  const ulElems = ulList.querySelectorAll('.icon-cross');
  ulElems.forEach((elem) => {
    if (window.matchMedia("(max-width: 376px)").matches) {
      elem.classList.remove('disabled');
    } else {
      elem.classList.add('disabled');
    }
  }); 

  footerSectionTransfer();
  
  switchMobileStatusSection();
}

function footerSectionTransfer() {
  console.log('kuku');
  const stateFooter = footer.querySelector('.state');
  const mobileState = mobileSection.querySelector('.state');
  if (window.matchMedia("(max-width: 376px)").matches) {
    if (!mobileState) {
      mobileSection.append(stateFooter); 
    }
  } else if (!stateFooter) {
    footer.insertBefore(mobileState, footer.lastElementChild);
  }
}  

function switchMobileStatusSection() {
  if (window.matchMedia("(max-width: 376px)").matches && todoList.length) {
    mobileSection.style.display = 'block';
  } else {
    mobileSection.style.display = 'none';
  } 
}

function resetInitData() {
  newTodo.value = '';
  done.classList.remove('gradient');
  iconDone.classList.add('disabled');

  if (!todoList.length) {
    list.classList.add('disabled');
  } else {
    list.classList.remove('disabled');
  }
  
  footerSectionTransfer();
  switchMobileStatusSection();
}

function countUndoneItems() {
  const count = todoList.reduce((acc, todo) => {
    if (todo.done === false) {
      acc ++;
    }
    return acc;
  }, 0);

  countUndone.innerText = `${count} items left`;
}

function handleIconDoneHover(e) {
  done.style.borderColor = 'hsl(220, 98%, 61%)';
}

function handleIconDoneLostHover(e) {
  done.style.borderColor = '';
}  

function handleClickMode () { 
  document.body.classList.toggle('light_mode');
  document.body.classList.toggle('dark_mode'); 

  footer.classList.toggle('f-dark');
  stateStatus.classList.toggle('s-dark');  
  stateAll.classList.toggle('mode-dark');
  stateActive.classList.toggle('mode-dark');
  stateCompleted.classList.toggle('mode-dark');
  
  clearCompleted.classList.toggle('mode-dark');

  newTodoContainer.classList.toggle('text-dark');
  done.classList.toggle('item-dark');

  attribution.classList.toggle('attribution-dark');
  const links = document.querySelectorAll('a');
  links.forEach((link) => link.classList.toggle('attribution-dark'));

  const ulElems1 = ulList.querySelectorAll('.text-item');
  ulElems1.forEach((item) => {
    item.classList.toggle('li-dark');
    if (item.classList.contains('completed')) {
      item.classList.toggle('completed-dark');
    } 
  });

  const ulElems2 = ulList.querySelectorAll('.done-item');
  ulElems2.forEach((item) => item.classList.toggle('item-dark'));

  const ulElems3 = ulList.querySelectorAll('li');
  ulElems3.forEach((item) => item.classList.toggle('item-dark'));
  
  if (document.body.classList.contains('dark_mode')) {
    newTodo.style.backgroundColor = 'hsl(235, 24%, 19%)';
    newTodo.style.color = 'hsl(234, 39%, 85%)';
    mobileSection.style.backgroundColor = 'hsl(235, 24%, 19%)';
  } else {
    newTodo.style.backgroundColor = 'hsl(0, 0%, 98%)';
    newTodo.style.color = 'hsl(235, 19%, 35%)';
    mobileSection.style.backgroundColor = 'hsl(0, 0%, 98%)';
  }
  list.classList.toggle('text-dark');

  iconMoon.classList.toggle('disabled');
  iconSun.classList.toggle('disabled');  
}

function handleClickDone () { 
  done.classList.toggle('gradient'); 
  if (done.classList.contains('gradient')) {
    iconDone.classList.remove('disabled');  
  } else {
    iconDone.classList.add('disabled');
  }
}

function addToLocalStorage() {
  const storageData = JSON.parse(window.localStorage.getItem('todoList'));
  
  window.localStorage.setItem('todoList', JSON.stringify([...(storageData || []), {id:counter, done: done.classList.contains('gradient') ? true : false, text: newTodo.value }]));
}

function changeLocalStorage(todoList) {
  window.localStorage.setItem('todoList', JSON.stringify([...todoList]));
}

function handleEnter (event) {
  if (event.key === 'Enter') {
    if (newTodo.value) {
      addToLocalStorage();
      createTodo(); 
      resetInitData();
      switchMobileStatusSection();
      countUndoneItems();
      filterListItems(ulList.dataset.state);
    } else {
      alert('Enter todo text!');  
    } 
  }
}

function handleListItemHover() {
  const del = this.lastElementChild;
  del.classList.remove('disabled');
}

function handleListItemLostHover() {
  const del = this.lastElementChild;
  del.classList.add('disabled');
}

function changeStatusItemDone(elem) {
  const parentId = elem.parentElement.dataset.id;
  const textItem = elem.parentElement.querySelector('.text-item');

  const changeTodoList = todoList.map((item) => {
    if (item.id === Number(parentId)) {
      if (elem.classList.contains('gradient')) {
        item.done = true;
        textItem.classList.add('completed');
        if (document.body.classList.contains('dark_mode')) {
          textItem.classList.add('completed-dark');
        }
      } else {
        item.done = false;
        textItem.classList.remove('completed');
        if (document.body.classList.contains('dark_mode')) {
          textItem.classList.remove('completed-dark');
        }
      }      
    }
    return item;
  });

  todoList = [...changeTodoList];

  changeLocalStorage(todoList);

  countUndoneItems();

  filterListItems(ulList.dataset.state);
}

function checkTodoList() {
  if (!todoList.length) {
    list.classList.add('disabled');
  } 
  switchMobileStatusSection();
}

function handleListItemDelete() {
  const id = this.parentElement.dataset.id;
  
  const filterTodoList = todoList.filter((item) => item.id !== Number(id));
  todoList = [...filterTodoList];
      
  const elem = this.parentElement;
  elem.remove();

  changeLocalStorage(todoList);

  countUndoneItems();

  checkTodoList(); 
}

function handleDoneItemHover() {
  this.style.borderColor = 'hsl(220, 98%, 61%)';
}

function handleDoneItemLostHover() {
  this.style.borderColor = '';
}

function handleDoneItemClick() {
  this.classList.toggle('gradient');
  
  if (this.classList.contains('gradient')) {
    this.nextElementSibling.nextElementSibling.classList.remove('disabled');
  } else {
    this.nextElementSibling.nextElementSibling.classList.add('disabled');
  }

  changeStatusItemDone(this);
}

function handleIconDoneItemClick() {
  this.parentElement.firstChild.classList.toggle('gradient');

  if (this.parentElement.firstChild.classList.contains('gradient')) {
    this.classList.remove('disabled');  
  } else {
    this.classList.add('disabled');
  }
  changeStatusItemDone(this.previousElementSibling);
}

function handleIconDoneItemHover() {
  this.parentElement.firstElementChild.style.borderColor = 'hsl(220, 98%, 61%)';
}

function handleIconDoneItemLostHover() {
  this.parentElement.firstElementChild.style.borderColor = '';
}

function createTodo (todoItem = {}) {
  const todo = {};
  todo.id = todoItem.counter || counter;
  todo.done = todoItem.done || done.classList.contains('gradient') ? true : false;    
  todo.text = todoItem.text || newTodo.value;
  todoList.push(todo);

  const li = document.createElement('li');
  
  li.className = 'todo-item';
  if (document.body.classList.contains('dark_mode')) {
    li.className += ' item-dark';
  }

  li.dataset.id = todo.id;
  li.hidden = false;

  const text = document.createElement('span');
  text.innerText = todo.text;
  text.className = 'text-item';
  
  if (document.body.classList.contains('dark_mode')) {
    text.className += ' li-dark';
  }

  if (todo.done === true) {
    text.className += ' completed';
  }  

  if (document.body.classList.contains('dark_mode') && todo.done === true) {
    text.className += ' completed-dark';
  }

  li.append(text);

  const doneItemIcon = document.createElement('img');
  doneItemIcon.className = 'icon-done-item';
  if (todo.done === false) {
    doneItemIcon.className += ' disabled';
  }  
  doneItemIcon.src=iconCheck;
  doneItemIcon.alt='done icon';
  li.append(doneItemIcon);

  const doneItem = document.createElement('span');
  doneItem.className="done-item";
  if (todo.done === true) {
    doneItem.className += ' gradient';
  }  

  if (document.body.classList.contains('dark_mode')) {
    doneItem.className += ' item-dark';
  }

  li.prepend(doneItem);

  const del = document.createElement('img');
  del.className = 'icon-cross';
  if (window.matchMedia("(min-width: 377px)").matches) {
    del.className += ' disabled';
  }
  del.src = iconCross;
  del.alt="cross icon";

  li.append(del);

  doneItemIcon.addEventListener('click', handleIconDoneItemClick);
  doneItemIcon.addEventListener('mouseover', handleIconDoneItemHover);
  doneItemIcon.addEventListener('mouseout', handleIconDoneItemLostHover);

  doneItem.addEventListener('mouseover', handleDoneItemHover);
  doneItem.addEventListener('mouseout', handleDoneItemLostHover);

  doneItem.addEventListener('click', handleDoneItemClick);

  del.addEventListener('click', handleListItemDelete);

  li.addEventListener('mouseover', handleListItemHover);
  li.addEventListener('mouseout', handleListItemLostHover);
  
  ulList.append(li);

  counter ++; 
}

function filterListItems(state) {
  const items = ulList.querySelectorAll('li');

  items.forEach((item) => {
    const todoItem = todoList.find((todo) => Number(item.dataset.id) === todo.id);
    switch (state) {
      case 'active': 
        if (todoItem.done === false) {
          item.hidden = false;
        } else {
          item.hidden = true;
        }
        break;
      case 'completed': 
        if (todoItem.done === true) {
          item.hidden = false;
        } else {
          item.hidden = true;
        }
        break; 
      case 'all':  
        item.hidden = false;
        break;
      default:
        break;  
    }
  });
}

function handleStateStatus() {
  const states = Array.from(stateStatus.querySelectorAll('div'));
    
  const findState = states.find((state) => state.classList.contains('active-state'));
  if (findState.dataset.state !== this.dataset.state) {
    ulList.dataset.state = this.dataset.state;
    this.classList.add('active-state');
    findState.classList.remove('active-state');
  }
  filterListItems(this.dataset.state);
  
}

function handleClickClearCompleted() {
  todoList.forEach((todo) => {
    if (todo.done === true) {
      const li = ulList.querySelector('[data-id = "' + String(todo.id) + '"]');
      li.remove();
    }
  });
  const filterTodos = todoList.filter((todo) => todo.done === false);
  todoList = [...filterTodos];

  changeLocalStorage(todoList);

  checkTodoList(); 
}