import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";

import breakpoints from "../themes/breakpoints";
import { SupportedWallets, UserDataType, UserStoreType } from "../types/user";

let userStore: Store | undefined;

export const setStoreUser = (store: Store) => {
  userStore = store;
};

const initialState: UserStoreType = {
  userData: null,
  chainID: null,
  address: null,
  wallet: null,
  provider: null,
  openModal: false,
  sidebar: window.innerWidth >= breakpoints.values.md,
  onDetailView: false,
  modalRegister: false,
  modalSignMessage: false,
  nonce: null,
  openSyncBookmarkModal: false
};

const storeWallet = createSlice({
  name: "storeUser",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserDataType | null>) => ({
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
    }),
    setSidebar: (state, action: PayloadAction<boolean>) => ({
      ...state,
      sidebar: action.payload
    }),
    setOnDetailView: (state, action: PayloadAction<boolean>) => ({
      ...state,
      onDetailView: action.payload
    }),
    setModalRegister: (state, action: PayloadAction<boolean>) => ({
      ...state,
      modalRegister: action.payload
    }),
    setModalSignMessage: (state, action: PayloadAction<boolean>) => ({
      ...state,
      modalSignMessage: action.payload
    }),
    setNonce: (state, action: PayloadAction<NonceObject | null>) => ({
      ...state,
      nonce: action.payload
    }),
    setOpenSyncBookmarkModal: (state, action: PayloadAction<boolean>) => ({
      ...state,
      openSyncBookmarkModal: action.payload
    })
  }
});

export const setUserData = (userData: UserDataType | null) => {
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

export const setOpenSyncBookmarkModal = (openSyncBookmarkModal: boolean) => {
  userStore?.dispatch(storeWallet.actions.setOpenSyncBookmarkModal(openSyncBookmarkModal));
};

export const setSidebar = (sidebar: boolean) => {
  userStore?.dispatch(storeWallet.actions.setSidebar(sidebar));
};

export const setOnDetailView = (onDetailView: boolean) => {
  userStore?.dispatch(storeWallet.actions.setOnDetailView(onDetailView));
};

export const setModalRegister = (state: boolean) => {
  userStore?.dispatch(storeWallet.actions.setModalRegister(state));
};

export const setModalSignMessage = (state: boolean) => {
  userStore?.dispatch(storeWallet.actions.setModalSignMessage(state));
};
export const setNonce = (state: NonceObject | null) => {
  userStore?.dispatch(storeWallet.actions.setNonce(state));
};

export default storeWallet.reducer;
