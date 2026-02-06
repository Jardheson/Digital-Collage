import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";

export const HeroCarousel: React.FC = () => {
  const { settings } = useSettings();
  const slides = settings.slides || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (slides.length === 0) return null;

  return (
    <section className="bg-light-gray relative overflow-hidden py-4 lg:py-0 min-h-[350px] lg:min-h-[480px] flex items-center">
      <div className="mx-auto max-w-[1280px] px-4 w-full relative z-10">
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-opacity duration-700 ease-in-out absolute inset-0 lg:static flex flex-col-reverse lg:flex-row items-center justify-between ${
                index === currentIndex
                  ? "opacity-100 z-10 relative"
                  : "opacity-0 z-0 absolute top-0 left-0 w-full"
              }`}
              style={{ display: index === currentIndex ? "flex" : "none" }}
            >
              <div className="lg:w-1/2 space-y-4 md:space-y-6 z-10 mt-8 lg:mt-0 animate-slide-up">
                <span className="text-warning text-yellow-500 font-bold tracking-wide text-xs md:text-base">
                  {slide.subtitle}
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-gray-500 text-sm md:text-lg max-w-md">
                  {slide.description}
                </p>
                <Link
                  to={slide.link}
                  className="inline-block bg-primary text-white font-bold py-3 px-8 rounded hover:bg-pink-700 transition-colors text-base w-full md:w-auto text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {slide.buttonText}
                </Link>
              </div>

              <div className="lg:w-1/2 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
                <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/50 rounded-full blur-3xl -z-10" />
                <div className="relative w-full max-w-[320px] md:max-w-[480px] lg:max-w-[650px] aspect-square flex items-center justify-center transform scale-110 lg:scale-125 lg:translate-x-10">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain drop-shadow-2xl animate-float"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <div className="mt-12 lg:mt-0 lg:absolute lg:bottom-10 lg:left-1/2 lg:-translate-x-1/2 flex justify-center gap-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
