import {create} from 'zustand'
import {createAuthSlice, type AuthState} from './slices/AuthSlice'
import {proccessSlice, type ProccessState} from './slices/proccessSlice'
import {createListingSlice, type ListingState} from './slices/listingslice' 
import {tabSlice, type TabState} from './slices/tabSlice'
export const useAppstore = create<AuthState & ProccessState & ListingState & TabState>((set, get) => ({
  ...createAuthSlice(set, get),
  ...proccessSlice(set, get),
  ...createListingSlice(set, get),
  ...tabSlice(set, get),
}))