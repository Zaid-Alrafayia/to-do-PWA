const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

document.addEventListener('DOMContentLoaded', () => {
  // Load tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.forEach(taskText => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <input class="" type="checkbox" disabled>
      ${taskText}
      <button class="btn btn-danger btn-sm delete-btn">Delete</button>
    `;
    taskList.appendChild(li);
  });

  // Add new task
  addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <input class="" type="checkbox" disabled>
        ${taskText}
        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
      `;
      taskList.appendChild(li);
      taskInput.value = '';
    }
  });

  // Remove task
  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      e.target.parentElement.remove();
    }
  });

  // Save tasks to localStorage before the window unloads
  window.addEventListener('unload', () => {
    const tasks = Array.from(taskList.children).map(task => 
      task.querySelector('input[type="checkbox"]').disabled ? task.textContent.replace('Delete', '').trim() : ""
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  // Register service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/to-do-PWA/html/service-worker.js")
      .then(() => console.log("Service worker registered"))
      .catch(err => console.log("Service worker not registered", err));
  }
});
