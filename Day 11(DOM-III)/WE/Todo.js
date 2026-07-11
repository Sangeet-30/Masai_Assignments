let form = document.querySelector("form");
let taskInp = document.querySelector("#task");
let prioritySelect = document.querySelector("#priority");

let tbody = document.querySelector("tbody");

let array = [];
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let data = {
    task: taskInp.value,
    priority: prioritySelect.value,
  };
  array.push(data);
  //   console.log(array);
  tbody.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");

    let td2 = document.createElement("td");

    td1.innerText = array[i].task;
    td2.innerText = array[i].priority;

    tr.append(td1, td2);

    tbody.append(tr);

  }
});
