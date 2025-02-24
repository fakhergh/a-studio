import { FC } from 'react';

import { IconProps } from '@/types/icon';

export interface DataTableRowColumn<ActionKey> {
    itemKey: ActionKey;
    type?: 'text';
    value: string | number;
}

export interface DataTableRowAction<ColumnKey> {
    itemKey: ColumnKey;
    icon: FC<IconProps>;
}

export interface DataTableRowProps<ColumnKey> {
    columns: Array<DataTableRowColumn<ColumnKey>>;
    className?: string;
}

export function DataTableRow<ColumnKey>({
    columns,
    className,
}: DataTableRowProps<ColumnKey>) {
    const renderColumn = ({ type, value }: DataTableRowColumn<ColumnKey>) => {
        switch (type) {
            default:
                return <div className="text-black">{value}</div>;
        }
    };

    return (
        <tr className={`relative ${className}`}>
            {columns.map((item: DataTableRowColumn<ColumnKey>) => (
                <td
                    key={String(item.itemKey)}
                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-700"
                >
                    {renderColumn(item)}
                </td>
            ))}
        </tr>
    );
}
