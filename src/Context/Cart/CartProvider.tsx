import { CartContext } from "./CartContext";
import { useState } from "react";
import type { CartItemType, ChildrenProp } from "../../types/Types";
import type { RestaurantMenu } from "../../types/Restaurant";
function CartProvider({ children }: ChildrenProp) {
  const [cartItem, setCartItem] = useState<CartItemType[]>([]);

  function handleAddItem(item: RestaurantMenu) {
    const newCartItem: CartItemType = {
        id: item.id,
        restaurantId: item.restaurantId,
        name: item.name,
        price: item.price,
        quantity: 1,
      }
    if (cartItem.length === 0) {
      addItemsToCart(newCartItem);
      return
    }
    const result = cartItem.some(
      (cartItem) => cartItem.restaurantId !== item.restaurantId,
    );
    if (result) {
      const cartResult = confirm(
        " Already you have cart items from other restaurants.Do you want to clear the cart and new Item?",
      );
      if (cartResult) {
        
      setCartItem([newCartItem])
    } 
    
  }
  else{
    addItemsToCart(newCartItem)
  }
}
  function removeItem(itemId: number) {
    const result: CartItemType[] = cartItem.filter(
      (cart) => cart.id !== itemId,
    );
    setCartItem(result);
  }
  function incrementCartItem(itemId: number) {
    const updatedCartArray = cartItem.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItem([...updatedCartArray]);
  }
  function decrementCartItem(itemId: number) {
    const updatedCart = cartItem
      .map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => !(item.id === itemId && item.quantity === 1));

    setCartItem(updatedCart);
  }

  function totalCartItems() {
    let totalItems: number = 0;
    cartItem.forEach((item) => {
      totalItems = totalItems + item.quantity;
    });
    return totalItems;
  }

  function totalCartPrice() {
    let totalPrice: number = 0;
    cartItem.forEach((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
    });
    return totalPrice;
  }
  function clearCart() {
    setCartItem([]);
  }

  function addItemsToCart(item :CartItemType) {
    const itemExists = cartItem.some((cart) => cart.id === item.id);

    if (itemExists) {
      const updatedCart = cartItem.map((cart) => {
        if (cart.id === item.id) {
          return {
            ...cart,
            quantity: cart.quantity + 1,
          };
        }

        return cart;
      });

      setCartItem(updatedCart);
    } else {
      const newCartItem: CartItemType = {
        id: item.id,
        restaurantId: item.restaurantId,
        name: item.name,
        price: item.price,
        quantity: 1,
      };

      setCartItem([...cartItem, newCartItem]);
    }
  }
 function isItemExist(item : RestaurantMenu):CartItemType | undefined{
  return cartItem.find((oldItem)=>(oldItem.restaurantId === item.restaurantId && oldItem.id === item.id))
 }
  return (
    <CartContext.Provider
      value={{
        cartItem,
        handleAddItem,
        removeItem,
        incrementCartItem,
        decrementCartItem,
        totalCartItems,
        totalCartPrice,
        isItemExist,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export default CartProvider;
