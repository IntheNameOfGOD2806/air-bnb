export const wishListSlice = (set: any, get: any) => ({
   wishList:[],
   setWishList: (wishList: any) => set({ wishList })
 });
   
 export type TabState = ReturnType<typeof wishListSlice>;
   