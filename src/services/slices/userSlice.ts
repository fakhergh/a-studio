import { createApi } from '@reduxjs/toolkit/query/react';

import { UsersPaginatedResponse, UsersQueryParams } from '@/services/dtos/user';
import { axiosBaseQueryWithRetry } from '@/services/httpClient';

export const userSlice = createApi({
    reducerPath: 'api-users',
    baseQuery: axiosBaseQueryWithRetry,
    endpoints: (builder) => ({
        getUsers: builder.query<UsersPaginatedResponse, UsersQueryParams>({
            query: (
                { skip = 0, limit = 10, q, filter } = { skip: 0, limit: 10 },
            ) => {
                let url: string = 'users';

                if (q) {
                    url = 'users/search';
                } else if (typeof filter === 'object') {
                    url = 'users/filter';
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

export const { useGetUsersQuery } = userSlice;
