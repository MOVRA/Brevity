import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../state/user/user-slice";
import dialogReducer from "../state/dialog/dialog-slice";
import deleteDialogReducer from "../state/dialog/delete-dialog.slice";
import statusDialogReducer from "./dialog/status-dialog.slice";

export const store = configureStore({
  reducer: {
    loggedUser: userReducer,
    dialog: dialogReducer,
    deleteDialog: deleteDialogReducer,
    statusDialog: statusDialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
