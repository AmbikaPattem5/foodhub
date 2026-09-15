import type { OrderType } from "../../types/Types";

function Orders(){
    const orders : string|null = localStorage.getItem("orders");
    const orderDetails : OrderType[] = orders=== null ? [] : JSON.parse(orders);
    
    return(
        <div>{
            orderDetails.map((order) => (
                <div key={order.id}>
                   <h4> {new Date(Number(order.createdAt)*1000 ).toLocaleString()}</h4>
                   <h4>{order.totalAmount}</h4>
                   <h4>{order.items.map((item)=>
                        <div key={item.id}>
                            <p>{item.name}</p>
                            <p>{item.price *item.quantity }</p>
                            <p>{item.quantity}</p>
                        </div>
                )}</h4>
                </div>
                
            ))
            }</div>
    )
}
export default Orders;