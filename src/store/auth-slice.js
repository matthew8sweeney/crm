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
      state.userEmail = action.payload;
    },
    login(state, action) {
      state.userEmail = action.payload.email;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

/**
 * Helper function to login and to store info in localStorage
 */
const loginAndStore = (dispatch, data) => {
  dispatch(authSlice.actions.login({ email: data.email, token: data.token }));

  localStorage.setItem("userEmail", data.email);
  localStorage.setItem("token", data.token);
  localStorage.setItem("tokenExpires", data.tokenExpires);
  localStorage.setItem("isLoggedIn", 1);
};

/**
 * Thunk action creator for checking localStorage
 * when mounting the application
 */
const checkInitialAuth = () => {
  return (dispatch) => {
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");
    const tokenExpires = localStorage.getItem("tokenExpires");
    if (
      localStorage.getItem("isLoggedIn") === "1" &&
      typeof email === "string" &&
      typeof token === "string"
      // new Date(tokenExpires) > new Date()  // or something
    ) {
      dispatch(authSlice.actions.login({ email: email, token: token }));
    } else {
      dispatch(authSlice.actions.setUserEmail(email));
      dispatch(authSlice.actions.logout());
    }
  };
};

/**
 * Thunk action creator for logging in
 * @param email  email address to login with
 * @param password  password to login with
 */
const requestLogin = (email, password) => {
  return async (dispatch) => {
    // send request to backend

    // handle possible error state of response

    loginAndStore(dispatch, { email, token: null, tokenExpires: null });
  };
};

/**
 * Thunk action creator for logging out
 */
const logout = () => {
  return (dispatch) => {
    dispatch(authSlice.actions.logout());

    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpires");
    localStorage.removeItem("loggedIn");
  };
};

export const authActions = {
  ...authSlice.actions,
  checkInitialAuth,
  requestLogin,
  logout,
};

export default authSlice;
