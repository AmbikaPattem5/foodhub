import React, { useEffect, useState } from "react";
import useFavorite from "../../CustomHooks/useFavorite";
import { useNavigate } from "react-router-dom";
import { Search, Star, Clock, Heart, ArrowRight, SlidersHorizontal } from "lucide-react";
import type { Restaurant } from "../../types/Restaurant";
import api from "../../services/api";
import useRestaurants from "../../CustomHooks/useRestaurants";

type SortOption = "default" | "rating" | "deliveryTime" | "priceLow" | "priceHigh";

function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const { addFavorites, favorites } = useFavorite();
  const navigate = useNavigate();
  const { cuisines } = useRestaurants();
  useEffect(() => {
    async function getRestaurants() {
      try {
        const response = await api.get("/restaurants",
          {
            params: {
              search: searchInput,
              cuisine: selectedCuisine,
              sortBy: sortBy
            }
          }
        );
        if (response && response.data && response.data.restaurants && response.data.restaurants.length > 0) {
          setRestaurants(response.data.restaurants)
        }
        console.log(restaurants)
      }
      catch (err) {
        console.log(err);
      }
    }
    getRestaurants();
  }, [searchInput, selectedCuisine, sortBy])
  // Extract unique cuisines


  // Filter



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">All Restaurants</h1>
          <p className="text-sm text-gray-500 mt-1">
            Explore {restaurants.length} top-rated eateries delivering right to you
          </p>
        </div>

        {/* Search & Sort bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-xs focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100">
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
              placeholder="Search restaurants..."
              className="outline-hidden text-sm bg-transparent w-full sm:w-48 text-gray-900"
            />
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-xs">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm font-medium text-gray-700 bg-transparent outline-hidden cursor-pointer"
            >
              <option value="default">Sort by: Recommended</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="deliveryTime">Fastest Delivery</option>
              <option value="priceLow">Cost (Low to High)</option>
              <option value="priceHigh">Cost (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cuisine Quick Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setSelectedCuisine("")}
          className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition ${selectedCuisine === ""
            ? "bg-red-600 text-white shadow-xs"
            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
        >
          All Cuisines
        </button>
        {cuisines.map((cuisine) => {
          const isSelected = selectedCuisine.toLowerCase() === cuisine.toLowerCase();
          return (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(isSelected ? "" : cuisine)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition ${isSelected
                ? "bg-red-600 text-white shadow-xs"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
            >
              {cuisine}
            </button>
          );
        })}
      </div>

      {/* Restaurant Grid */}
      {restaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => {
            const isFav = favorites.includes(restaurant.id);
            return (
              <div
                key={restaurant.id}
                onClick={() => navigate(`/restaurantDetails/${restaurant.id}`)}
                className="group bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
                  <img
                    src={restaurant.restaurantImage}
                    alt={restaurant.restaurantName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addFavorites(restaurant.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-gray-700 hover:text-red-600 hover:bg-white shadow-md transition active:scale-90"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${isFav ? "fill-red-500 text-red-500" : "text-gray-700"
                        }`}
                    />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white">
                    <div className="flex items-center gap-1 bg-emerald-600/95 backdrop-blur-xs px-2 py-1 rounded-md shadow-xs">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-1 rounded-md">
                      <Clock className="w-3 h-3 text-amber-300" />
                      <span>{restaurant.deliveryTime} mins</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base group-hover:text-red-600 transition-colors line-clamp-1">
                      {restaurant.restaurantName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {restaurant.cuisine.join(", ")}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 mt-4 pt-3 flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-900">
                      ₹{restaurant.priceForTwo} for two
                    </span>
                    <span className="font-semibold text-red-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Order Now <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center max-w-md mx-auto space-y-4">
          <p className="text-4xl">🔍</p>
          <h3 className="text-lg font-bold text-gray-900">No Match Found</h3>
          <p className="text-sm text-gray-500">
            We couldn't find restaurants matching your search or filters.
          </p>
          <button
            onClick={() => {
              setSearchInput("");
              setSelectedCuisine("");
              setSortBy("default");
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Restaurants;