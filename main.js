/* SELEÇÃO DE ELEMENTOS  */

const todoForm = document.querySelector('#todo__form');
const todoInput = document.querySelector('#todo-input');
const editForm = document.querySelector('#edit__form');
const editInput = document.querySelector('#edit-input');
const btnCancel = document.querySelector('#cancel-edit-btn');
const todoList = document.querySelector('#todo-list');
const todoTitulos = JSON.parse(localStorage.getItem('item')) || [];

todoTitulos.forEach((text) =>{
    console.log(text)
    
})


let nameList;


/*   FUNÇÕES   */
/*  FUNÇÃO ANÔNIMA */
const saveTodo = (text) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-todo');
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
    
}


const toggleForms = () => {
    todoForm.classList.toggle('hide');
    editForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const atualizaTitle = (text) =>{
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector('h3');

        if(todoTitle.innerText === nameList){
            todoTitle.innerText = text;
        }
    })
}



/*    EVENTOS   */

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoValue = todoInput.value;

    if (todoValue) {
        saveTodo(todoValue);
    }

    const nomeAtual = [todoValue];

    todoTitulos.push(nomeAtual);

   
    localStorage.setItem('item', JSON.stringify(todoTitulos));


})
/*  CRIANDO EVENTO CLICK NO DOCUMENTO INTEIRO MAS BUSCANDO ONDE FOI CLICADO */
document.addEventListener('click', (e) => {

    const targetEl = e.target;//SELECIONA ONDE FOI CLICADO
    const parentEl = targetEl.closest('div');// SELECIONA O PAI MAIS PRÓXIMO

    let todoTitle;

    if(parentEl && parentEl.querySelector('h3')){
        todoTitle = parentEl.querySelector('h3').innerText;
    }

    if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done');
    }

    if (targetEl.classList.contains('remove-todo')) {
        parentEl.remove();//remove
    }

    if (targetEl.classList.contains('edit-todo')) {
        toggleForms();

        editInput.value = todoTitle;
        nameList = todoTitle;
        
    }
})

btnCancel.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
    
})


editForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const editInputValue = editInput.value;

    if(editInputValue){
        atualizaTitle(editInputValue);
    }
    
    toggleForms();
})