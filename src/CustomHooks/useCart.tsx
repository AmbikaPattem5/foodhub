import { useContext } from "react";
import { CartContext } from "../Context/Cart/CartContext";
function useCart(){
    const Cart=useContext(CartContext)
    if(Cart===null){
        throw new Error("useCart must be used in context Provider")
    }
    return Cart;
}
export default useCart;