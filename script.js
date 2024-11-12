// Fetch and display tasks on page load
document.addEventListener('DOMContentLoaded', fetchTasks);

let tasks = []; // Global array to store tasks

// Function to fetch tasks from the backend
async function fetchTasks() {
  const response = await fetch('/tasks', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  tasks = await response.json();
  displayTasks(tasks);
}

// Function to create a new task
async function createTask() {
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-description').value;
  const deadline = document.getElementById('task-deadline').value;
  const priority = document.getElementById('task-priority').value;

  await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ title, description, deadline, priority })
  });

  fetchTasks(); // Refresh task list
}

// Function to display tasks
function displayTasks(taskList) {
  const taskContainer = document.getElementById('task-list');
  taskContainer.innerHTML = '';

  taskList.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <h3>${task.title} (${task.priority})</h3>
      <p>${task.description}</p>
      <p>Deadline: ${task.deadline}</p>
    `;
    taskContainer.appendChild(taskItem);
  });
}

// Sorting tasks by priority or deadline
function sortTasks() {
  const sortBy = document.getElementById('sort-by').value;

  let sortedTasks = [...tasks];
  if (sortBy === 'priority') {
    sortedTasks.sort((a, b) => {
      const priorities = { low: 1, medium: 2, high: 3 };
      return priorities[b.priority] - priorities[a.priority];
    });
  } else if (sortBy === 'deadline-asc') {
    sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  } else if (sortBy === 'deadline-desc') {
    sortedTasks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
  }

  displayTasks(sortedTasks);
}

// Filtering tasks by priority
function filterTasks() {
  const searchKeyword = document.getElementById('search-bar').value.toLowerCase();
  const filterPriority = document.getElementById('filter-priority').value;

  let filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchKeyword) || task.description.toLowerCase().includes(searchKeyword);
    const matchesPriority = filterPriority ? task.priority === filterPriority : true;
    return matchesSearch && matchesPriority;
  });

  displayTasks(filteredTasks);
}
