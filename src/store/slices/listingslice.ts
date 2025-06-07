
export const createListingSlice = (set: any, get: any) => ({
    listings: [],    
    setListings: (listings: any) => set({ listings })
})
export type ListingState = ReturnType<typeof createListingSlice>