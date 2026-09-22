import { useParams, Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Clock, ShieldCheck } from "lucide-react";

function OrderConfirmation() {
  const { orderId } = useParams();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      {/* Success Badge */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg animate-in zoom-in-75 duration-300">
          <CheckCircle className="w-12 h-12" />
        </div>
        <div className="absolute -top-2 -right-2 text-2xl">🎉</div>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
          Thank you for choosing FoodHub. Your order has been confirmed and the kitchen is preparing your delicious meal.
        </p>
      </div>

      {/* Order ID Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs max-w-md mx-auto space-y-3 text-left">
        <div className="flex items-center justify-between text-xs text-gray-500 border-b border-gray-100 pb-3">
          <span>Order Reference</span>
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Confirmed
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-400">Order ID</span>
          <p className="text-xs sm:text-sm font-mono font-bold text-gray-900 break-all select-all">
            {orderId}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 bg-amber-50 text-amber-800 p-2.5 rounded-xl border border-amber-200/60">
          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Estimated delivery time: <strong>30-40 minutes</strong></span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 max-w-md mx-auto">
        <Link
          to={`/orders/${orderId}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
        >
          <Package className="w-4 h-4" /> Track Order Status
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm transition-all"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
