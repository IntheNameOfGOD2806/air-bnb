import { User } from "@/lib/types";
//                                    not in use
type AuthState = {
  isAuthModalOpen: boolean;
  isLoggedIn: boolean;
  userInfo: User | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserInfo: (userInfo: User) => void;
  setAuthModalOpen: () => void;
  getAuthModalOpen: () => boolean;
};

export const createAuthSlice = (
  set: (fn: (state: AuthState) => Partial<AuthState>) => void,
  get: () => AuthState
): AuthState => {
  return {
    isAuthModalOpen: false,
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn: boolean) => set((state) => ({ isLoggedIn })),
    userInfo: null,
    setUserInfo: (userInfo: User) => set((state) => ({ userInfo })),
    setAuthModalOpen: () =>
      set((state) => ({ isAuthModalOpen: !state.isAuthModalOpen })),
    getAuthModalOpen: () => get().isAuthModalOpen,
  };
};

export type { AuthState };
export default createAuthSlice;
