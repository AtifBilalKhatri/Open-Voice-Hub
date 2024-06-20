let url = "https://jsonplaceholder.typicode.com/todos";
let tbody = document.getElementById("task-table-body");
let addBtn = document.getElementById("add-task");
let taskTitle = document.getElementById("add-task-title");
let taskStatus = document.getElementById("add-task-status");
function appendRow(data, index) {
  let row = document.createElement("tr");
  row.setAttribute("id", `data-row-${index}`);
  row.innerHTML = `
    <td>${data.id}</td>
                  <td class="title">${data.title}</td>
                  <td class="status"><span class="${
                    data.completed ? "complete" : "un-complete"
                  }">${
    data.completed ? "completed" : "un-completed"
  }</span></td>
                  <td>
                    <div class="d-flex gap-1">
                      <a href="javascript:void(0)" class="delete-btn action-btn" data-id='data-row-${index}'
                      data-index=${index}
                        ><i class="fa-solid fa-trash"></i></a>
                      <a
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                        href="javascript:void(0)"
                        class="edit-btn action-btn"
                        data-id='data-row-${index}'
                        data-index='${index}'
                        ><i class="fa-solid fa-pencil"></i
                      ></a>
                    </div>
                  </td>
    `;
  tbody.append(row);

  let editBtn = document.querySelectorAll(".edit-btn");
  if (editBtn.length > 0) {
    let arr = Array.from(editBtn);
    arr.forEach((item, index) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        let id = this.getAttribute("data-id");
        let edit = document.getElementById("edit-btn");
        edit.setAttribute("data-index", `${id}`);
        let target__row = document.getElementById(`${id}`);
        let target__title = target__row.querySelector(".title");
        let target__status = target__row.querySelector(".status");
        //now edit fields
        let editTitle = document.getElementById("edit-task-title");
        let editStatus = document.getElementById("edit-task-status");

        editTitle.value = target__title.textContent;
        let statusVal =
          target__status.querySelector("span").textContent == "completed"
            ? 1
            : 0;
        editStatus.value = statusVal;
        edit.addEventListener("click", function (e) {
          if (editTitle.value != "") {
            e.stopImmediatePropagation();
            let itemId = this.getAttribute("data-index");
            let editTr = document.getElementById(`${itemId}`);
            let tr__title = editTr.querySelector(".title");
            let tr__status = editTr.querySelector(".status");
            tr__title.textContent = editTitle.value;

            if (editStatus.value == "1") {
              tr__status.innerHTML = '<span class="complete">completed</span>';
            } else {
              tr__status.innerHTML =
                '<span class="un-complete">un-completed</span>';
            }
            editTitle.value = "";
            editStatus.value = "0";
          } else {
            alert("enter complete data");
          }
        });
      });
    });
  }
  let delBtn = document.querySelectorAll(".delete-btn");
  Array.from(delBtn).forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopImmediatePropagation();
      id = this.getAttribute("data-id");
      let elem = document.getElementById(id);
      elem.remove();
    });
  });
}

async function fetchTodos() {
  try {
    const response = await fetch(url);
    const todos = await response.json();
    for (let i = 0; i < todos.length; i++) {
      if (i >= 10) break;
      appendRow(todos[i], i);
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}
fetchTodos();

addBtn.addEventListener("click", function () {
  if (taskTitle.value != "" && taskStatus.value != "") {
    let status = taskStatus.value == "1" ? true : false;
    let row_length = tbody.querySelectorAll("tr").length;
    let data = {
      id: row_length + 1,
      title: taskTitle.value,
      completed: status,
    };
    let index = row_length;
    appendRow(data, index);
    taskTitle.value = "";
    taskStatus.value = "0";
  } else {
    alert("please provide complete data");
  }
});
