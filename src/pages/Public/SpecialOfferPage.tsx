import React from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
import { ArrowLeft } from "lucide-react";

export const SpecialOfferPage: React.FC = () => {
  const { settings } = useSettings();
  const offer = settings.specialOffer;

  if (!offer) return null;

  return (
    <div className="bg-light-gray min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para Home
        </Link>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-[#F9F8FE] relative min-h-[400px] flex items-center justify-center p-8">
              <img
                src="/images/ui/Ellipse11.png"
                alt="Background Effect"
                className="absolute w-[80%] h-[80%] object-contain opacity-50 pointer-events-none"
              />
              <img
                src={offer.image}
                alt={offer.title}
                className="relative z-10 w-full max-w-[500px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6">
              <span className="text-primary font-bold text-lg">
                {offer.subtitle}
              </span>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                {offer.title}
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed">
                {offer.description}
              </p>

              <div className="pt-4">
                <Link
                  to={offer.link}
                  className="inline-block bg-primary text-white font-bold py-4 px-10 rounded-lg hover:bg-pink-700 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {offer.linkText}
                </Link>
              </div>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <p className="text-sm text-gray-400">
                  * Oferta válida por tempo limitado ou enquanto durarem os
                  estoques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
