import React from "react";
import type { FilterOptions } from "../../types/Product";

interface FilterSidebarProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
}) => {
  type FilterCategory = "brand" | "category" | "gender" | "state";

  const handleCheckboxChange = (category: FilterCategory, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category] ?? [];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [category]: currentValues.filter((item: string) => item !== value),
        };
      } else {
        return { ...prev, [category]: [...currentValues, value] };
      }
    });
  };

  const handleRadioChange = (category: FilterCategory, value: string) => {
    setFilters((prev) => ({ ...prev, [category]: [value] }));
  };

  return (
    <aside className="w-full md:w-64 bg-white p-6 rounded shadow-sm h-fit">
      <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 hidden md:block">
        Filtrar por
      </h3>

      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 text-sm">Marca</h4>
        <div className="space-y-2">
          {[
            "Adidas",
            "Calenciaga",
            "K-Swiss",
            "Nike",
            "Puma",
            "Converse",
            "Generic",
          ].map((brand) => {
            const isChecked = filters.brand?.includes(brand) || false;
            return (
              <label
                key={brand}
                className="flex items-center gap-2 text-sm cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 text-[#C92071] border-gray-300 rounded focus:ring-[#C92071] accent-[#C92071]"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange("brand", brand)}
                />
                <span
                  className={
                    isChecked ? "text-gray-800 font-medium" : "text-gray-600"
                  }
                >
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 text-sm">Categoria</h4>
        <div className="space-y-2">
          {[
            "Esporte e lazer",
            "Casual",
            "Utilitário",
            "Corrida",
            "Tênis",
            "Acessórios",
          ].map((cat) => {
            const isChecked = filters.category?.includes(cat) || false;
            return (
              <label
                key={cat}
                className="flex items-center gap-2 text-sm cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 text-[#C92071] border-gray-300 rounded focus:ring-[#C92071] accent-[#C92071]"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange("category", cat)}
                />
                <span
                  className={
                    isChecked ? "text-gray-800 font-medium" : "text-gray-600"
                  }
                >
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 text-sm">Gênero</h4>
        <div className="space-y-2">
          {["Masculino", "Feminino", "Unisex"].map((gender) => {
            const isChecked = filters.gender?.includes(gender) || false;
            return (
              <label
                key={gender}
                className="flex items-center gap-2 text-sm cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 text-[#C92071] border-gray-300 rounded focus:ring-[#C92071] accent-[#C92071]"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange("gender", gender)}
                />
                <span
                  className={
                    isChecked ? "text-gray-800 font-medium" : "text-gray-600"
                  }
                >
                  {gender}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-3 text-sm">Estado</h4>
        <div className="space-y-2">
          {["Novo", "Usado"].map((state) => {
            const isChecked = filters.state?.includes(state) || false;
            return (
              <label
                key={state}
                className="flex items-center gap-2 text-sm cursor-pointer py-1"
              >
                <input
                  type="radio"
                  name="state"
                  className="w-5 h-5 text-[#C92071] border-gray-300 focus:ring-[#C92071] accent-[#C92071]"
                  checked={isChecked}
                  onChange={() => handleRadioChange("state", state)}
                />
                <span
                  className={
                    isChecked ? "text-gray-800 font-medium" : "text-gray-600"
                  }
                >
                  {state}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
