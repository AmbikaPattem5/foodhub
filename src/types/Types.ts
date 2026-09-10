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
    terms:boolean|string;
}
export type AuthContextType={
    user:string,
    login:(username:{name:string})=>void,
    logout:()=>void,
}