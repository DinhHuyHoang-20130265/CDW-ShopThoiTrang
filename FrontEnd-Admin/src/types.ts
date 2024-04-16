import {RaRecord} from 'react-admin';

export type ThemeName = 'light' | 'dark';

// export interface Category extends RaRecord {
//     name: string;
// }

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
    role: {
        id: number,
        name: string,
        authority: string
    },
    role_name: string,
    resourceVariations: {
        id: number,
        resource: Resource,
        permissions: Permission[]
    },
    createdDate: string;
    total_spent: number;
}

export interface Category extends RaRecord {
    id: number,
    name: string,
    parentId: number | null,
    status: boolean,
    releaseDate: string,
    releaseBy: string,
    updateDate: string,
    updateBy: string
}

export interface Size extends RaRecord {
    id: number,
    size: string,
    stock: number,
    status: boolean,
    releaseDate: string,
    releaseBy: string,
    updateDate: string,
    updateBy: string
}

export interface Variation extends RaRecord {

    id: number,
    color: string,
    status: boolean,
    releaseDate: string,
    releaseBy: string,
    updateDate: string,
    updateBy: string,
    sizes: Size[]

}

export interface ImageProduct extends RaRecord {
    id: number,
    url: string,
    releaseDate: string,
    releaseBy: string,
    updateDate: string,
    updateBy: string
}

export interface Promotion extends RaRecord {
    id: number,
    name: string,
    description: string | null,
    discount: number,
    status: boolean,
    thumbnail: string,
    startDate: string,
    endDate: string,
    createdDate: string,
    updatedDate: string
}

export interface Price extends RaRecord {
    id: number,
    price: number,
    updatedDate: string

}

export interface Product extends RaRecord {

    id: number,
    name: string,
    description: string,
    content: string,
    status: boolean,
    imageUrl: string,
    releaseDate: string,
    updateDate: string,
    price: Price,
    categories: Category[],
    variations: Variation[],
    imgProducts: ImageProduct[],
    promotions: Promotion[],
}

export interface Blog extends RaRecord {
    id: number,
    title: string,
    description: string,
    content: string,
    thumbnail: string,
    createDate: string,
    updateDate: string,
    status: boolean,
}

export interface ImportInvoice extends RaRecord {
    id: number,
    importDate: string,
    product: Product,
    variation: Variation,
    size: Size,
    quantity: number,
    importPrice: number,
}

export interface ImportInvoiceRequest {
    importDate: string,
    idProduct: number,
    idVariation: number,
    idSize: number,
    quantity: number,
    importPrice: number,
}

export interface Permission extends RaRecord {
    id: number,
    name: string,
}

export interface Resource extends RaRecord {
    id: number,
    name: string,
}

export interface OrderStatus extends RaRecord {
    id: number,
    name: string,
}

export interface OrderDetail extends RaRecord {
    id: number,
    product: Product,
    variation: Variation,
    size: Size,
    quantity: number,
    price: number,
}

export interface OrderStatusHistory extends RaRecord {
    id: number,
    status: OrderStatus,
    createdDate: string,
}
export interface Order extends RaRecord {
    id: number,
    name: string,
    note: string,
    address: string,
    phone: string,
    shippingFee: number,
    totalAmount: number,
    OrderDate: string,
    user: Customer,
    status: OrderStatus,
    total: number,
    orderDetails: OrderDetail[],
    orderStatusHistories: OrderStatusHistory[],
}


declare global {
    interface Window {
        restServer: any;
    }
}
