import React, { useState } from "react";
import { Restaurants } from "../../services/restaurantData";
import useFavorite from "../../CustomHooks/useFavorite";
import { useNavigate } from "react-router-dom";
import { Search, Star, Clock, Heart, X, Sparkles, Utensils, ArrowRight } from "lucide-react";
import "./Home.css";

function Home() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const { addFavorites, favorites } = useFavorite();
  const navigate = useNavigate();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  const cuisinList = Restaurants.map((restaurant) => restaurant.cuisine);
  const uniqueList: string[] = [];
  for (let i = 0; i < cuisinList.length; i++) {
    const subList = cuisinList[i];
    for (let j = 0; j < subList.length; j++) {
      const cuisinItem = subList[j].toLowerCase();
      if (!uniqueList.includes(cuisinItem)) {
        uniqueList.push(cuisinItem);
      }
    }
  }

  const filteredResult = Restaurants.filter((restaurant) => {
    const searchMatch =
      restaurant.restaurantName
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      restaurant.cuisine.some((cuisine) =>
        cuisine.toLowerCase().includes(searchInput.toLowerCase())
      );
    const cuisineMatch =
      selectedCuisine === "" ||
      restaurant.cuisine.some(
        (cuisine) => cuisine.toLowerCase() === selectedCuisine.toLowerCase()
      );
    return searchMatch && cuisineMatch;
  });

  function handleCard(restaurantId: number) {
    navigate(`/restaurantDetails/${restaurantId}`);
  }

  function handleCuisine(cuisine: string) {
    if (selectedCuisine === cuisine) {
      setSelectedCuisine("");
    } else {
      setSelectedCuisine(cuisine);
    }
  }

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 shadow-md">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-black/10 blur-2xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-rose-100 border border-white/25 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Good Food, Happy People
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Find Your Next <br />
            <span className="text-amber-300 drop-shadow-sm">Favorite Meal</span>
          </h1>

          <p className="text-rose-100 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Order from top local restaurants with fast delivery, authentic flavours, and seamless tracking.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl p-2 text-gray-800 transition focus-within:ring-4 focus-within:ring-amber-300/40">
              <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={handleSearch}
                className="w-full px-3 py-2 text-sm sm:text-base outline-hidden bg-transparent placeholder-gray-400 text-gray-900"
                placeholder="Search restaurants, cuisines, or dishes..."
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cuisine Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-bold text-gray-900">Popular Cuisines</h2>
          </div>
          {selectedCuisine && (
            <button
              onClick={() => setSelectedCuisine("")}
              className="text-xs font-semibold text-red-600 hover:text-red-700 underline flex items-center gap-1"
            >
              Clear filter ({selectedCuisine})
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          <button
            onClick={() => setSelectedCuisine("")}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${
              selectedCuisine === ""
                ? "bg-red-600 text-white shadow-xs shadow-red-200"
                : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            All Cuisines
          </button>
          {uniqueList.map((cuisine) => {
            const isSelected = selectedCuisine.toLowerCase() === cuisine.toLowerCase();
            return (
              <button
                key={cuisine}
                onClick={() => handleCuisine(cuisine)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${
                  isSelected
                    ? "bg-red-600 text-white shadow-xs shadow-red-200 scale-105"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {cuisine}
              </button>
            );
          })}
        </div>
      </section>

      {/* Restaurant List Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Restaurants Near You
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Discover top-rated culinary delights crafted with passion
            </p>
          </div>
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {filteredResult.length} {filteredResult.length === 1 ? "restaurant" : "restaurants"}
          </span>
        </div>

        {filteredResult.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredResult.map((restaurant) => {
              const isFav = favorites.includes(restaurant.id);
              return (
                <div
                  key={restaurant.id}
                  onClick={() => handleCard(restaurant.id)}
                  className="group bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                >
                  {/* Image Container with overlay badges */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
                    <img
                      src={restaurant.restaurantImage}
                      alt={restaurant.restaurantName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 group-hover:opacity-70 transition-opacity" />

                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addFavorites(restaurant.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-gray-700 hover:text-red-600 hover:bg-white shadow-md transition active:scale-90"
                      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isFav ? "fill-red-500 text-red-500" : "text-gray-700"
                        }`}
                      />
                    </button>

                    {/* Rating & Delivery Time Badges */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white">
                      <div className="flex items-center gap-1 bg-emerald-600/90 backdrop-blur-xs px-2 py-1 rounded-md shadow-xs">
                        <Star className="w-3.5 h-3.5 fill-white" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-1 rounded-md">
                        <Clock className="w-3 h-3 text-amber-300" />
                        <span>{restaurant.deliveryTime} mins</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
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
                        View Menu <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto text-2xl">
              🍽️
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Restaurants Found</h3>
            <p className="text-sm text-gray-500">
              We couldn't find anything matching your search criteria. Try a different keyword or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchInput("");
                setSelectedCuisine("");
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
