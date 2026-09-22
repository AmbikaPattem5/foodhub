import React, { useState } from "react";
import useCoupen from "../../CustomHooks/useCoupen";
import { DiscountType } from "../../types/Types";
import { Tag, Check, X } from "lucide-react";

function CouponInput() {
  const [input, setInput] = useState("");
  const { applyCoupon, appliedCoupen, removeCoupon } = useCoupen();

  function handleCoupon(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value.toUpperCase());
  }

  function handleApply() {
    if (input.trim()) {
      applyCoupon(input.trim());
    }
  }

  return (
    <div className="bg-gray-50/80 rounded-2xl border border-gray-200 p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
        <Tag className="w-3.5 h-3.5 text-red-600" />
        <span>Apply Promo Code</span>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          name="coupon"
          value={input}
          onChange={handleCoupon}
          placeholder="e.g. WELCOME50, FOOD10"
          className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl outline-hidden focus:border-red-500 focus:ring-2 focus:ring-red-100 uppercase tracking-wider font-semibold text-gray-800"
        />
        <button
          type="button"
          onClick={handleApply}
          disabled={!input.trim()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
        >
          Apply
        </button>
      </div>

      {appliedCoupen && (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded-xl text-xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">{appliedCoupen.code} applied!</span>
              <p className="text-emerald-700 text-[11px]">
                You save {appliedCoupen.discountType === DiscountType.FLAT ? `₹${appliedCoupen.discountValue}` : `${appliedCoupen.discountValue}%`} with this coupon.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeCoupon}
            className="p-1 hover:bg-emerald-100 rounded-md text-emerald-700 transition"
            title="Remove coupon"
            aria-label="Remove coupon"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CouponInput;