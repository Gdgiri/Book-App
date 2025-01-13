// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import storyReducer from "./Slices/storeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    story: storyReducer,
  },
});
