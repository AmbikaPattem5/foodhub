import { createContext } from "react";

export interface LoadingContextType {
  isLoading: boolean;
  activeRequests: number;
  startLoading: () => void;
  stopLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
