import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  id: string;
  username: string;
  roles: string[];
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  userImage: string | null;
}

const initialState: UserInfo = {
  id: "",
  username: "",
  roles: [],
  email: null,
  firstName: null,
  lastName: null,
  userImage: null,
};

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    setUserInfo: create.reducer((state, action: PayloadAction<UserInfo>) => {
      Object.assign(state, action.payload); // Update state in-place
    }),
    clearUserInfo: create.reducer((state) => {
      Object.assign(state, initialState); // Reset to initial state
    }),
  }),
  selectors: {
    selectUserInfo: (state) => state, // returns full user info
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export const { selectUserInfo } = userSlice.selectors;
