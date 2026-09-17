import { FavoriteContext } from "../Context/Favourites/FavoriteContext";
import { useContext } from "react";
function useFavorite(){
    const favorite = useContext(FavoriteContext);
    if(favorite === undefined){
        throw new Error("useFavorite  must be used in context Provider")

    }
    return favorite;
}
export default useFavorite;