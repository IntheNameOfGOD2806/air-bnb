import {create} from 'zustand'
import {createAuthSlice, type AuthState} from './slices/AuthSlice'

export const useAppstore = create<AuthState>((set, get) => ({
  ...createAuthSlice(set, get)
}))