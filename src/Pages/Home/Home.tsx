import { useState } from "react";
import type { Restaurant } from "../../types/Restaurant";
import { Restaurants } from "../../services/restaurantData";
import RestaurantCard from "../../Components/RestaurantCard";
import { useNavigate } from "react-router-dom";
import './Home.css'
function Home(){
    const [searchInput,setSearchInput]=useState<string>("");
   // console.log(Restaurants)
   const navigate=useNavigate();
    function handleSearch(e){
         return setSearchInput(e.target.value);
    }
    const filteredResult=Restaurants.filter((restaurant)=>{
        return (restaurant.restaurantName).toLowerCase().includes(searchInput.toLowerCase())
        
})
const cuisinList=Restaurants.map((restarant)=>
{
    return restarant.cuisine;
})
let uniqueList=[];
for(let i=0;i<cuisinList.length;i++){
    let subList=cuisinList[i];
    for(let j=0;j<subList.length;j++){
        let cuisinItem=subList[j];
        if(!uniqueList.includes(cuisinItem)){
            uniqueList.push(cuisinItem)
        }
    }
}
function handleCard({restaurant}){
    navigate(`/restaurantCard/${restaurant.id}`,{state:restaurant})

}
console.log(uniqueList)
console.log(cuisinList);
    return(
        <div>
            <div>
                <section>
                    <div>
                        <h4>Delicious food, delivered to your door 🍕</h4>
                        <p>Discover restaurants and delicious meals near you</p>
                    </div>
                 <div>
                    <input type="text" value={searchInput} onChange={handleSearch} placeholder="Search restaurants or cuisines..."/>
                    {searchInput.trim()!=""&&(
                    filteredResult.length>0?filteredResult.map((restaurant)=>
                    <p>{restaurant.restaurantName}</p>
                    ):<p>"NO Items Found"</p>
                    )
            }
                </div>                                        
                </section>
            </div>
            <div>
                <h4>Popular Cuisines</h4>
             {uniqueList.map((cuisin)=>(
                <button>{cuisin}</button>
             ))}
            </div>
            <div>
                <h4>Restaurants near you</h4>
                <div className="restaurentList">
                {Restaurants.map((restaurant)=>( 
                    <div key={restaurant.id} onClick={()=>handleCard({restaurant})} className="card">
                       <img src={restaurant.restaurantImage} alt="image" height={50} width={100}/>
                       <h6>{restaurant.restaurantName}</h6>
                       <p><small>⭐ {restaurant.rating}</small></p>
                       <p><small>{restaurant.deliveryTime} minutes</small></p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}
export default Home;