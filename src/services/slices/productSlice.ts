import { createApi } from '@reduxjs/toolkit/query/react';

import {
    ProductsPaginatedResponse,
    ProductsQueryParams,
} from '@/services/dtos/product';
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
                { skip = 0, limit = 10, q, filter } = { skip: 0, limit: 10 },
            ) => {
                let url: string = 'products';

                if (q) {
                    url = 'products/search';
                } else if (typeof filter === 'object') {
                    url = 'products/filter';
                }

                return {
                    url,
                    method: 'get',
                    params: {
                        skip,
                        limit,
                        q,
                        key: filter?.key,
                        value: filter?.value,
                    },
                };
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
