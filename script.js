var SELECTED_LIST_ID = null
var editTargetType = null // Could be task or list

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
const allToDoListElementsContainer = document.querySelector('.all-todo-lists')
const listNamesContainer = document.querySelector('.list-of-lists')

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

const editNameBox = document.querySelector('.edit-name-box')
const editNameInput = editNameBox.querySelector('input')
const submitEditName = document.querySelector('.edit-submit-btn')

const clearListTasksContainer = () => {
    listTitle.innerText = "List of Tasks Go here.."
    todoListTasksContainer.innerHTML = ""
}

const selectedListIndex = () => {
    let j = 0
    for (j = 0; j < totalNumberOfLists; j++) {
        if (toDoLists[j].id == SELECTED_LIST_ID) {
            return j
        }
    }
}

const listIDtoIndex = (listID) => {
    // if(listID == SELECTED_LIST_ID){
    //     return selectedListIndex()
    // }

    for (let i = 0; i < totalNumberOfLists; i++) {
        if (toDoLists[i].id == listID) {
            return i
        }
    }
}

const enableErrorPopup = () => {
    listNamesContainer.classList.add('error-popup')
}

const disableErrorPopup = () => {
    listNamesContainer.classList.remove('error-popup')
}

const disableClicks = (element) => {
    element.style.pointerEvents = 'none'
    element.style.opacity = 0.6
}

const enableClicks = (element) => {
    element.style.pointerEvents = 'all'
    element.style.opacity = 1
}

const highlightSelectedList = () => {
    let allToDoListElements = document.querySelectorAll('.list')

    for (let i = 0; i < totalNumberOfLists; i++) {
        listElement = allToDoListElements[i]
        listElement.classList.remove("selected-list")
    }

    let index = selectedListIndex()
    if (index === undefined) return

    console.log("Selected list index:", index)
    selectedListElement = allToDoListElements[index]
    selectedListElement.classList.add('selected-list')
}

const createUniqueID = (name) => {
    let dateObj = new Date()
    let milliseconds = dateObj.getTime()
    // name = name.replaceAll(' ', '-')
    name = name.replace(/[ ]/g, "-")
    let id = name + milliseconds

    return id
}

const createNewTask = (taskName) => {
    if (SELECTED_LIST_ID == null) {
        enableErrorPopup()
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
        id: createUniqueID('task-'),
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
    editIcon.addEventListener('click', editName)

    let doneElement = document.createElement('div')
    doneElement.classList.add('done')
    doneElement.innerHTML = `<input type="checkbox" name="complete-box" ${completed}/>`
    doneElement.addEventListener('click', toggleTaskCompleted)


    let deleteIcon = document.createElement('div')
    deleteIcon.classList.add('delete')
    deleteIcon.innerHTML = `<i class="fa fa-trash"></i>`
    deleteIcon.addEventListener('click', deleteTask)


    taskElement.appendChild(nameElement)
    taskElement.appendChild(editIcon)
    taskElement.appendChild(doneElement)
    taskElement.appendChild(deleteIcon)

    return taskElement
}

const renderTasks = () => {
    // console.log("Rendering tasks of list: " + SELECTED_LIST_ID)
    clearListTasksContainer()
    if (SELECTED_LIST_ID == null) {
        return
    }

    let title = ""
    for (let i = 0; i < totalNumberOfLists; i++) {
        listObject = listObjects[i]
        if (listObject.listId == SELECTED_LIST_ID) {
            title = toDoLists[i].name
            break
        }
    }

    listTitle.innerText = title

    for (var i = 0; i < listObject.taskCount; i++) {
        task = listObject.tasks[i]
        let taskElement = createTaskTemplate(task.id, task.name, task.completed)
        todoListTasksContainer.appendChild(taskElement)
    }
}

const renderListTasks = (e) => {
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

    highlightSelectedList()

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

        let editIcon = document.createElement('div')
        editIcon.classList.add('edit')
        editIcon.innerHTML = `<i class="fa fa-pencil"></i>`
        editIcon.addEventListener('click', editName)

        let deleteIcon = document.createElement('div')
        deleteIcon.classList.add('delete')
        deleteIcon.innerHTML = `<i class="fa fa-trash">`
        deleteIcon.addEventListener('click', deleteEntireList)

        listItem.appendChild(nameElement)
        listItem.appendChild(editIcon)
        listItem.appendChild(deleteIcon)

        listsContainer.appendChild(listItem)
    })
    highlightSelectedList()
}

