import React, { useState } from "react";
import { OrderStatus, type DeliveryDetails } from "../../types/Types";
import useCart from "../../CustomHooks/useCart";
import type { addressErrors, OrderType } from "../../types/Types";
import { Link, useNavigate } from "react-router-dom";
import useCoupen from "../../CustomHooks/useCoupen";
import CouponInput from "../../Components/Coupen/CouponInput";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  MapPin,
  Phone,
  User,
  Building2,
  Hash,
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
  Lock
} from "lucide-react";

function CheckOut() {
  const [address, setAddress] = useState<DeliveryDetails>({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const { calculateDiscount } = useCoupen();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<addressErrors>({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const { cartItem, totalCartPrice, clearCart } = useCart();
  const deliveryFee = 40;
  const discount = calculateDiscount() || 0;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setAddress({ ...address, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof addressErrors]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const phonePattern = /^[0-9]{10}$/;
    const pincodePattern = /^[0-9]{6}$/;

    const updateErrors: addressErrors = {
      name: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
    };

    if (address.name.trim() === "") {
      updateErrors.name = "Full name is required";
    }
    if (address.phone.trim() === "") {
      updateErrors.phone = "Phone number is required";
    } else if (!phonePattern.test(address.phone.trim())) {
      updateErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (address.address.trim() === "") {
      updateErrors.address = "Street address is required";
    }
    if (address.city.trim() === "") {
      updateErrors.city = "City is required";
    }
    if (address.pincode.trim() === "") {
      updateErrors.pincode = "PinCode is required";
    } else if (!pincodePattern.test(address.pincode.trim())) {
      updateErrors.pincode = "PinCode must be exactly 6 digits";
    }

    setErrors(updateErrors);
    const hasError = Object.values(updateErrors).some((msg) => msg !== "");
    if (hasError) {
      return;
    }

    const grandTotal = Math.max(0, totalCartPrice() + deliveryFee - discount);

    const newOrder: OrderType = {
      id: crypto.randomUUID(),
      user: address.name,
      items: cartItem,
      address: `${address.address}, ${address.city}, PIN: ${address.pincode} (Ph: ${address.phone})`,
      totalAmount: grandTotal,
      status: OrderStatus.Placed,
      createdAt: String(Date.now()),
    };
    try {
      const response = await api.post("/orders", newOrder)
      toast.success(response.data.message || "Order placed successfully", { duration: 2500 })
      navigate(`/orderConfirmation/${newOrder.id}`);
    }
    catch (err) {
      toast.error("Failed to place order! Please try again.", { duration: 2500 });
    }
    finally {
      clearCart();
      setErrors({ name: "", phone: "", address: "", city: "", pincode: "" });
    }
  }

  const subtotal = totalCartPrice();
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {cartItem.length !== 0 ? (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
              <p className="text-sm text-gray-500 mt-1">Provide delivery details to complete your order</p>
            </div>
            <Link
              to="/cart"
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-red-600 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Cart
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left: Delivery Address Form */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Delivery Address</h2>
                      <p className="text-xs text-gray-500">Where should we deliver your hot meal?</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="sm:col-span-1 space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gray-400" /> Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={address.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-gray-50/50 outline-hidden transition ${errors.name
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30"
                          : "border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                          }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="sm:col-span-1 space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={address.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-gray-50/50 outline-hidden transition ${errors.phone
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30"
                          : "border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                          }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Street Address */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-gray-400" /> Complete Address
                      </label>
                      <textarea
                        name="address"
                        rows={3}
                        value={address.address}
                        onChange={handleChange}
                        placeholder="Flat/House no., building name, street, landmark"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-gray-50/50 outline-hidden transition resize-none ${errors.address
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30"
                          : "border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                          }`}
                      />
                      {errors.address && (
                        <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.address}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div className="sm:col-span-1 space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" /> City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                        placeholder="e.g. Bangalore"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-gray-50/50 outline-hidden transition ${errors.city
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30"
                          : "border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                          }`}
                      />
                      {errors.city && (
                        <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.city}
                        </p>
                      )}
                    </div>

                    {/* Pin Code */}
                    <div className="sm:col-span-1 space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-gray-400" /> Pin Code
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={address.pincode}
                        onChange={handleChange}
                        placeholder="6-digit PIN code"
                        maxLength={6}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-gray-50/50 outline-hidden transition ${errors.pincode
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30"
                          : "border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                          }`}
                      />
                      {errors.pincode && (
                        <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 text-xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Your delivery details are encrypted and securely stored for your active order.</span>
                </div>
              </div>

              {/* Right: Order Summary & Bill */}
              <div className="lg:col-span-1 space-y-6">
                {/* Coupon component */}
                <CouponInput />

                {/* Summary Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-6">
                  <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                    Order Summary
                  </h2>

                  {/* Items breakdown */}
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 no-scrollbar divide-y divide-gray-50">
                    {cartItem.map((item) => (
                      <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex-1 pr-2">
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-gray-900">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bill Details */}
                  <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Item Total</span>
                      <span className="font-semibold text-gray-900">₹{subtotal}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span className="font-semibold text-gray-900">₹{deliveryFee}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex items-center justify-between text-emerald-600 font-semibold">
                        <span>Coupon Discount</span>
                        <span>- ₹{discount}</span>
                      </div>
                    )}

                    <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-base font-extrabold text-gray-900">
                      <span>Grand Total</span>
                      <span className="text-xl text-red-600">₹{grandTotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer text-sm"
                  >
                    <Lock className="w-4 h-4" /> Place Order (₹{grandTotal})
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="text-4xl">🛒</div>
          <h2 className="text-xl font-bold text-gray-900">Your Cart is Empty</h2>
          <p className="text-sm text-gray-500">Please add items to your cart before proceeding to checkout.</p>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-xs transition"
          >
            Go to Cart
          </Link>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
