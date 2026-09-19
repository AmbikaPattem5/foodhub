import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../CustomHooks/useAuth";
import useCart from "../../CustomHooks/useCart";
import logo from "../../assets/FoodHub_logo.png";
import { User, ShoppingBag, LogOut, ChevronDown } from "lucide-react";
import './Header.css'
function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalCartItems } = useCart();
  function handleLogin() {
    navigate("/login");
  }
  function handleRegister() {
    navigate("/register");
  }

  return (
    <div className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
      <div>
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="FoodHub" className="h-10 w-auto" />
        </Link>
      </div>
      <div className="flex gap-6 text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 font-semibold"
              : "text-gray-700 hover:text-red-500"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/restaurants"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 font-semibold"
              : "text-gray-700 hover:text-red-500"
          }
        >
          Restaurants
        </NavLink>
        <NavLink
          to="/offers"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 font-semibold"
              : "text-gray-700 hover:text-red-500"
          }
        >
          Offers
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-red-500 font-semibold"
              : "text-gray-700 hover:text-red-500"
          }
        >
          About
        </NavLink>
      </div>
      <div className="flex gap-8 items-center">
        
        <div className="flex gap-8 text-gray-700">
          <Link to="/cart" className="hover:text-red-500 flex items-center">
            <ShoppingBag className="h-5 w-5"/><span className="cart">{totalCartItems()}</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {!user ? (
            <button
              className="px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition"
              onClick={handleLogin}
            >
              Login
            </button>
          ) : (
            
              <div>
               
                <div className="dropdown">
                  <button className="dropbtn flex items-center gap-2"><User className="h-4 w-3 "/>{user}<ChevronDown className="h-5 w-5"/></button>
                  <div className="dropdown-content">
                      
                            
                    <a href="#" ><Link to="/orders" className="hover:text-red-500">
                           My Orders
                    </Link></a>
                    <a href="#"><Link to="/favorites" className="hover:text-red-500">
                         Favorites
                          </Link></a>
     
                    <a href="#" onClick={logout}>logout</a>
                  </div>
                </div>

              </div>
          
          )}
          {user ? (
            ""
          ) : (
            <button
              className="px-4 py-2 rounded-lg font-medium border border-red-500 text-red-500 hover:bg-red-50 transition"
              onClick={handleRegister}
            >
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
