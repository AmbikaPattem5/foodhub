import { useState } from "react";
import { OrderStatus, type DeliveryDetails } from "../../types/Types";
import useCart from "../../CustomHooks/useCart";
import type { addressErrors, OrderType } from "../../types/Types";
import { useNavigate } from "react-router-dom";
function CheckOut() {
  const [address, setAddress] = useState<DeliveryDetails>({
    name: "",
    phone: undefined,
    address: "",
    city: "",
    pincode: undefined,
  });
  const navigate = useNavigate();
  const [orders,setOrders] = useState<OrderType[]>([])
  const [errors,setErrors] = useState<addressErrors>({name:"",phone:"",pincode:""})
  const updateErrors : addressErrors =  {name:"",phone:"",pincode:""};
  const { cartItem, totalCartPrice } = useCart();
  const deliveryFee: number = 40;
  function handleChange(e) {
    if (e.target.name === "name") {
      setAddress({ ...address, [e.target.name]: e.target.value });
    }
    if (e.target.name === "phone") {
      setAddress({ ...address, [e.target.name]: e.target.value });
    }
    if (e.target.name === "address") {
      setAddress({ ...address, [e.target.name]: e.target.value });
    }
    if (e.target.name === "city") {
      setAddress({ ...address, [e.target.name]: e.target.value });
    }
    if (e.target.name === "pincode") {
      setAddress({ ...address, [e.target.name]: e.target.value });
    }
  }
  function handleSubmit(e){
    
    e.preventDefault();
    const phonePattern = /^[0-9]{10}$/;
    const pincodePattern = /^[0-9]{6}$/;
    if(address.name === ""){
      updateErrors.name = " Name is required"
        }
    if(address.phone === undefined){
      updateErrors.phone = "Phone number is required"
    }
    else if(!(phonePattern).test(address.phone.toString())){
      updateErrors.phone = "Phone number must be 10 digits "
    }
    if(address.pincode === undefined){
      updateErrors.pincode = "PinCode is required"
    }
    else if(!(pincodePattern).test(address.pincode.toString())){
      updateErrors.pincode = "PinCode must be 6 digits"
    }
    setErrors(updateErrors);
    const errorResult = Object.values(errors).some((errorMessage)=>(errorMessage!=""))
    if(errorResult){
      return;
    }
    const newOrder : OrderType = {
      id : crypto.randomUUID(),
      user : address.name,
      items : cartItem,
      address : `${address.address},${address.city},${address.phone},${address.pincode}`,
      totalAmount : totalCartPrice() + deliveryFee,
      status : OrderStatus.Placed,
      createdAt : String(Date.now())

    }
    let  updatedOrders: OrderType[]
    const response:string |null = localStorage.getItem("orders");
    const responseData: OrderType[] = response===null ? [] : JSON.parse(response);

    if(responseData === null) {
      updatedOrders = orders
    }
    else{
      updatedOrders = [...responseData, newOrder]
    }
    localStorage.setItem("orders",JSON.stringify(updatedOrders));
    setOrders(updatedOrders)
    setErrors({name:"",phone:"",pincode:""});
    navigate(`/orderConfirmation/${newOrder.id}`)
  }
  
  return (
    <div>
      <div>
        <div>
          <h4>Delivery Address</h4>
          <form>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={address.name}
              onChange={handleChange}
            />
            {errors.name &&<p>{errors.name}</p>}
            <br />
            <label>Phone Number</label>
            <input
              type="number"
              name="phone"
              value={address.phone}
              onChange={handleChange}
            />
            {errors.phone && <p>{errors.phone}</p>}
            <br />
            <label>Address</label>
            <input
              type="textarea"
              name="address"
              value={address.address}
              onChange={handleChange}
            />
            <br />
            <label>City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
            />
            <br />
            <label>Pincode</label>
            <input
              type="number"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
            />
            {errors.pincode && <p>{errors.pincode}</p>}
            <br />
          </form>
        </div>
        <div>
          <h4>Order Summary</h4>
          {cartItem.map((item) => (
            <div key= {item.id}>
              <p>{item.name}</p>
              <p>{item.price * item.quantity}</p>
              <p>{item.quantity}</p>
            </div>
          ))}
        </div>
        <div>
            <h4>Bill Details</h4>
           <h5>Item Total {totalCartPrice()}</h5>
           <h5>Delivery Fee {deliveryFee}</h5>
           <br/>
           <h4>Grand Total {totalCartPrice() + deliveryFee}</h4>
        </div>
      </div>
      <button type="submit" onClick= {handleSubmit}>Place Order</button>
    </div>
  );
}

export default CheckOut;
