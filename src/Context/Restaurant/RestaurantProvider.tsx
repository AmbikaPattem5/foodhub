import { useState, useEffect, useCallback } from "react";
import { RestaurantContext } from "./RestaurantContext";
import api from "../../services/api";
import type { ChildrenProp } from "../../types/Types";

function RestaurantProvider({ children }: ChildrenProp) {
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [cuisinesRes] = await Promise.all([
        api.get("/restaurants/cuisines"),
      ]);

      if (cuisinesRes.data.cuisines && cuisinesRes.data.cuisines.length > 0) {
        setCuisines(cuisinesRes.data.cuisines);
      }
      setError(null);
    } catch (err: any) {
      console.warn("Could not fetch from backend, using local fallback:", err?.message || err);
      setError(err?.response?.data?.message || "Failed to load restaurant data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <RestaurantContext.Provider
      value={{
        cuisines,
        loading,
        error,
        refreshRestaurants: loadData,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export default RestaurantProvider;
