import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowRight 
} from "lucide-react";

function About() {
  const stats = [
    { label: "Happy Foodies", value: "50K+" },
    { label: "Partner Restaurants", value: "500+" },
    { label: "Average Delivery", value: "24 mins" },
    { label: "Customer Rating", value: "4.8 ★" },
  ];

  const features = [
    {
      icon: Truck,
      title: "Superfast Delivery",
      desc: "Our smart routing algorithm pairs orders with the nearest rider for lightning-fast deliveries.",
    },
    {
      icon: ShieldCheck,
      title: "Hygienic & Certified",
      desc: "Every restaurant partner is rigorously vetted to ensure top hygiene standards and fresh ingredients.",
    },
    {
      icon: Clock,
      title: "Live Order Tracker",
      desc: "Stay informed at every step — from the chef firing the stove to the rider reaching your gate.",
    },
    {
      icon: Award,
      title: "Best Price Guarantee",
      desc: "Enjoy regular deals, exclusive seasonal promotions, and discount vouchers on your favorites.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-xs uppercase tracking-wider border border-red-200">
          <Sparkles className="w-3.5 h-3.5" /> Our Story
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Delivering Joy, One Delicious Meal at a Time
        </h1>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          FoodHub began with a simple craving: bringing authentic local culinary treasures directly to hungry food lovers. Today, we connect thousands of diners with their favorite neighborhood eateries every day.
        </p>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-200 p-6 text-center shadow-xs hover:shadow-md transition"
          >
            <p className="text-2xl sm:text-4xl font-black text-red-600">{stat.value}</p>
            <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Why Food Lovers Choose FoodHub
          </h2>
          <p className="text-sm text-gray-500">
            We focus on quality, speed, and unforgettable flavours with every order.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-gradient-to-r from-red-600 to-amber-600 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-lg">
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black">Hungry Yet?</h2>
          <p className="text-rose-100 text-sm sm:text-base">
            Your next favorite meal is just a few taps away. Explore the best restaurants in your city now!
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-red-600 hover:bg-rose-50 font-extrabold text-sm rounded-xl shadow-md transition active:scale-95"
        >
          Explore Restaurants <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default About;