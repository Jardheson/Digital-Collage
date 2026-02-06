import React, { useEffect, useState } from "react";
import { Trash2, Star, CheckCircle, XCircle } from "lucide-react";
import { getProducts } from "../../services/api";
import type { Product } from "../../types/Product";

interface Review {
  id: string;
  productId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  status?: "approved" | "rejected" | "pending";
}

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Record<number, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const storedReviews = JSON.parse(
      localStorage.getItem("reviews_db") || "[]",
    );
    setReviews(storedReviews);

    try {
      const allProducts = await getProducts();
      const productMap: Record<number, string> = {};
      allProducts.forEach((p: Product) => {
        productMap[p.id] = p.name;
      });
      setProducts(productMap);
    } catch (error) {
      console.error("Error loading products", error);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta avaliação?")) {
      const updatedReviews = reviews.filter((r) => r.id !== id);
      setReviews(updatedReviews);
      localStorage.setItem("reviews_db", JSON.stringify(updatedReviews));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Avaliações dos Usuários
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Data
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Produto
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Usuário
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Nota
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Comentário
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Nenhuma avaliação encontrada.
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr
                    key={review.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {review.date}
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-gray-800 font-medium max-w-xs truncate"
                      title={
                        products[review.productId] || `ID: ${review.productId}`
                      }
                    >
                      {products[review.productId] || `#${review.productId}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {review.userName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-gray-600 max-w-sm truncate"
                      title={review.comment}
                    >
                      {review.comment}
                    </td>
                    <td className="px-6 py-4">
                      {review.status === "rejected" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="w-3 h-3" /> Rejeitada
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3" /> Aprovada
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir Avaliação"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
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
