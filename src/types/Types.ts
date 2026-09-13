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
    handleAddItem : (item : CartItemType) => void;
    removeItem : (item : CartItemType) => void;
    increamentCartItem : (itemId : number) => void;
    decreamentCartItem : (itemId : number) => void;
    totalCartItems : () => number ;
    totalCartPrice : () => number;
}