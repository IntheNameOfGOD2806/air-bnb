import {create} from 'zustand'
import {createAuthSlice, type AuthState} from './slices/AuthSlice'
import {proccessSlice, type ProccessState} from './slices/proccessSlice'
import {createListingSlice, type ListingState} from './slices/listingslice'
export const useAppstore = create<AuthState & ProccessState & ListingState>((set, get) => ({
  ...createAuthSlice(set, get),
  ...proccessSlice(set, get),
  ...createListingSlice(set, get),
}))