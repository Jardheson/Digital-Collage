import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/Product';
import { getProducts } from '../services/api';
import { ProductCard } from '../components/Product/ProductCard';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setTrendingProducts(data.slice(0, 8)); // Show first 8 products
    };
    loadProducts();              
  }, []);

  return (
    <div className="bg-light-gray relative">
      {/* Hero Section */}
      <section className="bg-light-gray relative overflow-hidden py-8 lg:py-20">
        <div className="mx-auto max-w-[1120px] px-4 flex flex-col-reverse lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 space-y-4 md:space-y-6 z-10">
            <span className="text-warning text-yellow-500 font-bold tracking-wide text-xs md:text-base">
              Melhores ofertas personalizadas
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Queima de <br /> estoque Nike 🔥
            </h1>
            <p className="text-gray-500 text-sm md:text-lg max-w-md">
              Consequat culpa exercitation mollit nisi excepteur do do tempor
              laboris eiusmod irure consectetur.
            </p>                            
            <Link
              to="/products"
              className="inline-block bg-primary text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded hover:bg-pink-700 transition-colors text-sm md:text-base w-full md:w-auto text-center"
            >
              Ver Ofertas
            </Link>
          </div>
          <div className="lg:w-1/2 relative mb-4 lg:mb-0">
            <img
              src="/images/products/White-Sneakers-PNG-Clipart 1.png"
              alt="Nike Shoe"
              className="w-full max-w-[300px] md:max-w-[620px] object-contain drop-shadow-2xl translate-x-[12px] lg:translate-x-[88px]"
            />
            <img
              src="/images/ui/Ornament11.png"
              alt="Ornament"
              className="absolute left-[200px] md:left-[600px] top-[2px] w-[80px] md:w-[140px] h-[80px] md:h-[140px] opacity-70"
            />
          </div>
        </div>
        <div className="mt-6 md:mt-8 flex justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-12 md:py-16 bg-[#F9F8FE]">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
            Coleções em destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-12 md:mb-16">
            {/* Collection Cards */}
            <div className="bg-[#D8E3F2] rounded-lg p-4 md:p-6 h-48 md:h-64 relative overflow-hidden group">
              <span className="bg-[#E7FF86] text-gray-800 text-xs font-bold px-2 py-1 rounded-full inline-block mb-1 md:mb-2">
                30% OFF
              </span>
              <h3 className="text-xl md:text-3xl font-bold text-gray-800 w-1/2 relative z-10">
                Novo drop Supreme
              </h3>
              <Link to="/products" className="mt-2 md:mt-4 bg-white text-primary font-bold py-1 md:py-2 px-4 md:px-6 rounded text-xs md:text-base hover:bg-gray-100 transition-colors relative z-10 inline-block">
                Comprar
              </Link>
              <img
                src="/images/products/star-wars-storm.png"
                className="absolute bottom-0 right-0 h-full object-contain group-hover:scale-105 transition-transform"
                alt="Supreme"
              />
            </div>
            <div className="bg-[#D8E3F2] rounded-lg p-4 md:p-6 h-48 md:h-64 relative overflow-hidden group">
              <span className="bg-[#E7FF86] text-gray-800 text-xs font-bold px-2 py-1 rounded-full inline-block mb-1 md:mb-2">
                30% OFF
              </span>
              <h3 className="text-xl md:text-3xl font-bold text-gray-800 w-1/2 relative z-10">
                Coleção Adidas
              </h3>
              <button className="mt-2 md:mt-4 bg-white text-primary font-bold py-1 md:py-2 px-4 md:px-6 rounded text-xs md:text-base hover:bg-gray-100 transition-colors relative z-10">
                Comprar
              </button>
              <img
                src="/images/icons/ddd 1.png"
                className="absolute bottom-0 right-0 h-full object-contain group-hover:scale-105 transition-transform"
                alt="Adidas"
              />
            </div>
            <div className="bg-[#D8E3F2] rounded-lg p-4 md:p-6 h-48 md:h-64 relative overflow-hidden group">
              <span className="bg-[#E7FF86] text-gray-800 text-xs font-bold px-2 py-1 rounded-full inline-block mb-1 md:mb-2">
                30% OFF
              </span>
              <h3 className="text-xl md:text-3xl font-bold text-gray-800 w-1/2 relative z-10">
                Novo Beats Bass
              </h3>
              <button className="mt-2 md:mt-4 bg-white text-primary font-bold py-1 md:py-2 px-4 md:px-6 rounded text-xs md:text-base hover:bg-gray-100 transition-colors relative z-10">
                Comprar
              </button>
              <img
                src="/images/products/collection-3.png"
                className="absolute bottom-0 right-0 h-full object-contain group-hover:scale-105 transition-transform"
                alt="Beats"
              />
            </div>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
            Coleções em destaque
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-16">
            {[
              { label: "Camisetas", svg: <img src="/images/icons/tshirt-_1_.svg" alt="" /> },
              { label: "Calças", svg: <img src="/images/icons/pants.svg" alt="" /> },
              {
                label: "Bonés",
                svg: (
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 13a8 8 0 0116 0v2H4v-2z" />
                    <path d="M2 15h20" />
                  </svg>
                ),
              },
              {
                label: "Headphones",
                svg: <img src="/images/icons/headphones_1.svg" alt="" />,
              },
              { label: "Tênis", svg: <img src="/images/icons/sneakers.svg" alt="" /> },
            ].map((item, idx) => (
              <Link
                to={`/products?category=${item.label}`}
                key={idx}
                className="flex flex-col items-center gap-1 md:gap-2 group cursor-pointer"
              >
                <div className="w-16 md:w-24 h-16 md:h-24 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all text-gray-400 group-hover:text-primary text-sm md:text-base">
                  {item.svg}
                </div>
                <span className="font-bold text-xs md:text-base text-gray-600 group-hover:text-primary transition-colors text-center">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 md:py-20 bg-light-gray">
        <div className="mx-auto max-w-[1120px] px-4">
          <div className="flex justify-between items-center mb-4 md:mb-6 flex-col sm:flex-row gap-3">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Produtos em alta
            </h2>
            <Link
              to="/products"
              className="text-primary hover:underline flex items-center gap-1 text-sm md:text-base"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {trendingProducts.map((product, idx) => (
              <ProductCard
                key={`${product.id}-${idx}`}
                product={product}
                badge={idx < 2 ? "30% OFF" : undefined}
                disableAutoBadge={idx >= 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-12 md:py-20 bg-white">
        <div className="mx-auto max-w-[1120px] px-4 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="md:w-1/2 relative h-[200px] md:h-[340px] lg:h-[400px] w-full">
            <img
              src="/images/ui/Ellipse11.png"
              alt="Ellipse"
              className="absolute w-[300px] md:w-[520px] h-[300px] md:h-[520px] top-[50%] left-[46%] -translate-x-1/2 -translate-y-1/2 opacity-100 z-0 pointer-events-none select-none"
            />
            <img
              src="/images/products/Laye 1.png"
              alt="Layer 1"
              className="absolute w-[350px] md:w-[640px] lg:w-[660px] h-auto top-[-20px] left-[-40px] md:left-[-20px] opacity-100 rotate-0 z-10 pointer-events-none select-none drop-shadow-2xl"
            />
          </div>
          <div className="md:w-1/2 space-y-4 md:space-y-6 lg:space-y-7">
            <span className="text-primary font-bold text-xs md:text-base">Oferta especial</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800">
              Air Jordan edição de colecionador
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-[560px] text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip.
            </p>
            <Link
              to="/products/1"
              className="inline-block bg-primary text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded hover:bg-pink-700 transition-colors text-sm md:text-base w-full md:w-auto text-center"
            >
              Ver Oferta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
