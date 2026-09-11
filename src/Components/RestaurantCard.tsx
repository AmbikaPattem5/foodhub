import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function RestaurantCard(){
    const data=useLocation();
    const restaurant=data.state;
   
return(
    <div>
        <div>
            <Link to='/'>Back to Restaurants</Link>
        </div>
        <div>
            <div>
                <img src={restaurant.restaurantImage} alt='image' height={200} width={200}/>
            </div>
        <section>
            <p>{restaurant.restaurantName}</p>
            <p>⭐{restaurant.rating}</p>
            <p>{restaurant.cuisin}</p>
            <p>{restaurant.deliveryTime} minutes</p>
            <p>₹{restaurant.priceForTwo} for Two</p>

        </section>
        <div>
            <h4>About</h4>
            <h6>  Enjoy delicious biryani and North Indian cuisine. </h6>
        </div>
        </div>
    </div>
)
}
export default RestaurantCard;