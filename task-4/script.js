const addBtn = document.getElementById('addBtn');
const modal = document.getElementById('modal');
const saveTask = document.getElementById('saveTask');
const taskInput = document.getElementById('taskInput');
const taskTime = document.getElementById('taskTime');
const taskContainer = document.getElementById('taskContainer');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskContainer.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task ${task.completed ? 'completed' : ''}`;
    taskDiv.innerHTML = `
      <div class="left">
        <strong>${task.title}</strong><br/>
        <small>${task.time}</small>
      </div>
      <div class="right">
        <button onclick="toggleComplete(${index})">✔️</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskContainer.appendChild(taskDiv);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveToStorage();
  renderTasks();
}

function editTask(index) {
  taskInput.value = tasks[index].title;
  taskTime.value = tasks[index].time;
  modal.style.display = 'flex';

  saveTask.onclick = () => {
    tasks[index].title = taskInput.value;
    tasks[index].time = taskTime.value;
    saveToStorage();
    modal.style.display = 'none';
    renderTasks();
  };
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveToStorage();
  renderTasks();
}

addBtn.onclick = () => {
  modal.style.display = 'flex';
  taskInput.value = '';
  taskTime.value = '';
  saveTask.onclick = () => {
    const newTask = {
      title: taskInput.value,
      time: taskTime.value,
      completed: false
    };
    tasks.push(newTask);
    saveToStorage();
    modal.style.display = 'none';
    renderTasks();
  };
};

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = 'none';
};

renderTasks();
