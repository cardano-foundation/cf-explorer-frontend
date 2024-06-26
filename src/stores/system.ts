import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";

let systemStore: Store | undefined;

export const setStoreSystem = (store: Store) => {
  systemStore = store;
};

const initialState: SystemStoreType = {
  currentEpoch: null,
  specialPath: null,
  wineryName: null,
  wineryNameLoading: false
};

const store = createSlice({
  name: "storeSystem",
  initialState,
  reducers: {
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
    }),
    setWineryName: (state, action: PayloadAction<Record<string, Record<"name", string>>>) => ({
      ...state,
      wineryName: action.payload
    }),
    setWineryNameLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      wineryNameLoading: action.payload
    })
  }
});

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

export const setWineryName = (wineryName: Record<string, Record<"name", string>>) => {
  systemStore?.dispatch(store.actions.setWineryName(wineryName));
};
export const setWineryNameLoading = (wineryNameLoading: boolean) => {
  systemStore?.dispatch(store.actions.setWineryNameLoading(wineryNameLoading));
};

export default store.reducer;
