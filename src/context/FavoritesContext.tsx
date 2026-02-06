import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode, FC } from "react";
import type { Product } from "../types/Product";

interface FavoritesContextType {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => void;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("favorites");
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage:", error);
      }
    }
  }, [favorites]);

  const addFavorite = (product: Product) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFavorite = (productId: number) => {
    setFavorites((prev) => prev.filter((p) => p.id !== productId));
  };

  const isFavorite = (productId: number) => {
    return favorites.some((p) => p.id === productId);
  };

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        count: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
