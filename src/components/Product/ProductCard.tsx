import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/Product";
import { useFavorites } from "../../context/FavoritesContext";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  badge?: string;
  disableAutoBadge?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  badge,
  disableAutoBadge = false,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const priceDiscount = product.priceDiscount ?? product.price;
  const favorite = isFavorite(product.id);

  return (
    <div className="group block relative">
      <Link
        to={`/products/${product.id}`}
        className="absolute inset-0 z-0"
        aria-label={`Ver detalhes de ${product.name}`}
      />

      <div className="bg-white rounded overflow-hidden shadow-sm group-hover:shadow-md transition-shadow h-full flex flex-col relative z-10 pointer-events-none">
        <div className="relative aspect-square w-full bg-white flex items-center justify-center overflow-hidden">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product);
            }}
            className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-colors pointer-events-auto ${
              favorite
                ? "bg-primary text-white"
                : "bg-transparent text-gray-400 hover:text-primary hover:bg-gray-50"
            }`}
            title={
              favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
            aria-label={
              favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
          >
            <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
          </button>

          {badge ? (
            <span className="absolute top-4 left-4 bg-[#E7FF86] text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
              {badge}
            </span>
          ) : (
            !disableAutoBadge &&
            priceDiscount < product.price && (
              <span className="absolute top-4 left-4 bg-[#E7FF86] text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
                {Math.round(
                  ((product.price - priceDiscount) / product.price) * 100,
                )}
                % OFF
              </span>
            )
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="text-gray-text text-sm md:text-lg font-normal my-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-auto">
            {priceDiscount < product.price ? (
              <>
                <span className="text-gray-400 line-through text-sm md:text-lg">
                  ${product.price}
                </span>
                <span className="text-gray-800 font-bold text-sm md:text-lg">
                  ${priceDiscount}
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-bold text-sm md:text-lg">
                ${product.price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
