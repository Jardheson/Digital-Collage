import React from "react";

interface ProductInfoProps {
  description: string;
  specs?: {
    gender?: string;
    indicatedFor?: string;
    height?: string;
    material?: string;
    sole?: string;
    weight?: string;
    warranty?: string;
    origin?: string;
    [key: string]: string | undefined;
  };
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  description,
  specs,
}) => {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Informações do Produto
      </h2>
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm">
        <div className="mb-8">
          <h3 className="font-bold text-gray-800 mb-3 text-lg">Descrição</h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {description}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-4 text-lg">
            Especificações Técnicas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
            <div className="flex border-b border-gray-100 py-3">
              <span className="font-bold text-gray-500 w-1/3">Gênero</span>
              <span className="text-gray-800">
                {specs?.gender || "Unissex"}
              </span>
            </div>
            <div className="flex border-b border-gray-100 py-3">
              <span className="font-bold text-gray-500 w-1/3">
                Indicado para
              </span>
              <span className="text-gray-800">
                {specs?.indicatedFor || "Dia a Dia / Corrida / Caminhada"}
              </span>
            </div>
            <div className="flex border-b border-gray-100 py-3">
              <span className="font-bold text-gray-500 w-1/3">
                Altura do Cano
              </span>
              <span className="text-gray-800">
                {specs?.height || "Cano Baixo"}
              </span>
            </div>
            <div className="flex border-b border-gray-100 py-3">
              <span className="font-bold text-gray-500 w-1/3">Material</span>
              <span className="text-gray-800">
                {specs?.material || "Mesh Respirável e Sintético"}
              </span>
            </div>
            <div className="flex border-b border-gray-100 py-3">
              <span className="font-bold text-gray-500 w-1/3">Solado</span>
              <span className="text-gray-800">
                {specs?.sole || "Borracha com tecnologia de amortecimento"}
              </span>
            </div>
            <div className="flex border-b border-gray-100 py-3">
              <span className="font-bold text-gray-500 w-1/3">
                Peso do Produto
              </span>
              <span className="text-gray-800">
                {specs?.weight ||
                  "250g (o peso varia de acordo com a numeração)"}
              </span>
            </div>
            <div className="flex border-b border-gray-100 py-3">
              <span className="font-bold text-gray-500 w-1/3">Garantia</span>
              <span className="text-gray-800">
                {specs?.warranty || "Contra defeito de fabricação"}
              </span>
            </div>
            <div className="flex border-b border-gray-100 py-3">
              <span className="font-bold text-gray-500 w-1/3">Origem</span>
              <span className="text-gray-800">
                {specs?.origin || "Importado"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
