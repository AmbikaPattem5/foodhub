import useCart from "../../CustomHooks/useCart";
import type { RestaurantMenu } from "../../types/Restaurant";
import { Plus, Minus } from "lucide-react";

interface MenuItemProps {
  item: RestaurantMenu;
}

function MenuItem({ item }: MenuItemProps) {
  const { handleAddItem, isItemExist, incrementCartItem, decrementCartItem } = useCart();
  const itemAdded = isItemExist(item);

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Dish info */}
      <div className="space-y-1.5 flex-1 pr-2">
        <div className="flex items-center gap-2">
          {/* Veg / Non-Veg indicator icon */}
          <span
            className={`inline-flex items-center justify-center w-4 h-4 rounded-xs border ${item.isVeg ? "border-emerald-600" : "border-rose-600"
              }`}
            title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
          >
            <span
              className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-emerald-600" : "bg-rose-600"
                }`}
            />
          </span>

          <h4 className="text-base font-bold text-gray-900 leading-snug">
            {item.name}
          </h4>
        </div>

        <div className="text-sm font-semibold text-gray-800">
          ₹{item.price}
        </div>

        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Cart Actions */}
      <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
        <span className="sm:hidden text-xs font-semibold text-gray-500">Add to order</span>

        {!itemAdded ? (
          <button
            type="button"
            onClick={() => handleAddItem(item)}
            className="flex items-center gap-1 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-red-600 bg-red-50 hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        ) : (
          <div className="flex items-center bg-red-600 text-white rounded-xl shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => decrementCartItem(item.id)}
              className="p-2 hover:bg-red-700 transition active:bg-red-800 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-xs font-bold min-w-7 text-center select-none">
              {itemAdded.quantity}
            </span>
            <button
              type="button"
              onClick={() => incrementCartItem(item.id)}
              className="p-2 hover:bg-red-700 transition active:bg-red-800 cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuItem;
