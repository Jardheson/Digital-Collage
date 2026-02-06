import React from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
import { Image as ImageIcon } from "lucide-react";

export const CategoriesPage: React.FC = () => {
  const { settings } = useSettings();
  const categories = settings.categories || [];

  return (
    <div className="bg-light-gray py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
          <Link to="/products" className="text-primary hover:underline">
            Ver produtos
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories
            .filter((cat) => cat.status === "Ativo")
            .map((item) => (
              <Link
                key={item.id}
                to={`/products?category=${item.name}`}
                className="group"
              >
                <div className="w-full h-40 bg-white rounded-xl border border-gray-200 flex flex-col items-center justify-center gap-3 shadow-sm group-hover:shadow-md transition-all">
                  <div className="w-16 h-16 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-10 h-10" />
                    )}
                  </div>
                  <span className="font-bold text-gray-700 group-hover:text-primary">
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
