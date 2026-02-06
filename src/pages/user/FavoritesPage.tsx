import React from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { ProductCard } from "../../components/Product/ProductCard";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="bg-[#F9F8F6] min-h-screen py-8">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-primary fill-primary" />
          <h1 className="text-3xl font-bold text-gray-800">Meus Favoritos</h1>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Sua lista de desejos está vazia
            </h2>
            <p className="text-gray-500 mb-8">
              Você ainda não adicionou nenhum produto aos favoritos.
              <br />
              Explore nossa loja e encontre o que você ama!
            </p>
            <Link
              to="/products"
              className="inline-block bg-primary text-white font-bold py-3 px-8 rounded hover:bg-pink-700 transition-colors"
            >
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
