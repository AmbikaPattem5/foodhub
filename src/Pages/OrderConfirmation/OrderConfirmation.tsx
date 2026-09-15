import type { OrderType } from "../../types/Types";
import { useParams } from "react-router-dom";
function OrderConfirmation() {
  const {orderId} = useParams()
  return (
    <div>
      <h4>🎉 Order Placed Successfully!</h4>
      <h4>{orderId}</h4>
      
    </div>
  )
}
export default OrderConfirmation;
