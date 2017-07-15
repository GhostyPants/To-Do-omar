document.getElementById('myForm').addEventListener('submit', saveTask);
document.getElementById()


function saveTask(e) {
    taskName = document.getElementById('taskName').value;
    taskDescription = document.getElementById('taskDescription').value;

    console.log(taskName);

    e.preventDefault();
}