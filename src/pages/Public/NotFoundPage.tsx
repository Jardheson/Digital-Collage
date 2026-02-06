import React from "react";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-full max-w-md mb-8 relative">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl transform scale-150 z-0"></div>
        <div className="relative z-10 text-[150px] font-bold text-primary/10 leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Search className="w-24 h-24 text-primary animate-bounce" />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative z-10">
        Ops! Página não encontrada
      </h1>

      <p className="text-gray-600 mb-8 max-w-lg mx-auto relative z-10">
        A página que você está procurando pode ter sido removida, renomeada ou
        está temporariamente indisponível.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <Link
          to="/"
          className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Home className="w-5 h-5" />
          Voltar para Home
        </Link>

        <Link
          to="/products"
          className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          Buscar Produtos
        </Link>
      </div>
    </div>
  );
};
