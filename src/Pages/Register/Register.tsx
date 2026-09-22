import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { User, FormErrors } from "../../types/Types";
import { User as UserIcon, Mail, Phone, Lock, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import logo from "../../assets/FoodHub_logo.png";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
    terms: "",
  });

  const [successMessage, setSuccessMessage] = useState<string>("");

  function validateForm(): FormErrors {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    const errors: FormErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      terms: "",
    };

    if (formData.name.trim() === "") {
      errors.name = "Full name is required";
    }
    if (formData.email.trim() === "") {
      errors.email = "Email address is required";
    } else if (!emailPattern.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (formData.phone.trim() === "") {
      errors.phone = "Phone number is required";
    } else if (!phonePattern.test(formData.phone.trim())) {
      errors.phone = "Phone number must be exactly 10 digits";
    }
    if (formData.password === "") {
      errors.password = "Password is required";
    }
    if (formData.confirmPassword === "") {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.terms) {
      errors.terms = "You must accept the terms and conditions";
    }

    return errors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    const hasError = Object.values(errors).some((msg) => msg !== "");
    if (hasError) {
      return;
    }

    const response: string | null = localStorage.getItem("users");
    const responseData: User[] = response === null ? [] : JSON.parse(response);

    const updatedUsers = [...responseData, formData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setSuccessMessage("Account created successfully! Redirecting to login...");
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-200 shadow-xl p-8 sm:p-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-1">
            <img src={logo} alt="FoodHub" className="h-10 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-gray-500">
            Sign up to order delicious meals and enjoy exclusive discounts
          </p>
        </div>

        {successMessage && (
          <div className="flex items-center gap-2 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl animate-in fade-in-50 duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative flex items-center">
              <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-gray-50/50 outline-hidden transition ${
                  formErrors.name
                    ? "border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30"
                    : "border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                }`}
              />
            </div>
            {formErrors.name && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.name}
              </p>
            )}
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Email
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-gray-50/50 outline-hidden transition ${
                    formErrors.email
                      ? "border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30"
                      : "border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                  }`}
                />
              </div>
              {formErrors.email && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.email}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  maxLength={10}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-gray-50/50 outline-hidden transition ${
                    formErrors.phone
                      ? "border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30"
                      : "border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                  }`}
                />
              </div>
              {formErrors.phone && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
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
                  placeholder="Create password"
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-gray-50/50 outline-hidden transition ${
                    formErrors.password
                      ? "border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30"
                      : "border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                  }`}
                />
              </div>
              {formErrors.password && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.password}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-gray-50/50 outline-hidden transition ${
                    formErrors.confirmPassword
                      ? "border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30"
                      : "border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                  }`}
                />
              </div>
              {formErrors.confirmPassword && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="space-y-1 pt-1">
            <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="rounded-sm border-gray-300 text-red-600 focus:ring-red-500 w-4 h-4 mt-0.5 cursor-pointer"
              />
              <span>
                I agree to the FoodHub <span className="text-red-600 font-semibold underline">Terms of Service</span> and <span className="text-red-600 font-semibold underline">Privacy Policy</span>.
              </span>
            </label>
            {formErrors.terms && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.terms}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer mt-4"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Login Prompt */}
        <div className="text-center border-t border-gray-100 pt-4 text-xs text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-red-600 hover:text-red-700 transition">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;