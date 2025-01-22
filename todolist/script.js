// Select elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// Add a new task
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('⚠Please enter a task!');
        return;
    }

    // Create task element
    const taskItem = document.createElement('li');
    taskItem.className = 'task';
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button>Delete</button>
    `;

    // Add delete functionality
    taskItem.querySelector('button').addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });

    // Append the task to the list
    taskList.appendChild(taskItem);

    // Clear the input field
    taskInput.value = '';
});
