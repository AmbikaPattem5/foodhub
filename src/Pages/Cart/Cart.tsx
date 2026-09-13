import useCart from "../../CustomHooks/useCart";
function Cart(){
    const {cartItem,removeItem,totalCartItems,totalCartPrice,incrementCartItem,decrementCartItem} = useCart()
    const deliveryFee=40;
return (
    
        <div>
            {(cartItem.length === 0) ? 
            (<p>Your cart is empty</p>) :
            (<div>
                <h6>Your Cart</h6>  
                <div>
                    {
                        cartItem.map((item)=>(
                        <div key={item.id}>
                            <div>
                                <h4>{item.name}</h4><span>{item.price}</span>
                                <div><button onClick={()=>decrementCartItem(item.id)}> -</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={()=>incrementCartItem(item.id)}> + </button>
                                </div>
                                <div><button onClick={()=>removeItem(item.id)}>Remove</button></div>
                            </div>
                        </div>
                        ))
                    }
                    <h5>Bill Details</h5>
                    <p>Item Total     {totalCartPrice()}</p>
                    <p>Delivery fee    {deliveryFee}</p>
                    <h5>Total          {totalCartPrice()+deliveryFee}</h5>
                </div>  
            </div>)
}
        </div>
               
)
}
export default Cart;