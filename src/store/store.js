import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice.js';
import locationReducer from './slices/locationSlice.js';
import uiReducer from './slices/uiSlice.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    location: locationReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['products/fetchProducts/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.timestamp'],
      },
    }),
});
