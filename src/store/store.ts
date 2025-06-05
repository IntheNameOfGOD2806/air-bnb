import {create} from 'zustand'
import {createAuthSlice, type AuthState} from './slices/AuthSlice'
import {proccessSlice, type ProccessState} from './slices/proccessSlice'
export const useAppstore = create<AuthState & ProccessState>((set, get) => ({
  ...createAuthSlice(set, get),
  ...proccessSlice(set, get),
}))