import { createStore } from "redux";
import todoReducer from "./features/todo/todoSlice";

const store = createStore(todoReducer);

export default store;
