import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { Restaurant } from "../types/Restaurant";
import useFavorite from "../CustomHooks/useFavorite";
import MenuItem from "./MenuItem/MenuItem";
import { ArrowLeft, Star, Clock, Heart, Utensils, IndianRupee } from "lucide-react";
import type { RestaurantMenu } from "../types/Restaurant";
import api from "../services/api";

function RestaurantDetails() {
  const { id } = useParams();
  const { addFavorites, favorites } = useFavorite();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [restaurantDetails, setRestaurantDetails] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<string[]>([])
  const [menuData, setMenuData] = useState<RestaurantMenu[]>([])
  useEffect(() => {
    async function getRestaurantDetails() {
      try {
        const response = await api.get(`/restaurants/${id}`);
        if (response && response.data && response.data.restaurant) {
          const data = response.data.restaurant;
          setRestaurantDetails(data);

          console.log(data)
        }
        console.log(restaurantDetails)
      }
      catch (err) {
        console.log(err);
      }
    }
    getRestaurantDetails();
  }, [id])

  useEffect(() => {
    async function getRestauratMenu() {
      try {
        const response = await api.get(`/restaurants/${id}/menu`,
          {
            params: {
              category: activeCategory
            }
          }
        );
        console.log(response)
        if (response && response.data && response.data.menu) {
          const data = response.data.menu;
          setMenuData(data);
          if (response.data.categories) {
            setCategories(response.data.categories);
          }

          console.log(data)
        }
        console.log(restaurantDetails)
      }
      catch (err) {
        console.log(err)
      }
    }
    getRestauratMenu();
  }, [id, activeCategory])
  // const restaurantId = Number(id);
  // const updatedRestaurant: Restaurant | undefined = Restaurants.find(
  //   (restaurant) => restaurant.id === restaurantId
  // );

  // const newMenuData = RestaurantMenuItems.filter(
  //   (item) => item.restaurantId === updatedRestaurant?.id
  // );

  // const categoryList: string[] = Array.from(
  //   new Set(newMenuData.map((item) => item.category))
  // );

  const isFav = restaurantDetails ? favorites.includes(restaurantDetails.id) : false;

  const displayedCategories =
    activeCategory === "All"
      ? categories
      : categories.filter((cat) => cat === activeCategory);

  if (!restaurantDetails) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="text-4xl">🍽️</div>
        <h2 className="text-2xl font-bold text-gray-900">Restaurant Not Found</h2>
        <p className="text-gray-500">The restaurant you are looking for does not exist or has been removed.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back navigation */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-red-600 transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Restaurants
        </Link>
      </div>

      {/* Restaurant Header Banner Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 sm:p-8">
          <div className="relative w-full md:w-72 h-48 sm:h-56 shrink-0 rounded-2xl overflow-hidden shadow-inner bg-gray-100">
            <img
              src={restaurantDetails.restaurantImage}
              alt={restaurantDetails.restaurantName}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => addFavorites(restaurantDetails.id)}
              className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-gray-700 hover:text-red-600 hover:bg-white shadow-md transition active:scale-90"
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${isFav ? "fill-red-500 text-red-500" : "text-gray-700"
                  }`}
              />
            </button>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-red-600 mb-2">
                {restaurantDetails.cuisine.join(" • ")}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                {restaurantDetails.restaurantName}
              </h1>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-xl border border-emerald-200/60">
                <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>{restaurantDetails.rating}</span>
                <span className="text-xs text-emerald-600 font-normal">(500+ ratings)</span>
              </div>

              <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="font-semibold">{restaurantDetails.deliveryTime} mins</span>
              </div>

              <div className="flex items-center gap-1 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
                <IndianRupee className="w-4 h-4 text-gray-400" />
                <span className="font-semibold">₹{restaurantDetails.priceForTwo} for two</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories Bar */}
      {categories && categories.length > 0 && (
        <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 p-2 shadow-xs flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${activeCategory === "All"
              ? "bg-red-600 text-white shadow-xs"
              : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            All Items
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${activeCategory === category
                ? "bg-red-600 text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Menu Sections */}
      {menuData.length > 0 ? (
        <div className="space-y-8">
          {displayedCategories && displayedCategories.map((category) => {
            const items = menuData.filter((item) => item.category === category);
            return (
              <section key={category} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <Utensils className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                  <span className="text-xs font-semibold text-gray-400">({items.length})</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {items.map((item) => (
                    <MenuItem key={item.id} item={item} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500 text-sm">No menu items available for this restaurant currently.</p>
        </div>
      )}
    </div>
  );
}

export default RestaurantDetails;
