import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, Heart, User, Download } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { usePWA } from "../../context/PWAContext";
import { useSettings } from "../../context/SettingsContext";
import { useUserAuth } from "../../context/UserAuthContext";
import { SearchModal } from "../UI/SearchModal";
import { CartDropdown } from "./CartDropdown";

type HeaderVariant = "default" | "auth";

interface HeaderProps {
  variant?: HeaderVariant;
}

export const Header: React.FC<HeaderProps> = ({ variant = "default" }) => {
  const [openCart, setOpenCart] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartRef = useRef<HTMLDivElement | null>(null);
  const mobileCartRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { count } = useCart();
  const { count: favoritesCount } = useFavorites();
  const { showInstallPrompt, installApp } = usePWA();
  const { settings } = useSettings();
  const { user, isAuthenticated, logout } = useUserAuth();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?filter=${encodeURIComponent(searchQuery)}`);
      setMobileSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const clickedOutsideDesktop = cartRef.current && !cartRef.current.contains(e.target as Node);
      const clickedOutsideMobile = mobileCartRef.current && !mobileCartRef.current.contains(e.target as Node);
      
      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setOpenCart(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (mobileSearchOpen) setMobileSearchOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Produtos" },
    { path: "/categories", label: "Categorias" },
    { path: "/orders", label: "Meus Pedidos" },
  ];

  return (
    <>
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={() => {}}
      />

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="hidden lg:block">
          <div className="border-b border-gray-100">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <Link to="/" className="flex-shrink-0" aria-label="Ir para página inicial">
                <img 
                  src={settings.logoUrl || "/images/icons/logo-header.svg"} 
                  alt={`${settings.siteName} Logo`} 
                  className="h-10 w-auto hover:opacity-80 transition-opacity" 
                />
              </Link>

              {variant === "default" && (
                <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-8" role="search">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Buscar produtos..."
                      aria-label="Buscar produtos"
                      className="w-full bg-light-gray rounded-lg py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <button type="submit" aria-label="Realizar busca" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}

              {variant === "default" && (
                <div className="flex items-center gap-6">
                  {showInstallPrompt && (
                    <button
                      onClick={installApp}
                      className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium"
                      title="Instalar Aplicativo"
                    >
                      <Download className="w-6 h-6" />
                      <span className="hidden xl:inline">Instalar App</span>
                    </button>
                  )}

                  <Link
                    to="/wishlist"
                    className="relative text-gray-600 hover:text-primary transition-colors"
                    title="Wishlist"
                    aria-label="Ir para lista de desejos"
                  >
                    <Heart className="w-6 h-6" />
                    {favoritesCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {favoritesCount}
                      </span>
                    )}
                  </Link>

                  <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
                    {isAuthenticated && user ? (
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden xl:block">
                          <p className="text-sm font-bold text-gray-800">{user.name}</p>
                          <Link to="/orders" className="text-xs text-primary hover:underline">
                            Meus Pedidos
                          </Link>
                        </div>
                        <div className="relative group/user">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold cursor-pointer">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <User className="w-5 h-5" />
                            )}
                          </div>
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 hidden group-hover/user:block">
                            <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                              Meus Pedidos
                            </Link>
                            <Link to="/orders/info" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                              Minha Conta
                            </Link>
                            <button 
                              onClick={() => logout()}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              Sair
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Link
                          to="/signup"
                          className="text-gray-600 hover:text-primary text-sm font-medium transition-colors"
                        >
                          Crie sua conta
                        </Link>
                        <Link
                          to="/login"
                          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-700 transition-all hover:shadow-lg"
                        >
                          Acesse sua conta
                        </Link>
                      </>
                    )}
                  </div>

                  <div ref={cartRef} className="relative">
                    <button
                      className="relative text-primary hover:text-secondary transition-colors"
                      onClick={() => setOpenCart(!openCart)}
                      title="Carrinho"
                      aria-label="Abrir carrinho de compras"
                      aria-expanded={openCart}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      {count > 0 && (
                        <span className="absolute -top-3 -right-3 bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                          {Math.min(99, count)}
                        </span>
                      )}
                    </button>

                    {openCart && <CartDropdown onClose={() => setOpenCart(false)} />}
                  </div>
                </div>
              )}
            </div>
          </div>

          {variant === "default" && (
            <nav className="border-t border-gray-100">
              <div className="container mx-auto px-6">
                <div className="flex items-center gap-8 h-16">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`font-semibold text-sm transition-all relative h-full flex items-center ${
                        location.pathname === link.path
                          ? "text-primary"
                          : "text-gray-700 hover:text-primary"
                      }`}
                    >
                      {link.label}
                      {location.pathname === link.path && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-t-full"></div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          )}
        </div>

        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16 px-4 bg-white">
            {variant === "default" && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-primary transition-colors p-2 -ml-2 rounded-full active:bg-gray-100"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}

            <Link to="/" className="flex-shrink-0 absolute left-1/2 -translate-x-1/2" aria-label="Ir para página inicial">
              <img 
                src={settings.logoUrl || "/images/icons/logo-header.svg"} 
                alt={`${settings.siteName} Logo`} 
                className="h-6 w-auto" 
              />
            </Link>

            {variant === "default" && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                  className="text-gray-700 hover:text-primary transition-colors p-2 rounded-full active:bg-gray-100"
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5" />
                </button>

                <div className="relative" ref={mobileCartRef}>
                  <button
                    onClick={() => setOpenCart(!openCart)}
                    className="relative text-primary p-2 rounded-full active:bg-gray-100"
                    title="Carrinho"
                  >
                    <ShoppingCart className="w-5 h-5 text-[#C92071]" />
                    {count > 0 && (
                      <span className="absolute top-0 right-0 bg-[#C92071] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white box-content">
                        {Math.min(99, count)}
                      </span>
                    )}
                  </button>
                  {openCart && <CartDropdown onClose={() => setOpenCart(false)} />}
                </div>
              </div>
            )}
          </div>

          {mobileSearchOpen && (
            <div className="border-t border-gray-100 p-4 sm:p-6 bg-light-gray">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full bg-white rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  onClick={() => setMobileSearchOpen(false)}
                  type="button"
                  aria-label="Fechar busca"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {mobileMenuOpen && (
            <div className="border-t border-gray-100 bg-white max-h-96 overflow-y-auto">
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-6 py-4 border-b border-gray-100 text-base font-semibold transition-colors ${
                      location.pathname === link.path
                        ? "text-primary bg-primary/5 border-l-4 border-l-primary"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="border-t border-gray-200 mt-2 pt-2">
                  <Link
                    to="/wishlist"
                    className="px-6 py-4 border-b border-gray-100 text-base font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <Heart className="w-5 h-5" />
                    Wishlist
                  </Link>

                  <Link
                    to="/orders/info"
                    className="px-6 py-4 border-b border-gray-100 text-base font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <User className="w-5 h-5" />
                    Minha Conta
                  </Link>
                </div>

                <div className="px-6 py-6 border-t border-gray-200 space-y-3">
                  {isAuthenticated && user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <User className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full border border-red-200 text-red-600 font-bold py-3 px-4 rounded-lg hover:bg-red-50 transition-all text-center block"
                      >
                        Sair da conta
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 transition-all text-center block"
                      >
                        Acesse sua conta
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full border-2 border-primary text-primary font-bold py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition-all text-center block"
                      >
                        Crie sua conta
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
