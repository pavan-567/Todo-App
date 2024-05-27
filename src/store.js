import todoReducer from "./features/todo/todoSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: todoReducer,
});

export default store;
