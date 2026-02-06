import React from "react";
import { useLocation, Link } from "react-router-dom";

interface Personal {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

interface Delivery {
  address: string;
  bairro: string;
  cidade: string;
  cep: string;
}

interface Payment {
  holder: string;
  last4?: string;
  expiry?: string;
  method: "cartao" | "boleto";
}

interface ProductSummary {
  name: string;
  image: string;
  total: number;
}

export const SuccessPage: React.FC = () => {
  const location = useLocation();
  const state = (location.state ?? {}) as {
    personal?: Personal;
    delivery?: Delivery;
    payment?: Payment;
    product?: ProductSummary;
  };

  const personal = state.personal ?? {
    name: "Francisco Antonio Pereira",
    cpf: "123495913-35",
    email: "francisco@gmail.com",
    phone: "(85) 5555-5555",
  };
  const delivery = state.delivery ?? {
    address: "Rua João Pessoa, 333",
    bairro: "Centro",
    cidade: "Fortaleza, Ceará",
    cep: "433-8800",
  };
  const payment = state.payment ?? {
    holder: "FRANCISCO A P",
    last4: "2020",
    expiry: "12/28",
    method: "cartao",
  };
  const product = state.product ?? {
    name: "Tênis Nike Revolution 6 Next Nature Masculino",
    image: "/images/products/Layer 1aa 2.png",
    total: 219,
  };

  const formatBRL = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-light-gray min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          Home <span className="text-gray-400">/</span> Produtos{" "}
          <span className="text-gray-400">/</span> Sucesso
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border">
          <div className="text-center py-10">
            <div className="text-4xl mb-2">🎉</div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Compra Realizada com sucesso!
            </h1>
          </div>

          <div className="px-6 md:px-10 py-6 border-t">
            <h2 className="font-bold text-gray-800 mb-4">
              Informações Pessoais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Nome:</span>{" "}
                <span className="font-bold text-gray-800">{personal.name}</span>
              </div>
              <div>
                <span className="text-gray-500">CPF:</span>{" "}
                <span className="font-bold text-gray-800">{personal.cpf}</span>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>{" "}
                <span className="font-bold text-gray-800">
                  {personal.email}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Celular:</span>{" "}
                <span className="font-bold text-gray-800">
                  {personal.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 md:px-10 py-6 border-t">
            <h2 className="font-bold text-gray-800 mb-4">
              Informações de Entrega
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="md:col-span-2">
                <span className="text-gray-500">Endereço:</span>{" "}
                <span className="font-bold text-gray-800">
                  {delivery.address}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Bairro:</span>{" "}
                <span className="font-bold text-gray-800">
                  {delivery.bairro}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Cidade:</span>{" "}
                <span className="font-bold text-gray-800">
                  {delivery.cidade}
                </span>
              </div>
              <div>
                <span className="text-gray-500">CEP:</span>{" "}
                <span className="font-bold text-gray-800">{delivery.cep}</span>
              </div>
            </div>
          </div>

          <div className="px-6 md:px-10 py-6 border-t">
            <h2 className="font-bold text-gray-800 mb-4">
              Informações de Pagamento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Titular do Cartão:</span>{" "}
                <span className="font-bold text-gray-800">
                  {payment.holder}
                </span>
              </div>
              {payment.method === "cartao" ? (
                <div>
                  <span className="text-gray-500">Final:</span>{" "}
                  <span className="font-bold text-gray-800">
                    ************{payment.last4}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-gray-500">Forma:</span>{" "}
                  <span className="font-bold text-gray-800">
                    Boleto Bancário
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 md:px-10 py-6 border-t">
            <h2 className="font-bold text-gray-800 mb-4">Resumo da compra</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded bg-[#E2E3FF] overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-gray-800 leading-snug">
                  {product.name}
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 md:px-10 py-6 border-t">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-bold">Total</span>
              <span className="text-primary font-bold">
                {formatBRL(product.total)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ou 10x de R$ 21,90 sem juros
            </div>

            <button
              onClick={handlePrint}
              className="block mx-auto mt-6 text-gray-600 underline text-sm"
            >
              Imprimir Recibo
            </button>

            <div className="mt-6">
              <Link to="/" className="block w-full">
                <div className="w-full bg-yellow-400 text-white text-center font-bold py-3 rounded hover:bg-yellow-500 transition-colors">
                  Voltar para Home
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
