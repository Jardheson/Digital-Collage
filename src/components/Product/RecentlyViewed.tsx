import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { getProductById } from "../../services/api";
import type { Product } from "../../types/Product";
import { getRecentlyViewed } from "../../utils/storage";

export const RecentlyViewed: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  const loadRecentlyViewed = async () => {
    try {
      const storedIds = getRecentlyViewed();

      if (!Array.isArray(storedIds) || storedIds.length === 0) return;

      const productsData = await Promise.all(
        storedIds.slice(0, 4).map((id: number) => getProductById(id)),
      );

      setProducts(productsData.filter(Boolean) as Product[]);
    } catch (error) {
      console.error("Error loading recently viewed products", error);
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="mt-20 mb-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Vistos Recentemente
        </h2>
        <Link
          to="/products"
          className="text-primary hover:underline font-bold text-sm"
        >
          Ver tudo
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => (
          <ProductCard
            key={`recent-${p.id}`}
            product={p}
            disableAutoBadge={true}
          />
        ))}
      </div>
    </div>
  );
};
