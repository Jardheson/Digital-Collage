import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Product, FilterOptions } from '../types/Product';
import { getProducts } from '../services/api';
import { ProductCard } from '../components/Product/ProductCard';
import { FilterSidebar } from '../components/Product/FilterSidebar';
import { ChevronDown, Filter, X } from 'lucide-react';

export const ProductListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>(() => ({
    category: categoryParam ? [categoryParam] : []
  }));
  const [sortOption, setSortOption] = useState<string>('relevant');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const newCategory = categoryParam ? [categoryParam] : [];
    
    // eslint-disable-next-line
    setFilters(prev => {
      const currentCategory = prev.category || [];
      const isSame = currentCategory.length === newCategory.length && 
                     currentCategory.every((val, index) => val === newCategory[index]);
      
      if (isSame) return prev;
      
      return { ...prev, category: newCategory };
    });
  }, [categoryParam]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filterParam) {
      const lowerFilter = filterParam.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(lowerFilter));
    }

    if (filters.brand?.length) {
      result = result.filter(p => filters.brand?.includes(p.brand));
    }
    if (filters.category?.length) {
      result = result.filter(p => filters.category?.includes(p.category));
    }
    if (filters.gender?.length) {
      result = result.filter(p => filters.gender?.includes(p.gender));
    }
    if (filters.state?.length) {
      result = result.filter(p => filters.state?.includes(p.state));
    }

    if (sortOption === 'lowest-price') {
      result.sort((a, b) => (a.priceDiscount || a.price) - (b.priceDiscount || b.price));
    } else if (sortOption === 'highest-price') {
      result.sort((a, b) => (b.priceDiscount || b.price) - (a.priceDiscount || a.price));
    }

    return result;
  }, [products, filters, sortOption, filterParam]);

  return (
    <div className="bg-light-gray min-h-screen">
      <div className="container mx-auto px-4 py-8">
         {/* Mobile Controls */}
         <div className="md:hidden mb-6">
            <div className="flex gap-2 mb-4">
                <div className="relative flex-1 bg-white border border-gray-300 rounded overflow-hidden flex items-center h-12 px-4">
                     <span className="text-gray-500 text-sm mr-1 whitespace-nowrap">Ordenar por:</span>
                     <span className="font-bold text-gray-800 text-sm truncate flex-1">
                        {sortOption === 'relevant' ? 'Mais relevantes' : 
                         sortOption === 'lowest-price' ? 'Menor Preço' : 'Maior Preço'}
                     </span>
                     <ChevronDown className="w-5 h-5 text-gray-400" />
                     <select 
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    >
                        <option value="relevant">Mais relevantes</option>
                        <option value="lowest-price">Menor Preço</option>
                        <option value="highest-price">Maior Preço</option>
                    </select>
                </div>
                <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="w-12 h-12 bg-[#C92071] rounded flex items-center justify-center text-white shrink-0"
                >
                    <Filter className="w-6 h-6" />
                </button>
            </div>
            <div className="text-gray-800 text-center text-sm">
                <span className="font-bold">
                    {filterParam
                    ? `Resultados para "${filterParam}"`
                    : filters.category?.length 
                    ? `Resultados para "${filters.category.join(', ')}"`
                    : "Todos os produtos"}
                </span> - {filteredProducts.length} produtos
            </div>
         </div>

         {/* Desktop Header */}
         <div className="hidden md:flex flex-row justify-between items-center mb-8 gap-4">
             <div className="text-gray-800">
                <span className="font-bold">
                  {filterParam
                    ? `Resultados para "${filterParam}"`
                    : filters.category?.length 
                    ? `Resultados para "${filters.category.join(', ')}"`
                    : "Todos os produtos"}
                </span> - {filteredProducts.length} produtos
             </div>
             <div className="relative">
                 <label className="text-gray-600 mr-2 border border-gray-300 px-4 py-2 rounded flex items-center gap-2 bg-white cursor-pointer">
                    <span className="font-bold text-gray-800">Ordenar por:</span>
                    <select 
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="appearance-none bg-transparent outline-none cursor-pointer pr-4"
                    >
                        <option value="relevant">Mais relevantes</option>
                        <option value="lowest-price">Menor Preço</option>
                        <option value="highest-price">Maior Preço</option>
                    </select>
                    <ChevronDown className="w-4 h-4" />
                 </label>
             </div>
         </div>

         <div className="flex flex-col md:flex-row gap-8">
            <div className="hidden md:block">
                <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
            <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
         </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
            <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-4 animate-slide-in-right flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-4 border-b">
                    <h3 className="font-bold text-lg text-gray-800">Filtrar por</h3>
                    <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 p-2">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    <FilterSidebar filters={filters} setFilters={setFilters} />
                </div>

                <div className="mt-4 pt-4 border-t flex gap-2 shrink-0">
                    <button 
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1 bg-[#C92071] text-white py-3 rounded font-bold uppercase text-sm"
                    >
                        Aplicar
                    </button>
                     <button 
                        onClick={() => {
                            setFilters({});
                            setIsFilterOpen(false);
                        }}
                        className="flex-1 border border-gray-300 text-gray-600 py-3 rounded uppercase text-sm"
                    >
                        Limpar
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
