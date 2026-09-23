import { createContext } from "react";
import type { RestaurantContextType } from "../../types/Types";

export const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);
