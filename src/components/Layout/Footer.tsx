import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-8 md:pt-16 pb-6 md:pb-8">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <div className="space-y-3 md:space-y-6 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 text-lg md:text-2xl font-bold">
            <div className=" text-primary p-1 rounded">
              <img src="/images/icons/logo-footer.svg" alt="Digital Store Logo Footer" />
            </div>{" "}
           
          </div>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed hidden md:block">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
          <div className="flex gap-3 md:gap-4">
            {/* Social Icons Placeholders */}
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full" aria-label="Facebook">
              <img src="/images/icons/Facebook.svg" alt="Facebook" />
            </div>
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full" aria-label="Instagram">
              <img src="/images/icons/Instagram.svg" alt="Instagram" />
            </div>
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full" aria-label="Twitter">
              <img src="/images/icons/Twitter.svg" alt="Twitter" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3 md:mb-6 text-xs md:text-lg uppercase md:normal-case">
            Informação
          </h3>
          <ul className="space-y-2 md:space-y-3 text-gray-300 text-xs md:text-sm">
            <li>
              <Link to="/about" className="hover:text-primary">
                Sobre Drip Store
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
            <li>
              <Link to="/blog" className="hover:text-primary">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/career" className="hover:text-primary">
                Trabalhe conosco
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-primary">
                Meus Pedidos
              </Link>
            </li>
            <li>
              <Link to="/orders/payment-methods" className="hover:text-primary">
                Métodos de Pagamento
              </Link>
            </li>
            <li>
              <Link to="/install" className="hover:text-primary">
                Instalar App
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3 md:mb-6 text-xs md:text-lg uppercase md:normal-case">
            Categorias
          </h3>
          <ul className="space-y-2 md:space-y-3 text-gray-300 text-xs md:text-sm">
            <li>
              <a href="#" className="hover:text-primary">
                Camisetas
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Calças
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Bonés
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Headphones
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Tênis
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3 md:mb-6 text-xs md:text-lg uppercase md:normal-case">
            Contato
          </h3>
          <div className="space-y-2 md:space-y-3 text-gray-300 text-xs md:text-sm">
            <p>
              Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE,
              60150-161
            </p>
            <p>(85) 3051-3411</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-6 md:mt-12 pt-4 md:pt-6 border-t border-white/20 text-center text-gray-400 text-xs md:text-sm">
        @ 2026 Digital College
      </div>
    </footer>
  );
};
