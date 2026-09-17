import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Restaurants } from "../services/restaurantData";
import type { Restaurant } from "../types/Restaurant";
import { RestaurantMenuItems } from "../services/restaurantMenu";
import useFavorite from "../CustomHooks/useFavorite";
import MenuItem from "./MenuItem/MenuItem";
function RestaurantDetails(){
    const {id}=useParams()
    const {handleFavorite, favoriteRestaurant} = useFavorite();
    const updatedRestaurant:Restaurant|undefined=Restaurants.find((restaurant)=>(restaurant.id===Number(id)))
        
    const newMenuData=RestaurantMenuItems.filter((restaurant)=>(restaurant.restaurantId===updatedRestaurant?.id));
    const categoryList:Set<string>=new Set();
    newMenuData.forEach((restaurant)=>categoryList.add(restaurant.category))
return(
    <div>
        <div>
            <Link to='/'>Back to Restaurants</Link>
        </div>
        
        <div>
            {(updatedRestaurant)?
            (<div>
            <div>
                <img src={updatedRestaurant.restaurantImage} alt='image' height={200} width={200}/>
            </div>
            
            <div>
            <section>
                <div>
                    <p>{updatedRestaurant.restaurantName}</p>
                    <p>⭐{updatedRestaurant.rating}</p>
                    <p>{updatedRestaurant.cuisine}</p>
                    <p>{updatedRestaurant.deliveryTime} minutes</p>
                    <p>₹{updatedRestaurant.priceForTwo} for Two</p>
            </div>
            </section>
            </div>
            <div>
                <h4>About</h4>
                <h6>  Enjoy delicious biryani and North Indian cuisine. </h6>
            </div>
        </div>):
        (<div>Restaurant not found</div>)
            }
        </div>
        <div>
            {(updatedRestaurant && newMenuData.length>0)?
            <div>
                <h5>Menu</h5>
               {[...categoryList].map((category)=>(
                <div key={category}>
                <h1>{category}</h1>
                {
                    newMenuData.filter((menuItem)=>(menuItem.category === category)).map((item)=>
                     <MenuItem key={item.id} item={item}/>)
                }
               </div>
               ))}
            </div>
            :""}
        </div>
        
    </div>
)
}
export default RestaurantDetails;