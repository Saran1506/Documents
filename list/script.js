const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const deadlineInput = document.getElementById('deadlineInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');

// Add Task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;
  const deadline = deadlineInput.value;

  if (!taskText) return alert('Please enter a task.');

  const li = document.createElement('li');
  li.classList.add(priority.toLowerCase());
  li.innerHTML = `
    <span>${taskText} <small>(${deadline || 'No Deadline'})</small></span>
    <div>
      <button class="complete-btn">✔️</button>
      <button class="delete-btn">❌</button>
    </div>
  `;

  taskList.appendChild(li);

  li.querySelector('.complete-btn').addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
  });

  taskInput.value = '';
  deadlineInput.value = '';
});

// Filter Tasks
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('#taskList li').forEach((li) => {
      if (filter === 'all' || li.classList.contains(filter.toLowerCase())) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    });
  });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
