import { Store } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import systemReducer, { setStoreSystem } from "./system";
import toastReducer, { setStoreToast } from "./toast";
import { RootState } from "./types";
import userReducer, { setStoreUser } from "./user";
import themeReducer, { setStoreTheme } from "./theme";

let customStore: Store | undefined;

const setStore = (store: Store) => {
  customStore = store;
};

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: []
};

const userPersistConfig = {
  key: "user",
  storage: storage,
  blacklist: ["onDetailView", "openModal", "modalSignMessage", "modalRegister"]
};

const themePersistConfig = {
  key: "theme",
  storage: storage,
  blacklist: ["isDark"]
};

export const getStore = (): Store<RootState> => {
  if (!customStore) {
    throw new Error("Please implement setStore before using this function");
  }
  return customStore;
};

const appReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  system: systemReducer,
  toast: toastReducer,
  theme: persistReducer(themePersistConfig, themeReducer)
});

const rootReducer = (state: any, action: any) => appReducer(state, action);

const middleWares: any[] = [];

const enhancer = composeWithDevTools(applyMiddleware(...middleWares));

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, enhancer);

export const persistor = persistStore(store, {});

setStore(store);
setStoreUser(store);
setStoreSystem(store);
setStoreToast(store);
setStoreTheme(store);

export default store;
