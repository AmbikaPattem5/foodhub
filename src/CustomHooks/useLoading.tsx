import { useContext } from "react";
import { LoadingContext, type LoadingContextType } from "../Context/Loading/LoadingContext";

function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

export default useLoading;
