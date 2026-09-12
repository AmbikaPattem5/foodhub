import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Restaurants } from "../services/restaurantData";
import type { Restaurant, RestaurantMenu } from "../types/Restaurant";
import { RestaurantMenuItems } from "../services/restaurantMenu";
import MenuItem from "./MenuItem/MenuItem";
import { useState } from "react";
function RestaurantDetails(){
    const [addItem,setAddItem]=useState(null)
    const {id}=useParams()
    const updatedRestaurant:Restaurant|undefined=Restaurants.find((restaurant)=>(restaurant.id===Number(id)))
        
    const newMenuData=RestaurantMenuItems.filter((restaurant)=>(restaurant.restaurantId===updatedRestaurant?.id));
    console.log(newMenuData);
    const categoryList=new Set();
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
            <section>
            <p>{updatedRestaurant.restaurantName}</p>
            <p>⭐{updatedRestaurant.rating}</p>
            <p>{updatedRestaurant.cuisine}</p>
            <p>{updatedRestaurant.deliveryTime} minutes</p>
            <p>₹{updatedRestaurant.priceForTwo} for Two</p>
            </section>
            <div>
                <h4>About</h4>
                <h6>  Enjoy delicious biryani and North Indian cuisine. </h6>
            </div>
        </div>):
        (<div>Restaurant not found</div>)
            }
        </div>
        <div>
            <h5>Menu</h5>
            <div>
               {[...categoryList].map((category)=>(
                <div>
                <h1>{category}</h1>
                {
                    newMenuData.filter((menuItem)=>(menuItem.category === category)).map((item)=>
                     <MenuItem item={item}/>)
                }
               </div>
               ))}
            </div>
        </div>
        
    </div>
)
}
export default RestaurantDetails;