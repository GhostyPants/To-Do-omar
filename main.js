var taskNameInput = document.getElementById('taskName');
var taskDescriptionInput = document.getElementById('taskDescription');
var myForm = document.getElementById('myForm');

myForm.addEventListener('submit', saveTask);
myForm.addEventListener('submit', function(){
    verificarInput(taskNameInput);
    verificarInput(taskDescriptionInput);
})
taskNameInput.addEventListener('blur', function() {
    verificarInput(taskNameInput); 
});
taskDescriptionInput.addEventListener('blur', function() {
    verificarInput(taskDescriptionInput); 
});

function saveTask(e) {
    e.preventDefault();//Previene que se actualize la pagina por submit

    var taskNameValue = taskNameInput.value;
    var taskDescriptionValue = taskDescriptionInput.value;

    myForm.reset();
    
    if (!taskNameValue || !taskDescriptionValue){
        alert('Fill the form');
        return false;
    }

    var task = {
        name: taskNameValue,
        description: taskDescriptionValue
    }

    if (localStorage.getItem('Tasks') === null){
        var tasks = [];
        tasks.push(task);
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }else{
        var tasks = JSON.parse(localStorage.getItem('Tasks'));
        tasks.push(task);
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }

    fetchTasks();
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
                                                    '<button id="btnDelete" class="btn btn-success" onclick="deleteTask(\''+name+'\')">Complete</button>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>';
        }
    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function deleteTask(name) {
    tasks = JSON.parse(localStorage.getItem('Tasks'));
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].name == name){
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('Tasks', JSON.stringify(tasks));
    fetchTasks();
}

function verificarInput(elemento){
    var elementValue = elemento.value;

    if (elementValue){
        elemento.classList.add('active');
    }else {
        elemento.classList.remove('active');
    }

}