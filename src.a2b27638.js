// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"images/icon-cross.svg":[function(require,module,exports) {
module.exports = "/icon-cross.861255e5.svg";
},{}],"images/icon-check.svg":[function(require,module,exports) {
module.exports = "/icon-check.72789738.svg";
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _iconCross = _interopRequireDefault(require("../images/icon-cross.svg"));
var _iconCheck = _interopRequireDefault(require("../images/icon-check.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var iconMoon = document.querySelector('.icon-moon');
var iconSun = document.querySelector('.icon-sun');
var done = document.querySelector('.done');
var iconDone = document.querySelector('.icon-done');
var countUndone = document.querySelector('.undone-quantity');
var list = document.querySelector('.list');
var ulList = document.querySelector('ul');
var newTodoContainer = document.querySelector('.newTodo');
var newTodo = document.querySelector('#new-todo');
var footer = document.querySelector('.footer');
var stateStatus = document.querySelector('.state');
var stateAll = document.querySelector('.all');
var stateActive = document.querySelector('.undone');
var stateCompleted = document.querySelector('.completed-items');
var clearCompleted = document.querySelector('.clear-completed');
var mobileSection = document.querySelector('.mobile');
var attribution = document.querySelector('.attribution');
var todoList = [];
var counter = 0;
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
  var todoListStorage = JSON.parse(window.localStorage.getItem("todoList"));
  if (todoListStorage) {
    todoListStorage.forEach(function (item) {
      return createTodo(item);
    });
    countUndoneItems();
  }
}
function handleResizeScreen() {
  var ulElems = ulList.querySelectorAll('.icon-cross');
  ulElems.forEach(function (elem) {
    if (window.matchMedia("(max-width: 375px)").matches) {
      elem.classList.remove('disabled');
    } else {
      elem.classList.add('disabled');
    }
  });
  footerSectionTransfer();
  switchMobileStatusSection();
}
function footerSectionTransfer() {
  var stateFooter = footer.querySelector('.state');
  var mobileState = mobileSection.querySelector('.state');
  if (window.matchMedia("(max-width: 375px)").matches) {
    if (!mobileState) {
      mobileSection.append(stateFooter);
    }
  } else if (!stateFooter) {
    footer.insertBefore(mobileState, footer.lastElementChild);
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
}
function switchMobileStatusSection() {
  if (window.matchMedia("(max-width: 375px)").matches && todoList.length) {
    mobileSection.style.display = 'block';
  } else {
    mobileSection.style.display = 'none';
  }
}
function countUndoneItems() {
  var count = todoList.reduce(function (acc, todo) {
    if (todo.done === false) {
      acc++;
    }
    return acc;
  }, 0);
  countUndone.innerText = "".concat(count, " items left");
}
function handleIconDoneHover(e) {
  done.style.borderColor = 'hsl(220, 98%, 61%)';
}
function handleIconDoneLostHover(e) {
  done.style.borderColor = '';
}
function handleClickMode() {
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
  var links = document.querySelectorAll('a');
  links.forEach(function (link) {
    return link.classList.toggle('attribution-dark');
  });
  var ulElems1 = ulList.querySelectorAll('.text-item');
  ulElems1.forEach(function (item) {
    item.classList.toggle('li-dark');
    if (item.classList.contains('completed')) {
      item.classList.toggle('completed-dark');
    }
  });
  var ulElems2 = ulList.querySelectorAll('.done-item');
  ulElems2.forEach(function (item) {
    return item.classList.toggle('item-dark');
  });
  var ulElems3 = ulList.querySelectorAll('li');
  ulElems3.forEach(function (item) {
    return item.classList.toggle('item-dark');
  });
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
function handleClickDone() {
  done.classList.toggle('gradient');
  if (done.classList.contains('gradient')) {
    iconDone.classList.remove('disabled');
  } else {
    iconDone.classList.add('disabled');
  }
}
function addToLocalStorage() {
  var storageData = JSON.parse(window.localStorage.getItem('todoList'));
  window.localStorage.setItem('todoList', JSON.stringify([].concat(_toConsumableArray(storageData || []), [{
    id: counter,
    done: done.classList.contains('gradient') ? true : false,
    text: newTodo.value
  }])));
}
function changeLocalStorage(todoList) {
  window.localStorage.setItem('todoList', JSON.stringify(_toConsumableArray(todoList)));
}
function handleEnter(event) {
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
  var del = this.lastElementChild;
  del.classList.remove('disabled');
}
function handleListItemLostHover() {
  var del = this.lastElementChild;
  del.classList.add('disabled');
}
function changeStatusItemDone(elem) {
  var parentId = elem.parentElement.dataset.id;
  var textItem = elem.parentElement.querySelector('.text-item');
  var changeTodoList = todoList.map(function (item) {
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
  todoList = _toConsumableArray(changeTodoList);
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
  var id = this.parentElement.dataset.id;
  var filterTodoList = todoList.filter(function (item) {
    return item.id !== Number(id);
  });
  todoList = _toConsumableArray(filterTodoList);
  var elem = this.parentElement;
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
function createTodo() {
  var todoItem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var todo = {};
  todo.id = todoItem.counter || counter;
  todo.done = todoItem.done || done.classList.contains('gradient') ? true : false;
  todo.text = todoItem.text || newTodo.value;
  todoList.push(todo);
  var li = document.createElement('li');
  li.className = 'todo-item';
  if (document.body.classList.contains('dark_mode')) {
    li.className += ' item-dark';
  }
  li.dataset.id = todo.id;
  li.hidden = false;
  var text = document.createElement('span');
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
  var doneItemIcon = document.createElement('img');
  doneItemIcon.className = 'icon-done-item';
  if (todo.done === false) {
    doneItemIcon.className += ' disabled';
  }
  doneItemIcon.src = _iconCheck.default;
  doneItemIcon.alt = 'done icon';
  li.append(doneItemIcon);
  var doneItem = document.createElement('span');
  doneItem.className = "done-item";
  if (todo.done === true) {
    doneItem.className += ' gradient';
  }
  if (document.body.classList.contains('dark_mode')) {
    doneItem.className += ' item-dark';
  }
  li.prepend(doneItem);
  var del = document.createElement('img');
  del.className = 'icon-cross';
  if (window.matchMedia("(min-width: 376px)").matches) {
    del.className += ' disabled';
  }
  del.src = _iconCross.default;
  del.alt = "cross icon";
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
  counter++;
}
function filterListItems(state) {
  var items = ulList.querySelectorAll('li');
  items.forEach(function (item) {
    var todoItem = todoList.find(function (todo) {
      return Number(item.dataset.id) === todo.id;
    });
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
  var states = Array.from(stateStatus.querySelectorAll('div'));
  var findState = states.find(function (state) {
    return state.classList.contains('active-state');
  });
  if (findState.dataset.state !== this.dataset.state) {
    ulList.dataset.state = this.dataset.state;
    this.classList.add('active-state');
    findState.classList.remove('active-state');
  }
  filterListItems(this.dataset.state);
}
function handleClickClearCompleted() {
  todoList.forEach(function (todo) {
    if (todo.done === true) {
      var li = ulList.querySelector('[data-id = "' + String(todo.id) + '"]');
      li.remove();
    }
  });
  var filterTodos = todoList.filter(function (todo) {
    return todo.done === false;
  });
  todoList = _toConsumableArray(filterTodos);
  changeLocalStorage(todoList);
  checkTodoList();
}
},{"../images/icon-cross.svg":"images/icon-cross.svg","../images/icon-check.svg":"images/icon-check.svg"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39617" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map