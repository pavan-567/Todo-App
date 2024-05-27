import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";


const initialState = {
  todos: [],
  filter: "ALL",
  editTodo: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // createTodo(state, action) {
    //   state.todos.push(action.payload);
    // },
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
      },
    },

    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    removeAllTodos(state, action) {
      state.todos = [];
    },

    editTodoId(state, action) {
      state.editTodo = action.payload;
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
    },
    filterTodos(state, action) {
      state.filter = action.payload;
    },
    completedAll(state, action) {
      state.todos = state.todos.map((todo) => ({
        ...todo,
        completed: true,
        updatedAt: new Date().toISOString(),
      }));
    },
    removeEditMode(state, action) {
      state.editTodo = null;
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
