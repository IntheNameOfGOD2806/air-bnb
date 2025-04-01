type AuthState = {
  isAuthModalOpen: boolean;
  setAuthModalOpen: () => void;
  getAuthModalOpen: () => boolean;
}

export const createAuthSlice = (
  set: (fn: (state: AuthState) => Partial<AuthState>) => void,
  get: () => AuthState
): AuthState => {
  return {
    isAuthModalOpen: false,
    setAuthModalOpen: () => set((state) => ({ isAuthModalOpen: !state.isAuthModalOpen })),
    getAuthModalOpen: () => get().isAuthModalOpen,
  };
};

export type { AuthState };
export default createAuthSlice;
