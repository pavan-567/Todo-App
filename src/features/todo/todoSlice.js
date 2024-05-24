import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos: [{ id: 1, title: "I am Hero", description: "LOL", completed: false }],
  filter: "ALL",
};

// Structure => {id: number, title: string, description: string, completed: boolean}

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

    case "todos/modifyTodo":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "todos/filterTodos":
      return { ...state, filter: action.payload };

    case "todos/completed":
      return {
        ...state,
        todos: state.todos.map((todo) => ({ ...todo, completed: true })),
      };

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
