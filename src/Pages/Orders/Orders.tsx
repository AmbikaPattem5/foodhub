import { Link } from "react-router-dom";
import type { OrderType } from "../../types/Types";

function Orders(){
    const orders : string|null = localStorage.getItem("orders");
    const orderDetails : OrderType[] = orders=== null ? [] : JSON.parse(orders);
    
    return(
        <div>
            {orderDetails.length === 0 ?            
            
            <div>
                <p>My Orders</p>
                <p>You have not placed any orders</p>
                <Link to='/'>Browse Restaurants</Link>
            </div>:
            
            orderDetails.map((order) => (
                <div key={order.id}>
                   <h4> {new Date(Number(order.createdAt)).toLocaleString()}</h4>
                   <h4>{order.totalAmount}</h4>
                   <h4>{order.status}</h4>
                   <div>{order.items.map((item)=>
                        <div key={item.id}>
                            <p>{item.name}</p>
                            <p>{item.price *item.quantity }</p>
                            <p>{item.quantity}</p>
                        </div>
                )}</div>
                </div>
                
            ))
}</div>
    )
}
export default Orders;