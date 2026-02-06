import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tags,
  Users,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  Settings,
  Image,
  Grid,
  Zap,
  Lock,
  Smartphone,
  Link as LinkIcon,
  FileText,
  MessageSquare,
} from "lucide-react";

import { useAdminAuth } from "../context/AdminAuthContext";

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();
  const { user, logout } = useAdminAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Produtos", path: "/admin/products" },
    { icon: Tags, label: "Categorias", path: "/admin/categories" },
    { icon: ShoppingBag, label: "Pedidos", path: "/admin/orders" },
    { icon: Users, label: "Usuários", path: "/admin/users" },
    { icon: Image, label: "Banners", path: "/admin/banners" },
    { icon: Grid, label: "Coleções", path: "/admin/featured-collections" },
    { icon: Zap, label: "Oferta Especial", path: "/admin/special-offer" },
    { icon: Lock, label: "Páginas Auth", path: "/admin/auth-pages" },
    { icon: Smartphone, label: "PWA / App", path: "/admin/pwa" },
    { icon: LinkIcon, label: "Links Rodapé", path: "/admin/footer-links" },
    { icon: FileText, label: "Conteúdo / Páginas", path: "/admin/pages" },
    { icon: MessageSquare, label: "Avaliações", path: "/admin/reviews" },
    { icon: Settings, label: "Configurações", path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-center border-b border-gray-100">
            <Link to="/admin" className="flex items-center gap-2">
              <img
                src="/images/icons/logo-header.svg"
                alt="Logo"
                className="h-8"
              />
              <span className="font-bold text-[#C92071]">Admin</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#C92071] text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#C92071]"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800">
                {user?.name || "Administrador"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || "admin@digitalstore.com"}
              </p>
            </div>
            <div className="w-10 h-10 bg-[#C92071] rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
