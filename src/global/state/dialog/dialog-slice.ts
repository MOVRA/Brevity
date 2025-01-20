import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Dialog {
  value: boolean;
}

const initialState: Dialog = {
  value: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { open } = dialogSlice.actions;
export default dialogSlice.reducer;
