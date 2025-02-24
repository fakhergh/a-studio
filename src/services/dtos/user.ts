import {
    PaginatedResponse,
    PaginationQueryParams,
} from '@/services/dtos/request';

interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    country: string;
}

interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
}

interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

interface Crypto {
    coin: string;
    wallet: string;
    network: string;
}

interface Hair {
    color: string;
    type: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: string;
}

export interface UsersQueryParams extends PaginationQueryParams {
    filter?: {
        key: string;
        value: string | number;
    };
}

export interface UsersPaginatedResponse extends PaginatedResponse {
    users: User[];
}
