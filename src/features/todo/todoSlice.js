const initialState = {
  todos: [],
  filter: "ALL",
  editTodo: null,
  status: "loading", // Stable, Loading
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
