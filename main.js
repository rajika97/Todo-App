window.addEventListener("load", () => {
  var todos = JSON.parse(localStorage.getItem("todos")) || [];

  const form = document.querySelector("#new-task-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.newTaskInput.value,
      createdAt: new Date().getTime(),
    };

    if (todo.content == "") {
      alert("Please fill out the task");
      return;
    }

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.reset();
    DisplayTodos();
  });
  DisplayTodos();
});

function DisplayTodos() {
  var todos = JSON.parse(localStorage.getItem("todos")) || [];
  const list_el = document.querySelector("#tasks");
  list_el.innerHTML = "";

  todos.forEach((todo) => {
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");
    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = todo.content;
    task_input_el.setAttribute("readonly", "readonly");

    const task_checkbox_el = document.createElement("input");
    task_checkbox_el.classList.add("check");
    task_checkbox_el.type = "checkbox";

    task_content_el.appendChild(task_checkbox_el);
    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "Delete";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    task_edit_el.addEventListener("click", (e) => {
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_edit_el.innerText = "Save";
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        task_input_el.addEventListener("blur", (e) => {
          task_input_el.setAttribute("readonly", true);
          todo.content = e.target.value;
          localStorage.setItem("todos", JSON.stringify(todos));
          DisplayTodos();
        });
      } else {
        task_edit_el.innerText = "Edit";
        task_input_el.setAttribute("readonly", "readonly");
      }
    });
    task_delete_el.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
}
