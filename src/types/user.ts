import { PaginatedResponse } from '@/types/request.ts';

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface UsersPaginatedResponse extends PaginatedResponse {
    users: User[];
}
