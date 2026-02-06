import React, { useState, useEffect } from "react";
import { Star, User, Lock } from "lucide-react";
import { useUserAuth } from "../../context/UserAuthContext";
import { Link } from "react-router-dom";

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

const BAD_WORDS = [
  "feio",
  "ruim",
  "péssimo",
  "horrível",
  "droga",
  "idiota",
  "merda",
  "bosta",
  "lixo",
  "caralho",
  "porra",
  "viado",
  "viadinho",
  "puta",
  "vagabunda",
  "corno",
  "imbecil",
  "otário",
  "trouxa",
  "foda",
  "fuder",
  "cu",
  "arrombado",
];

interface ProductReviewsProps {
  productId: number;
  onReviewAdded?: () => void;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  onReviewAdded,
}) => {
  const { user } = useUserAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const loadReviews = () => {
      const allReviews = JSON.parse(localStorage.getItem("reviews_db") || "[]");
      const productReviews = allReviews.filter(
        (r: Review) => r.productId === productId,
      );

      if (productReviews.length === 0) {
        const mocks: Review[] = [
          {
            id: "mock-1",
            productId,
            userName: "Ricardo Souza",
            rating: 5,
            comment:
              "Tênis excelente! Muito confortável para correr e o design é incrível. Recomendo demais.",
            date: "20/01/2026",
            status: "approved",
          },
          {
            id: "mock-2",
            productId,
            userName: "Ana Clara",
            rating: 4,
            comment:
              "Gostei muito, mas a forma é um pouco pequena. Recomendo pegar um número maior.",
            date: "15/01/2026",
            status: "approved",
          },
          {
            id: "mock-3",
            productId,
            userName: "Marcos Silva",
            rating: 5,
            comment:
              "Entrega super rápida e o produto veio muito bem embalado. A qualidade do material é surpreendente.",
            date: "10/01/2026",
            status: "approved",
          },
          {
            id: "mock-4",
            productId,
            userName: "Juliana Costa",
            rating: 4,
            comment:
              "Lindo e estiloso! Só achei que a cor pessoalmente é um pouco mais clara que na foto, mas adorei mesmo assim.",
            date: "05/01/2026",
            status: "approved",
          },
        ];

        setReviews(mocks);

        const existingReviews = JSON.parse(
          localStorage.getItem("reviews_db") || "[]",
        );
        const mergedReviews = [...existingReviews, ...mocks];

        localStorage.setItem("reviews_db", JSON.stringify(mergedReviews));
      } else {
        const approvedReviews = productReviews.filter(
          (r: Review) => r.status === "approved" || r.status === undefined,
        );
        setReviews(approvedReviews);
      }
    };

    loadReviews();
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Você precisa estar logado para avaliar este produto.");
      return;
    }

    const containsBadWord = BAD_WORDS.some((word) =>
      newComment.toLowerCase().includes(word.toLowerCase()),
    );
    const status = containsBadWord ? "rejected" : "approved";

    const newReview: Review = {
      id: Date.now().toString(),
      productId,
      userName: user?.name || "Visitante",
      userAvatar: user?.avatar,
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleDateString("pt-BR"),
      status,
    };

    const allReviews = JSON.parse(localStorage.getItem("reviews_db") || "[]");
    const updatedAllReviews = [...allReviews, newReview];

    localStorage.setItem("reviews_db", JSON.stringify(updatedAllReviews));

    if (status === "approved") {
      setReviews((prev) => [newReview, ...prev]);
      setFeedback({
        message: "Avaliação enviada com sucesso!",
        type: "success",
      });
      // Notify parent component
      if (onReviewAdded) {
        onReviewAdded();
      }
    } else {
      setFeedback({
        message: "Sua avaliação contém termos inadequados e foi rejeitada.",
        type: "error",
      });
    }

    setNewComment("");
    setNewRating(5);

    setTimeout(() => setFeedback(null), 5000);
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="mt-12 bg-white p-6 md:p-10 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Avaliações dos Clientes
      </h2>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3">
          <div className="flex items-end gap-2 mb-2">
            <span className="text-5xl font-bold text-gray-800">
              {averageRating}
            </span>
            <div className="mb-2">
              <div className="flex text-yellow-400 text-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(Number(averageRating)) ? "fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {reviews.length} avaliações
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 relative overflow-hidden">
            {!user && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-sm">
                  <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-bold text-gray-800 mb-2">
                    Avaliação Bloqueada
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Você precisa estar logado para deixar sua opinião sobre este
                    produto.
                  </p>
                  <Link
                    to="/login"
                    className="inline-block bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-pink-700 transition-colors text-sm"
                  >
                    Fazer Login
                  </Link>
                </div>
              </div>
            )}

            <h3 className="font-bold text-gray-800 mb-4">
              Deixe sua avaliação
            </h3>

            {feedback && (
              <div
                className={`mb-4 p-4 rounded-lg text-sm font-medium ${
                  feedback.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}
              >
                {feedback.message}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className={!user ? "opacity-50 pointer-events-none" : ""}
            >
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">
                  Sua nota
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      disabled={!user}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110 disabled:cursor-not-allowed"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || newRating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">
                  Seu comentário
                </label>
                <textarea
                  required
                  disabled={!user}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="O que você achou do produto?"
                  className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                disabled={!user}
                className="bg-primary text-white font-bold py-2 px-6 rounded hover:bg-pink-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Avaliação
              </button>
            </form>
          </div>

          <div className="space-y-6">
            {displayedReviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-100 pb-6 last:border-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                      {review.userAvatar ? (
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">
                        {review.userName}
                      </h4>
                      <div className="flex text-yellow-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}

            {reviews.length > 3 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="text-primary font-bold text-sm hover:underline"
                >
                  {showAllReviews
                    ? "Ver menos avaliações"
                    : `Ver mais avaliações (${reviews.length - 3})`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
