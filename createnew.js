function renden(todolist, ulid) {
  if (!Array.isArray(todolist) || todolist.length === 0) return;
  const elmUl = document.getElementById(ulid);
  if (!elmUl) return;

  for (const todo of todolist) {
    const elmLi = createTodo(todo);
    elmUl.appendChild(elmLi);
  }
}

function createTodo(todo) {
  if (!todo) return;
  const todotemplate = document.getElementById("todoTemplate");
  if (!todotemplate) return;

  const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);
  todoElement.dataset.id = todo.id;
  todoElement.dataset.status = todo.status;
  const divBt = todoElement.querySelector("button.btn");
  if (!divBt) return;

  const showbt = todo.status === "completed" ? "btn-success" : "btn-dark";
  divBt.classList.add(showbt);
  const contentbt = todo.status === "completed" ? "Reset" : "Finish";
  divBt.textContent = contentbt;
  const divtodo = todoElement.querySelector("div.todo");
  if (!divtodo) return null;

  const showBacks =
    todo.status === "completed" ? "alert-success" : "alert-secondary";
  divtodo.classList.remove("alert-secondary");
  divtodo.classList.add(showBacks);

  const todoTitleElement = todoElement.querySelector(".todo__title");
  if (todoTitleElement) todoTitleElement.textContent = todo.title;

  const finishE = todoElement.querySelector("button.mark-as-done");
  if (finishE) {
    finishE.addEventListener("click", () => {
      const thistautus = todoElement.dataset.status;
      const statuss = thistautus === "pending" ? "completed" : "pending";

      const todoList = getToDoList();
      const index = todoList.findIndex((x) => x.id === todo.id);
      todoList[index].status = statuss;
      localStorage.setItem("todo_list", JSON.stringify(todoList));
      todoElement.dataset.status = statuss;

      const newstatus =
        thistautus === "pending" ? "alert-success" : "alert-secondary";
      divtodo.classList.remove("alert-secondary", "alert-success");
      divtodo.classList.add(newstatus);

      const newbt = thistautus === "pending" ? "btn-success" : "btn-dark";
      divBt.classList.remove("btn-success", "btn-dark");
      divBt.classList.add(newbt);
      divBt.textContent = thistautus === "pending" ? "Reset" : "Finish";
    });
  }

  const removeE = todoElement.querySelector("button.remove");
  if (removeE) {
    removeE.addEventListener("click", () => {
      const todoList = getToDoList();
      const newtd = todoList.filter((x) => x.id !== todo.id);
      localStorage.setItem("todo_list", JSON.stringify(newtd));
      todoElement.remove();
    });
  }
  const editElm = todoElement.querySelector("button.edit");
  if (removeE) {
    editElm.addEventListener("click", () => {
      const todoList = getToDoList();
      const lasttodo = todoList.find((x) => x.id === todo.id);
      if (!lasttodo) return;
      editform(lasttodo);
    });
  }
  return todoElement;
}
function editform(todo) {
  const todoForm = document.getElementById("todoForm");
  if (!todoForm) return;
  todoForm.dataset.id = todo.id;

  const todoIp = document.getElementById("exampleInput");
  if (!todoIp) return;
  todoIp.value = todo.title;
}
function getToDoList() {
  try {
    return JSON.parse(localStorage.getItem("todo_list"));
  } catch {
    return [];
  }
}

function handlerform(event) {
  event.preventDefault();
  const todoForm = document.getElementById("todoForm");
  if (!todoForm) return;

  const todoIp = document.getElementById("exampleInput");
  if (!todoIp) return null;

  const checkbox = document.getElementById("flexCheckDefault");
  const inputcheck = checkbox.checked === true ? "completed" : "pending";

  const edit = Boolean(todoForm.dataset.id);
  if (edit) {
    const getlist = getToDoList();
    const index = getlist.findIndex(
      (item) => item.id.toString() === todoForm.dataset.id
    );

    if (index < 0) return;
    getlist[index].title = todoIp.value;
    getlist[index].status = inputcheck;
    localStorage.setItem("todo_list", JSON.stringify(getlist));

    const liElm = document.querySelector(
      `#todolist > li[data-id = "${todoForm.dataset.id}"]`
    );

    if (liElm) {
      const divBt = liElm.querySelector("button.btn");
      const currendiv = liElm.querySelector("div.todo");
      const todoTitleElement = liElm.querySelector(".todo__title");
      if (todoTitleElement) todoTitleElement.textContent = todoIp.value;
      liElm.dataset.status = inputcheck;
      const newstatus =
        inputcheck === "pending" ? "alert-secondary" : "alert-success";
      currendiv.classList.remove("alert-secondary", "alert-success");
      currendiv.classList.add(newstatus);
      const newbt = inputcheck === "pending" ? "btn-dark" : "btn-success";
      divBt.classList.remove("btn-success", "btn-dark");
      divBt.classList.add(newbt);
      divBt.textContent = inputcheck === "pending" ? "Finish" : "Reset";
    }
  } else {
    const newtodo = {
      id: Date.now(),
      title: todoIp.value,
      status: inputcheck,
    };

    const todolist = getToDoList();
    todolist.push(newtodo);
    localStorage.setItem("todo_list", JSON.stringify(todolist));

    const newLiElm = createTodo(newtodo);
    const newUL = document.getElementById("todolist");
    if (!newUL) return null;
    newUL.appendChild(newLiElm);
  }
  delete todoForm.dataset.id;
  todoForm.reset();
}
(() => {
  // const todoList = [
  //   { id: 2, title: "Lorem Ipsum", status: "completed" },
  //   { id: 1, title: "The Third Man", status: "pending" },
  //   { id: 3, title: "Lawrence of Arabia", status: "pending" },
  // ];
  const todoList = getToDoList();
  renden(todoList, "todolist");
  const todoform = document.getElementById("todoForm");
  if (todoform) {
    todoform.addEventListener("submit", handlerform);
  }
})();
