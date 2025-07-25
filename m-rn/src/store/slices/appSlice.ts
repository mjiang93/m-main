import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  isLoading: boolean;
  isDarkMode: boolean;
  language: string;
  isOnboardingCompleted: boolean;
  networkStatus: 'online' | 'offline';
  orientation: 'portrait' | 'landscape';
  error: string | null;
}

const initialState: AppState = {
  isLoading: false,
  isDarkMode: false,
  language: 'en',
  isOnboardingCompleted: false,
  networkStatus: 'online',
  orientation: 'portrait',
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.isOnboardingCompleted = action.payload;
    },
    setNetworkStatus: (state, action: PayloadAction<'online' | 'offline'>) => {
      state.networkStatus = action.payload;
    },
    setOrientation: (state, action: PayloadAction<'portrait' | 'landscape'>) => {
      state.orientation = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  toggleTheme,
  setTheme,
  setLanguage,
  setOnboardingCompleted,
  setNetworkStatus,
  setOrientation,
  setError,
  clearError,
} = appSlice.actions;

export default appSlice.reducer;