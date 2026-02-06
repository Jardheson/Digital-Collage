import React from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import { usePWA } from "../../context/PWAContext";

export const Footer: React.FC = () => {
  const { settings } = useSettings();
  const { showInstallPrompt, installApp } = usePWA();
  const showPwaInFooter = settings.pwa?.showInFooter ?? true;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = "/images/icons/logo-footer.svg";
    e.currentTarget.onerror = null;
  };

  return (
    <footer className="bg-dark text-white pt-8 md:pt-16 pb-6 md:pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg md:text-2xl font-bold h-10 md:h-14">
            <div className="rounded h-full flex items-center">
              <img
                src={
                  settings.footerLogoUrl ||
                  "/public/images/icons/logo-footer.svg"
                }
                alt={`${settings.siteName} `}
                className="h-full w-auto object-contain"
                onError={handleImageError}
              />
            </div>
            <span className="sr-only">{settings.siteName}</span>
          </div>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed hidden md:block text-justify">
            Somos a sua loja online especializada em moda urbana e lifestyle.
            Com uma curadoria cuidadosa dos melhores produtos, trazemos as
            últimas tendências diretamente para você.
          </p>
          <div className="flex gap-3 md:gap-4">
            <a
              href={settings.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden hover:opacity-80 transition-opacity bg-white/10 p-1 flex items-center justify-center"
              aria-label="Facebook"
            >
              <img
                src={
                  settings.socialLinks.facebookIcon ||
                  "/images/icons/Facebook.svg"
                }
                alt="Facebook"
                className="w-full h-full object-contain"
              />
            </a>
            <a
              href={settings.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden hover:opacity-80 transition-opacity bg-white/10 p-1 flex items-center justify-center"
              aria-label="Instagram"
            >
              <img
                src={
                  settings.socialLinks.instagramIcon ||
                  "/images/icons/Instagram.svg"
                }
                alt="Instagram"
                className="w-full h-full object-contain"
              />
            </a>
            <a
              href={settings.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden hover:opacity-80 transition-opacity bg-white/10 p-1 flex items-center justify-center"
              aria-label="Twitter"
            >
              <img
                src={
                  settings.socialLinks.twitterIcon ||
                  "/images/icons/Twitter.svg"
                }
                alt="Twitter"
                className="w-full h-full object-contain"
              />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-6 text-lg h-10 md:h-14 flex items-center">
            Informações
          </h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            {settings.footerNavigation &&
            settings.footerNavigation.length > 0 ? (
              settings.footerNavigation
                .filter((link) => link.visible)
                .map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      className="hover:text-primary flex items-center gap-2"
                    >
                      {link.image && (
                        <img
                          src={link.image}
                          alt=""
                          className="w-4 h-4 object-contain"
                        />
                      )}
                      {link.label}
                    </Link>
                  </li>
                ))
            ) : (
              <>
                <li>
                  <Link to="/about" className="hover:text-primary">
                    Sobre {settings.siteName}
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="hover:text-primary">
                    Segurança
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="hover:text-primary">
                    Wishlist
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-6 text-lg h-10 md:h-14 flex items-center">
            Categorias
          </h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            {settings.categories && settings.categories.length > 0 ? (
              settings.categories
                .filter((cat) => cat.status === "Ativo")
                .slice(0, 5)
                .map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/products?category=${encodeURIComponent(category.name)}`}
                      className="hover:text-primary"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
            ) : (
              <>
                <li>
                  <Link
                    to="/products?category=Camisetas"
                    className="hover:text-primary"
                  >
                    Camisetas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?category=Tênis"
                    className="hover:text-primary"
                  >
                    Tênis
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-6 text-lg h-10 md:h-14 flex items-center">
            Contato
          </h3>
          <div className="space-y-3 text-gray-300 text-sm">
            <p>{settings.address}</p>
            <p>{settings.contactPhone}</p>
          </div>

          {showPwaInFooter && (
            <div className="mt-6 animate-fade-in">
              <h3 className="font-bold mb-3 text-xs md:text-lg uppercase md:normal-case">
                Baixe nosso App
              </h3>
              <button
                onClick={installApp}
                disabled={!showInstallPrompt}
                className={`bg-primary hover:bg-pink-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto transition-colors flex items-center justify-center gap-2 shadow-lg ${!showInstallPrompt ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="Instalar Aplicativo"
                title={
                  !showInstallPrompt
                    ? "App já instalado ou dispositivo não suportado"
                    : "Instalar App"
                }
              >
                <Download className="w-4 h-4" />
                Instalar App
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 mt-6 md:mt-12 pt-4 md:pt-6 border-t border-white/20 text-center text-gray-400 text-xs md:text-sm">
        @ 2026 {settings.siteName}
      </div>
    </footer>
  );
};