const createNewList = (name) => {
    if (!name) {
        return
    }
    totalNumberOfLists++
    id = createUniqueID('list-')

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

const toggleTaskCompleted = (event) => {
    let correspondingTaskElement = event.target.parentElement.parentElement
    let taskID = correspondingTaskElement.getAttribute('task-id')
    correspondingTaskElement.classList.toggle('completed')

    let index = selectedListIndex()

    listObjects[index].tasks.forEach(task => {
        if (task.id == taskID) {
            task.completed = !task.completed
        }
    })
}

const deleteEntireList = (e) => {
    let = correspondingListElement = e.target.parentElement.parentElement
    let listID = correspondingListElement.id

    let listIndex = listIDtoIndex(listID)
    console.log(listIndex)

    console.log(toDoLists)
    console.log(listObjects)

    if (listIndex == 0) {
        toDoLists.shift()
        listObjects.shift()
    } else {
        toDoLists.splice(listIndex, listIndex)
        listObjects.splice(listIndex, listIndex)
    }
    totalNumberOfLists -= 1
    SELECTED_LIST_ID = null

    console.log(toDoLists)
    console.log(listObjects)
    fadeOutEffect(correspondingListElement, renderListNames)
    renderTasks()
}

const deleteTask = (e) => {
    let correspondingTaskElement = e.target.parentElement.parentElement
    let index = selectedListIndex()

    let taskID = correspondingTaskElement.getAttribute('task-id')

    console.log("Deleting " + taskID + " From the List-" + (index + 1))

    let listObject = listObjects[index]
    let filteredTasks = []
    for (let i = 0; i < listObject.taskCount; i++) {
        if (listObject.tasks[i].id != taskID) {
            filteredTasks.push(listObject.tasks[i])
        }
    }

    listObjects[index].tasks = filteredTasks
    listObjects[index].taskCount -= 1

    fadeOutEffect(correspondingTaskElement, renderTasks)
}

const editName = (e) => {
    let targetElement = e.target.parentElement.parentElement
    if (targetElement.classList.contains("task")) {
        let taskID = targetElement.getAttribute("task-id")
        editTargetType = {
            targetType: "task",
            taskID: taskID
        }

    }
    else if (targetElement.classList.contains("list")) {
        editTargetType = "list"
        listID = targetElement.id
        editTargetType = {
            targetType: "list",
            listID: listID
        }
    }

    let currentName = targetElement.querySelector('.name').innerText
    editNameInput.value = currentName
    // console.log(currentName)

    // console.log(editTargetType)
    disableClicks(allToDoListElementsContainer)
    editNameBox.classList.add('active')
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

// Disable Error popup
window.addEventListener('click', (e) => {
    if (!e.target.classList.contains('error-popup')) {
        disableErrorPopup()
    }
})

// Close edit popup
submitEditName.addEventListener('click', (e) => {
    editNameBox.classList.remove('active')
    enableClicks(allToDoListElementsContainer)

    if (editTargetType.targetType == "list") {
        let listID = editTargetType.listID
        let listIndex = listIDtoIndex(listID)
        toDoLists[listIndex].name = editNameInput.value
    } else if (editTargetType.targetType == "task") {
        let taskID = editTargetType.taskID
        let index = selectedListIndex()
        let listObj = listObjects[index]
        let taskIndex = 0

        for (let i = 0; i < listObj.taskCount; i++) {
            if (listObj.tasks[i].id == taskID) {
                taskIndex = i
                break
            }
        }

        listObjects[index].tasks[taskIndex].name = editNameInput.value
    }

    renderListNames()
    renderTasks()
})

// createNewList("Nice")
// createNewList("Not Nice")
renderListNames()