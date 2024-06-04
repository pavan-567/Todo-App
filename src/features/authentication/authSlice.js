import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  userLoggedIn: false,
  status: "loading",
  userDetails: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
      state.userLoggedIn = true;
    },
    logout(state) {
      state.currentUser = null;
      state.userLoggedIn = false;
      state.status = "loading";
      state.userDetails = null;
    },
    stopLoading(state) {
      state.status = "stable";
    },
    startLoading(state) {
      state.status = "loading";
    },
    userDetails(state, action) {
      state.userDetails = action.payload;
      state.status = "stable";
    },
  },
});

export default authSlice.reducer;
export const { login, logout, stopLoading, startLoading, userDetails } =
  authSlice.actions;
