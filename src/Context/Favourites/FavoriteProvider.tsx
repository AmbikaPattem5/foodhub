import { useState } from "react";
import { FavoriteContext } from "./FavoriteContext";
import type { ChildrenProp } from "../../types/Types";
function FavoriteProvider({children}:ChildrenProp) {
    const [favorites,setFavorites] = useState<number[]>([])
    function addFavorites(id : number) {
            let updateList : number[];
       const favoriteList = favorites.includes(id);
       if(favoriteList){
         updateList = favorites.filter((favId) => favId !== id)
       }
       else{
         updateList = [...favorites, id];
       }
       setFavorites(updateList)
    }
    return(
    <div>
        <FavoriteContext.Provider value={{addFavorites,favorites}}>
            {children}
        </FavoriteContext.Provider>
    </div>)
}
export default FavoriteProvider;