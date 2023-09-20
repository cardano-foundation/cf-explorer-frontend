import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";

let systemStore: Store | undefined;

export const setStoreSystem = (store: Store) => {
  systemStore = store;
};

const initialState: SystemStoreType = {
  adaRate: 0,
  usdMarket: null,
  btcMarket: null,
  currentEpoch: null,
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
    setBtcMarket: (state, action: PayloadAction<CardanoMarket>) => ({
      ...state,
      btcMarket: action.payload
    }),
    setCurrentEpoch: (state, action: PayloadAction<EpochCurrentType>) => ({
      ...state,
      currentEpoch: action.payload
    }),
    setBlockNo: (state, action: PayloadAction<number>) => ({
      ...state,
      blockNo: action.payload
    }),
    setBlockKey: (state, action: PayloadAction<number | string>) => ({
      ...state,
      blockKey: action.payload
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

export const setBtcMarket = (btcMarket: CardanoMarket) => {
  systemStore?.dispatch(store.actions.setBtcMarket(btcMarket));
};

export const setCurrentEpoch = (currentEpoch: EpochCurrentType) => {
  systemStore?.dispatch(store.actions.setCurrentEpoch(currentEpoch));
};

export const setBlockNo = (blockNo: number) => {
  systemStore?.dispatch(store.actions.setBlockNo(blockNo));
};

export const setBlockKey = (blockKey: number | string) => {
  systemStore?.dispatch(store.actions.setBlockKey(blockKey));
};

export const setSpecialPath = (specialPath: SpecialPath) => {
  systemStore?.dispatch(store.actions.setSpecialPath(specialPath));
};

export default store.reducer;
