import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';

import {
    Column,
    DataTable,
    DataTableRenderRow,
    ToolbarAction,
} from '@/components/DataTable/DataTable';
import { DatePicker } from '@/components/DatePicker/DatePicker';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';
import {
    UserDataTableRowContainer,
    UserDataTableRowContainerProps,
} from '@/containers/UserDataTableRowContainer/UserDataTableRowContainer';
import { useDebounce } from '@/hooks/useDebounce';
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

const genderFilterOptions = ['male', 'female'];

const columns: Array<Column> = [
    { itemKey: 'id', title: 'ID' },
    { itemKey: 'firstName', title: 'First Name' },
    { itemKey: 'lastName', title: 'Last Name' },
    { itemKey: 'maidenName', title: 'Maiden Name' },
    { itemKey: 'age', title: 'Age' },
    { itemKey: 'brithDate', title: 'Brith Date' },
    { itemKey: 'gender', title: 'Gender' },
    { itemKey: 'email', title: 'Email' },
    { itemKey: 'username', title: 'Username' },
    { itemKey: 'bloodGroup', title: 'Blood Group' },
    { itemKey: 'eyeColor', title: 'Eye Color' },
    { itemKey: 'phone', title: 'Phone' },
    { itemKey: 'university', title: 'University' },
    { itemKey: 'company', title: 'Company' },
];

function RouteComponent() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(limitOptions[0]);
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState<
        { key: string; value: string | number } | undefined
    >(undefined);

    const debouncedFilter = useDebounce(filter, 750);

    const formattedFilter = useMemo(() => {
        if (debouncedFilter?.key === 'birthDate')
            return {
                ...debouncedFilter,
                value: dayjs(debouncedFilter.value).format('YYYY-M-D'),
            };

        if (debouncedFilter) return debouncedFilter;

        return undefined;
    }, [debouncedFilter]);

    const { data, isFetching, refetch } = useGetUsersQuery({
        skip: Math.max(page - 1, 0) * limit,
        limit,
        filter: formattedFilter,
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

    const rows: Array<UserDataTableRowContainerProps> = useMemo(
        () =>
            data?.users.map((user) => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                maidenName: user.maidenName,
                age: user.age,
                birthDate: user.birthDate,
                gender: user.gender,
                email: user.email,
                username: user.username,
                bloodGroup: user.bloodGroup,
                eyeColor: user.eyeColor,
                phone: user.phone,
                university: user.university,
                company: user.company.name,
            })) ?? [],
        [data?.users],
    );

    const filteredRow = useMemo(() => {
        const formattedFilterText = searchText.toLowerCase().trim();

        if (formattedFilterText) {
            return rows.filter(
                (row) =>
                    row.id.toString().includes(formattedFilterText) ||
                    row.firstName.toLowerCase().includes(formattedFilterText) ||
                    row.lastName.toLowerCase().includes(formattedFilterText) ||
                    row.maidenName
                        .toLowerCase()
                        .includes(formattedFilterText) ||
                    row.age
                        .toString()
                        .toLowerCase()
                        .includes(formattedFilterText) ||
                    row.birthDate.includes(formattedFilterText) ||
                    row.gender.toLowerCase().includes(formattedFilterText) ||
                    row.email.toLowerCase().includes(formattedFilterText) ||
                    row.username.toLowerCase().includes(formattedFilterText) ||
                    row.bloodGroup
                        .toLowerCase()
                        .includes(formattedFilterText) ||
                    row.eyeColor.toLowerCase().includes(formattedFilterText) ||
                    row.phone.toLowerCase().includes(formattedFilterText) ||
                    row.university
                        .toLowerCase()
                        .includes(formattedFilterText) ||
                    row.company.toLowerCase().includes(formattedFilterText),
            );
        }
        return rows;
    }, [searchText, rows]);

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

    const onFilterChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!event.target.value) return setFilter(undefined);

        setFilter({
            key: event.target.name,
            value: event.target.value,
        });
    };

    const onGenderChange = (gender: string | number) => {
        if (!gender) return setFilter(undefined);
        setFilter({ key: 'gender', value: gender as string });
    };

    const onBirthdateChange = (birthdate: string) => {
        setFilter({ key: 'birthDate', value: birthdate });
    };

    const onSearchTextChange: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        setSearchText(event.target.value);
    };

    const renderFilters = useCallback(
        () => (
            <div className="flex flex-wrap p-2 gap-2  items-center">
                <Input
                    label="Search..."
                    placeholder="Filter list by keyword"
                    value={searchText}
                    onChange={onSearchTextChange}
                />
                <div className="flex flex-wrap gap-2">
                    <div>
                        <Input
                            name="firstName"
                            label="First Name"
                            value={
                                filter?.key === 'firstName' ? filter.value : ''
                            }
                            onChange={onFilterChange}
                        />
                    </div>
                    <div>
                        <Input
                            name="lastName"
                            label="Last Name"
                            value={
                                filter?.key === 'lastName' ? filter.value : ''
                            }
                            onChange={onFilterChange}
                        />
                    </div>
                    <div>
                        <Input
                            name="email"
                            label="Email"
                            value={filter?.key === 'email' ? filter.value : ''}
                            onChange={onFilterChange}
                        />
                    </div>
                    <div>
                        <Select
                            label="Gender"
                            aria-label="page-limit"
                            value={filter?.key === 'gender' ? filter.value : ''}
                            options={genderFilterOptions}
                            onChange={onGenderChange}
                        />
                    </div>
                    <div>
                        <DatePicker
                            label="Birthdate"
                            value={
                                filter?.key === 'birthDate'
                                    ? (filter.value as string)
                                    : ''
                            }
                            onDateChange={onBirthdateChange}
                        />
                    </div>
                </div>
            </div>
        ),
        [filter, searchText],
    );

    return (
        <>
            <DataTable<UserDataTableRowContainerProps, ToolbarActionKey>
                loading={isFetching}
                title="Users"
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
