import { createApi } from '@reduxjs/toolkit/query/react';

import { RequestQueryParams } from '@/services/dtos/request';
import { UsersPaginatedResponse, UsersQueryParams } from '@/services/dtos/user';
import { axiosBaseQueryWithRetry } from '@/services/httpClient';

export const userSlice = createApi({
    reducerPath: 'api-users',
    baseQuery: axiosBaseQueryWithRetry,
    endpoints: (builder) => ({
        getUsers: builder.query<UsersPaginatedResponse, UsersQueryParams>({
            query: (
                { skip = 0, limit = 10, filter } = { skip: 0, limit: 10 },
            ) => {
                const url =
                    typeof filter === 'object' ? 'users/filter' : 'users';

                const params: RequestQueryParams = {
                    skip,
                    limit,
                };

                if (typeof filter === 'object') {
                    params.key = filter.key;
                    params.value = filter.value;
                }

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

export const { useGetUsersQuery } = userSlice;
