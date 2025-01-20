import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserStateType {
  value: User;
}

const initialState: UserStateType = {
  value: {
    Profile: {
      bio: "",
      createdAt: "",
      file: "",
      id: "",
      updatedAt: "",
      userId: "",
    },
    Thread: [],
    createdAt: "",
    email: "",
    followedByYou: false,
    followerCount: 0,
    followingCount: 0,
    id: "",
    name: "",
    updatedAt: "",
    username: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { setUserLoggedIn } = userSlice.actions;
export default userSlice.reducer;
