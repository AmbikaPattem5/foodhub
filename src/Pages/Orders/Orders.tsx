import { Link, useNavigate } from "react-router-dom";
import type { OrderType } from "../../types/Types";
import { OrderStatus } from "../../types/Types";
import { Package, Calendar, ArrowRight, Clock, ChefHat, Bike, CheckCircle2 } from "lucide-react";

function Orders() {
  const navigate = useNavigate();
  const orders: string | null = localStorage.getItem("orders");
  const orderDetails: OrderType[] = orders === null ? [] : JSON.parse(orders);

  // Sort descending by order timestamp if available
  const sortedOrders = [...orderDetails].reverse();

  function handleOrderDetails(orderId: string) {
    navigate(`/orders/${orderId}`);
  }

  function getStatusBadge(status: OrderStatus) {
    switch (status) {
      case OrderStatus.Placed:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3.5 h-3.5" /> Placed
          </span>
        );
      case OrderStatus.Preparing:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <ChefHat className="w-3.5 h-3.5" /> Preparing
          </span>
        );
      case OrderStatus.OutForDelivery:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Bike className="w-3.5 h-3.5" /> Out for Delivery
          </span>
        );
      case OrderStatus.Delivered:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200">
            {status}
          </span>
        );
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review your past meals and track real-time delivery status
        </p>
      </div>

      {sortedOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 sm:p-16 text-center max-w-md mx-auto space-y-5">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto text-2xl">
            <Package className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900">No Orders Yet</h2>
            <p className="text-sm text-gray-500">
              You have not placed any orders yet. Discover delicious dishes and place your first order today!
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-xs transition active:scale-95 shadow-md"
          >
            Browse Restaurants <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedOrders.map((order) => {
            const dateStr = !isNaN(Number(order.createdAt))
              ? new Date(Number(order.createdAt)).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "Recent Order";

            const totalItemCount = order.items.reduce((acc, i) => acc + i.quantity, 0);

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition p-5 sm:p-6 space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                      ID: {order.id.slice(0, 8)}...
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {dateStr}
                    </span>
                  </div>
                  <div>{getStatusBadge(order.status)}</div>
                </div>

                {/* Items preview */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Items ({totalItemCount})
                    </p>
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {order.items.map((item) => `${item.name} x ${item.quantity}`).join(", ")}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-gray-400">Total Paid</p>
                      <p className="text-lg font-black text-gray-900">₹{order.totalAmount}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOrderDetails(order.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold text-xs transition active:scale-95 cursor-pointer"
                    >
                      Track Order <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;