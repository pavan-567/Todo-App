const initialState = {
  todos: [],
  filter: "ALL",
  editTodo: null,
  status: "loading", // Stable,
  operation: "retrieve", // Operations : INSERT, UPDATE, DELETE, RETRIEVE
};

// Structure => {id: number, title: string, description: string, completed: boolean, createdAt: string, updatedAt: string}

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "todos/setTodos":
      return { ...state, todos: action.payload };

    case "todos/todoId":
      return { ...state, editTodo: action.payload };

    case "todos/filterTodos":
      return { ...state, filter: action.payload };

    case "todos/removeEdit":
      return { ...state, editTodo: null };

    case "todos/operation":
      return { ...state, operation: action.payload };

    case "todos/changeStatus":
      return { ...state, status: action.payload };

    default:
      return state;
  }
}

// Action Creators

export function setTodos(todos) {
  return { type: "todos/setTodos", payload: todos };
}

export function filterTodos(filter) {
  return { type: "todos/filterTodos", payload: filter };
}

// Important
export function editTodoId(id) {
  return { type: "todos/todoId", payload: id };
}

// Important
export function removeEditMode() {
  return { type: "todos/removeEdit" };
}

// Important
export function changeStatus(status) {
  return { type: "todos/changeStatus", payload: status };
}

export function operation(optMode) {
  return { type: "todos/operation", payload: optMode };
}
