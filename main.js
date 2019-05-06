var apiKey = "e5c08e3f97cc15d8e42d7741822479a6f6b5f34156762838d413ad6707ed13d6";

var listRequest = new XMLHttpRequest();
listRequest.onreadystatechange = function(){
  if (this.readyState ==4 && this.status == 200){
    var todos = JSON.parse(this.responseText);

  //  todos.forEach(todo=> {
    //  console.log(todo);
  //  });
    for(var index = 0; index<todos.length; index++){
      renderTodo(todos[index]);
    }

  } else if(this.readyState ==4){
    console.log(this.responseText);
  }
}
  listRequest.open("GET", "https://api.kraigh.net/todos", true);
  listRequest.setRequestHeader("x-api-key", apiKey);
  listRequest.send();
  document.getElementById("new-todo-form").addEventListener("submit", function(event){
  event.preventDefault();

    var data = {
      text: newTitle.value
    }
    var createRequest = new XMLHttpRequest();

    createRequest.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
          renderTodo(JSON.parse(this.responseText));

        }
        else if(this.readyState == 4){
          console.log(this.responseText);
        }
    };

    createRequest.open("POST", "https://api.kraigh.net/todos", true);
    createRequest.setRequestHeader("Content-type", "application/json");
    createRequest.setRequestHeader("x-api-key", apiKey);
    createRequest.send(JSON.stringify(data));
});

function renderTodo(todoData) {

var todo = document.createElement("article");
todo.setAttribute("id", todoData.id);
todo.classList.add("todo");
if(todoData.completed){
  todo.classList.add("completed");
}
//var completeButton = document.createElement("button");
//completeButton.classList.add("check");
//todo.appendChild(completeButton);

var todoText = document.createElement("p");
todoText.innerText = todoData.text;
todo.appendChild(todoText);

var deleteButton = document.createElement("button");
deleteButton.classList.add("delete");
deleteButton.innerText = '-';
todo.appendChild(deleteButton);
document.getElementById("todos").appendChild(todo);

//completeButton.addEventListener("click", completeTodo);
deleteButton.addEventListener("click", deleteTodo);
document.getElementById("newTitle").value = '';

}

function completeTodo(event){

  var todoId = event.target.parentNode.id;
  var data = {
    completed: true
  };
  var completeRequest = new XMLHttpRequest();
  completeRequest.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      event.target.parentNode.classList.add("completed");

    } else if (this.readyState == 4){
      console.log(this.responseText);
    }
  }
  //OR SHOULD THIS BE PUT
  completeRequest.open("PUT", "https://api.kraigh.net/todos/"+ todoId, true);
  completeRequest.setRequestHeader("Content-type", "application/json");
  completeRequest.setRequestHeader("x-api-key", apiKey);
  completeRequest.send(JSON.stringify(data));
}

function deleteTodo(event){
  var todoId = event.target.parentNode.id;
  var deleteRequest = new XMLHttpRequest();
  deleteRequest.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
    console.log(this.responseText);
  document.getElementById("todos").removeChild(event.target.parentNode);
    } else if (this.readyState == 4){
      console.log(this.responseText);
    }
  }
  deleteRequest.open("DELETE", "https://api.kraigh.net/todos/"+ todoId, true);
  deleteRequest.setRequestHeader("Content-type", "application/json");
  deleteRequest.setRequestHeader("x-api-key", apiKey);
  deleteRequest.send();
}



var index;
showSlide(index);

function openModal(){
   document.getElementById('modalImages').style.display = "block";
}

function showSlide(n) {
  var i;

  //make array of slides
  //mySlides = class that each of my images has
  var slide = document.getElementsByClassName("mySlides");
  if (n > slide.length) {index = 1}

  if (n < 1) {index = slide.length}

    for (i = 0; i < slide.length; i++) {
    slide[i].style.display = "none";
    }

    //index starts at 0
    slide[index - 1].style.display = "block";

}

function currentSlide(n) {
  showSlide(index = n);
}

function next(n){
  showSlide(index += n);
}
//function last(n){
//    showSlide(index = n-1);
//  }

function closeModal(){
   document.getElementById('modalImages').style.display = "none";
}

ga('send', {
  hitType: 'pageview',
  page: location.pathname
});
