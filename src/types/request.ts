export interface PaginationQueryParams {
    skip?: number;
    limit?: number;
}

export interface PaginatedResponse {
    limit: number;
    skip: number;
    total: number;
}
