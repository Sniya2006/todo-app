let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.onchange = () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    };

    let span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    let delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value === "") return;

  tasks.push({ text: input.value, completed: false });
  input.value = "";

  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAll() {
  tasks = [];
  saveTasks();
  renderTasks();
}

// load tasks when page opens
renderTasks();
