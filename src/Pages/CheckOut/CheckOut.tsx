import { useState } from "react";
import { OrderStatus, type DeliveryDetails } from "../../types/Types";
import useCart from "../../CustomHooks/useCart";
import type { addressErrors, OrderType } from "../../types/Types";
import { Link, useNavigate } from "react-router-dom";
function CheckOut() {
  const [address, setAddress] = useState<DeliveryDetails>({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const navigate = useNavigate();
  const [errors,setErrors] = useState<addressErrors>({name:"",phone:"",address:"",city:"",pincode:""})
  const updateErrors : addressErrors =  {name:"",phone:"",address:"",city:"",pincode:""};
  const { cartItem, totalCartPrice, clearCart } = useCart();
  const deliveryFee: number = 40;
  function handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      setAddress({ ...address, [e.target.name]: e.target.value });

  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    
    e.preventDefault();
    const phonePattern = /^[0-9]{10}$/;
    const pincodePattern = /^[0-9]{6}$/;
    if(address.name === ""){
      updateErrors.name = " Name is required"
        }
    if(address.phone === ""){
      updateErrors.phone = "Phone number is required"
    }
    else if(!(phonePattern).test(address.phone)){
      updateErrors.phone = "Phone number must be 10 digits "
    }
    if(address.city === ""){
      updateErrors.city = "City is required";
    }
    if(address.address === ""){
      updateErrors.address = "Address is required"
    }
    if(address.pincode === ""){
      updateErrors.pincode = "PinCode is required"
    }
    else if(!(pincodePattern).test(address.pincode)){
      updateErrors.pincode = "PinCode must be 6 digits"
    }
    setErrors(updateErrors);
    const errorResult = Object.values(updateErrors).some((errorMessage)=>(errorMessage!== ""))
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

    if(response === null) {
      updatedOrders = [newOrder];
    }
    else{
      const responseData : OrderType[] =JSON.parse(response);
      updatedOrders = [...responseData, newOrder]
    }
    localStorage.setItem("orders",JSON.stringify(updatedOrders));
    clearCart();
    setErrors({name:"",phone:"",address:"",city:"",pincode:"",});
    navigate(`/orderConfirmation/${newOrder.id}`)
  }
  
  return (
    <div>
      {        cartItem.length!==0 ?

      <div>
        <div>
          <h4>Delivery Address</h4>
          <form onSubmit={handleSubmit}>
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
              type="tel"
              name="phone"
              value={address.phone}
              onChange={handleChange}
            />
            {errors.phone && <p>{errors.phone}</p>}
            <br />
            <label>Address</label>
            <textarea
              name="address"
              value={address.address}
              onChange={handleChange}
            />
            {errors.address &&<p>{errors.address}</p>}
            <br />
            <label>City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
            />
            {errors.city && <p>{errors.city}</p>}
            <br />
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
            />
            {errors.pincode && <p>{errors.pincode}</p>}
            <br />
                  <button type="submit" >Place Order</button>
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
        
      </div>:
      <div>
        <p>cart is empty</p>
        <Link to="/cart">Go back to Cart</Link>
        </div>
}
    </div>
  );
}

export default CheckOut;
