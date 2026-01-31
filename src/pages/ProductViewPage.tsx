import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';
import { getProductById, getProducts } from '../services/api';
import { ProductCard } from '../components/Product/ProductCard';
import { Star, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('41');
  const [selectedColor, setSelectedColor] = useState('#D84253');

  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const data = await getProductById(Number(id));
        setProduct(data);
        if (data && data.images.length > 0) {
            setSelectedImage(data.images[0]);
            setCurrentImageIndex(0);
        }
        
        // Load related (fill with "real" products id 1-4, repeating if necessary to get 4)
        const all = await getProducts();
        const realProducts = all.slice(0, 4); // Get first 4 products which are now the "real" ones
        
        setRelatedProducts(realProducts);
      }
    };
    loadProduct();
  }, [id]);

  const handlePrevImage = () => {
    if (!product) return;
    const images = [...product.images, ...product.images, ...product.images, ...product.images, ...product.images].slice(0, 5);
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleNextImage = () => {
    if (!product) return;
    const images = [...product.images, ...product.images, ...product.images, ...product.images, ...product.images].slice(0, 5);
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  if (!product) return <div className="p-10 text-center">Carregando...</div>;

  return (
    <div className="bg-light-gray min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2 font-medium">
            <span className="font-bold text-gray-800">Home</span> <span className="text-gray-400">/</span> Produtos <span className="text-gray-400">/</span> Tênis <span className="text-gray-400">/</span> Nike <span className="text-gray-400">/</span> <span className="text-gray-600">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mb-20">
            {/* Gallery */}
            <div className="lg:w-7/12">
                <div className="bg-[#E2E3FF] rounded-lg aspect-square lg:aspect-[4/3] flex items-center justify-center mb-4 relative overflow-hidden group">
                    <img src={selectedImage} alt={product.name} className="w-3/4 object-contain mix-blend-multiply" />
                    <button onClick={handlePrevImage} className="absolute left-0 top-1/2 -translate-y-1/2 p-4 text-gray-800 hover:text-primary transition-colors"><ChevronLeft className="w-8 h-8" /></button>
                    <button onClick={handleNextImage} className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-gray-800 hover:text-primary transition-colors"><ChevronRight className="w-8 h-8" /></button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 justify-between">
                    {/* Mocking multiple images with different backgrounds to match mock */}
                    {[...product.images, ...product.images, ...product.images, ...product.images, ...product.images].slice(0, 5).map((img, idx) => {
                        const bgColors = ['bg-[#E2E3FF]', 'bg-[#FFE8E8]', 'bg-[#FFF0E6]', 'bg-[#E6F3FF]', 'bg-[#E2E3FF]'];
                        return (
                            <div 
                                key={idx} 
                                className={`w-28 h-28 ${bgColors[idx % bgColors.length]} rounded flex-shrink-0 flex items-center justify-center cursor-pointer border-2 ${currentImageIndex === idx ? 'border-primary' : 'border-transparent'}`}
                                onClick={() => {
                                    setSelectedImage(img);
                                    setCurrentImageIndex(idx);
                                }}
                            >
                                <img src={img} alt="" className="w-full h-full object-contain p-2 mix-blend-multiply" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Details */}
            <div className="lg:w-5/12 space-y-6">
                <h1 className="text-4xl font-bold text-gray-800 leading-tight">{product.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                    <span>Casual | Nike | REF:38416711</span>
                    <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <div className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded ml-2 flex items-center gap-1">
                            4.7 <Star className="w-3 h-3 fill-white" />
                        </div>
                        <span className="text-gray-400 text-xs ml-1">(90 avaliações)</span>
                    </div>
                </div>

                <div className="flex items-baseline gap-3">
                    <span className="text-gray-800 text-3xl font-bold">R$ {(product.priceDiscount ?? product.price).toFixed(2).replace('.', ',')}</span>
                    <span className="text-gray-400 line-through text-lg font-normal">{(product.price).toFixed(2).replace('.', ',')}</span>
                </div>

                <div className="space-y-2">
                    <h3 className="font-bold text-gray-500 text-sm">Descrição do produto</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                </div>

                <div className="space-y-3">
                    <h3 className="font-bold text-gray-500 text-sm">Tamanho</h3>
                    <div className="flex gap-3">
                        {['39', '40', '41', '42', '43'].map(size => (
                            <button 
                                key={size} 
                                onClick={() => setSelectedSize(size)}
                                className={`w-12 h-12 border rounded font-bold text-sm transition-colors ${selectedSize === size ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300 hover:border-primary'}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="font-bold text-gray-500 text-sm">Cor</h3>
                    <div className="flex gap-3">
                        {(product.colors || ['#64CCDA', '#D84253', '#5C5C5C', '#6D70B7']).map((color) => (
                            <button 
                                key={color} 
                                onClick={() => setSelectedColor(color)}
                                className={`w-10 h-10 rounded-full ring-2 ring-offset-2 transition-all ${selectedColor === color ? 'ring-primary' : 'ring-transparent hover:ring-gray-300'}`} 
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                <button
                  className="w-full bg-[#FFB31F] text-white font-bold py-4 rounded hover:bg-yellow-500 transition-colors uppercase tracking-wider text-sm mt-4 shadow-sm"
                  onClick={() => {
                    if (product) {
                      addItem(product, 1);
                      navigate('/checkout');
                    }
                  }}
                >
                  Comprar
                </button>
            </div>
        </div>



        {/* Related Products */}
        <div className="mt-20">
            <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-bold text-gray-800">Produtos Relacionados</h2>
                 <Link to="/products" className="text-primary hover:underline flex items-center gap-1 font-bold">Ver todos <ArrowRight className="w-5 h-5"/></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((p, idx) => (
                    <ProductCard 
                        key={`${p.id}-${idx}`} 
                        product={p} 
                        badge={idx < 2 ? "30% OFF" : undefined}
                        disableAutoBadge={idx >= 2}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
