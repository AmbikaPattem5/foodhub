import { createContext } from "react";
import type { AuthContextType } from "../types/Types";
export const AuthContext=createContext<AuthContextType|undefined>(undefined);