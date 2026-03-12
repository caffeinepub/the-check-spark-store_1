import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    giftMessage?: string;
    productId: bigint;
    quantity: bigint;
    sendAsGift: boolean;
}
export interface Order {
    id: bigint;
    giftMessage?: string;
    totalAmount: bigint;
    items: Array<CartItem>;
}
export interface UserProfile {
    name: string;
    email: string;
    shippingAddress: string;
}
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export enum Category {
    allJewellery = "allJewellery",
    giftHampers = "giftHampers",
    bags = "bags",
    hairAccessories = "hairAccessories",
    necklaces = "necklaces",
    anklets = "anklets",
    earrings = "earrings",
    otherAccessories = "otherAccessories",
    customize = "customize",
    bracelets = "bracelets"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<bigint>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getOrders(): Promise<Array<Order>>;
    getProductById(productId: bigint): Promise<Product | null>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(giftMessage: string | null): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
