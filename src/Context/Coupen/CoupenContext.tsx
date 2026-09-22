import { createContext } from "react";
import type { CoupenContextType } from "../../types/Types";
export const CouponContext = createContext<CoupenContextType|null>(null)