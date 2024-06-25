let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const pendingTasks = document.getElementById('pending-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    pendingTasks.innerHTML = '';
    completedTasks.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                ${!task.completed ? `<button class="complete" onclick="completeTask(${index})">Complete</button>` : ''}
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        if (task.completed) {
            completedTasks.appendChild(taskItem);
        } else {
            pendingTasks.appendChild(taskItem);
        }
    });
}

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        newTaskInput.value = '';
        updateLocalStorage();
        renderTasks();
    }
}

function completeTask(index) {
    tasks[index].completed = true;
    updateLocalStorage();
    renderTasks();
}

function editTask(index) {
    const newTaskText = prompt("Edit your task:", tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText.trim();
        updateLocalStorage();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

document.addEventListener('DOMContentLoaded', renderTasks);
