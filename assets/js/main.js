const todoInput=document.querySelector(".todoInput");
const todoBtn=document.querySelector(".todo-btn");
const todoList=document.querySelector(".todo-list");
const day=document.querySelector(".day");
const date=document.querySelector(".date");
const filtertodos=document.querySelector("#filter-todos");
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const d=new Date();


todoBtn.addEventListener("click",addToDo);
todoList.addEventListener("click", removeOrComplete);
filtertodos.addEventListener("click", filterToDos); 
document.addEventListener("DOMContentLoaded",gettodosFromLocalStorage);
document.addEventListener("DOMContentLoaded",getday);
document.addEventListener("DOMContentLoaded",getdate);
function getday() {
    day.innerText=weekday[d.getDay()];
}
function getdate() {
    const year=d.getFullYear();
    const months=month[d.getMonth()];

    const day=d.getDate();
    date.innerText=`${year} / ${months} / ${day}`;
}

function filterToDos(event) {
    let todos = todoList.childNodes;
    //console.log(todos);
    todos.forEach(function(todo){
        switch (event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
                
            case "completted":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";

                }
                else{
                    todo.style.display = "none";

                }

                break;
            case "uncompletted":
                if(todo.classList.contains("completed")){
                    todo.style.display = "none";

                }
                else{
                    todo.style.display = "flex";

                }
                break;

        }
        
    })
}

function checkIfEmpty(){

}
function addToDo(event){
    event.preventDefault();
    const todoText=document.createElement("p");

    const newToDo=document.createElement("li");
    
    if(todoInput.value !==""){
        todoText.innerText=todoInput.value; 
        savetoLocalStorage(todoInput.value);
    
        newToDo.appendChild(todoText); 
      //  console.log(newToDo);
    
        todoInput.value="";
    
        const btnContainer=document.createElement("div");
        btnContainer.classList.add("btn-container");
    
        const completeBtn=document.createElement("button");
        completeBtn.classList.add("complete-btn");
        completeBtn.innerHTML=`<i class="fa-solid fa-check"></i>`;
        btnContainer.appendChild(completeBtn);
    
        const trashBtn=document.createElement("button");
        trashBtn.classList.add("trash-btn");
        trashBtn.innerHTML=`<i class="fa-solid fa-trash-can"></i>`;
        btnContainer.appendChild(trashBtn);
        
        newToDo.appendChild(btnContainer);
    
        todoList.appendChild(newToDo);
    }
 
}

function removeOrComplete(event){
    const item=event.target;
    console.log(item)
    if(item.classList[1] === "fa-trash-can" || item.classList[0] === "trash-btn" ){

        if(item.classList[1] === "fa-trash-can"){
            const todo=item.parentElement.parentElement.parentElement;
            removeFromLocalStorage(todo);
            todo.remove();
        }
        else  {
            const todo=item.parentElement.parentElement;
            removeFromLocalStorage(todo);
            todo.remove();
        }
    }
    if(item.classList[1] === "fa-check" || item.classList[0] === "complete-btn" ){

        if(item.classList[1] === "fa-check"){
            const todo=item.parentElement.parentElement.parentElement;
            todo.classList.add("completed");
        }
        else  {
            const todo=item.parentElement.parentElement;
          //  console.log(todo.childNodes[1])
            todo.classList.add("completed");
                }
    }

}

function savetoLocalStorage(todo){
let todos;
if(localStorage.getItem("todos") === null){
    todos=[];
}
else{
    todos=JSON.parse(localStorage.getItem("todos"));
}
todos.push(todo);
localStorage.setItem("todos",JSON.stringify(todos));
}

function removeFromLocalStorage(todo){
let todos;
if(localStorage.getItem("todos") === null){
    todos=[];
}
else{
    todos=JSON.parse(localStorage.getItem("todos"));
}
const todoIndex=todo.children[0].innerText;
todos.splice(todos.indexOf(todoIndex), 1);
localStorage.setItem("todos",JSON.stringify(todos));

}
function gettodosFromLocalStorage (event){
    let todos;
if(localStorage.getItem("todos") === null){
    todos=[];
}
else{
    todos=JSON.parse(localStorage.getItem("todos"));
}
todos.forEach(function(todo){
    const todoText=document.createElement("p");

    const newToDo=document.createElement("li");
    todoText.innerText=todo; 
    newToDo.appendChild(todoText); 
  //  console.log(newToDo);
    const btnContainer=document.createElement("div");
    btnContainer.classList.add("btn-container");

    const completeBtn=document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML=`<i class="fa-solid fa-check"></i>`;
    btnContainer.appendChild(completeBtn);

    const trashBtn=document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML=`<i class="fa-solid fa-trash-can"></i>`;
    btnContainer.appendChild(trashBtn);
    
    newToDo.appendChild(btnContainer);

    todoList.appendChild(newToDo);

});
}