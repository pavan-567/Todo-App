import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos: [],
  filter: "ALL",
  editTodo: null,
};

// Structure => {id: number, title: string, description: string, completed: boolean, createdAt: string, updatedAt: string}

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "todos/createTodo":
      return { ...state, todos: [...state.todos, action.payload] };

    case "todos/removeTodo":
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { ...state, todos: filteredTodos };

    case "todos/removeAllTodos":
      // return initialState;
      return initialState;

    case "todos/todoId":
      return { ...state, editTodo: action.payload };

    case "todos/modifyTodo":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                completed: !todo.completed,
                updatedAt: new Date().toISOString(),
              }
            : todo
        ),
      };

    case "todos/editTodo":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === state.editTodo
            ? {
                ...todo,
                title: action.payload.title,
                description: action.payload.description,
                updatedAt: new Date().toLocaleString(),
              }
            : todo
        ),
        editTodo: null,
      };

    case "todos/filterTodos":
      return { ...state, filter: action.payload };

    case "todos/completed":
      return {
        ...state,
        todos: state.todos.map((todo) => ({
          ...todo,
          completed: true,
          updatedAt: new Date().toISOString(),
        })),
      };

    case "todos/removeEdit":
      return { ...state, editTodo: null };

    default:
      return state;
  }
}

// Action Creators
export function createTodo(title, description) {
  return {
    type: "todos/createTodo",
    payload: {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    },
  };
}

export function removeTodo(id) {
  return { type: "todos/removeTodo", payload: id };
}

export function removeAllTodos() {
  return { type: "todos/removeAllTodos" };
}

export function modifyTodo(id) {
  return { type: "todos/modifyTodo", payload: id };
}

export function completedAll() {
  return { type: "todos/completed" };
}

export function filterTodos(filter) {
  return { type: "todos/filterTodos", payload: filter };
}

export function editTodoId(id) {
  return { type: "todos/todoId", payload: id };
}

export function editTodo(title, description) {
  console.log(title, description);
  return { type: "todos/editTodo", payload: { title, description } };
}

export function removeEditMode() {
  return { type: "todos/removeEdit" };
}
