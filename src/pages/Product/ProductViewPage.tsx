import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../../types/Product";
import { getProductById, getProducts } from "../../services/api";
import { ProductCard } from "../../components/Product/ProductCard";
import { ProductReviews } from "../../components/Product/ProductReviews";
import { ProductInfo } from "../../components/Product/ProductInfo";
import { RecentlyViewed } from "../../components/Product/RecentlyViewed";
import { ProductGallery } from "../../components/Product/ProductGallery";
import { CartDrawer } from "../../components/Layout/CartDrawer";
import { Star, ArrowRight, Share2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { addToRecentlyViewed, safeJSONParse } from "../../utils/storage";

export const ProductViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState("41");
  const [selectedColor, setSelectedColor] = useState("#D84253");
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [reviewCount, setReviewCount] = useState(4); // Default to 4 (mocks)
  const [averageRating, setAverageRating] = useState(4.5); // Default mock rating

  const reviewsRef = useRef<HTMLDivElement>(null);

  const { addItem } = useCart();

  useEffect(() => {
    if (id) {
      addToRecentlyViewed(Number(id));
    }
  }, [id]);

  const loadReviewsData = () => {
    if (!id) return;
    try {
      const allReviews = safeJSONParse<any[]>("reviews_db", []);
      const productReviews = allReviews.filter(
        (r: any) => r.productId === Number(id),
      );

      if (productReviews.length > 0) {
        setReviewCount(productReviews.length);
        const avg =
          productReviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
          productReviews.length;
        setAverageRating(Number(avg.toFixed(1)));
      } else {
        setReviewCount(4);
        setAverageRating(4.5);
      }
    } catch (e) {
      console.error("Error loading reviews:", e);
      setReviewCount(4);
      setAverageRating(4.5);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const data = await getProductById(Number(id));
        setProduct(data);

        const all = await getProducts();
        const realProducts = all.slice(0, 4);

        setRelatedProducts(realProducts);

        loadReviewsData();
      }
    };
    loadProduct();
  }, [id]);

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: `Confira este produto incrível: ${product.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  if (!product) return <div className="p-10 text-center">Carregando...</div>;

  const allImages = [
    ...product.images,
    ...product.images,
    ...product.images,
    ...product.images,
    ...product.images,
  ];

  return (
    <div className="bg-light-gray min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2 font-medium">
          <span className="font-bold text-gray-800">Home</span>{" "}
          <span className="text-gray-400">/</span> Produtos{" "}
          <span className="text-gray-400">/</span> Tênis{" "}
          <span className="text-gray-400">/</span> Nike{" "}
          <span className="text-gray-400">/</span>{" "}
          <span className="text-gray-600">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mb-20">
          <ProductGallery images={allImages} productName={product.name} />

          <div className="lg:w-5/12 space-y-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                {product.name}
              </h1>
              <button
                onClick={handleShare}
                className="p-2 text-gray-400 hover:text-primary hover:bg-gray-50 rounded-full transition-colors"
                title="Compartilhar Produto"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
              <span>Casual | Nike | REF:38416711</span>
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(averageRating) ? "fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <div className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded ml-2 flex items-center gap-1">
                  {averageRating} <Star className="w-3 h-3 fill-white" />
                </div>
                <button
                  onClick={scrollToReviews}
                  className="text-gray-400 text-xs ml-1 hover:text-primary hover:underline cursor-pointer transition-colors"
                >
                  ({reviewCount} avaliações)
                </button>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-gray-800 text-3xl font-bold">
                R${" "}
                {(product.priceDiscount ?? product.price)
                  .toFixed(2)
                  .replace(".", ",")}
              </span>
              <span className="text-gray-400 line-through text-lg font-normal">
                {product.price.toFixed(2).replace(".", ",")}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-500 text-sm">
                Descrição do produto
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-500 text-sm">Tamanho</h3>
              <div className="flex gap-3">
                {["39", "40", "41", "42", "43"].map((size) => (
                  <button
                    key={size}
                    aria-label={`Selecionar tamanho ${size}`}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border rounded font-bold text-sm transition-colors ${selectedSize === size ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-300 hover:border-primary"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-500 text-sm">Cor</h3>
              <div className="flex gap-3">
                {(
                  product.colors || ["#64CCDA", "#D84253", "#5C5C5C", "#6D70B7"]
                ).map((color) => (
                  <button
                    key={color}
                    aria-label={`Selecionar cor ${color}`}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full ring-2 ring-offset-2 transition-all ${selectedColor === color ? "ring-primary" : "ring-transparent hover:ring-gray-300"}`}
                  >
                    <div
                      style={{ backgroundColor: color }}
                      className="w-full h-full rounded-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              className="w-full bg-[#FFB31F] text-white font-bold py-4 rounded hover:bg-yellow-500 transition-colors uppercase tracking-wider text-sm mt-4 shadow-sm"
              onClick={() => {
                if (product) {
                  addItem(product, 1);
                  setIsCartDrawerOpen(true);
                }
              }}
            >
              Comprar
            </button>
          </div>
        </div>

        <CartDrawer
          isOpen={isCartDrawerOpen}
          onClose={() => setIsCartDrawerOpen(false)}
        />

        <div className="mt-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Produtos Relacionados
            </h2>
            <Link
              to="/products"
              className="text-primary hover:underline flex items-center gap-1 font-bold"
            >
              Ver todos <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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

        {product && (
          <ProductInfo
            description={product.description}
            specs={product.technicalSpecs}
          />
        )}

        <RecentlyViewed />

        <div ref={reviewsRef}>
          {product && (
            <ProductReviews
              productId={product.id}
              onReviewAdded={loadReviewsData}
            />
          )}
        </div>
      </div>
    </div>
  );
};
