const inputField = document.getElementById("todo-input-text");
const inputButton = document.getElementById("todo-input-button");
const todos = document.getElementById("todos");

//입력받은 텍스트를 생성일자로 된 id를 생성하고
//로컬 스토리지에서 todos를 불러옴
//JSON으로 묶어서 todos 배열에 push함
//다시 로컬 스토리지에 todos 배열 저장
const saveTodo = (todoText) => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const id = Date.now().toString();
  todos.push({ todoText, id });
  localStorage.setItem("todos", JSON.stringify(todos));
  return id;
};

inputButton.addEventListener("click", () => {
  const todoText = inputField.value.trim();
  if (todoText !== "") {
    const id = saveTodo(todoText);
    const todoItem = document.createElement("li");
    todoItem.textContent = todoText;
    todoItem.className = "todoItem";

    const todoItemCheckbox = document.createElement("input");
    todoItemCheckbox.type = "checkbox";

    todoItemCheckbox.addEventListener("change", () => {
      if (todoItemCheckbox.checked) {
        todoItem.remove();
        todoItemCheckbox.remove();
      }
    });

    todoItem.setAttribute("todo-data-id", id);
    todos.append(todoItem, todoItemCheckbox);

    inputField.value = "";
  } else {
    alert("다시 입력하세요.");
  }
});
