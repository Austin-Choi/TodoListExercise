const inputField = document.getElementById("todo-input-text");
const inputButton = document.getElementById("todo-input-button");
const todos = document.getElementById("todos");

//함수 단위로 테스트해보자.

//입력받은 텍스트를 생성일자로 된 id를 생성하고
//로컬 스토리지에서 todos를 불러옴
//JSON으로 묶어서 todos 배열에 push함
//다시 로컬 스토리지에 todos 배열 저장
const saveTodo = (todoText) => {
  //파싱에 실패하면 에러 내용 콘솔에 기록하고
  //-1을 반환해 alert창 띄움
  let todos;
  try {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
  } catch (error) {
    console.error(
      "LocalStorage에서 todo를 parsing하는 중 오류가 발생했습니다.",
      error
    );
    return -1;
  }
  const id = Date.now().toString();
  todos.push({ todoText, id });
  localStorage.setItem("todos", JSON.stringify(todos));
  return id;
};

//생성일자로 구성된 id를 받아와서
//로컬스토리지에 저장된 {할일, 날짜} 배열?에서 해당 id값이 아닌 것들만 추림
//다시 추려진 todo를 저장
const removeTodo = (id) => {
  let todos;
  try {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
  } catch (error) {
    console.error(
      "LocalStorage에서 todo를 parsing하는 중 오류가 발생했습니다.",
      error
    );
    return;
  }
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const renderTodo = (todoText, id) => {
  const todoItem = document.createElement("li");
  todoItem.textContent = todoText;
  todoItem.className = "todo-item";

  const todoItemCheckbox = document.createElement("input");
  todoItemCheckbox.type = "checkbox";

  todoItemCheckbox.addEventListener("change", () => {
    if (todoItemCheckbox.checked) {
      todoItem.remove();
      todoItemCheckbox.remove();
      removeTodo(id);
    }
  });

  todoItem.setAttribute("todo-data-id", id);
  todos.append(todoItem, todoItemCheckbox);
};

//에러: 보여주는 부분에서 localstorage안에 있음에도 불구하고 읽어오지 않아 보이지 않는 문제 발생.
//해결: 페이지 로드시 로컬 스토리지에서 불러와서 할일 목록 초기화함
const initTodos = () => {
  let todos;
  try {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
  } catch (error) {
    console.error(
      "LocalStorage에서 todo를 parsing하는 중 오류가 발생했습니다.",
      error
    );
    todos = [];
  }
  todos.forEach((todo) => {
    renderTodo(todo.todoText, todo.id);
  });
};
document.addEventListener("DOMContentLoaded", initTodos);

inputButton.addEventListener("click", () => {
  const todoText = inputField.value.trim();
  if (todoText !== "") {
    const id = saveTodo(todoText);
    if (id === -1) {
      alert("할일을 저장하던 중 오류가 발생했습니다.");
      return;
    }
    renderTodo(todoText, id);
    inputField.value = "";
  } else {
    alert("다시 입력하세요.");
  }
});

//모두 삭제하는 기능
//에러: 로컬스토리지만 지워지고 보이는건 안사라짐
//해결: ul인 todos 에서 firstChild가 존재할 때
//.removeChild 함수를 사용해 todos.firstChile 반복문으로 삭제
const deleteAllButton = document.getElementById("delete-all-button");
deleteAllButton.addEventListener("click", () => {
  while (todos.firstChild) {
    todos.removeChild(todos.firstChild);
  }
  localStorage.removeItem("todos");
});
