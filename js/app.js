const taskInput =document.getElementById("taskInput");
const addTaskButton =document.getElementById("addTaskButton");
const taskList =document.getElementById("taskList");
document.addEventListener('DOMContentLoaded', () => {
  addTaskBtn.addEventListener('click', () => {
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
  //remove task
  taskList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
      }
    });
    
  window.addEventListener('unload', () => {
      const tasks = Array.from(taskList.children).map(task => task.textContent.replace('Delete', '').trim());
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });

  window.addEventListener('load', () => {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.forEach(taskText => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          ${taskText}
          <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        `;
        taskList.appendChild(li);
      });
    });


  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/to-do-PWA/html/service-worker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
      })
    }
});
