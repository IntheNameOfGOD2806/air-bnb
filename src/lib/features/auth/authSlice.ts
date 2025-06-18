import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getStorage } from "@/lib/storage/storage";
import { STORAGE } from "@/lib/storage/storage";
export interface UserInfo {
  id: string;
  username: string;
  roles: string[];
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  userImage: string | null;
  cometChatId?: string | null;
}

const initialState: UserInfo = JSON.parse(
  getStorage(STORAGE.USER_INFO) ?? "{}"
);

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    setUserInfo: create.reducer((state, action: PayloadAction<UserInfo>) => {
      Object.assign(state, action.payload); // Update state in-place
    }),
    clearUserInfo: create.reducer((state) => {
      Object.assign(state, {}); // Reset to initial state
      localStorage.removeItem(STORAGE.USER_INFO);
    }),
  }),
  selectors: {
    selectUserInfo: (state) => state, // returns full user info
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export const { selectUserInfo } = userSlice.selectors;
