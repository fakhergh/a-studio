import {
    DataTableRow,
    DataTableRowColumn,
} from '@/components/DataTableRow/DataTableRow';

export interface UserDataTableRowContainerProps {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    username: string;
    bloodGroup: string;
    eyeColor: string;
    phone: string;
    university: string;
    company: string;
}
enum ColumnKey {
    ID,
    FIRST_NAME,
    LAST_NAME,
    MAIDEN_NAME,
    AGE,
    GENDER,
    EMAIL,
    USER_NAME,
    BLOOD_GROUP,
    EYE_COLOR,
    PHONE,
    UNIVERSITY,
    COMPANY,
}

export function UserDataTableRowContainer({
    id,
    firstName,
    lastName,
    maidenName,
    age,
    gender,
    email,
    username,
    bloodGroup,
    eyeColor,
    phone,
    university,
    company,
}: UserDataTableRowContainerProps) {
    const columns: Array<DataTableRowColumn<ColumnKey>> = [
        { itemKey: ColumnKey.ID, value: id, type: 'text' },
        { itemKey: ColumnKey.FIRST_NAME, value: firstName, type: 'text' },
        { itemKey: ColumnKey.LAST_NAME, value: lastName, type: 'text' },
        { itemKey: ColumnKey.MAIDEN_NAME, value: maidenName, type: 'text' },
        { itemKey: ColumnKey.AGE, value: age, type: 'text' },
        { itemKey: ColumnKey.GENDER, value: gender, type: 'text' },
        { itemKey: ColumnKey.EMAIL, value: email, type: 'text' },
        { itemKey: ColumnKey.USER_NAME, value: username, type: 'text' },
        { itemKey: ColumnKey.BLOOD_GROUP, value: bloodGroup, type: 'text' },
        { itemKey: ColumnKey.EYE_COLOR, value: eyeColor, type: 'text' },
        { itemKey: ColumnKey.PHONE, value: phone, type: 'text' },
        { itemKey: ColumnKey.UNIVERSITY, value: university, type: 'text' },
        { itemKey: ColumnKey.COMPANY, value: company, type: 'text' },
    ];

    return <DataTableRow columns={columns} />;
}
