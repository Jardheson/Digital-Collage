import React from "react";
import { X, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <div className="bg-[#C92071] text-white px-6 py-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            <h2 className="text-xl font-bold">Meu Carrinho</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {items.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Sua cesta está vazia.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative group"
              >
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-[#E2E3FF] rounded-md flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-1 pt-1">
                    <h3 className="font-bold text-gray-800 text-sm mb-4 pr-6 leading-tight line-clamp-2">
                      {item.name}
                    </h3>

                    <div className="flex items-end justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden h-8">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 hover:bg-gray-100 text-gray-600 transition-colors h-full flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold text-gray-800 text-sm min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 hover:bg-gray-100 text-gray-600 transition-colors h-full flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-400 line-through mb-0.5">
                          R$ {(item.price * 1.5).toFixed(2).replace(".", ",")}
                        </div>
                        <div className="font-bold text-gray-900 text-lg">
                          R$ {item.price.toFixed(2).replace(".", ",")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-white border-t border-gray-100 p-6 space-y-4 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-gray-500 text-sm">
              <span>subtotal</span>
              <span className="line-through">
                R$ {(total * 1.5).toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800 text-lg">total</span>
              <span className="font-bold text-[#C92071] text-2xl">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              to="/checkout"
              className="block w-full bg-[#C92071] text-white font-bold py-3.5 rounded text-center hover:bg-pink-700 transition-colors uppercase tracking-wide text-sm"
            >
              continuar
            </Link>
            <button
              onClick={onClose}
              className="block w-full bg-white text-[#C92071] border-2 border-[#C92071] font-bold py-3.5 rounded text-center hover:bg-pink-50 transition-colors uppercase tracking-wide text-sm"
            >
              continuar comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
