// __tests__/todoList.test.js

const { saveTodo } = require("./todolist");

describe("saveTodo", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should save a todo item and return its id", () => {
    const todoText = "Test Todo";
    const id = saveTodo(todoText);

    const todos = JSON.parse(localStorage.getItem("todos"));

    expect(todos).toHaveLength(1);
    expect(todos[0].todoText).toBe(todoText);
    expect(todos[0].id).toBe(id);
  });

  it("should return -1 and log an error if parsing fails", () => {
    // Simulate localStorage containing invalid JSON
    localStorage.setItem("todos", "invalid JSON");

    console.error = jest.fn();

    const id = saveTodo("Test Todo");

    expect(id).toBe(-1);
    expect(console.error).toHaveBeenCalledWith(
      "LocalStorage에서 todo를 parsing하는 중 오류가 발생했습니다.",
      expect.any(SyntaxError)
    );
  });
});
