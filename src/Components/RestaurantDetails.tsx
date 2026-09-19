import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Restaurants } from "../services/restaurantData";
import type { Restaurant } from "../types/Restaurant";
import { RestaurantMenuItems } from "../services/restaurantMenu";
import useFavorite from "../CustomHooks/useFavorite";
import MenuItem from "./MenuItem/MenuItem";
function RestaurantDetails() {
  const { id } = useParams();
  const { handleFavorite, favoriteRestaurant } = useFavorite();
  const updatedRestaurant: Restaurant | undefined = Restaurants.find(
    (restaurant) => restaurant.id === Number(id),
  );

  const newMenuData = RestaurantMenuItems.filter(
    (restaurant) => restaurant.restaurantId === updatedRestaurant?.id,
  );
  const categoryList: Set<string> = new Set();
  newMenuData.forEach((restaurant) => categoryList.add(restaurant.category));
  return (
    <div>
      <div>
        <Link to="/" className="text-red-600">
          &larr; Back to Restaurants
        </Link>
      </div>

      <div>
        {updatedRestaurant ? (
          <div className="flex items-center border-b border-gray-300 gap-2 lg:gap-6 lg:py-6">
            <div >
              <img
                src={updatedRestaurant.restaurantImage}
                alt="image"
                className="h-20 w-20 lg:h-60 lg:w-80 border border-gray-100 rounded-xl lg:rounded-3xl shadow-lg"
                
              />
            </div>

            <div>
              <section>
                <div className="lg:py-4">
                  <p className="text-xl lg:text-3xl font-bold">{updatedRestaurant.restaurantName}</p>
                  <div className="flex items-center gap-2">
                  <p className="text-gray-700 text-[6px] lg:text-[14px]">⭐{updatedRestaurant.rating}</p> {"|"}
                  <p className="text-gray-700 text-[6px] lg:text-[14px]">{updatedRestaurant.deliveryTime} mins</p>
                  </div>
                  <p className="text-gray-700 text-[6px] lg:text-[14px]">{updatedRestaurant.cuisine.join(" • ")}</p>
                  <p className="text-gray-700 text-[6px] lg:text-[14px]">₹{updatedRestaurant.priceForTwo} for Two</p>
                </div>
              </section>
            </div>
            {/* <div>
              <h4>About</h4>
              <h6> Enjoy delicious biryani and North Indian cuisine. </h6>
            </div> */}
          </div>
        ) : (
          <div>Restaurant not found</div>
        )}
      </div>
      <div>
        {updatedRestaurant && newMenuData.length > 0 ? (
          <div>
            <h5 className="text-red-600 text-lg font-semibold m-2 px-3">Menu</h5>
            {[...categoryList].map((category) => (
              <div key={category}>
                <h1 className="text-lg font-semibold px-4">{category}</h1>
                {newMenuData
                  .filter((menuItem) => menuItem.category === category)
                  .map((item) => (
                    <MenuItem key={item.id} item={item} />
                  ))}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default RestaurantDetails;
