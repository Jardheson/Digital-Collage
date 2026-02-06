import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { User, LogOut } from "lucide-react";

export const ProfileSidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useUserAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-full md:w-64">
      <div className="bg-white rounded shadow-sm border mb-4 p-4 flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold shrink-0 overflow-hidden">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-6 h-6" />
          )}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm text-gray-500">Olá,</p>
          <p className="font-bold text-gray-800 truncate">
            {user?.name || "Visitante"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border">
        <ul className="divide-y">
          <li className="px-4 py-3 font-bold text-gray-800 bg-gray-50 border-b">
            Minha Conta
          </li>
          <li
            className={`px-4 py-3 ${isActive("/orders") ? "font-bold text-primary bg-pink-50" : "text-gray-700"}`}
          >
            <Link
              to="/orders"
              className={
                isActive("/orders")
                  ? "text-primary"
                  : "hover:text-primary block"
              }
            >
              Meus Pedidos
            </Link>
          </li>
          <li
            className={`px-4 py-3 ${isActive("/orders/info") ? "font-bold text-primary bg-pink-50" : "text-gray-700"}`}
          >
            <Link
              to="/orders/info"
              className={
                isActive("/orders/info")
                  ? "text-primary"
                  : "hover:text-primary block"
              }
            >
              Minhas Informações
            </Link>
          </li>
          <li
            className={`px-4 py-3 ${isActive("/orders/payment-methods") ? "font-bold text-primary bg-pink-50" : "text-gray-700"}`}
          >
            <Link
              to="/orders/payment-methods"
              className={
                isActive("/orders/payment-methods")
                  ? "text-primary"
                  : "hover:text-primary block"
              }
            >
              Métodos de Pagamento
            </Link>
          </li>
          <li className="px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer border-t">
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sair da conta
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};
