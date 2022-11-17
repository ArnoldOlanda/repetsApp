import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { authSlice } from './slices/auth';
import { messagesSlice } from './slices/messages/messagesSlice';
import { pethousesSlice } from './slices/pethouses/pethousesSlice';
import { petsSlice } from './slices/pets';
import { themeSlice } from './slices/theme/themeSlice';


const rootReducer = combineReducers({
  auth: authSlice.reducer,
  pets: petsSlice.reducer,
  messages: messagesSlice.reducer,
  pethouses: pethousesSlice.reducer,
  theme: themeSlice.reducer
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['pets','messages','pethouses','theme'], //blacklisting a store attribute name, will not persist that store attribute.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})

export const persistor = persistStore(store)