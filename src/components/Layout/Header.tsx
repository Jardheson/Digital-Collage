import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, Heart, User, Download } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { usePWA } from "../../context/PWAContext";
import { SearchModal } from "../UI/SearchModal";

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
  const location = useLocation();
  const navigate = useNavigate();
  const formatBRL = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const { items, total, clear, count } = useCart();
  const { count: favoritesCount } = useFavorites();
  const { installApp } = usePWA();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?filter=${encodeURIComponent(searchQuery)}`);
      setMobileSearchOpen(false);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setOpenCart(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fechar menu ao clicar em um link
  useEffect(() => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (mobileSearchOpen) setMobileSearchOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        onSearch={(query) => {
          console.log("Buscando:", query);
        }}
      />

      {/* Header Principal */}
      <header className="bg-white shadow-md sticky top-0 z-50 opacity-100">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          {/* Top Bar - Auth & Search */}
          <div className="border-b border-gray-100">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <img src="/images/icons/logo-header.svg" alt="logo-header" className="h-10 w-auto hover:opacity-80 transition-opacity" />
              </Link>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-8">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    className="w-full bg-light-gray rounded-lg py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Right Actions */}
              {variant === "default" && (
                <div className="flex items-center gap-6">
                  {/* Install App */}
                  <button
                    onClick={installApp}
                    className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium"
                    title="Instalar Aplicativo"
                  >
                    <Download className="w-6 h-6" />
                    <span className="hidden xl:inline">Instalar App</span>
                  </button>

                  {/* Wishlist */}
                  <Link
                    to="/wishlist"
                    className="relative text-gray-600 hover:text-primary transition-colors"
                    title="Wishlist"
                  >
                    <Heart className="w-6 h-6" />
                    {favoritesCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {favoritesCount}
                      </span>
                    )}
                  </Link>

                  {/* Auth Links */}
                  <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
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
                  </div>

                  {/* Cart */}
                  <div ref={cartRef} className="relative">
                    <button
                      className="relative text-primary hover:text-secondary transition-colors"
                      onClick={() => setOpenCart(!openCart)}
                      title="Carrinho"
                    >
                      <ShoppingCart className="w-6 h-6" />
                      <span className="absolute -top-3 -right-3 bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                        {Math.min(99, count)}
                      </span>
                    </button>

                    {/* Cart Dropdown */}
                  {openCart && (
                    <div className="absolute right-0 top-14 w-96 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                          Meu Carrinho
                        </h3>

                        <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
                          {items.length > 0 ? (
                            items.map((item) => (
                              <div key={item.id} className="flex gap-4 pb-4">
                                <div className="w-20 h-20 rounded bg-[#E2E3FF] overflow-hidden flex items-center justify-center shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain mix-blend-multiply p-2"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight mb-1">
                                    {item.name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="text-lg font-bold text-gray-900">{formatBRL(item.price)}</span>
                                    <span className="text-xs text-gray-400 line-through">{formatBRL(item.price)}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8">
                              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                              <p className="text-gray-500">Carrinho vazio</p>
                            </div>
                          )}
                        </div>

                        {items.length > 0 && (
                          <>
                            <div className="my-4 border-t border-gray-200"></div>
                            <div className="flex justify-between items-center mb-6">
                              <span className="text-lg font-bold text-gray-800">Valor total:</span>
                              <span className="text-2xl font-bold text-[#C92071]">{formatBRL(total)}</span>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                              <button
                                className="text-gray-500 underline text-sm hover:text-gray-800"
                                onClick={() => clear()}
                              >
                                Esvaziar
                              </button>
                              <Link
                                to="/checkout"
                                className="bg-[#C92071] text-white font-bold py-3 px-6 rounded hover:bg-pink-700 transition-all text-sm"
                                onClick={() => setOpenCart(false)}
                              >
                                Ver Carrinho
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Bar */}
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
        </div>

        {/* Mobile & Tablet Header */}
        <div className="lg:hidden">
          {/* Mobile Top Bar */}
          <div className="flex items-center justify-between h-20 px-4 sm:px-6">
            {/* Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary transition-colors p-2"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src="/images/icons/logo-header.svg" alt="logo-header" className="h-8 w-auto" />
            </Link>

            {/* Right Icons */}
            {variant === "default" && (
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Install App Mobile */}
                <button
                  onClick={installApp}
                  className="text-gray-700 hover:text-primary transition-colors p-2 lg:hidden"
                  title="Instalar App"
                >
                  <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Search Icon */}
                <button
                  onClick={() => setMobileSearchOpen(true)}
                  className="text-gray-700 hover:text-primary transition-colors p-2"
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Wishlist Mobile */}
                <Link
                  to="/wishlist"
                  className="relative text-gray-700 hover:text-primary transition-colors p-2"
                  title="Wishlist"
                >
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {favoritesCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link
                  to="/checkout"
                  className="relative text-primary p-2"
                  title="Carrinho"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {Math.min(99, count)}
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Search Bar */}
          {mobileSearchOpen && (
            <div className="border-t border-gray-100 p-4 sm:p-6 bg-light-gray">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full bg-white rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={() => setMobileSearchOpen(false)}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="border-t border-gray-100 bg-white max-h-96 overflow-y-auto">
              <nav className="flex flex-col">
                {/* Navigation Links */}
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
                  {/* Wishlist */}
                  <Link
                    to="/wishlist"
                    className="px-6 py-4 border-b border-gray-100 text-base font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <Heart className="w-5 h-5" />
                    Wishlist
                  </Link>

                  {/* User Account */}
                  <Link
                    to="/orders/info"
                    className="px-6 py-4 border-b border-gray-100 text-base font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <User className="w-5 h-5" />
                    Minha Conta
                  </Link>
                </div>

                {/* Auth Section */}
                <div className="px-6 py-6 border-t border-gray-200 space-y-3">
                  <Link
                    to="/login"
                    className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 transition-all text-center block"
                  >
                    Acesse sua conta
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full border-2 border-primary text-primary font-bold py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition-all text-center block"
                  >
                    Crie sua conta
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
