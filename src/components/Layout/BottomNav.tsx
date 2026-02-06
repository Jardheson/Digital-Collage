import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, ShoppingCart, User, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { count } = useCart();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      path: "/",
      label: "Home",
      icon: Home,
    },
    {
      path: "/products",
      label: "Buscar",
      icon: Search,
    },
    {
      path: "/wishlist",
      label: "Favoritos",
      icon: Heart,
    },
    {
      path: "/cart",
      label: "Carrinho",
      icon: ShoppingCart,
      badge: count > 0 ? Math.min(99, count) : undefined,
    },
    {
      path: "/orders/info",
      label: "Perfil",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] safe-area-bottom">
      <div className="flex items-stretch justify-between h-16 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-200 relative group active:scale-95 ${
                active ? "text-primary" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-6 h-6 transition-transform duration-200 ${
                    active ? "scale-110 stroke-[2.5px]" : "stroke-2"
                  }`}
                />

                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm border border-white">
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] font-medium transition-colors duration-200 ${
                  active ? "text-primary" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
