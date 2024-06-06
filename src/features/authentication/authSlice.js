import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  userLoggedIn: false,
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
      state.userDetails = null;
    },
    userDetails(state, action) {
      state.userDetails = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { login, logout, userDetails } = authSlice.actions;
