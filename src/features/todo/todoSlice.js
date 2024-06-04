import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  filter: "ALL",
  editTodo: null,
  status: "loading",
  operation: "retrieve",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload;
    },
    filterTodos(state, action) {
      state.filter = action.payload;
    },
    editTodoId(state, action) {
      state.editTodo = action.payload;
    },
    removeEditMode(state) {
      state.editTodo = null;
    },
    changeStatus(state, action) {
      state.status = action.payload;
    },
    operation(state, action) {
      state.operation = action.payload;
    },
    reset(state) {
      state.todos = [];
      state.filter = "ALL";
      state.editTodo = null;
      state.status = "loading";
      state.operation = "retrieve";
    },
  },
});

export default todoSlice.reducer;
export const {
  setTodos,
  filterTodos,
  editTodoId,
  removeEditMode,
  changeStatus,
  operation,
  reset,
} = todoSlice.actions;
