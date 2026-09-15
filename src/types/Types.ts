import type { RestaurantMenu } from "./Restaurant";

export type User={
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    phone:string,
    terms:boolean;
}
export type LoginUser=Pick<User,'name'|'password'>&{
    remember:boolean,
}
export type FormErrors={
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
    phone:string;
    terms:string;
}
export type AuthContextType={
    user:string,
    login:(username:string)=>void
    logout:()=>void,
}
export type CartItemType={
    id:number;
    name:string;
    price:number;
    quantity:number;
    restaurantId:number;
}
export type CartContextType = {
    cartItem : CartItemType[];
    handleAddItem : (item : RestaurantMenu) => void;
    removeItem : (itemId : number) => void;
    incrementCartItem : (itemId : number) => void;
    decrementCartItem : (itemId : number) => void;
    totalCartItems : () => number ;
    totalCartPrice : () => number;
}
export type ChildrenProp = {
  children: React.ReactNode;
}

export type DeliveryDetails = {
    name : string;
    phone : number|undefined;
    address : string;
    city : string;
    pincode : number|undefined;
}
export type addressErrors = {
    name: string;
    phone : number|string;
    pincode: number | string
}
export enum OrderStatus {
    Placed = "Placed",
    Preparing = "Preparing",
    OutForDelivery = "OutForDelivery",
    Delivered = "Delivered",

}
export type OrderType = {
    id: string;
    user: string;
    items: Array<CartItemType>;
    address: string;
    totalAmount: number | undefined;
    status: OrderStatus | undefined;
    createdAt :string
}