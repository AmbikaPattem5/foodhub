import { useState, useEffect, useCallback, useMemo } from "react";
import { LoadingContext } from "./LoadingContext";
import { loadingService } from "../../services/loadingService";
import type { ChildrenProp } from "../../types/Types";

export function LoadingProvider({ children }: ChildrenProp) {
  const [isLoading, setIsLoading] = useState<boolean>(loadingService.isLoading);
  const [activeRequests, setActiveRequests] = useState<number>(loadingService.count);

  useEffect(() => {
    // Subscribe to loading service updates
    const unsubscribe = loadingService.subscribe((loading, count) => {
      setIsLoading(loading);
      setActiveRequests(count);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const startLoading = useCallback(() => {
    loadingService.start();
  }, []);

  const stopLoading = useCallback(() => {
    loadingService.stop();
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      activeRequests,
      startLoading,
      stopLoading,
    }),
    [isLoading, activeRequests, startLoading, stopLoading]
  );

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export default LoadingProvider;
