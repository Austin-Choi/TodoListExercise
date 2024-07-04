// __tests__/todoList.test.js

const { saveTodo, removeTodo } = require("./todolist");

//describe: 테스트 케이스를 그룹화함.
describe("saveTodo", () => {
  //beforeEach 각 테스트가 실행되기 전에 호출됨. 여기서는 각 테스트 전에 localStorage를 초기화함.
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  //it 또는 test 단일 테스트 케이스를 정의함
  it("Todo를 로컬스토리지에 저장하고 그 아이디 값이 제대로 저장되는지 확인", () => {
    const todoText = "Test Todo";
    const id = saveTodo(todoText);

    const todos = JSON.parse(localStorage.getItem("todos"));

    //어설션을 통해 특정 조건이 참인지 확인
    expect(todos).toHaveLength(1);
    expect(todos[0].todoText).toBe(todoText);
    expect(todos[0].id).toBe(id);
  });

  it("JSON 파싱이 실패하면 -1을 반환해야 합니다", () => {
    localStorage.setItem("todos", "superbad JSON");

    //jest.fn()를 사용하여 console.error 함수를 모킹하여
    //saveTodo 함수가 JSON 파싱 오류를 처리하는 동안 'console.error'가 호출되는지 확인
    console.error = jest.fn();

    const id = saveTodo("Test Todo");

    expect(id).toBe(-1);
    expect(console.error).toHaveBeenCalledWith(
      "LocalStorage에서 todo를 parsing하는 중 오류가 발생했습니다.",
      expect.any(SyntaxError)
    );
  });
});

describe("removeTodo", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("id를 통해 삭제할 todo를 식별하고 삭제해야 합니다", () => {
    const initialTodos = [
      { todoText: "Test Todo 1", id: "1" },
      { todoText: "Test Todo 2", id: "2" },
    ];
    localStorage.setItem("todos", JSON.stringify(initialTodos));

    removeTodo("1");

    const todos = JSON.parse(localStorage.getItem("todos"));
    expect(todos).toHaveLength(1);
    expect(todos[0]).toEqual({ todoText: "Test Todo 2", id: "2" });
  });

  it("JSON 파싱 에러 처리가 가능해야 합니다", () => {
    localStorage.setItem("todos", "superbad JSON");

    console.error = jest.fn();

    removeTodo("1");

    expect(console.error).toHaveBeenCalledWith(
      "LocalStorage에서 todo를 parsing하는 중 오류가 발생했습니다.",
      expect.any(SyntaxError)
    );
  });

  it("존재하지 않는 id로 삭제하려고 하면 todos의 데이터가 불변해야 합니다", () => {
    const initialTodos = [{ todoText: "Test Todo 1", id: "1" }];
    localStorage.setItem("todos", JSON.stringify(initialTodos));

    removeTodo("2");

    const todos = JSON.parse(localStorage.getItem("todos"));
    expect(todos).toHaveLength(1);
    expect(todos[0]).toEqual({ todoText: "Test Todo 1", id: "1" });
  });
});
