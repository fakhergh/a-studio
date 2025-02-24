import { Fragment, ReactNode } from 'react';

import { IconButton } from '@/components/IconButton/IconButton';
import { Pagination } from '@/components/Pagination/Pagination';
import { Select } from '@/components/Select/Select';

export interface Column {
    itemKey: string;
    title: string;
}

export interface ToolbarAction<K = string> {
    itemKey: K;
    icon: ReactNode;
    disabled?: boolean;
}

export type DataTableRenderRow<ItemType> = (
    value: ItemType,
    index: number,
) => ReactNode;

export interface DataTableProps<ItemType, ToolbarActionKey> {
    title?: string;
    columns: Array<Column>;
    rows: Array<ItemType>;
    toolbarActions?: Array<ToolbarAction<ToolbarActionKey>>;
    onToolbarActionClick?: (key: ToolbarActionKey) => void;
    renderRow: DataTableRenderRow<ItemType>;
    keyExtractor?: (item: ItemType, index: number) => string | number;
    page?: number;
    totalPages?: number;
    onPageChange?: (nextPage: number) => void;
    loading?: boolean;
    limit?: number;
    limitOptions?: Array<number>;
    onLimitChange?: (limit: number) => void;
}

export function DataTable<T, ToolbarActionKey = string>({
    title,
    columns = [],
    rows = [],
    renderRow,
    toolbarActions,
    onToolbarActionClick,
    keyExtractor,
    page,
    totalPages = 0,
    onPageChange,
    loading,
    limit,
    limitOptions,
    onLimitChange,
}: DataTableProps<T, ToolbarActionKey>) {
    return (
        <div className="flex flex-1 flex-col overflow-x-auto rounded-lg border border-gray-100">
            <div className="flex p-2 gap-4 items-center">
                <h3 className="text-gray-900">{title}</h3>
                <div className="flex flex-1 justify-end">
                    {toolbarActions?.map((item) => (
                        <IconButton
                            key={String(item.itemKey)}
                            icon={item.icon}
                            onClick={() => onToolbarActionClick?.(item.itemKey)}
                            disabled={item.disabled}
                        />
                    ))}
                </div>
            </div>
            <div
                className={`w-full h-0.5 ${loading ? 'bg-blue/20' : 'bg-gray-50/30'} overflow-hidden rounded`}
            >
                {loading && (
                    <div className="w-full h-full bg-blue animate-progress" />
                )}
            </div>

            <div className="flex-1 overflow-auto border-y border-y-gray-100">
                <table className="min-w-full divide-y-2 divide-gray-100 bg-white text-sm">
                    <thead className="text-left sticky top-0 bg-white z-[1]">
                        <tr className="bg-blue/30">
                            {columns.map((column) => (
                                <th
                                    key={column.itemKey}
                                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 rtl:text-right"
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {rows.map((row, index) => (
                            <Fragment key={keyExtractor?.(row, index)}>
                                {renderRow(row, index)}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div
                className={`w-full h-0.5 ${loading ? 'bg-blue/20' : 'bg-gray-50/30'} overflow-hidden rounded`}
            >
                {loading && (
                    <div className="w-full h-full bg-blue animate-progress" />
                )}
            </div>

            <div className="flex gap-10 justify-end rounded-b-lg px-4 py-2">
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={(nextPage) => onPageChange?.(nextPage)}
                />

                {Array.isArray(limitOptions) && (
                    <Select
                        className="w-20"
                        value={limit}
                        options={limitOptions}
                        onChange={(v) => onLimitChange?.(v as number)}
                    />
                )}
            </div>
        </div>
    );
}
