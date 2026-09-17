import { Restaurants } from "../../services/restaurantData";
import useFavorite from "../../CustomHooks/useFavorite";
import type { Restaurant } from "../../types/Restaurant";

function Favorites() {
    const {favorites} =useFavorite();
    const FavoriteList : Restaurant[] = (Restaurants|| []).filter((restaurant)=>(favorites.includes(restaurant.id)))
    return(
        <div>

        {FavoriteList.length ===0 ? " No Favorite Restaraunts" :
                
        FavoriteList.map((restaurant)=>(
            <div key={restaurant.id}>
                <h4>{restaurant.restaurantName}</h4>
                <h4>{restaurant.rating}</h4>
            </div>
        ))}              
        </div>
    )
}
export default Favorites;