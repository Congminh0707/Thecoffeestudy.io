import { CartItem } from './cart-item';
export interface User {
    address: string;
    blocked: boolean;
    cart: CartItem;
    confirmed: boolean;
    email: string;
    fullname: string;
    id: string;
    oder ;
    order: []
    orders: []
    phone: string;
    provider: string;
    role: {
        id: string;
        name: string;
    };
    jwt: string;
    username: string;
    _id: string;
}