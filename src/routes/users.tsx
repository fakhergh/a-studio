import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import {
    Column,
    DataTable,
    DataTableRenderRow,
    ToolbarAction,
} from '@/components/DataTable/DataTable';
import {
    UserDataTableRowContainer,
    UserDataTableRowContainerProps,
} from '@/containers/UserDataTableRowContainer/UserDataTableRowContainer';
import { useTotalPages } from '@/hooks/useTotalPages';
import { IconRefresh } from '@/icons/IconRefresh';
import { useGetUsersQuery } from '@/services/slices/userSlice';

export const Route = createFileRoute('/users')({
    component: RouteComponent,
});

const limitOptions: Array<number> = [5, 10, 20, 50];

enum ToolbarActionKey {
    REFRESH,
}

function RouteComponent() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(limitOptions[0]);

    const { data, isFetching, refetch } = useGetUsersQuery({
        skip: Math.max(page - 1, 0) * limit,
        limit,
        filter: {
            key: 'gender',
            value: 'female',
        },
    });

    const totalPages = useTotalPages(data?.totalPages);

    const columns: Array<Column> = [
        { itemKey: 'id', title: 'ID' },
        { itemKey: 'firstName', title: 'First Name' },
        { itemKey: 'lastName', title: 'Last Name' },
        { itemKey: 'maidenName', title: 'Maiden Name' },
        { itemKey: 'age', title: 'Age' },
        { itemKey: 'gender', title: 'Gender' },
        { itemKey: 'email', title: 'Email' },
        { itemKey: 'username', title: 'Username' },
        { itemKey: 'bloodGroup', title: 'Blood Group' },
        { itemKey: 'eyeColor', title: 'Eye Color' },
        { itemKey: 'phone', title: 'Phone' },
        { itemKey: 'university', title: 'University' },
        { itemKey: 'company', title: 'Company' },
    ];

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

    const rows: Array<UserDataTableRowContainerProps> =
        data?.users.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            maidenName: user.maidenName,
            age: user.age,
            gender: user.gender,
            email: user.email,
            username: user.username,
            bloodGroup: user.bloodGroup,
            eyeColor: user.eyeColor,
            phone: user.phone,
            university: user.university,
            company: user.company.name,
        })) ?? [];

    const renderRow: DataTableRenderRow<UserDataTableRowContainerProps> = (
        item,
        index,
    ) => (
        <UserDataTableRowContainer
            {...item}
            className={index % 2 === 0 ? 'bg-grey/30' : ''}
        />
    );

    const keyExtractor = (user: UserDataTableRowContainerProps) => user.id;

    const onLimitChange = (nextLimit: number) => {
        setPage(1);
        setLimit(nextLimit);
    };

    return (
        <>
            <DataTable<UserDataTableRowContainerProps, ToolbarActionKey>
                loading={isFetching}
                title="Users"
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
