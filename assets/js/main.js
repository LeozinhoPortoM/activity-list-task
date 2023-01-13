const inputTask = document.querySelector(".input-new-task");
const btnTask = document.querySelector(".btn-add-task");
const tasks = document.querySelector(".tasks");

const createTask = (text) => {
  const li = document.createElement("li");
  li.innerHTML += text;
  tasks.appendChild(li);
  cleanInput();
  createBtnDelete(li);
  saveTasks();
};

const cleanInput = () => {
  inputTask.value = "";
  inputTask.focus();
};

const createBtnDelete = (li) => {
  li.innerText += " ";
  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Delete";
  btnDelete.setAttribute("class", "apagar");
  li.appendChild(btnDelete);
};

const saveTasks = () => {
  const liTask = tasks.querySelectorAll("li");
  const listTasks = [];

  for (let task of liTask) {
    let taskText = task.innerText;
    taskText = taskText.replace("Delete", "").trim();
    listTasks.push(taskText);
  }
  const taskJson = JSON.stringify(listTasks);

  localStorage.setItem("tasks", taskJson);
};

const addSaveTasks = () => {
  const tasks = localStorage.getItem("tasks");
  const listTasks = JSON.parse(tasks);

  for (let task of listTasks) {
    createTask(task);
  }
};

inputTask.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (!inputTask.value) return;
    createTask(inputTask.value);
    cleanInput();
  }
});

btnTask.addEventListener("click", () => {
  if (!inputTask.value) return;
  createTask(inputTask.value);
  cleanInput();
});

document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
    saveTasks();
  }
});

addSaveTasks();
