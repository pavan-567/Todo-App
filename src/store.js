import todoReducer from "./features/todo/todoSlice";
import authReducer from "./features/authentication/authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
  },
});

export default store;
