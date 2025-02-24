import { FC } from 'react';

import { IconButton } from '@/components/IconButton/IconButton';
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

export interface DataTableRowProps<ColumnKey, ActionKey> {
    columns: Array<DataTableRowColumn<ColumnKey>>;
    actions?: Array<DataTableRowAction<ActionKey>>;
    onSwitchValueChange?: (key: ColumnKey, b: boolean) => void;
    onActionClick?: (key: ActionKey) => void;
}

export function DataTableRow<ColumnKey, ActionKey>({
    columns,
    actions,
    onActionClick,
}: DataTableRowProps<ColumnKey, ActionKey>) {
    const renderColumn = ({ type, value }: DataTableRowColumn<ColumnKey>) => {
        switch (type) {
            default:
                return <div className="text-black">{value}</div>;
        }
    };

    return (
        <tr className="relative">
            {columns.map((item: DataTableRowColumn<ColumnKey>) => (
                <td
                    key={String(item.itemKey)}
                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-700"
                >
                    {renderColumn(item)}
                </td>
            ))}
            {Array.isArray(actions) && (
                <td className="whitespace-nowrap px-4 py-2">
                    <div className="flex flex-1 justify-end">
                        {actions?.map(
                            ({
                                itemKey,
                                icon: Icon,
                            }: DataTableRowAction<ActionKey>) => (
                                <IconButton
                                    key={String(itemKey)}
                                    icon={
                                        <Icon className="text-gray-500 w-4 h-4" />
                                    }
                                    onClick={() => onActionClick?.(itemKey)}
                                />
                            ),
                        )}
                    </div>
                </td>
            )}
        </tr>
    );
}
