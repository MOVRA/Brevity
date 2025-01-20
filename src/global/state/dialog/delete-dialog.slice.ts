import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Dialog {
  value: boolean;
}

const initialState: Dialog = {
  value: false,
};

const deleteDialogSlice = createSlice({
  name: "delete-dialog",
  initialState,
  reducers: {
    openDelete: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { openDelete } = deleteDialogSlice.actions;
export default deleteDialogSlice.reducer;
