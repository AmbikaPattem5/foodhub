import { useParams } from "react-router-dom"
import type { OrderType } from "../../types/Types";
import { Link } from "react-router-dom";
import { OrderStatus } from "../../types/Types";
import { useState } from "react";
function OrderDetails() {
    const {orderId} = useParams()
    const response :string|null = localStorage.getItem("orders");
    const orders : OrderType[] = response === null ?[] : JSON.parse(response);
    const orderList: OrderType| undefined = orders.find((order)=>(order.id === orderId))
    const [orderDetails,setOrderDetails] = useState<OrderType|undefined>(orderList)
    const statusValues: OrderStatus[] = Object.values(OrderStatus) ;
    const currentStatus : number = statusValues.findIndex((orderStatus) => orderStatus === orderDetails?.status);
    const nextStatusValue : OrderStatus = statusValues[currentStatus+1];
    // let updatedCurrentStatus : number = currentStatus + 1; 
    function handleStatusUpdate(nextStatusValue : OrderStatus) {
         if (!orderDetails || !nextStatusValue) return;
        const updatedOrderDetails : OrderType ={...orderDetails,status:nextStatusValue}

    
    const updatedOrderList = orders.map((order)=>(order.id===orderId ?updatedOrderDetails : order))
    localStorage.setItem("orders",JSON.stringify(updatedOrderList));
    setOrderDetails(updatedOrderDetails)
    }
    return(
        <div>{orderDetails !== undefined?
            <div>
            <h4>OrderId : {orderDetails.id}</h4>
            <h4>OrderDate: {new Date(Number(orderDetails.createdAt)).toLocaleString()}</h4>
            <div>{orderDetails.items.map((item)=>(
                <div key= {item.id}>
                    <h6>Name : {item.name}</h6>
                    <h6>Quantity : {item.quantity}</h6>
                    <h6>Total Price : {item.price} * {item.quantity}     {item.price * item.quantity}</h6>
                </div>
            ))}</div>
            <h4>Address : {orderDetails.address}</h4>
            <h4>Bill Details : {orderDetails.totalAmount}</h4>
            <div>{statusValues.map((status,index)=>(
                
                <p key={status}>{currentStatus >= index ? <span> &#10004;</span> : ""} {status} </p>
            ))
                }</div>
                { nextStatusValue ?
            <button onClick={()=>handleStatusUpdate(nextStatusValue)}>Move to {nextStatusValue}</button>
             :
             ""   }
           </div> :  
           <div>
             <h5>No Orders Found</h5>
             <Link to='/orders'>Back to Orders</Link>
           </div>
        }
        </div>
    )
}
export default OrderDetails