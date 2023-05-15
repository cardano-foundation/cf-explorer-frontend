import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";

let toastStore: Store | undefined;

export const setStoreToast = (store: Store) => {
  toastStore = store;
};

const initialState: ToastStoreType = {
  toasts: []
};

const storeWallet = createSlice({
  name: "storeToast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Required<ToastItem>>) => ({
      ...state,
      toasts: [action.payload, ...state.toasts]
    }),
    removeToast: (state, action: PayloadAction<number>) => ({
      ...state,
      toasts: state.toasts.filter((item) => item.id !== action.payload)
    })
  }
});

export const addToast = (toast: Required<ToastItem>) => {
  toastStore?.dispatch(storeWallet.actions.addToast(toast));
};

export const removeToast = (id: number) => {
  toastStore?.dispatch(storeWallet.actions.removeToast(id));
};

export default storeWallet.reducer;
