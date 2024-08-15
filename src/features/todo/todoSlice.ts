import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { TodoFilter } from "./types/Filter";
import Todo from "./types/Todo";
import TodoState from "./types/TodoState";

let storedTodos: string | null = localStorage.getItem("todos");
let savedTodos: TodoState | null = storedTodos ? JSON.parse(storedTodos) : null;

const initialState: TodoState = {
  todos: savedTodos?.todos || [],
  filter: savedTodos?.filter || TodoFilter.ALL,
  editTodo: savedTodos?.editTodo || null,
  username: savedTodos?.username || null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    createTodo: {
      prepare(title: string, description: string) {
        return {
          payload: {
            id: uuidv4(),
            title,
            description,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        };
      },
      reducer(state: TodoState, action: PayloadAction<Todo>) {
        state.todos.push(action.payload);
        localStorage.setItem("todos", JSON.stringify(state));
      },
    },

    removeTodo(state: TodoState, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo: Todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },

    removeAllTodos(state: TodoState) {
      state.todos = [];
      localStorage.setItem("todos", JSON.stringify(state));
    },

    editTodoId(state: TodoState, action: PayloadAction<string>) {
      state.editTodo = action.payload;
      localStorage.setItem("todos", JSON.stringify(state));
    },

    modifyTodo(state: TodoState, action) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(state));
    },

    editTodo(state: TodoState, action: PayloadAction<{title: string, description: string}>) {
      state.todos = state.todos.map((todo) =>
        todo.id === state.editTodo
          ? {
              ...todo,
              title: action.payload.title,
              description: action.payload.description,
              updatedAt: new Date().toISOString(),
            }
          : todo
      );
      state.editTodo = null;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    filterTodos(state: TodoState, action: PayloadAction<TodoFilter>) {
      state.filter = action.payload;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    completedAll(state: TodoState) {
      state.todos = state.todos.map((todo) => ({
        ...todo,
        completed: true,
        updatedAt: new Date().toISOString(),
      }));
      localStorage.setItem("todos", JSON.stringify(state));
    },
    removeEditMode(state: TodoState) {
      state.editTodo = null;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    setName(state: TodoState, action: PayloadAction<string>) {
      state.username = action.payload;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    removeName(state: TodoState) {
      state.username = null;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    removeAll(state: TodoState) {
      state.todos = [];
      state.filter = TodoFilter.ALL;
      state.editTodo = null;
      state.username = null;
      localStorage.removeItem("todos");
    },
  },
});

export default todoSlice.reducer;
export const {
  createTodo,
  removeTodo,
  removeAllTodos,
  modifyTodo,
  completedAll,
  filterTodos,
  editTodoId,
  editTodo,
  removeEditMode,
  setName,
  removeName,
  removeAll,
} = todoSlice.actions;
