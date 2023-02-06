import { Store } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "./types";
import userReducer, { setStoreUser } from "./user";
import systemReducer, { setStoreSystem } from "./system";

let customStore: Store | undefined;

const setStore = (store: Store) => {
  customStore = store;
};

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
  backlist: ["user.onDetailView", "user.modalSignMessage", "user.openModal", "user.modalRegister"],
};

export const getStore = (): Store<RootState> => {
  if (!customStore) {
    throw new Error("Please implement setStore before using this function");
  }
  return customStore;
};

const appReducer = combineReducers({
  user: userReducer,
  system: systemReducer,
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

export default store;
