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
    clearCart: () => void;
}
export type ChildrenProp = {
  children: React.ReactNode;
}

export type DeliveryDetails = {
    name : string;
    phone : number|"";
    address : string;
    city : string;
    pincode : number|"";
}
export type addressErrors = {
    name: string;
    phone : number|string;
    pincode: number | string;
    address: string;
    city: string;
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
    totalAmount: number  ;
    status: OrderStatus  ;
    createdAt :string
}