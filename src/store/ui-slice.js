import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    emailError: "",
    passwordError: "",
  },
  newItemDialog: {
    isOpen: false,
    itemTypeIndex: -1, // 0-4 for different items (lead/account/note/etc)
  },
  editItemDialog: {
    isOpen: false,
    itemType: "", // type name ("leads"/"accounts"/"notes"/etc)
    itemId: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showEmailError(state, action) {
      state.auth.emailError = action.payload;
    },
    hideEmailError(state) {
      state.auth.emailError = "";
    },
    showPasswordError(state, action) {
      state.auth.passwordError = action.payload;
    },
    hidePasswordError(state) {
      state.auth.passwordError = "";
    },

    showNewItemDialog(state, action) {
      state.newItemDialog.itemTypeIndex = action.payload;
      state.newItemDialog.isOpen = true;
    },
    hideNewItemDialog(state) {
      state.newItemDialog.isOpen = false;
    },

    showEditItemDialog(state, action) {
      state.editItemDialog = { isOpen: true, ...action.payload };
    },
    hideEditItemDialog(state) {
      state.editItemDialog.isOpen = false;
    },
  },
});

export const uiActions = {
  ...uiSlice.actions,
};

export default uiSlice;
