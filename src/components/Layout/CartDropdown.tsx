import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface CartDropdownProps {
  onClose: () => void;
}

export const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const { items, total, clear } = useCart();

  const formatBRL = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="absolute right-0 top-full mt-4 w-80 bg-white rounded shadow-[0_4px_20px_rgba(0,0,0,0.15)] z-50 animate-fade-in transform origin-top-right mr-2 md:mr-0">
      {/* Seta do popover */}
      <div className="absolute -top-2 right-6 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-100 z-10"></div>

      <div className="relative bg-white rounded-lg overflow-hidden border border-gray-100">
        <div className="p-6">
          <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Meu Carrinho
          </h3>

          <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 items-start pb-2">
                  <div className="w-16 h-16 rounded bg-[#E2E3FF] overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight mb-1">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-900 font-bold text-base">
                        {formatBRL(item.price)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formatBRL(item.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Seu carrinho está vazio</p>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <>
              <div className="my-4 border-t border-gray-200"></div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-800 text-base">
                  Valor total:
                </span>
                <span className="text-xl font-bold text-[#C92071]">
                  {formatBRL(total)}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <button
                  className="text-gray-500 underline text-sm font-medium hover:text-gray-800"
                  onClick={clear}
                >
                  Esvaziar
                </button>
                <Link
                  to="/cart"
                  className="bg-[#C92071] text-white font-bold py-2 px-6 rounded hover:bg-pink-700 transition-all text-sm"
                  onClick={onClose}
                >
                  Ver Carrinho
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
