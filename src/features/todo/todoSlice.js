import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos: [{ id: 1, title: "I am Hero", description: "LOL", completed: false }],
};

// Structure => {id: number, context: string, completed: boolean}

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
      return initialState;

    default:
      return state;
  }
}

// Action Creators
export function createTodo(todo) {
  return {
    type: "todos/createTodo",
    payload: {
      id: uuidv4(),
      post: todo,
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
