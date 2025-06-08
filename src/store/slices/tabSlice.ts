export const tabSlice = (set: any, get: any) => ({
   tabIndex:"0",
   setTabIndex: (tabIndex: any) => set({ tabIndex })
});
  
export type TabState = ReturnType<typeof tabSlice>;
  