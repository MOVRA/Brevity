import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user-slice";
import dialogReducer from "./dialog/dialog-slice";

export const store = configureStore({
  reducer: {
    loggedUser: userReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
