import { createApi } from '@reduxjs/toolkit/query/react';

import { Category } from '@/services/dtos/category';
import { axiosBaseQueryWithRetry } from '@/services/httpClient';

export const categorySlice = createApi({
    reducerPath: 'api-categories',
    baseQuery: axiosBaseQueryWithRetry,
    endpoints: (builder) => ({
        getCategories: builder.query<Array<Category>, {}>({
            query: () => {
                return { url: 'products/categories', method: 'get' };
            },
        }),
    }),
});

export const { useGetCategoriesQuery } = categorySlice;
