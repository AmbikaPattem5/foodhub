import { useState } from "react";
import type { Coupon } from "../../types/Types";
import { DiscountType } from "../../types/Types";
import useCoupen from "../../CustomHooks/useCoupen";
import { Tag, Check, Copy, Sparkles } from "lucide-react";

interface CoupenProps {
  coupon: Coupon;
}

function Coupen({ coupon }: CoupenProps) {
  const { applyCoupon, appliedCoupen } = useCoupen();
  const [copied, setCopied] = useState(false);

  const isApplied = appliedCoupen?.code === coupon.code;

  function handleCopy() {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleApply() {
    applyCoupon(coupon.code);
  }

  const discountDisplay =
    coupon.discountType === DiscountType.FLAT
      ? `₹${coupon.discountValue} FLAT OFF`
      : `${coupon.discountValue}% OFF`;

  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col justify-between">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-amber-300" />
          <span className="font-extrabold text-sm tracking-wide">
            {discountDisplay}
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-xs">
          Verified
        </span>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Coupon Code Pill */}
          <div className="flex items-center justify-between bg-gray-50 border border-dashed border-gray-300 rounded-xl px-3 py-2">
            <span className="font-mono font-black text-sm text-gray-900 tracking-wider select-all">
              {coupon.code}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-semibold text-gray-500 hover:text-red-600 flex items-center gap-1 transition"
              title="Copy code"
            >
              {copied ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Copied
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Copy className="w-3.5 h-3.5" /> Copy
                </span>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500">
            Applicable on minimum order value of{" "}
            <strong className="text-gray-800">₹{coupon.minimumOrderAmount}</strong>
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {isApplied ? (
            <div className="w-full py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> Coupon Applied
            </div>
          ) : (
            <button
              type="button"
              onClick={handleApply}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Apply Coupon
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Coupen;