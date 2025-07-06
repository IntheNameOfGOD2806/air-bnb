import { addToWishList } from "@/lib/listings";

export const createListingSlice = (set: any, get: any) => ({
  listings: [],
  tourListings: [],
  vehicleListings: [],
  isMapView: false,
  userListings: [],
  wishList: [],
  wishListPage: [],
  currentListing: null,
  setCurrentListing: (currentListing: any) => set({ currentListing }),
  setUserListings: (userListings: any) => set({ userListings }),
  setWishList: (wishList: any) => set({ wishList }),
  setWishListPage: (wishListPage: any) => set({ wishListPage }),
  setIsMapView: (isMapView: boolean) => set({ isMapView: !get().isMapView }),
  setListings: (listings: any) => set({ listings }),
  setTourListings: (tourListings: any) => set({ tourListings }),
  setVehicleListings: (vehicleListings: any) => set({ vehicleListings }),
  addToWishList: (id: any) => {
    const list = get().wishList;
    list.push(id);
    set({ wishList: list });
  },
  //   setWishListPage: (wishListPage: any) => set({ wishListPage }),
});
export type ListingState = ReturnType<typeof createListingSlice>;
