import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./apiSlice/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
