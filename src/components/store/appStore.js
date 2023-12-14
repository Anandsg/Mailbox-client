import { configureStore } from "@reduxjs/toolkit";
import emailReducer from "./emailSlice";

const appStore = configureStore({
  reducer: {
    emails: emailReducer,
  },
});

export default appStore;
