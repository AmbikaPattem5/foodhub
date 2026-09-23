import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import logo from "../../assets/FoodHub_logo.png";
import api from "../../services/api";
import toast from "react-hot-toast";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/forgot-password", {
        email: email.trim()
      })
      if (response && response.data && response.data.success) {
        toast.success(response.data.message || "Password reset link sent successfully", { duration: 2500 })

        setSubmitted(true)
      }
    }
    catch (err) {
      toast.error("Failed to send password reset link! Please try again.", { duration: 2500 });
    }

  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-xl p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-1">
            <img src={logo} alt="FoodHub" className="h-10 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Reset Password</h1>
          <p className="text-sm text-gray-500">
            Enter your registered email address and we'll send you recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-emerald-900">Check Your Inbox</h3>
            <p className="text-xs text-emerald-700">
              We have sent password reset instructions to <strong>{email}</strong>. Please check your spam folder if it doesn't appear in a few minutes.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 bg-gray-50/50 outline-hidden focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer mt-2"
            >
              Send Reset Link <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-red-600 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;