export interface PaginationQueryParams {
    skip?: number;
    limit?: number;
}

export interface RequestQueryParams extends PaginationQueryParams {
    key?: string;
    value?: string | number;
}

export interface PaginatedResponse {
    limit: number;
    skip: number;
    total: number;
    totalPages: number;
}
