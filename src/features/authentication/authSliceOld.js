const initialState = {
  currentUser: null,
  userLoggedIn: false,
  loading: true,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "user/login":
      return {
        ...state,
        currentUser: action.payload,
        userLoggedIn: true,
        loading: false,
      };
    case "user/logout":
      return {
        ...state,
        currentUser: null,
        userLoggedIn: false,
        loading: false,
      };
    default:
      return initialState;
  }
}

export default authReducer;

export function login(user) {
  return { type: "user/login", payload: user };
}

export function logout() {
  return { type: "user/logout" };
}

export function stopLoading() {
  return { type: "user/stopLoading" };
}

export function startLoading() {
  return { type: "user/startLoading" };
}
