document.getElementById('myForm').addEventListener('submit', saveTask);

function saveTask(e) {
    var taskName = document.getElementById('taskName').value;
    var taskDescription = document.getElementById('taskDescription').value;

    var task = {
        name: taskName,
        description: taskDescription
    }

    if (localStorage.getItem('Tasks') === null){
        var tasks = [];
        tasks.push(task);
        localStorage.setItem('Tasks', JSON.stringify(tasks))
    }else{
        var tasks = JSON.parse(localStorage.getItem('Tasks'));
        tasks.push(task);
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }

    fetchTasks();
    e.preventDefault();
}

function fetchTasks(){
    var tasks = JSON.parse(localStorage.getItem('Tasks'));
    var tasksSubmited = document.getElementById('taskSubmited');

    tasksSubmited.innerHTML = '';
        for (var i = 0; i < tasks.length; i++) {
            var name = tasks[i].name;
            var description = tasks[i].description;

            tasksSubmited.innerHTML += '<div class="row">'+
                                        '<div class="col-lg-12">'+
                                                '<div class="well task">'+
                                                    '<h2>'+name+'</h2>'+
                                                    '<p>'+description+'</p>'+
                                                    '<button id="btnDelete" class="btn btn-success" onclick="deleteTask(\''+description+'\')">Complete</button>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'
        }
    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function deleteTask(description) {
    tasks = JSON.parse(localStorage.getItem('Tasks'));
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].description == description){
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('Tasks', JSON.stringify(tasks));
    fetchTasks();
}