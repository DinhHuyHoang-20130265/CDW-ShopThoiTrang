import {RaRecord} from 'react-admin';

export type ThemeName = 'light' | 'dark';

export interface Category extends RaRecord {
    name: string;
}

export interface Customer extends RaRecord {
    username: string;
    enabled: boolean;
    orders: object[];
    address: string;
    avatar: string;
    userInfo: {
        fullName: string;
        avtUrl: string;
        phone: string;
        email: string;
    };
    createdDate: string;
    total_spent: number;
}

declare global {
    interface Window {
        restServer: any;
    }
}
