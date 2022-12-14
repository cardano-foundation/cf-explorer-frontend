import { Store } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "./types";
import userReducer, { setStoreUser } from "./user";

let customStore: Store | undefined;

const setStore = (store: Store) => {
  customStore = store;
};

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
  backlist: ["user.onDetailView"],
};

export const getStore = (): Store<RootState> => {
  if (!customStore) {
    throw new Error("Please implement setStore before using this function");
  }
  return customStore;
};

const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state: any, action: any) => appReducer(state, action);

const middleWares: any[] = [];

const enhancer = composeWithDevTools(applyMiddleware(...middleWares));

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, enhancer);

export const persistor = persistStore(store, {});

setStore(store);
setStoreUser(store);

export default store;
