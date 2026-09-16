import { DiscountType, type Coupon } from "../types/Types";
export const coupons: Coupen[] = [
  {
    id: 1,
    code: "WELCOME50",
    discountType: DiscountType.FLAT,
    discountValue: 50,
    minimumOrderAmount: 299,
    isActive: true,
  },
  {
    id: 2,
    code: "FOOD10",
    discountType: DiscountType.PERCENTAGE,
    discountValue: 10,
    minimumOrderAmount: 499,
    isActive: true,
  },
  {
    id: 3,
    code: "SAVE100",
    discountType: DiscountType.PERCENTAGE,
    discountValue: 100,
    minimumOrderAmount: 699,
    isActive: true,
  },
  {
    id: 4,
    code: "FIRSTORDER20",
    discountType: DiscountType.PERCENTAGE,
    discountValue: 20,
    minimumOrderAmount: 399,
    isActive: true,
  },
  {
    id: 5,
    code: "EXPIRED50",
    discountType: DiscountType.FLAT,
    discountValue: 50,
    minimumOrderAmount: 299,
    isActive: false,
  },
];

