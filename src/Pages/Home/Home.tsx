import { useState } from "react";
import { Restaurants } from "../../services/restaurantData";
import useFavorite from "../../CustomHooks/useFavorite";
import { useNavigate } from "react-router-dom";
import "./Home.css";
function Home() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  // console.log(Restaurants)
  const { addFavorites, favorites } = useFavorite();

  const navigate = useNavigate();
  function handleSearch(e) {
    return setSearchInput(e.target.value);
  }

  const cuisinList = Restaurants.map((restarant) => {
    return restarant.cuisine;
  });
  let uniqueList = [];
  for (let i = 0; i < cuisinList.length; i++) {
    let subList = cuisinList[i];
    for (let j = 0; j < subList.length; j++) {
      let cuisinItem = subList[j].toLowerCase();
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
        cuisine.toLowerCase().includes(searchInput.toLowerCase()),
      );
    const cuisineMatch =
      selectedCuisine == "" ||
      restaurant.cuisine.some(
        (cuisine) => cuisine.toLowerCase() === selectedCuisine.toLowerCase(),
      );
    return searchMatch && cuisineMatch;
  });
  function handleCard(restaurantId) {
    navigate(`/restaurantDetails/${restaurantId}`);
  }
  function handleCusine(cuisin) {
    setSelectedCuisine(cuisin);
  }
  return (
    <div>
      <div className="flex justify-center gap-8 my-10">
        <section>
          <div>
            <h6 className="text-red-500">Good Food, Happy People</h6>
            <h1 className="text-2xl lg:text-6xl font-semibold">Find Your<br/>
            Next<span className="text-red-500 text-2xl lg:text-6xl font-semibold"> Favorite </span> Meal</h1>
          </div>
          <div>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearch}
              className="border rounded-md h-10 w-120 mt-6 mb-1"
              placeholder="Search restaurants or cuisines..."
            />
          </div>
        </section>
      </div>
      <div className="flex justify-center gap-3">
        <h5>Popular : </h5>
        {uniqueList.map((cuisin) => (
          <button key={cuisin} className="border rounded h-5 w-20 text-[2px] lg:text-[10px]" onClick={() => handleCusine(cuisin)}>
            {cuisin}
          </button>
        ))}
      </div>
      <div>
      {filteredResult.length > 0 ? (
        <div>
          <h1 className="text-lg lg:text-3xl font-semibold px-15">Restaurants near you</h1>
          <p className="px-3 lg:px-15 text-gray-400 mb-1">Discover best restaurants around you</p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 lg:px-16 max-w-75xl mx-auto" >
            {filteredResult.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => handleCard(restaurant.id)}
                className="relative border border-gray-200 rounded lg:rounded-2xl shadow-lg h-60 w-65"
              >
                <img
                  src={restaurant.restaurantImage}
                  alt="image" className="w-full h-30 object-cover"
                  
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addFavorites(restaurant.id);
                  }}
                  className="absolute top-1 right-2  hover:bg-red-200 rounded-full text-white"
                >
                 <span> {favorites.includes(restaurant.id) ? "❤️" : "♡"}</span>
                </button>
                  <span className="rating border border-gray-100 rounded-2xl bg-white text-[12px] text-red-600">⭐ {restaurant.rating}</span>
                  <span className="time border border-gray-100 rounded-2xl bg-white text-[12px]">{restaurant.deliveryTime} mins</span>
                <h4 className="font-semibold px-2">{restaurant.restaurantName}</h4>
                <p className="px-2">{restaurant.cuisine}</p>
                <h6 className="font-semibold px-2">₹{restaurant.priceForTwo} for two</h6>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No Items Found</p>
      )}
      </div>
    </div>
  );
}
export default Home;
