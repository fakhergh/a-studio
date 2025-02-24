import {
    DataTableRow,
    DataTableRowColumn,
    DataTableRowProps,
} from '@/components/DataTableRow/DataTableRow';

enum ColumnKey {
    ID,
    TITLE,
    CATEGORY,
    PRICE,
    RATING,
    STOCK,
    BRAND,
    SKU,
    WEIGHT,
    WARRANTY,
    MINIMUM_ORDER_QUANTITY,
    AVAILABILITY_STATUS,
    DISCOUNT_PERCENTAGE,
}

export interface ProductDataTableRowContainerProps
    extends Pick<DataTableRowProps<ColumnKey>, 'className'> {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    sku: string;
    weight: number;
    warranty: string;
    minOrderQuantity: number;
    availabilityStatus: string;
    discountPercentage: number;
}

export function ProductDataTableRowContainer({
    id,
    title,
    category,
    price,
    rating,
    stock,
    brand,
    sku,
    weight,
    warranty,
    minOrderQuantity,
    availabilityStatus,
    discountPercentage,
    ...props
}: ProductDataTableRowContainerProps) {
    const columns: Array<DataTableRowColumn<ColumnKey>> = [
        { itemKey: ColumnKey.ID, value: id, type: 'text' },
        { itemKey: ColumnKey.TITLE, value: title, type: 'text' },
        { itemKey: ColumnKey.CATEGORY, value: category, type: 'text' },
        { itemKey: ColumnKey.PRICE, value: `${price}$`, type: 'text' },
        { itemKey: ColumnKey.RATING, value: `${rating}/5`, type: 'text' },
        { itemKey: ColumnKey.STOCK, value: stock, type: 'text' },
        { itemKey: ColumnKey.BRAND, value: brand, type: 'text' },
        { itemKey: ColumnKey.SKU, value: sku, type: 'text' },
        { itemKey: ColumnKey.WEIGHT, value: `${weight}kg`, type: 'text' },
        { itemKey: ColumnKey.WARRANTY, value: warranty, type: 'text' },
        {
            itemKey: ColumnKey.MINIMUM_ORDER_QUANTITY,
            value: minOrderQuantity,
            type: 'text',
        },
        {
            itemKey: ColumnKey.AVAILABILITY_STATUS,
            value: availabilityStatus,
            type: 'text',
        },
        {
            itemKey: ColumnKey.DISCOUNT_PERCENTAGE,
            value: `${discountPercentage}%`,
            type: 'text',
        },
    ];

    return <DataTableRow columns={columns} {...props} />;
}
