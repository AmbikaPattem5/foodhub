import { Routes,Route } from "react-router-dom";
import MainLayout from "../Components/Main/MainLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Offers from "../Pages/Offers/Offers";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Restaurants from "../Pages/Restaurants/Restaurants";
import Cart from "../Components/Cart/Cart";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import RestaurantCard from "../Components/RestaurantCard";
function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<MainLayout/>}>
            
            <Route index element={<Home/>}/>
            <Route path='restaurants' element={<Restaurants/>}/> 
            <Route path='about' element={<About/>}/>
            <Route path='offers' element={<Offers/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='login'element={<Login/>}/>
            <Route path='forgotPassword' element={<ForgotPassword/>}/>
            </Route>
            <Route path='/restaurantCard/:id' element={<RestaurantCard/>}/>
        </Routes>
    )
}
export default AppRoutes;