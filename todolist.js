const inputField = document.getElementById("todo-input-text");
const inputButton = document.getElementById("todo-input-button");
const todos = document.getElementById("todos");

inputButton.addEventListener("click", () => {
  const todoText = inputField.value.trim();
  if (todoText !== "") {
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

    todos.append(todoItem, todoItemCheckbox);

    inputField.value = "";
  } else {
    alert("다시 입력하세요.");
  }
});
