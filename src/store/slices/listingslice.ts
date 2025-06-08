
export const createListingSlice = (set: any, get: any) => ({
    listings: [],    
    isMapView: false,
    setIsMapView: (isMapView: boolean) => set({ isMapView: !get().isMapView }),
    setListings: (listings: any) => set({ listings })
})
export type ListingState = ReturnType<typeof createListingSlice>