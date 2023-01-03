import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { SystemStoreType } from "../types/system";

let systemStore: Store | undefined;

export const setStoreSystem = (store: Store) => {
  systemStore = store;
};

const initialState: SystemStoreType = {
  adaRate: 0,
};

const store = createSlice({
  name: "storeSystem",
  initialState,
  reducers: {
    setRate: (state, action: PayloadAction<number>) => ({
      ...state,
      adaRate: action.payload,
    }),
  },
});

export const setAdaRate = (rate: number) => {
  systemStore?.dispatch(store.actions.setRate(rate));
};

export default store.reducer;
