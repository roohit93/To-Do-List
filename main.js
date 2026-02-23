/*          <li>
                <span>Reading</span>
                <button><i class="fa-solid fa-trash"></i></button>
                <button class="edit-btn"><i class="fa-solid fa-edit"></i></button>
            </li>
            <li>
                <span>Playing</span>
                <button><i class="fa-solid fa-trash"></i></button>
                <button class="edit-btn"><i class="fa-solid fa-edit"></i></button>
            </li>
            <li>
                <span>Writing</span>
                <button><i class="fa-solid fa-trash"></i></button>
                <button class="edit-btn"><i class="fa-solid fa-edit"></i></button>
          </li> */

// Create the getelementbyId  for id elements

//for button
const btnaddTask = document.getElementById('Todo-Task');
//for input 
const taskinput = document.getElementById('task-input');
// for list 'li'
const TodoList = document.getElementById('Todo-List')


//Add even listener

btnaddTask.addEventListener("click",function(){

    // taskinput stored in taskText and get the value and trim the space
    const taskText = taskinput.value.trim()
    // condition for input  context, if blank box not equal to !  
    if(taskText !== " "){
    /// call the function here
        const taskId = Date.now()  // for id
        addTasktoList(taskText,taskId)   //add task to list
        savetasktolocalstorage(taskText,taskId) // save task to localstorage
        taskinput.value='' 
    }

})



function addTasktoList(Text,id){
    const li = document.createElement('li')
    li.setAttribute("data-id",id)
//span
    const span = document.createElement('span')
    span.textContent = Text
//delete button
    const deletebtn = document.createElement('button')
    deletebtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
    deletebtn.addEventListener("click",()=> {
        if (confirm("Do you want to delete the task?")){
            li.remove()
            removetasktolocalstorage(id)
        }

    })


//edit button
    const editbtn = document.createElement('button')
    editbtn.innerHTML = '<i class="fa-solid fa-edit"></i>'
    editbtn.classList.add('edit-btn')
    editbtn.addEventListener("click",()=>{
        taskinput.value = span.textContent;
        li.remove();
        removetasktolocalstorage(id)
    })


// insert into the <li> tag

    li.appendChild(span)
    li.appendChild(deletebtn)
    li.appendChild(editbtn)

    TodoList.appendChild(li)
    
}


//Store task in localStorage

function savetasktolocalstorage(text,id){
    const task = JSON.parse(localStorage.getItem("tasks")) || [];
    task.push({text,id})
    localStorage.setItem("tasks",JSON.stringify(task))
}


//Load save task from localstorage

window.onload = ()=>{
    const savetask = JSON.parse(localStorage.getItem("tasks")) || [];
    savetask.forEach(element => {
        addTasktoList(element.text,element.id)
    });
}


function removetasktolocalstorage(id){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task)=>{
        task.id !== id;
     localStorage.setItem("tasks",JSON.stringify(task))
    })
}