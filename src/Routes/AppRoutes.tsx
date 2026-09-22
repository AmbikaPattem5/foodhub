import { Routes, Route } from "react-router-dom";
import MainLayout from "../Components/Main/MainLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Offers from "../Pages/Offers/Offers";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Restaurants from "../Pages/Restaurants/Restaurants";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import RestaurantDetails from "../Components/RestaurantDetails";
import Cart from "../Pages/Cart/Cart";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Orders from "../Pages/Orders/Orders";
import OrderConfirmation from "../Pages/OrderConfirmation/OrderConfirmation";
import OrderDetails from "../Pages/OrderDetails/OrderDetails";
import Favorites from "../Pages/Favourites/Favorites";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFound from "../Pages/Unauthorized/NotFond";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="restaurants" element={<Restaurants />} />
        <Route path="about" element={<About />} />
        <Route path="offers" element={<Offers />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="favorites" element={<Favorites/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="orders/:orderId" element={<OrderDetails/>}/>
          <Route path="restaurantdetails/:id" element={<RestaurantDetails />} />
          <Route path="orderConfirmation/:orderId" element={<OrderConfirmation/>}/>

        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}
export default AppRoutes;
