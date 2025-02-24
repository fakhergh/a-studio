import { createFileRoute } from '@tanstack/react-router';
import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';

import {
    Column,
    DataTable,
    DataTableRenderRow,
    ToolbarAction,
} from '@/components/DataTable/DataTable';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';
import {
    ProductDataTableRowContainer,
    ProductDataTableRowContainerProps,
} from '@/containers/ProductDataTableRowContainer/ProductDataTableRowContainer';
import { useTotalPages } from '@/hooks/useTotalPages';
import { IconRefresh } from '@/icons/IconRefresh';
import { useGetCategoriesQuery } from '@/services/slices/categorySlice';
import { useGetProductsQuery } from '@/services/slices/productSlice';

export const Route = createFileRoute('/products')({
    component: RouteComponent,
});

const limitOptions: Array<number> = [5, 10, 20, 50];

enum ToolbarActionKey {
    REFRESH,
}

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

function RouteComponent() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(limitOptions[0]);
    const [searchText, setSearchText] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('');

    const { data: categoriesData } = useGetCategoriesQuery({});

    const categoryFilterOptions = useMemo(
        () => categoriesData?.map((category) => category.slug) ?? [],
        [categoriesData],
    );

    const { data, isFetching, refetch } = useGetProductsQuery({
        skip: Math.max(page - 1, 0) * limit,
        limit,
        category: categoryFilter || undefined,
    });

    const totalPages = useTotalPages(data?.totalPages);

    const toolbarActions: Array<ToolbarAction<ToolbarActionKey>> = [
        {
            itemKey: ToolbarActionKey.REFRESH,
            icon: <IconRefresh aria-label="refresh" className="w-4" />,
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

    const rows: Array<ProductDataTableRowContainerProps> = useMemo(
        () =>
            data?.products.map((product) => ({
                id: product.id,
                title: product.title,
                category: product.category,
                price: product.price,
                rating: product.rating,
                stock: product.stock,
                brand: product.brand,
                sku: product.sku,
                weight: product.weight,
                minOrderQuantity: product.minimumOrderQuantity,
                warranty: product.warrantyInformation,
                availabilityStatus: product.availabilityStatus,
                discountPercentage: product.discountPercentage,
            })) ?? [],
        [data?.products],
    );

    const filteredRow = useMemo(() => {
        const formattedFilterText = searchText.toLowerCase().trim();

        if (formattedFilterText) {
            return rows.filter(
                (row) =>
                    row.id.toString().includes(formattedFilterText) ||
                    row.title.toLowerCase().includes(formattedFilterText) ||
                    row.category.toLowerCase().includes(formattedFilterText) ||
                    row.price.toString().includes(formattedFilterText) ||
                    row.rating.toString().includes(formattedFilterText) ||
                    row.stock.toString().includes(formattedFilterText) ||
                    row.brand.includes(formattedFilterText) ||
                    row.sku.toLowerCase().includes(formattedFilterText) ||
                    row.weight.toString().includes(formattedFilterText) ||
                    row.warranty.toLowerCase().includes(formattedFilterText) ||
                    row.minOrderQuantity
                        .toString()
                        .includes(formattedFilterText) ||
                    row.availabilityStatus
                        .toLowerCase()
                        .includes(formattedFilterText) ||
                    row.discountPercentage
                        .toString()
                        .includes(formattedFilterText),
            );
        }
        return rows;
    }, [searchText, rows]);

    const renderRow: DataTableRenderRow<ProductDataTableRowContainerProps> = (
        item,
        index,
    ) => (
        <ProductDataTableRowContainer
            {...item}
            className={index % 2 === 0 ? 'bg-grey/30' : ''}
        />
    );

    const keyExtractor = (product: ProductDataTableRowContainerProps) =>
        product.id;

    const onLimitChange = (nextLimit: number) => {
        setPage(1);
        setLimit(nextLimit);
    };

    const onSearchTextChange: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        setSearchText(event.target.value);
    };

    const onCategoryChange = (category: string | number) => {
        setCategoryFilter(category as string);
    };

    const renderFilters = useCallback(
        () => (
            <div className="flex flex-wrap p-2 gap-2 justify-between items-center">
                <div className="flex-1">
                    <Input
                        label="Search..."
                        placeholder="Filter list by keyword"
                        value={searchText}
                        onChange={onSearchTextChange}
                    />
                </div>
                <div>
                    <Select
                        label="Category"
                        aria-label="page-limit"
                        value={categoryFilter}
                        options={categoryFilterOptions}
                        onChange={onCategoryChange}
                    />
                </div>
            </div>
        ),
        [categoryFilter, categoryFilterOptions, searchText],
    );

    return (
        <>
            <DataTable<ProductDataTableRowContainerProps, ToolbarActionKey>
                loading={isFetching}
                title="Products"
                columns={columns}
                rows={filteredRow}
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
                renderFilters={renderFilters}
            />
        </>
    );
}
