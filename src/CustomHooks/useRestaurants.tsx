import { useContext } from "react";
import { RestaurantContext } from "../Context/Restaurant/RestaurantContext";

function useRestaurants() {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error("useRestaurants must be used within a RestaurantProvider");
  }
  return context;
}

export default useRestaurants;
