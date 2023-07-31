import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";

let systemStore: Store | undefined;

export const setStoreSystem = (store: Store) => {
  systemStore = store;
};

const initialState: SystemStoreType = {
  adaRate: 0,
  usdMarket: null,
  currentEpoch: null,
  loadingCurrentEpoch: true,
  specialPath: null
};

const store = createSlice({
  name: "storeSystem",
  initialState,
  reducers: {
    setUsdMarket: (state, action: PayloadAction<CardanoMarket>) => ({
      ...state,
      adaRate: action.payload.current_price,
      usdMarket: action.payload
    }),
    setCurrentEpoch: (state, action: PayloadAction<EpochCurrentType>) => ({
      ...state,
      currentEpoch: action.payload,
      loadingCurrentEpoch: false
    }),
    setSpecialPath: (state, action: PayloadAction<SpecialPath>) => ({
      ...state,
      specialPath: action.payload
    })
  }
});

export const setUsdMarket = (usdMarket: CardanoMarket) => {
  systemStore?.dispatch(store.actions.setUsdMarket(usdMarket));
};

export const setCurrentEpoch = (currentEpoch: EpochCurrentType) => {
  systemStore?.dispatch(store.actions.setCurrentEpoch(currentEpoch));
};
export const setSpecialPath = (specialPath: SpecialPath) => {
  systemStore?.dispatch(store.actions.setSpecialPath(specialPath));
};

export default store.reducer;
