import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import StorageUtils, { STORAGE_KEYS } from "../commons/utils/storage";
import { SupportedWallets, ThemeType, UserDataType, UserStoreType } from "../types/user";

let userStore: Store | undefined;

export const setStoreUser = (store: Store) => {
  userStore = store;
};

const initialState: UserStoreType = {
  theme: StorageUtils.getItem(STORAGE_KEYS.THEME, "light") as ThemeType,
  userData: StorageUtils.getUserData(),
  chainID: null,
  address: null,
  wallet: null,
  provider: null,
  openModal: false
};

const storeWallet = createSlice({
  name: "storeUser",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => ({
      ...state,
      theme: action.payload
    }),
    setUserData: (state, action: PayloadAction<UserDataType>) => ({
      ...state,
      userData: action.payload
    }),
    setChainID: (state, action: PayloadAction<string | null>) => ({
      ...state,
      chainID: action.payload
    }),
    setWallet: (state, action: PayloadAction<SupportedWallets | null>) => ({
      ...state,
      wallet: action.payload
    }),
    setAddress: (state, action: PayloadAction<string | null>) => ({
      ...state,
      address: action.payload
    }),
    setProvider: (state, action: PayloadAction<any>) => ({
      ...state,
      provider: action.payload
    }),
    setOpenModal: (state, action: PayloadAction<boolean>) => ({
      ...state,
      openModal: action.payload
    })
  },
});

export const setTheme = (theme: ThemeType) => {
  userStore?.dispatch(storeWallet.actions.setTheme(theme));
};

export const setUserData = (userData: UserDataType) => {
  userStore?.dispatch(storeWallet.actions.setUserData(userData));
};

export const setChainID = (chainID: string | null) => {
  userStore?.dispatch(storeWallet.actions.setChainID(chainID));
};

export const setWallet = (wallet: SupportedWallets | null) => {
  userStore?.dispatch(storeWallet.actions.setWallet(wallet));
};

export const setAddress = (address: string | null) => {
  userStore?.dispatch(storeWallet.actions.setAddress(address));
};

export const setProvider = (provider: any) => {
  userStore?.dispatch(storeWallet.actions.setProvider(provider));
};

export const setOpenModal = (openModal: boolean) => {
  userStore?.dispatch(storeWallet.actions.setOpenModal(openModal));
};

export default storeWallet.reducer;
