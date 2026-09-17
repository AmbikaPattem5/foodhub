import { useState } from "react";
import { FavoriteContext } from "./FavoriteContext";
import type { ChildrenProp } from "../../types/Types";
import { Restaurants } from "../../services/restaurantData";
import type { Restaurant } from "../../types/Restaurant";
function FavoriteProvider({children}:ChildrenProp) {
    const [favorites,setFavorites] = useState<Restaurant[]>([])
    const [favoriteRestaurant,setFavoriteRestaurant] = useState<boolean>(false)
    function handleFavorite(id : number){
        Restaurants.map((restaurant)=>{
            if(restaurant.id === id){
                        setFavoriteRestaurant(!favoriteRestaurant)
            }
    })

    }
    function addFavorites() {

    }
    return(
    <div>
        <FavoriteContext.Provider value={{handleFavorite,favoriteRestaurant}}>
            {children}
        </FavoriteContext.Provider>
    </div>)
}
export default FavoriteProvider;