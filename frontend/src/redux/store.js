import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
//redux-persist is to restrict the current page transition to login or signup page bcoz user is already logined
//please do read documentation of redux-persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./productRedux";

//in browser -> application -> localstorage -> key: persist:root -> user .....check it
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//for more than one reducer, use combineReducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  product: productReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     user: userReducer,
//   },
// });
// export default store;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
