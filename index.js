// "domcontentloaded isliye kyuki jaise hi page load ho waise hi contain dikhne ko hona"
document.addEventListener("DOMContentLoaded",()=>{
    let todoinput = document.getElementById("to-do-input");
    let addtaskbtn = document.getElementById("add-task-btn");
    let todo_list = document.getElementById("task-list");
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks.forEach(task => renederTAsks(task) 
    );

    addtaskbtn.addEventListener("click",()=>{
        const tasktext = todoinput.value.trim()
        if (tasktext === "") return;
        const newtask = {
            id: Date.now(), // for unique string
            text : tasktext,
            completed :false
        }
        tasks.push(newtask);
        savetasks();
        renederTAsks(newtask)
        todoinput.value = ""; // clear input
        console.log(tasks);
    });
    
    //render is a fancy word that programmer used to display a task
    function renederTAsks(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id",task.id);
        if(task.completed) li.classList.add("completed");

        li.innerHTML = `<span>${task.text}</span> 
        <button>delete</button>`;
        
        li.addEventListener('click',(e)=>{
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed
            li.classList.toggle("completed");
            savetasks();
        })
        li.querySelector('button').addEventListener('click',(e)=>{
            e.stopPropagation()  //prevent toggle from firing
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove();
            savetasks();
        })
        todo_list.appendChild(li);


        console.log(task.text);
    }
    function savetasks(){
        // for localStorage access they consits four property getItem,Setitem,removeItem....
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    
})