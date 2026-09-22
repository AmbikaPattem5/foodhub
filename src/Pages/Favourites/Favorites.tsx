import { Restaurants } from "../../services/restaurantData";
import useFavorite from "../../CustomHooks/useFavorite";
import type { Restaurant } from "../../types/Restaurant";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Star, Clock, ArrowRight, ArrowLeft } from "lucide-react";

function Favorites() {
  const { favorites, addFavorites } = useFavorite();
  const navigate = useNavigate();
  const favoriteList: Restaurant[] = (Restaurants || []).filter((restaurant) =>
    favorites.includes(restaurant.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Favorite Restaurants
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Quick access to the places you love most
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-red-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Explore more
        </Link>
      </div>

      {favoriteList.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 sm:p-16 text-center max-w-md mx-auto space-y-5">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900">No Favorites Saved</h2>
            <p className="text-sm text-gray-500">
              You haven't saved any restaurants yet. Tap the heart icon on any restaurant to keep them handy here!
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-xs transition active:scale-95 shadow-md"
          >
            Discover Restaurants <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteList.map((restaurant) => (
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
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-red-600 hover:bg-white shadow-md transition active:scale-90"
                  title="Remove from favorites"
                >
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
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
                    View Menu <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;