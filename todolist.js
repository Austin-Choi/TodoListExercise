const inputField = document.getElementById("todo-input-text");
const inputButton = document.getElementById("todo-input-button");
const todos = document.getElementById("todos");

inputButton.addEventListener("click", () => {
  const todoText = inputField.value.trim();
  if (todoText !== "") {
    console.log("값이 입력됨");
    const todoItem = document.createElement("li");
    todoItem.textContent = todoText;
    todoItem.className = "todoItem";
    const todoItemCheckbox = document.createElement("input");
    todoItemCheckbox.type = "checkbox";

    todos.append(todoItem, todoItemCheckbox);
    inputField.value = "";
  } else {
    alert("다시 입력하세요.");
  }
});
