import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import {
    Column,
    DataTable,
    DataTableRenderRow,
    ToolbarAction,
} from '@/components/DataTable/DataTable';
import {
    ProductDataTableRowContainer,
    ProductDataTableRowContainerProps,
} from '@/containers/ProductDataTableRowContainer/ProductDataTableRowContainer';
import { useTotalPages } from '@/hooks/useTotalPages';
import { IconRefresh } from '@/icons/IconRefresh';
import { useGetProductsQuery } from '@/services/slices/productSlice';

export const Route = createFileRoute('/products')({
    component: RouteComponent,
});

const limitOptions: Array<number> = [5, 10, 20, 50];

enum ToolbarActionKey {
    REFRESH,
}

function RouteComponent() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(limitOptions[0]);

    const { data, isFetching, refetch } = useGetProductsQuery({
        skip: Math.max(page - 1, 0) * limit,
        limit,
    });

    const totalPages = useTotalPages(data?.totalPages);

    const columns: Array<Column> = [
        { itemKey: 'id', title: 'ID' },
        { itemKey: 'title', title: 'Title' },
        { itemKey: 'category', title: 'Category' },
        { itemKey: 'price', title: 'Price' },
        { itemKey: 'rating', title: 'Rating' },
        { itemKey: 'stock', title: 'Stock' },
        { itemKey: 'brand', title: 'Brand' },
        { itemKey: 'sku', title: 'SKU' },
        { itemKey: 'weight', title: 'Weight' },
        { itemKey: 'warranty', title: 'Warranty' },
        { itemKey: 'minOrderQuantity', title: 'Min Order Quantity' },
        { itemKey: 'availabilityStatus', title: 'Availability Status' },
        { itemKey: 'discountPercentage', title: 'Discount Percentage' },
    ];

    const toolbarActions: Array<ToolbarAction<ToolbarActionKey>> = [
        {
            itemKey: ToolbarActionKey.REFRESH,
            icon: <IconRefresh className="w-4" />,
            disabled: isFetching,
        },
    ];

    const onToolbarActionClick = (key: ToolbarActionKey) => {
        switch (key) {
            case ToolbarActionKey.REFRESH:
                refetch();
                break;
        }
    };

    const rows: Array<ProductDataTableRowContainerProps> =
        data?.products.map((product) => ({
            id: product.id,
            title: product.title,
            category: product.category,
            price: product.price,
            rating: `${product.rating} / 5`,
            stock: product.stock,
            brand: product.brand,
            sku: product.sku,
            weight: product.weight,
            minOrderQuantity: product.minimumOrderQuantity,
            warranty: product.warrantyInformation,
            availabilityStatus: product.availabilityStatus,
            discountPercentage: product.discountPercentage,
        })) ?? [];

    const renderRow: DataTableRenderRow<ProductDataTableRowContainerProps> = (
        item,
    ) => <ProductDataTableRowContainer {...item} />;

    const keyExtractor = (product: ProductDataTableRowContainerProps) =>
        product.id;

    const onLimitChange = (nextLimit: number) => {
        setPage(1);
        setLimit(nextLimit);
    };

    return (
        <>
            <DataTable<ProductDataTableRowContainerProps, ToolbarActionKey>
                loading={isFetching}
                title="Products"
                columns={columns}
                rows={rows}
                toolbarActions={toolbarActions}
                onToolbarActionClick={onToolbarActionClick}
                keyExtractor={keyExtractor}
                renderRow={renderRow}
                totalPages={totalPages ?? 0}
                page={page}
                onPageChange={setPage}
                limit={limit}
                limitOptions={limitOptions}
                onLimitChange={onLimitChange}
            />
        </>
    );
}
