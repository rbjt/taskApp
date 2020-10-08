document.getElementById("formTask").addEventListener("submit", saveTask);

function saveTask(e) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  const task = {
    title, // title: title,
    description, // description: description
  };

  // localStorage.getItem("storage")); --> this will give us a string
  // JSON.parse(localStorage.getItem("storage")); --> this will give us an object

  if (localStorage.getItem("storage") == null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem("storage", JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem("storage"));
    tasks.push(task);
    localStorage.setItem("storage", JSON.stringify(tasks));
  }

  printTask();
  document.getElementById("formTask").reset();
  e.preventDefault();
}

function printTask() {
  let tasks = JSON.parse(localStorage.getItem("storage"));
  let items = document.getElementById("items");

  items.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;
    items.innerHTML += `
      <div class="card mb-2">
        <div class="card-body">
          <p>${title} - ${description}</p>

          <a class="btn btn-danger" onclick="deleteTask('${title}')">delete</a>
        </div>
      </div>`;
  }
}

function deleteTask(title) {
  let tasks = JSON.parse(localStorage.getItem("storage"));

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }

  localStorage.setItem("storage", JSON.stringify(tasks));
  printTask();
}

printTask();
