import { configureStore } from '@reduxjs/toolkit';

import { productSlice } from '@/services/slices/productSlice';
import { userSlice } from '@/services/slices/userSlice';

export const store = configureStore({
    reducer: {
        [userSlice.reducerPath]: userSlice.reducer,
        [productSlice.reducerPath]: productSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userSlice.middleware)
            .concat(productSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});
