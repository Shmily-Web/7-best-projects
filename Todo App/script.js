function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim(); // Trim whitespace

    // Check if task is empty
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Create a new task list item
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');

    // Create a span to hold the task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Complete Button
    const completeButton = document.createElement('button');
    completeButton.textContent = '○';
    completeButton.onclick = () => {
        taskSpan.classList.toggle('completed'); // Toggle 'completed' class
    };

    // Remove Button (optional)
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => {
        taskList.removeChild(listItem); // Remove task item
    };

    // Append task text and buttons to list item
    listItem.appendChild(completeButton);
    listItem.appendChild(taskSpan);
    listItem.appendChild(removeButton);

    // Append list item to task list
    taskList.appendChild(listItem);

    // Clear input after adding task
    taskInput.value = '';
}
