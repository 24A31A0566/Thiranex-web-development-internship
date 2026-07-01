let addButton= document.getElementById("add-task");
let input= document.getElementById("task");
let tasks=JSON.parse(localStorage.getItem("AllTasks"))||[];
let filters= document.getElementById("task-filter");
let currentState="all-tasks";
document.getElementById("all-tasks").classList.add("current");
isDataThere();
document.addEventListener("DOMContentLoaded", function(event){
    tasks.forEach(task => {
        displayTask(task);
    });
});
input.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        addButton.click();
    }
})
addButton.addEventListener("click",addTask);
let taskList= document.getElementById("tasks");
taskList.addEventListener("click",function(event){
    let task=event.target.closest("li");
    if(!task) return;
    let allTasksList= Array.from(taskList.children);
    let index=allTasksList.indexOf(task);
    if(event.target.classList.contains("task-done")){
        task.classList.toggle("completed");
        tasks[index].completed= !(tasks[index].completed);
    }
    if(event.target.classList.contains("task-edit")){
        let newName= prompt("enter task name:");
        if(!newName || !newName.trim()) return;
        let taskName=task.querySelector(".task-name");
        taskName.textContent= newName;
        tasks[index].name=newName;
    }
    if(event.target.classList.contains("task-del")){
        if(index !=-1){
            tasks.splice(index,1);
        }
        task.remove();
        isDataThere();
    }
    localStorage.setItem("AllTasks",JSON.stringify(tasks));
    document.getElementById(currentState).click();
});
function addTask() {
    let task=input.value.trim();
    if(!task) return;
    let taskData={
        name: task,
        completed: false
    }
    tasks.push(taskData);
    displayTask(taskData);
    input.value="";
    localStorage.setItem("AllTasks",JSON.stringify(tasks));
    isDataThere();
    document.getElementById(currentState).click();
}
function displayTask(taskData){
    let li=document.createElement("li");
    li.innerHTML=
    `<span class="task-name">${taskData.name}</span>
    <button class="task-done">done</button>
    <button class="task-edit">edit</button>
    <button class="task-del">delete</button>`;
    if(taskData.completed) li.classList.add("completed");
    document.getElementById("tasks").appendChild(li);
}
function isDataThere(){
    if(tasks.length===0){
        filters.hidden= true;
        document.getElementById("no-data").hidden=false;
    }
    else{
        filters.hidden= false;
        document.getElementById("no-data").hidden=true;
    }
}
filters.addEventListener("click",function(event){
    if(!event.target.id) return;
    let allTasksList= Array.from(taskList.children);
    document.getElementById(currentState).classList.remove("current");
    currentState=event.target.id;
    if(currentState==="all-tasks"){
        allTasksList.forEach(task => {
            task.hidden=false;
        });
    }
    if(currentState==="active-tasks"){
        allTasksList.forEach(task => {
            if(task.classList.contains("completed")){
                task.hidden=true;
            }
            else{
                task.hidden=false;
            }
        });
    }
    if(currentState==="completed-tasks"){
        allTasksList.forEach(task => {
            if(task.classList.contains("completed")){
                task.hidden=false;
            }
            else{
                task.hidden=true;
            }
        });
    }
    document.getElementById(currentState).classList.add("current");
});