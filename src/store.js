import { createStore } from "redux";
import postReducer from "./features/posts/postSlice";

const store = createStore(postReducer);

export default store;
