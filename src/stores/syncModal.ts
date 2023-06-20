import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";

let syncModalStore: Store | undefined;

export const setStoreSyncModal = (store: Store) => {
  syncModalStore = store;
};

const initialState: { openModal: boolean } = {
  openModal: false
};

const storeWallet = createSlice({
  name: "storeSyncModal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<boolean>) => ({
      ...state,
      openModal: action.payload
    })
  }
});

export const openSyncModal = (open: boolean) => {
  syncModalStore?.dispatch(storeWallet.actions.openModal(open));
};

export default storeWallet.reducer;
