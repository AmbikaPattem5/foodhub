import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../CustomHooks/useAuth";
import useCart from "../../CustomHooks/useCart";
import logo from "../../assets/FoodHub_logo.png";
import {
  ShoppingBag,
  LogOut,
  ChevronDown,
  Heart,
  Package,
  Menu,
  X,
  Compass,
  UtensilsCrossed,
  Tag,
  Info
} from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const { user, logout, login } = useAuth();
  const { totalCartItems } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogin() {
    setMobileMenuOpen(false);
    navigate("/login");
  }

  function handleRegister() {
    setMobileMenuOpen(false);
    navigate("/register");
  }

  function handleLogout() {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    login('')
    logout();
    navigate("/login");
  }

  const cartCount = totalCartItems();

  const navLinks = [
    { to: "/", label: "Home", icon: Compass },
    { to: "/restaurants", label: "Restaurants", icon: UtensilsCrossed },
    { to: "/offers", label: "Offers", icon: Tag },
    { to: "/about", label: "About", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group transition-transform active:scale-95"
          >
            <img
              src={logo}
              alt="FoodHub"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-extrabold text-xl tracking-tight text-gray-900 hidden sm:inline">
              Food<span className="text-red-600">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-50/80 p-1.5 rounded-full border border-gray-200/60 shadow-inner">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-white text-red-600 shadow-xs font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Cart & User Auth */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors active:scale-95 flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[11px] font-bold h-5 min-w-5 px-1 rounded-full flex items-center justify-center ring-2 ring-white animate-in zoom-in-50 duration-200">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Auth Actions */}
            {!user ? (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={handleRegister}
                  className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs hover:shadow rounded-lg transition active:scale-95"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs transition text-sm font-medium text-gray-800"
                >
                  <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center text-xs">
                    {user.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-24 truncate">{user}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">{user}</p>
                    </div>
                    <Link
                      to="/orders"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <Package className="h-4 w-4 text-gray-400 group-hover:text-red-600" />
                      My Orders
                    </Link>
                    <Link
                      to="/favorites"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <Heart className="h-4 w-4 text-gray-400 group-hover:text-red-600" />
                      Favorites
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="h-4 w-4 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${isActive
                    ? "bg-red-50 text-red-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}

            {!user ? (
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full py-2 text-center text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={handleRegister}
                  className="w-full py-2 text-center text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition shadow-xs"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-gray-100 space-y-1">
                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Package className="h-4 w-4 text-gray-400" />
                  My Orders
                </Link>
                <Link
                  to="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Heart className="h-4 w-4 text-gray-400" />
                  Favorites
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out ({user})
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
