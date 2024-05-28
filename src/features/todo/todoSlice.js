import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos:
    JSON.parse(localStorage.getItem("todos")) === null
      ? []
      : JSON.parse(localStorage.getItem("todos")).todos,
  filter:
    JSON.parse(localStorage.getItem("todos")) === null
      ? "ALL"
      : JSON.parse(localStorage.getItem("todos")).filter,
  editTodo:
    JSON.parse(localStorage.getItem("todos")) === null
      ? null
      : JSON.parse(localStorage.getItem("todos")).editTodo,
};

console.log(initialState);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    createTodo: {
      prepare(title, description) {
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
      reducer(state, action) {
        state.todos.push(action.payload);
        localStorage.setItem("todos", JSON.stringify(state));
      },
    },

    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },

    removeAllTodos(state, action) {
      state.todos = [];
      localStorage.removeItem("todos");
    },

    editTodoId(state, action) {
      state.editTodo = action.payload;
      localStorage.setItem("todos", JSON.stringify(state));
    },

    modifyTodo(state, action) {
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

    editTodo(state, action) {
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
    filterTodos(state, action) {
      state.filter = action.payload;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    completedAll(state, action) {
      state.todos = state.todos.map((todo) => ({
        ...todo,
        completed: true,
        updatedAt: new Date().toISOString(),
      }));
      localStorage.setItem("todos", JSON.stringify(state));
    },
    removeEditMode(state, action) {
      state.editTodo = null;
      localStorage.setItem("todos", JSON.stringify(state));
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
} = todoSlice.actions;
