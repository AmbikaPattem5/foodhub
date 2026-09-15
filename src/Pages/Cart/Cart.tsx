import useCart from "../../CustomHooks/useCart";
import { useNavigate } from "react-router-dom";
function Cart() {
  const {
    cartItem,
    removeItem,
    totalCartPrice,
    incrementCartItem,
    decrementCartItem,
  } = useCart();
  const deliveryFee = 40;
  const navigate = useNavigate();
  function handleBrowse() {
    navigate("/");
  }
  function handleCheckOut() {
    navigate('/checkout')
  }
  return (
    <div>
      {cartItem.length === 0 ? (
        <div>
          <p>Your cart is empty</p>
          <h6>Add some delicious food to your cart!</h6>
          <button onClick={handleBrowse}>Browse Restaurants</button>
        </div>
      ) : (
        <div>
          <h6>Your Cart</h6>
          <div>
            {cartItem.map((item) => (
              <div key={item.id}>
                <div>
                  <h4>{item.name}</h4>
                  <span>₹{item.price}</span>
                  <div>
                    <button onClick={() => decrementCartItem(item.id)}>
                      {" "}
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementCartItem(item.id)}>
                      {" "}
                      +{" "}
                    </button>
                  </div>
                  <div>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <h5>Bill Details</h5>
            <p>Item Total ₹{totalCartPrice()}</p>
            <p>Delivery fee ₹{deliveryFee}</p>
            <h5>Total {totalCartPrice() + deliveryFee}</h5>
          </div>
                <button onClick={handleCheckOut}>Proceed to CheckOut</button>
        </div>
      )}
      {/* <button onClick={handleCheckOut}>Proceed to CheckOut</button> */}
    </div>
  );
}
export default Cart;
