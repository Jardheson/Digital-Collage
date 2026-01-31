import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/Product/ProductCard';
import { getProducts } from '../services/api';
import type { Product } from '../types/Product';
import { ArrowRight } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clear } = useCart();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const formatBRL = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const freight = 0;
  const discount = 30;
  const total = subtotal + freight - discount;

  useEffect(() => {
    const loadRelated = async () => {
      const all = await getProducts();
      setRelatedProducts(all.slice(0, 4));
    };
    loadRelated();
  }, []);

  const handlePay = () => {
    // Passar os dados da compra para a página de sucesso
    navigate('/checkout/success', {
      state: {
        product: {
          name: items[0]?.name || 'Produto Exemplo',
          image: items[0]?.image || '',
          total: total
        }
      }
    });
    clear();
  };

  return (
    <div className="bg-[#F9F8FE] min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Cart Items Section */}
          <div className="flex-1 w-full">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">MEU CARRINHO</h2>
                 <div className="hidden md:flex gap-12 text-sm text-gray-500 uppercase tracking-wide">
                    <span className="w-24 text-center">QUANTIDADE</span>
                    <span className="w-24 text-center">UNITÁRIO</span>
                    <span className="w-24 text-center">TOTAL</span>
                 </div>
              </div>

              <div className="space-y-6">
                {items.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">Seu carrinho está vazio.</div>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="flex flex-col md:flex-row items-center gap-4 py-4 border-t border-gray-100">
                            {/* Product Info */}
                            <div className="flex gap-4 flex-1 w-full md:w-auto">
                                <div className="w-20 h-20 bg-[#E2E3FF] rounded flex items-center justify-center shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-gray-800 leading-tight mb-1">{item.name}</h3>
                                    <div className="flex flex-col gap-1 text-xs text-gray-500 mb-2">
                                        <span>Cor: <span className="text-gray-700">Padrão</span></span>
                                        <span>Tamanho: <span className="text-gray-700">42</span></span>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Layout Wrapper for Controls */}
                            <div className="flex justify-between items-center w-full md:w-auto gap-8">
                                {/* Quantity Controls */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex items-center border border-gray-200 rounded">
                                        <button 
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center text-sm font-bold text-gray-700">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => removeItem(item.id)}
                                        className="text-xs text-gray-400 underline hover:text-primary"
                                    >
                                        Remover item
                                    </button>
                                </div>

                                {/* Prices - Desktop only for separate columns */}
                                <div className="hidden md:flex gap-12">
                                    <div className="w-24 text-center">
                                        <div className="text-xs text-gray-400 line-through">{formatBRL(item.price)}</div>
                                        <div className="text-sm font-bold text-gray-800">{formatBRL(item.price)}</div>
                                    </div>
                                    <div className="w-24 text-center">
                                        <div className="text-sm font-bold text-gray-800">{formatBRL(item.price * item.quantity)}</div>
                                    </div>
                                </div>

                                {/* Prices - Mobile view */}
                                <div className="md:hidden text-right">
                                    <div className="text-xs text-gray-400 line-through">{formatBRL(item.price)}</div>
                                    <div className="text-sm font-bold text-gray-800">{formatBRL(item.price * item.quantity)}</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
              </div>

              {/* Coupons and Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-100">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Cupom de desconto</label>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Insira seu código" className="flex-1 bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary" />
                        <button className="text-primary font-bold text-sm px-4 hover:bg-pink-50 rounded">OK</button>
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Calcular frete</label>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Insira seu CEP" className="flex-1 bg-light-gray rounded px-4 py-3 text-sm border-none focus:ring-1 focus:ring-primary" />
                        <button className="text-primary font-bold text-sm px-4 hover:bg-pink-50 rounded">OK</button>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
             <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-6">RESUMO</h2>
                
                <div className="space-y-3 text-sm mb-6 border-b border-gray-100 pb-6">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-bold text-gray-800">{formatBRL(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Frete</span>
                        <span className="font-bold text-gray-800">{formatBRL(freight)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Desconto</span>
                        <span className="font-bold text-gray-800">{formatBRL(discount)}</span>
                    </div>
                </div>

                <div className="flex justify-between items-end mb-1">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-2xl text-[#C92071]">{formatBRL(total)}</span>
                </div>
                <div className="text-right text-xs text-gray-400 mb-6">
                    ou 10x de {formatBRL(total / 10)} sem juros
                </div>

                <button 
                    onClick={handlePay}
                    className="w-full bg-[#FFB31F] text-white font-bold py-3 rounded hover:bg-yellow-500 transition-colors uppercase tracking-wide text-sm"
                >
                    Continuar
                </button>
             </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-gray-800">Produtos Relacionados</h2>
                 <Link to="/products" className="text-primary hover:underline flex items-center gap-1 font-bold text-sm uppercase tracking-wide">
                    Ver todos <ArrowRight className="w-4 h-4"/>
                 </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((p, idx) => (
                    <ProductCard 
                        key={`${p.id}-${idx}`} 
                        product={p} 
                        badge={idx === 0 ? "30% OFF" : undefined}
                        disableAutoBadge={idx !== 0}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
