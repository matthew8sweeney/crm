import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailError: "",
  passwordError: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showEmailError(state, action) {
      state.emailError = action.payload;
    },
    clearEmailError(state) {
      state.emailError = "";
    },
    showPasswordError(state, action) {
      state.passwordError = action.payload;
    },
    clearPasswordError(state) {
      state.passwordError = "";
    },
  },
});

export const uiActions = {
  ...uiSlice.actions,
};

export default uiSlice;
