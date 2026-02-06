import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { getProducts, deleteProduct } from '../../services/api';
import type { Product } from '../../types/Product';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
        <Link 
          to="/admin/products/new" 
          className="bg-[#C92071] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-pink-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Novo Produto
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou categoria..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C92071]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Produto</th>
                <th className="hidden md:table-cell px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    Carregando produtos...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-800 block">{product.name}</span>
                          <span className="text-xs text-gray-500 md:hidden">{product.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">
                        R$ {product.priceDiscount ? product.priceDiscount.toFixed(2) : product.price.toFixed(2)}
                      </div>
                      {product.priceDiscount && (
                        <div className="text-xs text-gray-400 line-through">
                          R$ {product.price.toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/admin/products/${product.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={async () => {
                            if (window.confirm('Tem certeza que deseja excluir este produto?')) {
                              await deleteProduct(product.id);
                              loadProducts();
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
