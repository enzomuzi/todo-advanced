// Elements selection
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

// Functions
// essa função abaixo adiciona os elementos no ato de criação da tarefa
const saveTodo = (text) => {

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

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

}
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
    
    if(targetEl.classList.contains("finish-todo")) { // Este bloco condicional verifica se o elemento clicado (targetEl) possui a classe CSS "finish-todo". Se possuir, o console irá imprimir "Clicou para finalizar".
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")) {
        
    }
})