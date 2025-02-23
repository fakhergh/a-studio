import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQueryWithRetry } from '@/services/httpClient.ts';
import { ProductsPaginatedResponse } from '@/types/product';
import { PaginationQueryParams } from '@/types/request';
import { UsersPaginatedResponse } from '@/types/user';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQueryWithRetry,
    endpoints: (builder) => ({
        getUsers: builder.query<UsersPaginatedResponse, PaginationQueryParams>({
            query: ({ skip = 0, limit = 10 } = { skip: 0, limit: 10 }) => ({
                url: 'users',
                method: 'get',
                params: { skip, limit },
            }),
        }),
        getProducts: builder.query<
            ProductsPaginatedResponse,
            PaginationQueryParams
        >({
            query: ({ skip = 0, limit = 10 } = { skip: 0, limit: 10 }) => ({
                url: 'products',
                method: 'get',
                params: { skip, limit },
            }),
        }),
    }),
});

export const { useGetUsersQuery, useGetProductsQuery } = apiSlice;
