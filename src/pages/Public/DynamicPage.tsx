import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getPage } from "../../services/pageApi";
import type { Page } from "../../types/Page";

interface DynamicPageProps {
  slug?: string;
  fallback?: React.ReactNode;
}

export const DynamicPage: React.FC<DynamicPageProps> = ({
  slug: propSlug,
  fallback,
}) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const activeSlug = propSlug || paramSlug;

  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!activeSlug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getPage(activeSlug)
      .then((data) => {
        if (data && data.is_active) {
          setPage(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [activeSlug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !page) {
    if (fallback) return <>{fallback}</>;
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="bg-light-gray min-h-screen pb-20">
      {page.image_url && (
        <div className="w-full h-64 md:h-80 relative overflow-hidden">
          <img
            src={page.image_url}
            alt={page.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
              {page.title}
            </h1>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-10">
        {!page.image_url && (
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
            {page.title}
          </h1>
        )}

        <div
          className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
};
