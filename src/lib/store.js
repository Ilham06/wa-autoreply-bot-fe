import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { waApi } from '@/lib/wa-api';

export const store = configureStore({
  reducer: {
    [waApi.reducerPath]: waApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(waApi.middleware)
});

setupListeners(store.dispatch);
