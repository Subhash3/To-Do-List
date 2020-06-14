class ToDoList {
    constructor(listContainer) {
        this.listContainer = listContainer

        // DOM Elements
        this.tasksContainer = listContainer.querySelector('.tasks_container')
        this.taskDoneButtons = listContainer.querySelectorAll('.done input')
        this.editButtons = listContainer.querySelectorAll('.edit i')
        this.addTaskForm = listContainer.querySelector('form.add_task')
        this.addTaskButton = listContainer.querySelector('.submit_new_task i')
        this.addTaskInput = listContainer.querySelector('form.add_task input')


        this.tasks = [
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

        // Completed task
        this.taskDoneButtons.forEach(button => {
            button.addEventListener('click', this.toggleTaskCompleted)
        })

        // Create New Task
        this.addTaskForm.addEventListener('submit', (e) => {
            e.preventDefault()
            let taskName = this.addTaskInput.value
            this.createNewTask(taskName)
            this.addTaskInput.value = ""
        })

        // Submit Form
        this.addTaskButton.addEventListener('click', (e) => {
            let taskName = this.addTaskInput.value
            this.createNewTask(taskName)
            this.addTaskInput.value = ""
        })

        // Edit task name
        this.editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                console.log(event.target.parentElement.parentElement)
            })
        })
    }

    clearTasks = () => {
        this.tasksContainer.innerHTML = ""
    }

    renderTasks = () => {
        this.clearTasks()
        console.log(this.tasks)
        this.tasks.forEach(task => {
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
            doneElement.addEventListener('click', this.toggleTaskCompleted)

            let deleteIconElement = document.createElement('div')
            deleteIconElement.classList.add('delete')
            deleteIconElement.innerHTML = `<i class="fa fa-trash">`
            deleteIconElement.addEventListener('click', this.deleteTask)

            taskElement.appendChild(nameElement)
            taskElement.appendChild(editIconElement)
            taskElement.appendChild(doneElement)
            taskElement.appendChild(deleteIconElement)

            this.tasksContainer.appendChild(taskElement)
        })
    }


    // Shamelessly copied from https://stackoverflow.com/questions/29017379/how-to-make-fadeout-effect-with-pure-javascript
    fadeOutEffect = (fadeTarget, callback) => {
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

    createUniqueID = (name) => {
        let dateObj = new Date()
        let milliseconds = dateObj.getTime()
        name = name.replaceAll(' ', '-')
        let id = name + milliseconds

        return id
    }

    // Create New Task
    createNewTask = (name) => {
        if (!name) {
            return
        }
        let taskID = this.createUniqueID(name)
        let newTask = {
            id: taskID,
            name: name,
            completed: false
        }

        this.tasks.push(newTask)
        this.renderTasks()
    }

    toggleTaskCompleted = (event) => {
        let correspondingTaskElement = event.target.parentElement.parentElement
        let taskID = correspondingTaskElement.getAttribute('data-task-id')
        correspondingTaskElement.classList.toggle('completed')

        this.tasks.forEach(task => {
            if (task.id == taskID) {
                task.completed = !task.completed
                return
            }
        })
    }

    deleteTask = (event) => {
        let correspondingTaskElement = event.target.parentElement.parentElement
        let taskID = correspondingTaskElement.getAttribute('data-task-id')

        let newTasksArr = this.tasks.filter(task => {
            return task.id != taskID
        })
        this.tasks = newTasksArr
        this.fadeOutEffect(correspondingTaskElement, this.renderTasks)
    }
}

const createNewToDoList = (title, id) => {
    let container = document.createElement('div')
    container.classList.add('.container')
    container.id = "todo-" + id.toString()

    let titleElement = document.createElement('div')
    titleElement.classList.add('title')
    titleElement.innerText = title

    let tasksContainer = document.createElement('div')
    tasksContainer.classList.add('tasks_container')

    container.appendChild(titleElement)
    container.appendChild(tasksContainer)

    allTodoListContainers.appendChild(container)
}

let allTodoListContainers = document.querySelectorAll('.container')

let todoListObjects = []
allTodoListContainers.forEach(container => {
    todoListObj = new ToDoList(container)
    todoListObjects.push(todoListObj)
    todoListObj.renderTasks()
})