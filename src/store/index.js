import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import dataSlice from "./data-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    data: dataSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
