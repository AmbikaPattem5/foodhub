import { useEffect, useState } from "react";
import useLoading from "../../CustomHooks/useLoading";
import { Loader2, Utensils } from "lucide-react";
import "./GlobalLoader.css";

export function GlobalLoader() {
  const { isLoading, activeRequests } = useLoading();
  const [showCenterBadge, setShowCenterBadge] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isLoading) {
      // Small debounce delay before showing center badge to prevent flashing on fast micro-requests
      timer = setTimeout(() => {
        setShowCenterBadge(true);
      }, 150);
    } else {
      setShowCenterBadge(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <>
      {/* 1. Sleek Top-of-Screen Indeterminate Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-red-100/60 z-[9999] overflow-hidden pointer-events-none"
        role="progressbar"
        aria-label="Loading..."
        aria-busy="true"
      >
        <div className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 shadow-[0_0_12px_rgba(239,68,68,0.8)] animate-indeterminate rounded-r-full" />
      </div>

      {/* 2. Glassmorphic Center Loading Overlay / Badge (shown on requests > 150ms) */}
      {showCenterBadge && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none bg-black/10 backdrop-blur-[2px] transition-all duration-300">
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-white/60 flex items-center gap-4 animate-pulse-subtle max-w-sm mx-4">
            {/* Spinning Food Icon Container */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-md shadow-red-500/25">
              <Utensils className="w-5 h-5 animate-bounce" />
              <Loader2 className="absolute inset-0 w-12 h-12 animate-spin text-white/40" />
            </div>

            {/* Status Information */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900">
                  {activeRequests > 1 ? `Updating (${activeRequests})...` : "Cooking up..."}
                </p>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Fetching fresh data for you
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GlobalLoader;
