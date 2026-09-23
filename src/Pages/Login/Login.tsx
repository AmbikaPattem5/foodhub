import React, { useState } from "react";
import { useAuth } from "../../CustomHooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import type { LoginUser } from "../../types/Types";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import logo from "../../assets/FoodHub_logo.png";
import api from "../../services/api";
import toast from "react-hot-toast";
function Login() {
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState<LoginUser>({
    name: "",
    password: "",
    remember: false,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { name: formData.name, password: formData.password });
      console.log(response);
      toast.success(response.data.message || "Login Successfull", { duration: 2500 })
      login(formData.name)
      navigate(from);
    }
    catch (err) {
      toast.error("Invalid credentials or server error!", { duration: 2500 });
    }

  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (error) setError("");
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-xl p-8 sm:p-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-1">
            <img src={logo} alt="FoodHub" className="h-10 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-sm text-gray-500">Sign in to your FoodHub account</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl animate-in fade-in-50 duration-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username or Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Username or Email
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. foodlover or user@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 bg-gray-50/50 outline-hidden focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 bg-gray-50/50 outline-hidden focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100 transition"
              />
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="rounded-sm border-gray-300 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
              />
              Remember me
            </label>
            <Link
              to="/forgotPassword"
              className="font-semibold text-red-600 hover:text-red-700 transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer mt-2"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Register Prompt */}
        <div className="text-center border-t border-gray-100 pt-4 text-xs text-gray-600">
          Don't have an account yet?{" "}
          <Link to="/register" className="font-bold text-red-600 hover:text-red-700 transition">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;