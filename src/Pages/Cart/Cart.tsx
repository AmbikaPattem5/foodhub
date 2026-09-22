import useCart from "../../CustomHooks/useCart";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";

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
    navigate("/checkout");
  }

  const subtotal = totalCartPrice();
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {cartItem.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 sm:p-16 text-center max-w-lg mx-auto space-y-6 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900">Your Cart is Empty</h2>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              Looks like you haven't added anything to your cart yet. Explore our top restaurants and satisfy your cravings!
            </p>
          </div>
          <button
            type="button"
            onClick={handleBrowse}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            Browse Restaurants
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Cart</h1>
              <p className="text-sm text-gray-500 mt-1">
                Review your items before proceeding to checkout
              </p>
            </div>
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-red-600 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Add more items
            </Link>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xs divide-y divide-gray-100 overflow-hidden">
                {cartItem.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/60 transition"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">₹{item.price} each</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                        <button
                          type="button"
                          onClick={() => decrementCartItem(item.id)}
                          className="p-1.5 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-gray-200 transition cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs sm:text-sm font-bold min-w-7 text-center select-none text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => incrementCartItem(item.id)}
                          className="p-1.5 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-gray-200 transition cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <span className="font-bold text-gray-900 text-sm sm:text-base min-w-16 text-right">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Remove from cart"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50/60 rounded-xl border border-amber-200/80 p-4 text-xs text-amber-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Orders are freshly prepared and safely delivered to your doorstep.</span>
              </div>
            </div>

            {/* Right: Bill Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                  Bill Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Item Total</span>
                    <span className="font-semibold text-gray-900">₹{subtotal}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-gray-900">₹{deliveryFee}</span>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-base font-extrabold text-gray-900">
                    <span>To Pay</span>
                    <span className="text-xl text-red-600">₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckOut}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer text-sm"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
