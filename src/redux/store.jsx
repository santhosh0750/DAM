import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistCombineReducers(persistConfig, {
  user: userReducer,
});

const storedata = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(storedata);

export { storedata, persistor };
