import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactsSlice';
import { filterReducer } from './contacts/filterSlice';
import { authReducer } from './auth/slice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST,PURGE, REGISTER,
} from 'redux-persist';


// Конфігурація для збереження токена в локальному сховищі
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

// Створення редюсерів
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },

middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

// для зберігання та відновлення стану

export const persistor = persistStore(store);
