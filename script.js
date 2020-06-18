var SELECTED_LIST_ID = null

var toDoLists = [
    {
        id: '1',
        name: 'Shopping List'
    },
    {
        id: '2',
        name: 'Places to Visit'
    }
]

var totalNumberOfLists = 2

var listObjects = [
    {
        listId: '1',
        taskCount: 2,
        tasks: [
            {
                id: 'task-1',
                name: 'Shirt',
                completed: false
            },
            {
                id: 'task-2',
                name: 'Backpack',
                completed: false
            }
        ]
    },
    {
        listId: '2',
        taskCount: 2,
        tasks: [
            {
                id: 'task-1',
                name: 'UOH',
                completed: false
            },
            {
                id: 'task-2',
                name: '108',
                completed: false
            }
        ]
    },
]

// DOM elements
const listsContainer = document.querySelector('.lists-container')
const addListFrom = document.querySelector('.add_new_list')
const addListInput = document.querySelector('.new_list_name')
const addListButton = document.querySelector('.submit_new_list')

const todoListContainer = document.querySelector('.container')
const listTitle = todoListContainer.querySelector('.title')
const todoListTasksContainer = todoListContainer.querySelector('.tasks_container')
const addTaskFrom = todoListContainer.querySelector('.add_task')
const addTaskButton = todoListContainer.querySelector('.submit_new_task')
const addTaskInput = todoListContainer.querySelector('.new_task_name')

const clearListTasksContainer = () => {
    todoListTasksContainer.innerHTML = ""
}

const createNewTask = (taskName) => {
    if (SELECTED_LIST_ID == null) {
        alert("Please select a list!")
        return
    }
    let i = 0;
    for (i = 0; i < totalNumberOfLists; i++) {
        listObject = listObjects[i]
        if (listObject.listId == SELECTED_LIST_ID) {
            break
        }
    }

    listObjects[i].taskCount += 1

    let newTask = {
        id: 'task-' + listObjects[i].taskCount.toString(),
        name: taskName,
        completed: false
    }
    listObjects[i].tasks.push(newTask)

    renderTasks()
}

const createTaskTemplate = (taskId, taskName, completed) => {
    let taskElement = document.createElement('div')
    taskElement.classList.add('task')
    taskElement.setAttribute('task-id', taskId)

    let nameElement = document.createElement('div')
    nameElement.classList.add('name')
    nameElement.innerText = taskName

    let editIcon = document.createElement('div')
    editIcon.classList.add('edit')
    editIcon.innerHTML = `<i class="fa fa-pencil"></i>`

    let doneElement = document.createElement('div')
    doneElement.classList.add('done')
    doneElement.innerHTML = `<input type="checkbox" name="complete-box" ${completed}/>`
    doneElement.addEventListener('click', toggleTaskCompleted)


    let deleteIcon = document.createElement('div')
    deleteIcon.classList.add('delete')
    deleteIcon.innerHTML = `<i class="fa fa-trash"></i>`

    taskElement.appendChild(nameElement)
    taskElement.appendChild(editIcon)
    taskElement.appendChild(doneElement)
    taskElement.appendChild(deleteIcon)

    return taskElement
}

const renderTasks = () => {
    // console.log("Rendering tasks of list: " + SELECTED_LIST_ID)
    let title = ""
    for (let i = 0; i < totalNumberOfLists; i++) {
        listObject = listObjects[i]
        if (listObject.listId == SELECTED_LIST_ID) {
            title = toDoLists[i].name
            break
        }
    }

    listTitle.innerText = title

    clearListTasksContainer()

    for (var i = 0; i < listObject.taskCount; i++) {
        task = listObject.tasks[i]
        let taskElement = createTaskTemplate(task.id, task.name, task.completed)
        todoListTasksContainer.appendChild(taskElement)
    }
}

const renderListTasks = (e) => {
    let allToDoListElements = document.querySelectorAll('.list')
    // console.log(allToDoListElements)

    let targetElement = e.target
    let tagName = targetElement.tagName

    if (tagName === "I") {
        return
    }

    if (targetElement.classList.contains('name')) {
        var listId = targetElement.parentElement.id
    } else {
        var listId = targetElement.id
    }

    if (SELECTED_LIST_ID == listId) {
        // console.log("Same list is rendered!")
        return
    }
    SELECTED_LIST_ID = listId

    for (let i = 0; i < totalNumberOfLists; i++) {
        listElement = allToDoListElements[i]
        listElement.classList.remove("selected-list")
    }

    let i = parseInt(SELECTED_LIST_ID) - 1
    selectedListElement = allToDoListElements[i]
    selectedListElement.classList.toggle('selected-list')

    renderTasks()
}

const clearListNames = () => {
    listsContainer.innerHTML = ''
}

const renderListNames = () => {
    clearListNames()

    toDoLists.forEach(list => {
        let listItem = document.createElement('div')
        listItem.classList.add('list')
        listItem.id = list.id

        listItem.addEventListener('click', renderListTasks)

        let nameElement = document.createElement('div')
        nameElement.classList.add('name')
        nameElement.innerText = list.name

        let eidtIcon = document.createElement('div')
        eidtIcon.classList.add('edit')
        eidtIcon.innerHTML = `<i class="fa fa-pencil"></i>`

        let deleteIcon = document.createElement('div')
        deleteIcon.classList.add('delete')
        deleteIcon.innerHTML = `<i class="fa fa-trash">`

        listItem.appendChild(nameElement)
        listItem.appendChild(eidtIcon)
        listItem.appendChild(deleteIcon)

        listsContainer.appendChild(listItem)
    })
}

const createNewList = (name) => {
    if (!name) {
        return
    }
    totalNumberOfLists++
    id = totalNumberOfLists.toString()

    let listItem = {
        id: id,
        name: name
    }

    toDoLists.push(listItem)
    // console.log(toDoLists)

    listObject = {
        listId: id,
        taskCount: 0,
        tasks: []
    }

    listObjects.push(listObject)

    renderListNames()
}

// Create New List
addListFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    let listName = addListInput.value
    createNewList(listName)
    addListInput.value = ""
})

// Submit Form
addListButton.addEventListener('click', (e) => {
    let listName = addListInput.value
    createNewList(listName)
    addListInput.value = ""
})

// Create New Task
addTaskFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    let taskName = addTaskInput.value
    createNewTask(taskName)
    addTaskInput.value = ""
    // console.log(taskName)
})

// Submit Form
addTaskButton.addEventListener('click', (e) => {
    let taskName = addTaskInput.value
    createNewTask(taskName)
    addTaskInput.value = ""
    console.log(taskName)
})
const toggleTaskCompleted = (event) => {
    let correspondingTaskElement = event.target.parentElement.parentElement
    let taskID = correspondingTaskElement.getAttribute('task-id')
    correspondingTaskElement.classList.toggle('completed')

    let i = parseInt(SELECTED_LIST_ID) - 1
    listObjects[i].tasks.forEach(task => {
        if (task.id == taskID) {
            task.completed = !task.completed
        }
    })
}

// createNewList("Nice")
// createNewList("Not Nice")
renderListNames()