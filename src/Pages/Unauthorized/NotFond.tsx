import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm space-y-6">
        <div className="text-6xl animate-bounce">🍕</div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Error 404
          </span>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Lost Your Appetite?
          </h1>
          <p className="text-gray-500 text-sm">
            We couldn't find the page you were looking for. It might have been devoured or moved to another link.
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;