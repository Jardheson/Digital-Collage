import React from 'react';
import { Link } from 'react-router-dom';

export const CategoriesPage: React.FC = () => {
  const items = [
    { label: 'Camisetas', svg: (
      <img src="/images/icons/tshirt-_1_.svg" alt="Camisetas" />
    ) },
    { label: 'Calças', svg: (
      <img src="/images/icons/pants.svg" alt="Calças" />
    ) },
    { label: 'Bonés', svg: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 13a8 8 0 0116 0v2H4v-2z" />
        <path d="M2 15h20" />
      </svg>
    ) },
    { label: 'Headphones', svg: (
      <img src="/images/icons/headphones_1.svg" alt="Ícone Headphones" />
    ) },
    { label: 'Tênis', svg: (
      <img src="/images/icons/sneakers.svg" alt="Ícone Tênis" />
    ) },
  ];

  return (
    <div className="bg-light-gray py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
          <Link to="/products" className="text-primary hover:underline">Ver produtos</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {items.map((item) => (
            <Link key={item.label} to={`/products?category=${item.label}`} className="group">
              <div className="w-full h-40 bg-white rounded-xl border border-gray-200 flex flex-col items-center justify-center gap-3 shadow-sm group-hover:shadow-md transition-all">
                <div className="text-gray-400 group-hover:text-primary">{item.svg}</div>
                <span className="font-bold text-gray-700 group-hover:text-primary">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};