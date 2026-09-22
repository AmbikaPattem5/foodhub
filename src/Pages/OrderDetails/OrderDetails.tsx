import { useParams, Link } from "react-router-dom";
import type { OrderType } from "../../types/Types";
import { OrderStatus } from "../../types/Types";
import { useState } from "react";
import { 
  ArrowLeft, 
  Clock, 
  ChefHat, 
  Bike, 
  CheckCircle2, 
  MapPin, 
  Receipt, 
  Play, 
  Check, 
  Calendar,
  ShieldCheck
} from "lucide-react";

function OrderDetails() {
  const { orderId } = useParams();
  const response: string | null = localStorage.getItem("orders");
  const orders: OrderType[] = response === null ? [] : JSON.parse(response);
  const orderList: OrderType | undefined = orders.find((order) => order.id === orderId);
  const [orderDetails, setOrderDetails] = useState<OrderType | undefined>(orderList);

  const statusValues: OrderStatus[] = Object.values(OrderStatus);
  const currentStatus: number = statusValues.findIndex(
    (orderStatus) => orderStatus === orderDetails?.status
  );
  const nextStatusValue: OrderStatus | undefined = statusValues[currentStatus + 1];

  function handleStatusUpdate(nextStatus: OrderStatus) {
    if (!orderDetails || !nextStatus) return;
    const updatedOrderDetails: OrderType = { ...orderDetails, status: nextStatus };

    const updatedOrderList = orders.map((order) =>
      order.id === orderId ? updatedOrderDetails : order
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrderList));
    setOrderDetails(updatedOrderDetails);
  }

  const steps = [
    { label: "Placed", desc: "Order received by restaurant", icon: Clock },
    { label: "Preparing", desc: "Chef is preparing your food", icon: ChefHat },
    { label: "OutForDelivery", desc: "Delivery partner on the way", icon: Bike },
    { label: "Delivered", desc: "Delivered at your address", icon: CheckCircle2 },
  ];

  if (!orderDetails) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="text-4xl">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900">Order Not Found</h2>
        <p className="text-sm text-gray-500">We couldn't locate this order in your history.</p>
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-xs transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>
      </div>
    );
  }

  const dateStr = !isNaN(Number(orderDetails.createdAt))
    ? new Date(Number(orderDetails.createdAt)).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Recent Order";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <Link
            to="/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Orders
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Order Tracking
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 mt-1">
            <Calendar className="w-3.5 h-3.5" /> {dateStr} • ID: <span className="font-mono text-gray-700">{orderDetails.id}</span>
          </p>
        </div>

        {/* Live Simulator Tool Card */}
        {nextStatusValue ? (
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
            <div className="text-xs">
              <span className="font-bold text-amber-900 block">Status Simulator</span>
              <span className="text-amber-700">Test live transitions</span>
            </div>
            <button
              type="button"
              onClick={() => handleStatusUpdate(nextStatusValue)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-95 cursor-pointer shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-white" /> Move to {nextStatusValue}
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold">
            <Check className="w-4 h-4" /> Order Completed
          </div>
        )}
      </div>

      {/* Visual Tracking Stepper */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-red-600" /> Live Delivery Progress
        </h2>

        {/* Responsive Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {steps.map((step, index) => {
            const isCompleted = currentStatus >= index;
            const isCurrent = currentStatus === index;
            const Icon = step.icon;

            return (
              <div
                key={step.label}
                className={`relative flex md:flex-col items-center md:items-center text-left md:text-center p-3 sm:p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? "bg-red-50/70 border-red-300 ring-2 ring-red-100"
                    : isCompleted
                    ? "bg-emerald-50/40 border-emerald-200 text-gray-800"
                    : "bg-gray-50/50 border-gray-200/60 opacity-60 text-gray-400"
                }`}
              >
                {/* Icon Bubble */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mb-0 md:mb-3 mr-3 md:mr-0 transition shadow-xs ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                      ? "bg-red-600 text-white animate-pulse"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Step Info */}
                <div>
                  <h4
                    className={`text-sm font-bold ${
                      isCompleted || isCurrent ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 max-w-xs">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Grid: Items & Receipt + Address */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Items & Receipt */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Receipt className="w-4 h-4 text-red-600" /> Itemized Bill
          </h3>

          <div className="divide-y divide-gray-100">
            {orderDetails.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <span className="font-bold text-gray-900">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-3 flex items-center justify-between font-extrabold text-base text-gray-900">
            <span>Total Paid</span>
            <span className="text-xl text-red-600">₹{orderDetails.totalAmount}</span>
          </div>
        </div>

        {/* Address Card */}
        <div className="md:col-span-1 bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" /> Delivery Address
          </h3>

          <div className="space-y-2 text-xs sm:text-sm text-gray-700">
            <p className="font-bold text-gray-900">{orderDetails.user}</p>
            <p className="text-gray-500 leading-relaxed">{orderDetails.address}</p>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center gap-2 text-xs text-emerald-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Contactless delivery supported</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;