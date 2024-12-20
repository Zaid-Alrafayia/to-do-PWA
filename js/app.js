document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const reminderTime = document.getElementById('reminderTime');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Request Notification permission on load
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }

  addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    const reminder = reminderTime.value;

    if (task && reminder) {
      // Add the task to the list
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        ${task} (Reminder at ${reminder}) 
        <button class="btn btn-primary delete-btn bg-danger ms-auto">Delete</button>
      `;
      listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
      taskList.appendChild(listItem);

      // Schedule the notification
      scheduleNotification(task, reminder);

      // Clear input fields
      taskInput.value = '';
      reminderTime.value = '';
    } else {
      alert('Please enter a task and select a reminder time.');
    }
  });

  // Add event listener for delete buttons
  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      e.target.closest('li').remove(); // Remove the closest parent `<li>`
    }
  });

  function scheduleNotification(task, reminder) {
    // Calculate time difference
    const now = new Date();
    const [hours, minutes] = reminder.split(':');
    const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    const timeDifference = reminderTime - now;

    if (timeDifference > 0) {
      // Schedule the notification
      setTimeout(() => {
        showNotification(task);
      }, timeDifference);
    } else {
      alert('The reminder time must be in the future.');
    }
  }

  function showNotification(task) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Task Reminder', {
        body: `Don't forget to: ${task}`,
        icon: '/assets/imgs/to-do-list.png'
      });
    } else {
      alert(`Reminder: ${task}`);
    }
  }
});
