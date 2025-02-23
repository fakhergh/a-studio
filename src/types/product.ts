import { PaginatedResponse } from '@/types/request.ts';

interface Product {
    id: number;
    name: string;
    price: number;
}

export interface ProductsPaginatedResponse extends PaginatedResponse {
    products: Product[];
}
