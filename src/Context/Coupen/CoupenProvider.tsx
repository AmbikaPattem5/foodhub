import {
  DiscountType,
  type ChildrenProp,
  type Coupon,
} from "../../types/Types";
import { useState } from "react";
import { coupons } from "../../services/coupens";
import { CouponContext } from "./CoupenContext";
import useCart from "../../CustomHooks/useCart";
function CoupenProvider({ children }: ChildrenProp) {
  const { totalCartPrice } = useCart();
  const [appliedCoupen, setAppliedCoupen] = useState<Coupon>();

  function applyCoupon(code: string) {
    const getCoupon : Coupon = coupons.find((coupon) => coupon.code === code);
    if (getCoupon && getCoupon.isActive) {
      setAppliedCoupen(getCoupon);
    }
  }
  function removeCoupon() {
    setAppliedCoupen(undefined);
  }
  function calculateDiscount() {
    if (appliedCoupen) {
      if (appliedCoupen.discountType === DiscountType.FLAT) {
        if (totalCartPrice() >= appliedCoupen?.minimumOrderAmount) {
          return appliedCoupen.discountValue;
        } else {
          return 0;
        }
      } else if (appliedCoupen.discountType === DiscountType.PERCENTAGE) {
         if (totalCartPrice() >= appliedCoupen?.minimumOrderAmount) {
          return (totalCartPrice() * appliedCoupen.discountValue)/100;
      }
    }
  }
    //return totalPrice;
  }
  function validateCoupon() {
    if (
      appliedCoupen &&
      totalCartPrice() >= appliedCoupen?.minimumOrderAmount
    ) {
      return true;
    }
    return false;
  }
  return (
    <div>
      <CouponContext.Provider
        value={{
          appliedCoupen,
          removeCoupon,
          applyCoupon,
          validateCoupon,
          calculateDiscount,
        }}
      >
        {children}
      </CouponContext.Provider>
    </div>
  );
}
export default CoupenProvider;
