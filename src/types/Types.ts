import type { RestaurantMenu } from "./Restaurant";

export type User = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone: string,
    terms: boolean;
}
export type LoginUser = Pick<User, 'name' | 'password'> & {
    remember: boolean,
}
export type FormErrors = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    terms: string;
}
export type AuthContextType = {
    user: string | null,
    login: (username: string) => void
    logout: () => void,
}
export type CartItemType = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    restaurantId: number;
}
export type CartContextType = {
    cartItem: CartItemType[];
    handleAddItem: (item: RestaurantMenu) => void;
    removeItem: (itemId: number) => void;
    incrementCartItem: (itemId: number) => void;
    decrementCartItem: (itemId: number) => void;
    totalCartItems: () => number;
    totalCartPrice: () => number;
    clearCart: () => void;
    isItemExist: (item: RestaurantMenu) => CartItemType | undefined;
}
export type ChildrenProp = {
    children: React.ReactNode;
}

export type DeliveryDetails = {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
}
export type addressErrors = {
    name: string;
    phone: string;
    pincode: string;
    address: string;
    city: string;
}
export const OrderStatus = {
    Placed: "Placed",
    Preparing: "Preparing",
    OutForDelivery: "OutForDelivery",
    Delivered: "Delivered",
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export type OrderType = {
    id: string;
    user: string;
    items: Array<CartItemType>;
    address: string;
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
}

export const DiscountType = {
    PERCENTAGE: "PERCENTAGE",
    FLAT: "FLAT"
} as const;
export type DiscountType = (typeof DiscountType)[keyof typeof DiscountType];
export type Coupon = {
    id: number,
    code: string;
    discountType: DiscountType;
    discountValue: number;
    minimumOrderAmount: number;
    isActive: boolean;
}
export type CoupenContextType = {
    appliedCoupen: Coupon | undefined;
    applyCoupon: (code: string) => void;
    removeCoupon: () => void;
    calculateDiscount: () => undefined | number;
    validateCoupon: () => boolean

}
export type FavoriteContextType = {

    favorites: number[];
    addFavorites: (id: number) => void;
}

export type RestaurantContextType = {
    cuisines: string[];
    loading: boolean;
    error: string | null;
    refreshRestaurants: () => Promise<void>;
};