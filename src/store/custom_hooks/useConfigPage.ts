import { User } from '@/interfaces'
import { create } from 'zustand'

interface AppState {
  username: string
  userInfo: User
  darkMode: boolean
  isLoadingFullScreen: boolean
  setUsername: (username: string) => void
  toggleDarkMode: () => void
  toggleLoadingFullScreen: () => void
  setUserInfo: (userInfo: User) => void
}

// const {username, setUsername} = useConfigPage();

const useConfigPage = create<AppState>((set) => ({
  // Default values
  username: 'Unknown',
  userInfo: null,
  darkMode: false,
  isLoadingFullScreen: false,

  setUsername: (username) => set({ username }),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  toggleLoadingFullScreen: () =>
    set((state) => ({ isLoadingFullScreen: !state.isLoadingFullScreen })),
  setUserInfo: (userInfo: User | null) => set({ userInfo }),
}))

export default useConfigPage
