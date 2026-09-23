import { useState, useEffect } from "react";
import Coupen from "../../Components/Coupen/Coupen";
import type { Coupon } from "../../types/Types";
import { Sparkles, Percent } from "lucide-react";
import api from "../../services/api";
function Offers() {
  const [coupons, setCoupons] = useState<Coupon[]>([])

  useEffect(() => {
    async function getCoupons() {
      try {
        const response = await api.get("/coupons");
        if (response && response.data && response.data.coupons) {
          setCoupons(response.data.coupons);
          console.log(response.data.coupons)
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    getCoupons();
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-6 sm:p-10 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="relative space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider text-amber-200">
            <Sparkles className="w-3.5 h-3.5" /> Best Deals & Savings
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            FoodHub Offers & Promo Codes
          </h1>
          <p className="text-rose-100 text-sm sm:text-base">
            Enjoy great discounts on your favorite restaurants. Apply coupon codes at checkout to save big on your meals!
          </p>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">Available Coupons</h2>
          </div>
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {coupons.length} Active {coupons.length === 1 ? "Offer" : "Offers"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon: Coupon) => (
            <Coupen key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Offers;