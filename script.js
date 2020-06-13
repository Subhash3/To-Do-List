// DOM Elements
const tasksContainer = document.querySelector('.tasks_container')
const taskDoneButtons = document.querySelectorAll('.done input')
const editButtons = document.querySelectorAll('.edit i')
const addTaskForm = document.querySelector('form.add_task')
const addTaskButton = document.querySelector('.submit_new_task i')
const addTaskInput = document.querySelector('form.add_task input')

var tasks = [
    {
        id: 1,
        name: "Task 1",
        completed: false
    },
    {
        id: 2,
        name: "Task 2",
        completed: true
    },
    {
        id: 3,
        name: "Task 3",
        completed: false
    }
]

const clearTasks = () => {
    tasksContainer.innerHTML = ""
}

const renderTasks = () => {
    clearTasks()
    console.log(tasks)
    tasks.forEach(task => {
        let taskElement = document.createElement('div')
        taskElement.classList.add('task')
        taskElement.setAttribute('data-task-id', task.id)
        if (task.completed) {
            taskElement.classList.add('completed')
        }

        let nameElement = document.createElement('div')
        nameElement.classList.add('name')
        nameElement.innerText = task.name

        let editIconElement = document.createElement('div')
        editIconElement.classList.add('edit')
        editIconElement.innerHTML = `<i class="fa fa-pencil">`
        // editIconElement.addEventListener('click', editTask)

        let doneElement = document.createElement('div')
        doneElement.classList.add('done')
        doneElement.innerHTML = `<input type="checkbox" ${task.completed ? "checked" : ""}>`
        doneElement.addEventListener('click', toggleTaskCompleted)

        let deleteIconElement = document.createElement('div')
        deleteIconElement.classList.add('delete')
        deleteIconElement.innerHTML = `<i class="fa fa-trash">`
        deleteIconElement.addEventListener('click', deleteTask)

        taskElement.appendChild(nameElement)
        taskElement.appendChild(editIconElement)
        taskElement.appendChild(doneElement)
        taskElement.appendChild(deleteIconElement)

        tasksContainer.appendChild(taskElement)
    })
}

// Shamelessly copied from https://stackoverflow.com/questions/29017379/how-to-make-fadeout-effect-with-pure-javascript
const fadeOutEffect = (fadeTarget, callback) => {
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            callback()
        }
    }, 30);
}

const createUniqueID = (name) => {
    let dateObj = new Date()
    let milliseconds = dateObj.getTime()
    name = name.replaceAll(' ', '-')
    let id = name + milliseconds

    return id
}

// Create New Task
const createNewTask = (name) => {
    if (!name) {
        return
    }
    let taskID = createUniqueID(name)
    let newTask = {
        id: taskID,
        name: name,
        completed: false
    }

    tasks.push(newTask)
    renderTasks()
}

const toggleTaskCompleted = (event) => {
    let correspondingTaskElement = event.target.parentElement.parentElement
    let taskID = correspondingTaskElement.getAttribute('data-task-id')
    correspondingTaskElement.classList.toggle('completed')

    tasks.forEach(task => {
        if (task.id == taskID) {
            task.completed = !task.completed
            return
        }
    })
}

const deleteTask = (event) => {
    correspondingTaskElement = event.target.parentElement.parentElement
    let taskID = correspondingTaskElement.getAttribute('data-task-id')

    let newTasksArr = tasks.filter(task => {
        return task.id != taskID
    })
    tasks = newTasksArr
    fadeOutEffect(correspondingTaskElement, renderTasks)
}

renderTasks()

// Completed task
taskDoneButtons.forEach(button => {
    button.addEventListener('click', toggleTaskCompleted)
})

// Create New Task
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let taskName = addTaskInput.value
    createNewTask(taskName)
    addTaskInput.value = ""
})

// Submit Form
addTaskButton.addEventListener('click', (e) => {
    let taskName = addTaskInput.value
    createNewTask(taskName)
    addTaskInput.value = ""
})

// Edit task name
editButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        console.log(event.target.parentElement.parentElement)
    })
})