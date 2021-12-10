import { Cart } from './cart';
export interface User {
    address: string;
    blocked: boolean;
    cart: {};
    confirmed: boolean;
    email: string;
    fullname: string;
    id: string;
    oder ;
    order: []
    orders: []
    phone: string;
    provider: string;
    role: {};
    username: string;
    _id: string;
}