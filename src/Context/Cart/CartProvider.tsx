import { CartContext } from "./CartContext";
import { useState } from "react";
import type { CartItemType, ChildrenProp } from "../../types/Types";
function CartProvider({children} : ChildrenProp){
    const [cartItem,setCartItem]=useState<CartItemType[]>([]);
    const updatedCartArray=[...cartItem]
    function handleAddItem(item:CartItemType){
        const itemExists : boolean = cartItem.some((cart)=>(cart.id === item.id));
        if(itemExists){
             updatedCartArray.forEach((cart) => {
                if(cart.id === item.id){
                     cart.quantity =Number(cart.quantity) + 1;
                    }

                })
                setCartItem([...updatedCartArray]);
    
        }
        else{
            
            const newCart = {...item}
            newCart.quantity = 1 ;
            setCartItem([...updatedCartArray,newCart]);
        }
        console.log(cartItem);
    }
    function removeItem(itemId : number){
            const result : CartItemType[] = cartItem.filter((cart)=>(cart.id !== item.id))
            setCartItem(result);

    }
    function incrementCartItem(itemId : number){
        updatedCartArray.forEach((item) => { 
            if(item.id === itemId)
            {
                item.quantity = item.quantity + 1;
            } 
     } )
     setCartItem([...updatedCartArray])

    }
    function decrementCartItem(itemId : number){
        updatedCartArray.forEach((item) => {
            
            if(item.id === itemId){
                item.quantity = item.quantity - 1;
                if(item.quantity===0){
                    removeItem(item.id);
                }
            }
        })
        setCartItem([...updatedCartArray])
    }

    function totalCartItems(){
        let totalItems : number = 0;
        cartItem.forEach((item)=>{
            totalItems = totalItems + item.quantity;
        })
        return totalItems;
    }

    function totalCartPrice(){
        let totalPrice : number = 0;
        cartItem.forEach((item)=>{
            totalPrice = totalPrice + (item.price * item.quantity);
        })
        return totalPrice;
    }
    

    return(
        <CartContext.Provider value={{cartItem,handleAddItem,removeItem, incrementCartItem, decrementCartItem,totalCartItems, totalCartPrice}}>
            {children}
        </CartContext.Provider>
)}
export default CartProvider;