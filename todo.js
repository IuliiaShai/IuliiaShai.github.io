function onPageLoaded() {
  const input = document.querySelector("input[type='text']");
  const ul = document.querySelector("ul.todos");
  const saveButton = document.querySelector("button.save");
  const clearButton = document.querySelector("button.clear");
  const showTipsButton = document.querySelector("button.tipBtn");
  const closeTipsButton = document.querySelector("a.closebtn");
  const overlay = document.querySelector("#overlay");
  const pencil = document.querySelector("#pencil");

  saveButton.addEventListener("click", () => {
    localStorage.setItem("todos", ul.innerHTML);
  });

  clearButton.addEventListener("click", () => {
    ul.innerHTML = "";
    localStorage.removeItem("todos", ul.innerHTML);
    EverythingDone();
  });

  showTipsButton.addEventListener("click", () => {
    overlay.style.height = "100%";
  });

  closeTipsButton.addEventListener("click", () => {
    overlay.style.height = "0";
  });

  function createTodo() {
    const newTodo = input.value;
    const textSpan = document.createElement("span");
    if (input.value !== "") {
      textSpan.append(newTodo);
    } else return;
    const li = document.createElement("li");
    textSpan.classList.add("todo-text");

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("trash");
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash-alt");
    deleteBtn.appendChild(icon);

    const checkBtn = document.createElement("span");
    checkBtn.classList.add("check");
    const checkIcon = document.createElement("i");
    checkIcon.classList.add("fa", "fa-check");
    checkBtn.appendChild(checkIcon);
    checkIcon.addEventListener("click", () => {
      checkBtn.parentElement.classList.toggle("checked");
    });

    ul.appendChild(li).append(deleteBtn, textSpan, checkBtn);
    input.value = "";
    listenDeleteTodo(deleteBtn, checkBtn);
  }

  function onClickTodo(event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");
    }
  }

  function listenDeleteTodo(element) {
    element.addEventListener("click", (event) => {
      element.parentElement.remove();
      event.stopPropagation();
      EverythingDone();
    });
  }

  function loadTodos() {
    const data = localStorage.getItem("todos");
    if (data) {
      ul.innerHTML = data;
    } else {
      EverythingDone();
    }
    const deleteButtons = document.querySelectorAll("span.trash");
    for (const button of deleteButtons) {
      listenDeleteTodo(button);
    }

    const checkButtons = document.querySelectorAll("span.check");
    for (const button of checkButtons) {
      button.addEventListener("click", () => {
        button.parentElement.classList.toggle("checked");
      });
    }
  }

  loadTodos();

  pencil.addEventListener("click", () => {
    input.classList.toggle("display");
  });

  input.addEventListener("keypress", (keyPressed) => {
    const keyEnter = 13;
    if (keyPressed.which == keyEnter) {
      createTodo();
      EverythingDone();
    }
  });

  ul.addEventListener("click", onClickTodo);

  function EverythingDone() {
    const message = document.querySelector(".message");
    if (document.querySelector("ul.todos").firstElementChild == null) {
      message.textContent = "Hooray, everything is done!";
    } else {
      message.textContent = "";
    }
  }
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
