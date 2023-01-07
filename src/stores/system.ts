import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";

let systemStore: Store | undefined;

export const setStoreSystem = (store: Store) => {
  systemStore = store;
};

const initialState: SystemStoreType = {
  adaRate: 0,
  currentEpoch: null,
  loadingCurrentEpoch: true,
};

const store = createSlice({
  name: "storeSystem",
  initialState,
  reducers: {
    setRate: (state, action: PayloadAction<number>) => ({
      ...state,
      adaRate: action.payload,
    }),
    setCurrentEpoch: (state, action: PayloadAction<EpochCurrentType>) => ({
      ...state,
      currentEpoch: action.payload,
      loadingCurrentEpoch: false,
    }),
  },
});

export const setAdaRate = (rate: number) => {
  systemStore?.dispatch(store.actions.setRate(rate));
};

export const setCurrentEpoch = (currentEpoch: EpochCurrentType) => {
  systemStore?.dispatch(store.actions.setCurrentEpoch(currentEpoch));
};

export default store.reducer;
