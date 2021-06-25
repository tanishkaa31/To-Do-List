var addButton = document.getElementById("add-button");
var clearCompleted = document.getElementById("clear-completed-button");
var emptyButton = document.getElementById("empty-button");
var SaveButton = document.getElementById("save-button");
var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

addButton.addEventListener("click", addToDoItem);
clearCompleted.addEventListener("click", clearCompletedToDoItems);
emptyButton.addEventListener("click", emptyList);
SaveButton.addEventListener("click", saveList);

function addToDoItem(){
    //alert("Add button clicked!");
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
}

function clearCompletedToDoItems(){                                    //for removal of the completed items
    //alert("Clear Completed button clicked!");
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

function emptyList()
{
    //alert("Empty List button clicked!");
    var toDoItems = toDoList.children;

    while (toDoItems.length>0) {
        toDoItems.item(0).remove();
    }
}

function saveList(){
   // alert("Save List button clicked!");
   var toDos = []; //local storage can't store HTML, therefore, we need to take the HTML code and turn it into pure JS, and also stringify it 
    for (var i=0; i< toDoList.children.length; i++)
    {
      var toDo = toDoList.children.item(i);

      var toDoInfo = {
          "task" : toDo.innerText,
          "completed": toDo.classList.contains("completed")
      };  //need to store not just the task, but also whether or not it's completed, therefore created JS object toDoInfo

      toDos.push(toDoInfo);
    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadList() {
    if(localStorage.getItem("toDos")!=NULL) {
        var toDos = JSON.parse(localStorage.getItem("toDos")); //gets loaded into an array

        for (var i=0; i < toDos.length; i++)
        {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

function newToDoItem(itemText, completed){
    var toDoItem = document.createElement("li"); //creates li item to use as new list item
    var toDoText = document.createTextNode(itemText); //creates a text string from the specified value, i.e. itemText. Text Node inserts the passed text inside the HTML element <ol>
    toDoItem.appendChild(toDoText);

    if(completed){
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function toggleToDoItemState(){
    if(this.classList.contains("completed")){
        this.classList.remove("completed");
    }
    else{
        this.classList.add("completed");
    }
}

loadList();

