import { createStore } from "redux";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  posts: [],
};

// Structure => {id: number, post: string, completed: boolean}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "posts/createPost":
      return { ...state, posts: [...state.posts, action.payload] };

    case "posts/removePost":
      const filteredPosts = state.posts.filter(
        (post) => post.id !== action.payload
      );
      return { ...state, posts: filteredPosts };

    case "posts/removeAllPosts":
      return initialState;

    default:
      return state;
  }
}

// Action Creators
export function createPost(todo) {
  return {
    type: "posts/createPost",
    payload: {
      id: uuidv4(),
      post: todo,
      completed: false,
    },
  };
}

export function removePost(id) {
  return { type: "posts/removePost", payload: id };
}

export function removeAllPosts() {
  return { type: "posts/removeAllPosts" };
}

const store = createStore(reducer);

export default store;
