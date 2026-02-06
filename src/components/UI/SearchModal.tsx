import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setQuery("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-0 md:pt-20">
      <div className="w-full md:w-2/3 bg-white rounded-b-3xl md:rounded-3xl shadow-2xl">
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                autoFocus
                className="w-full bg-light-gray rounded-full py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={onClose}
              className="text-gray-text hover:text-primary transition-colors flex-shrink-0"
              aria-label="Fechar busca"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-6">
            <div className="text-sm font-bold text-gray-800 mb-4">
              Categorias Populares
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "Eletrônicos",
                "Roupas",
                "Sapatos",
                "Acessórios",
                "Casa",
                "Esportes",
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setQuery(category);
                    onSearch(category);
                  }}
                  className="px-4 py-2 bg-light-gray rounded-full text-gray-800 text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
