import React, { useEffect, useState } from "react";

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({
  onFinish,
}) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);

      setTimeout(onFinish, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#C92071] via-[#ED2590] to-[#991956] transition-opacity duration-500 ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8 animate-float">
          <div className="absolute inset-0 bg-white rounded-3xl opacity-20 blur-xl animate-pulse"></div>
          <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl flex items-center justify-center p-6 transform transition-transform hover:scale-105">
            <img
              src="/images/icons/logo-header.svg"
              alt="Digital Store Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2 animate-fade-in-up">
          Digital Store
        </h1>
        <p className="text-white/80 text-sm md:text-base font-medium tracking-wider uppercase animate-fade-in-up delay-100">
          Sua loja, seu estilo
        </p>

        <div className="mt-12 w-48 h-1.5 bg-black/20 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-progress-indeterminate rounded-full"></div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
    </div>
  );
};
