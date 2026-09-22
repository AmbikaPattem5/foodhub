import { createContext } from "react";
import type { FavoriteContextType } from "../../types/Types";
export const FavoriteContext = createContext<FavoriteContextType |undefined>(undefined)