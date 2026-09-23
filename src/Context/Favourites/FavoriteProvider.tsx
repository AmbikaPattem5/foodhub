import { useEffect, useState } from "react";
import { FavoriteContext } from "./FavoriteContext";
import type { ChildrenProp } from "../../types/Types";
import api from "../../services/api";
import toast from "react-hot-toast";
function FavoriteProvider({ children }: ChildrenProp) {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    async function getFavorites() {
      try {
        const response = await api.get("/favorites");
        if (response && response.data && response.data.success) {
          const data = response.data.favorites;
          setFavorites(data);
        }
      }
      catch (err) {
        toast.error("Failed to fetch favorites! Please try again.", { duration: 2500 });
      }
    }
    getFavorites();
  }, [])
  async function addFavorites(id: number) {
    try {
      const response = await api.post("/favorites/toggle", { restaurantId: id });
      toast.success(response.data.message || "Favorites updated successfully", { duration: 2500 });
      if (response && response.data && response.data.favorites) {
        setFavorites(response.data.favorites);
      }
    }
    catch (err) {
      toast.error("Failed to update favorites! Please try again.", { duration: 2500 });
    }

  }
  return (
    <div>
      <FavoriteContext.Provider value={{ addFavorites, favorites }}>
        {children}
      </FavoriteContext.Provider>
    </div>)
}
export default FavoriteProvider;