import Header from "../Header/Header";
import { Outlet, Link } from "react-router-dom";
import { ShieldCheck, Truck, Clock, Heart } from "lucide-react";
import logo from "../../assets/FoodHub_logo.png";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 text-gray-900 font-sans selection:bg-red-500 selection:text-white">
      {/* Sticky Top Navbar */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 text-gray-600">
        {/* Value Propositions / Trust Badges */}
        <div className="border-b border-gray-100 bg-gray-50/70 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base">Lightning Fast Delivery</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">Hot and fresh food delivered directly to your doorstep in minutes.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base">Live Order Tracking</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">Track every step of your order from kitchen prep to arrival.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base">Quality Guaranteed</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">Partnered with top-rated, certified local restaurants.</p>
            </div>
          </div>
        </div>

        {/* Links & Brand Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-3">
                <img src={logo} alt="FoodHub" className="h-8 w-auto" />
                <span className="font-bold text-lg text-gray-900">
                  Food<span className="text-red-600">Hub</span>
                </span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your favorite dishes, crave-worthy cuisines, and quick snacks from the best local restaurants.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 text-sm tracking-wider uppercase mb-3">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-red-600 transition">Home</Link></li>
                <li><Link to="/restaurants" className="hover:text-red-600 transition">Restaurants</Link></li>
                <li><Link to="/offers" className="hover:text-red-600 transition">Coupons & Offers</Link></li>
                <li><Link to="/about" className="hover:text-red-600 transition">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 text-sm tracking-wider uppercase mb-3">Account</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/orders" className="hover:text-red-600 transition">My Orders</Link></li>
                <li><Link to="/favorites" className="hover:text-red-600 transition">Favorite Restaurants</Link></li>
                <li><Link to="/cart" className="hover:text-red-600 transition">Cart</Link></li>
                <li><Link to="/login" className="hover:text-red-600 transition">Sign In</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 text-sm tracking-wider uppercase mb-3">Cuisines</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Biryani, North Indian, South Indian, Italian Pizza, Burgers, Chinese & Desserts.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
            <p>&copy; {new Date().getFullYear()} FoodHub. Built with React & Tailwind CSS.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> for food lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;