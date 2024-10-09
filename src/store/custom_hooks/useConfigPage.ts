import {create} from 'zustand';

interface AppState {
  username: string;
  darkMode: boolean;
  isLoadingFullScreen: boolean;
  setUsername: (username: string) => void;
  toggleDarkMode: () => void;
  toggleLoadingFullScreen: () => void;
}

const useConfigPage = create<AppState>((set) => ({
  // Default values
  username: 'Unknown',
  darkMode: false,
  isLoadingFullScreen: false,
  
  setUsername: (username) => set({ username }),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  toggleLoadingFullScreen: () =>  set((state) => ({isLoadingFullScreen: !state.isLoadingFullScreen}))
}));

export default useConfigPage;
