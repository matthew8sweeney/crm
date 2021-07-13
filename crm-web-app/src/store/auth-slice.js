import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEmail: null,
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  reducers: {
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    login(state, email, token) {
      state.userEmail = email;
      state.token = token;
    },
  },
});

export default authSlice;
