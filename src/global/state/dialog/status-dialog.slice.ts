import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Dialog {
  value: string;
}

const initialState: Dialog = {
  value: "add",
};

const statusDialog = createSlice({
  name: "status-dialog",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setStatus } = statusDialog.actions;
export default statusDialog.reducer;
