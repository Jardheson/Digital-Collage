import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const orderDetails = {
    id: id,
    date: "10/01/2026",
    status: "Entregue",
    total: 399.9,
    shipping: 15.0,
    subtotal: 384.9,
    paymentMethod: "Cartão de Crédito **** 1234",
    address: "Av. Santos Dumont, 1510 - Aldeota, Fortaleza - CE",
    items: [
      {
        id: 1,
        name: "Nike Air Jordan High",
        price: 384.9,
        quantity: 1,
        image: "/images/products/product-thumb-1.jpeg",
      },
    ],
    timeline: [
      { status: "Pedido Realizado", date: "10/01/2026 10:30", completed: true },
      {
        status: "Pagamento Confirmado",
        date: "10/01/2026 10:35",
        completed: true,
      },
      { status: "Em Separação", date: "11/01/2026 08:00", completed: true },
      { status: "Enviado", date: "12/01/2026 14:20", completed: true },
      { status: "Entregue", date: "15/01/2026 16:45", completed: true },
    ],
  };

  return (
    <div className="bg-light-gray min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Link
            to="/orders"
            className="text-gray-500 hover:text-primary flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Voltar para Meus Pedidos
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Pedido {orderDetails.id}
                </h1>
                <p className="text-gray-500 text-sm">
                  Realizado em {orderDetails.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                  {orderDetails.status}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="font-bold text-gray-800">Itens do Pedido</h2>
              </div>
              <div className="p-6 space-y-6">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-[#E2E3FF] rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-gray-500 text-sm">
                        Quantidade: {item.quantity}
                      </p>
                      <p className="text-primary font-bold mt-1">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="font-bold text-gray-800 mb-6">Acompanhamento</h2>
              <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pl-8 py-2">
                {orderDetails.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <span
                      className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-2 ${step.completed ? "bg-primary border-primary" : "bg-white border-gray-300"}`}
                    ></span>
                    <h4
                      className={`font-bold ${step.completed ? "text-gray-800" : "text-gray-400"}`}
                    >
                      {step.status}
                    </h4>
                    <p className="text-xs text-gray-500">{step.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-96 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="font-bold text-gray-800 mb-4">
                Resumo Financeiro
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span>R$ {orderDetails.shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-gray-800 text-lg">
                  <span>Total</span>
                  <span>R$ {orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="font-bold text-gray-800 mb-4">Pagamento</h2>
              <p className="text-gray-600 text-sm">
                {orderDetails.paymentMethod}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="font-bold text-gray-800 mb-4">
                Endereço de Entrega
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {orderDetails.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
