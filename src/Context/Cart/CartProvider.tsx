import { CartContext } from "./CartContext";
import { useState } from "react";
import type { CartItemType } from "../../types/Types";
function CartProvider({children} : any){
    const [cartItem,setCartItem]=useState<CartItemType[]|[]>([]);
    
    function handleAddItem(item:CartItemType){
        const itemExists : boolean = cartItem.some((cart)=>(cart.id === item.id));
        if(itemExists){
             cartItem.forEach((cart) => {
                if(cart.id === item.id){
                     cart.quantity =Number(cart.quantity) + 1;
                    }

                })
                setCartItem([...cartItem]);
    
        }
        else{
            item.quantity = 1 ;
            setCartItem([...cartItem,item]);
        }
        console.log(cartItem);
    }
    function removeItem(item:CartItemType){
            const result : CartItemType[] = cartItem.filter((cart)=>(cart.id !== item.id))
            setCartItem(result);

    }
    function increamentCartItem(itemId : number){
        cartItem.forEach((item) => { 
            if(item.id === itemId)
            {
                item.quantity = item.quantity + 1;
            } 
     } )
     setCartItem([...cartItem])

    }
    function decreamentCartItem(itemId : number){
        cartItem.forEach((item) => {
            if(item.id === itemId){
                item.quantity = item.quantity - 1;
            }
        })
        setCartItem([...cartItem])
    }

    function totalCartItems(){
        return cartItem.length;
    }

    function totalCartPrice(){
        let totalPrice : number = 0;
        cartItem.forEach((item)=>{
            totalPrice = totalPrice + (item.price * item.quantity);
        })
        return totalPrice;
    }
    

    return(
        <CartContext.Provider value={{cartItem,handleAddItem,removeItem, increamentCartItem, decreamentCartItem,totalCartItems, totalCartPrice}}>
            {children}
        </CartContext.Provider>
)}
export default CartProvider;