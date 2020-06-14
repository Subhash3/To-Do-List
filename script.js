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

var taskObjects = [
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
// const allToDoLists = document.querySelectorAll('.list')

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

    taskObjects.forEach(taskObject => {
        if (taskObject.listId == listId) {
            console.log(taskObject)
            return
        }
    })
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

    taskObject = {
        listId: id,
        taskCount: 0,
        tasks: []
    }

    taskObjects.push(taskObject)

    renderListNames()
}

// Create New Task
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

createNewList("Nice")
createNewList("Not Nice")