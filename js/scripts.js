// Elements selection
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Functions
// essa função abaixo adiciona os elementos no ato de criação da tarefa
const saveTodo = (text, done = 0, save = 1) => {

    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)
    
    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    // Utilizando dados do Local Storage
    if(done) {
        todo.classList.add("done");
    }

    if(save) {
        saveTodoLocalStorage({text, done})
    }

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text

            updateTodoLocalStorage(oldInputValue, text)
        };
    });
}

const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");
    
        todos.forEach((todo) => {
            let todoTitle = todo.querySelector("h3").innerText.toLowerCase();
            const normalizedSearch = search.toLowerCase();

            todo.style.display = "flex";

            if (!todoTitle.includes(normalizedSearch)) {
                todo.style.display = "none"
            }
        })
}

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");
  
    switch (filterValue) {
      case "all":
        todos.forEach((todo) => (todo.style.display = "flex"));
  
        break;
  
      case "done":
        todos.forEach((todo) =>
          todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
        );
  
        break;
  
      case "todo":
        todos.forEach((todo) =>
          !todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
        );
  
        break;
  
      default:
        break;
    }
  };
  

// Events
todoForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const inputValue = todoInput.value; // armazena o valor no campo add your task

    if(inputValue) {
       saveTodo(inputValue)                 // save todo
    }
});

// Este trecho adiciona um event listener ao documento (a página HTML) que espera por cliques em qualquer lugar do documento. Quando ocorre um clique, a função definida como segundo argumento será executada. A função recebe o evento de clique (e) como parâmetro.
document.addEventListener("click", (e) => { 

    const targetEl = e.target; // e.target representa o elemento específico que foi clicado durante o evento. Este elemento é armazenado na constante targetEl.
    const parentEl = targetEl.closest("div"); // targetEl.closest("div") procura pelo ancestral mais próximo (ou seja, pai, avô, bisavô, etc.) do elemento targetEl que corresponda ao seletor especificado, neste caso, um elemento <div>. O elemento encontrado é armazenado na constante parentEl.
    let todoTitle;


    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")) { // Este bloco condicional verifica se o elemento clicado (targetEl) possui a classe CSS "finish-todo". Se possuir, o console irá imprimir "Clicou para finalizar".
        parentEl.classList.toggle("done");

        updateTodoStatusLocalStorage(todoTitle);
    }

    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove();

        removeTodoLocalStorage(todoTitle);
    }

    if(targetEl.classList.contains("edit-todo")) {
        toggleForms()

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms()
});

searchInput.addEventListener("keyup", (e) => {
    
    const search = e.target.value

    getSearchTodos(search);

});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});

// Local Storage 
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []

    return todos;
}

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage()

    todos.push(todo)
    
    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {

    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text !== todoText)

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoText ? (todo.done = !todo.done) : null
);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoOldText ? (todo.text = todoNewText) : null
);

    localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();