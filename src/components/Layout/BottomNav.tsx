import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { count } = useCart();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: Home,
    },
    {
      path: '/products',
      label: 'Buscar',
      icon: Search,
    },
    {
      path: '/wishlist',
      label: 'Favoritos',
      icon: Heart,
    },
    {
      path: '/checkout',
      label: 'Carrinho',
      icon: ShoppingCart,
      badge: Math.min(99, count),
    },
    {
      path: '/orders/info',
      label: 'Perfil',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 lg:hidden shadow-2xl safe-area-bottom">
      <div className="flex items-stretch justify-between h-20 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-300 relative group ${ 
                active
                  ? 'text-primary bg-light-gray bg-opacity-30'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {/* Ícone com badge */}
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-6 h-6 transition-all duration-300 ${
                    active ? 'text-primary' : 'text-gray-600 group-hover:text-gray-900'
                  }`}
                />

                {/* Badge do carrinho */}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                  active ? 'text-primary' : 'text-gray-600 group-hover:text-gray-900'
                }`}
              >
                {item.label}
              </span>

              {/* Indicador ativo */}
              {active && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
