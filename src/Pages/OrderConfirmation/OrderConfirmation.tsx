import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function OrderConfirmation() {
  const {orderId} = useParams()
  return (
    <div>
      <h4>🎉 Order Placed Successfully!</h4>
      <h4>{orderId}</h4>
      <p>Your order has been placed successfully.</p>
      <Link to='/orders'>View My Orders</Link>
      <Link to='/'>Continue Shopping</Link>
      
    </div>
  )
}
export default OrderConfirmation;
