import { createApi } from '@reduxjs/toolkit/query/react';

import {
    ProductsPaginatedResponse,
    ProductsQueryParams,
} from '@/services/dtos/product';
import { RequestQueryParams } from '@/services/dtos/request';
import { axiosBaseQueryWithRetry } from '@/services/httpClient';

export const productSlice = createApi({
    reducerPath: 'api-products',
    baseQuery: axiosBaseQueryWithRetry,
    endpoints: (builder) => ({
        getProducts: builder.query<
            ProductsPaginatedResponse,
            ProductsQueryParams
        >({
            query: (
                { skip = 0, limit = 10, category } = { skip: 0, limit: 10 },
            ) => {
                const url =
                    typeof category === 'string'
                        ? `products/category/${category}`
                        : 'products';

                const params: RequestQueryParams = { skip, limit };

                return { url, method: 'get', params };
            },
            onCacheEntryAdded: async (
                { limit },
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) => {
                try {
                    await cacheDataLoaded;

                    updateCachedData((draft) => {
                        draft.totalPages = Math.ceil(draft.total / limit!);
                    });
                } catch (err) {
                    console.error(err);
                } finally {
                    await cacheEntryRemoved;
                }
            },
        }),
    }),
});

export const { useGetProductsQuery } = productSlice;
