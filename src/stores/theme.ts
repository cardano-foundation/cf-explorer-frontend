import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";

import { ThemeStoreType, ThemeType } from "src/types/theme";

let themeStore: Store | undefined;

export const setStoreTheme = (store: Store) => {
  themeStore = store;
};

const initialState: ThemeStoreType = {
  theme: "light"
};

const storeWallet = createSlice({
  name: "storeTheme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => ({
      ...state,
      theme: action.payload
    })
  }
});

export const setTheme = (theme: ThemeType) => {
  themeStore?.dispatch(storeWallet.actions.setTheme(theme));
};

export default storeWallet.reducer;
