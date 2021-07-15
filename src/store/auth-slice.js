import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEmail: null,
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserEmail(state, action) {
      state.userEmail = action.payload.email;
    },
    login(state, action) {
      state.userEmail = action.payload.email;
      state.token = action.payload.token;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

/**
 * Thunk action creator for logging in
 * @param email  email address to login with
 * @param password  password to login with
 */
const requestLogin = (email, password) => {
  return async (dispatch) => {};
};

export const authActions = {
  ...authSlice.actions,
  requestLogin,
};

export default authSlice;
