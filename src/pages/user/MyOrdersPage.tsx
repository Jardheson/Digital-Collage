import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProfileSidebar } from "../../components/User/ProfileSidebar";

interface OrderItem {
  id: string;
  date: string;
  status: "Processando" | "Enviado" | "Entregue" | "Cancelado";
  total: number;
  items: number;
  image: string;
}

export const MyOrdersPage: React.FC = () => {
  const [orders] = useState<OrderItem[]>([
    {
      id: "DC-2026-0001",
      date: "10/01/2026",
      status: "Entregue",
      total: 399.9,
      items: 2,
      image: "/images/products/product-thumb-1.jpeg",
    },
    {
      id: "DC-2026-0002",
      date: "08/01/2026",
      status: "Enviado",
      total: 229.9,
      items: 1,
      image: "/images/products/product-thumb-2.jpeg",
    },
    {
      id: "DC-2026-0003",
      date: "03/01/2026",
      status: "Processando",
      total: 149.9,
      items: 1,
      image: "/images/products/product-thumb-3.jpeg",
    },
  ]);

  return (
    <div className="bg-light-gray min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          Home <span className="text-gray-400">/</span> Meus Pedidos
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <ProfileSidebar />

          <main className="flex-1">
            <div className="bg-white rounded shadow-sm border">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h2 className="font-bold text-gray-800">Meus Pedidos</h2>
                <Link to="/products" className="text-primary font-bold text-sm">
                  Comprar mais
                </Link>
              </div>

              <div className="p-4 md:p-6">
                <div className="hidden md:grid md:grid-cols-6 gap-4 px-2 py-3 text-xs font-bold text-gray-500">
                  <span>ID do Pedido</span>
                  <span>Data</span>
                  <span>Status</span>
                  <span className="text-right md:text-left">Itens</span>
                  <span className="text-right">Total</span>
                  <span className="text-right">Ações</span>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 md:p-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 items-center">
                        <div className="flex md:block items-center gap-2 md:col-span-1">
                          <div className="w-16 h-16 bg-[#E2E3FF] rounded overflow-hidden flex-shrink-0 hidden md:flex items-center justify-center">
                            <img
                              src={order.image}
                              alt=""
                              className="w-full h-full object-cover mix-blend-multiply"
                            />
                          </div>
                          <div className="flex justify-between w-full md:w-auto md:block">
                            <span className="text-xs text-gray-500 md:hidden">
                              ID
                            </span>
                            <span className="font-bold text-gray-800 text-xs md:text-sm">
                              {order.id}
                            </span>
                          </div>
                        </div>
                        <div className="flex md:block justify-between">
                          <span className="text-xs text-gray-500 md:hidden">
                            Data
                          </span>
                          <span className="text-gray-700">{order.date}</span>
                        </div>
                        <div className="flex md:block justify-between">
                          <span className="text-xs text-gray-500 md:hidden">
                            Status
                          </span>
                          <span className="text-gray-700">{order.status}</span>
                        </div>
                        <div className="flex md:block justify-between">
                          <span className="text-xs text-gray-500 md:hidden">
                            Itens
                          </span>
                          <span className="text-gray-700">{order.items}</span>
                        </div>
                        <div className="flex md:block justify-between">
                          <span className="text-xs text-gray-500 md:hidden">
                            Total
                          </span>
                          <span className="font-bold text-gray-800">
                            R$ {order.total.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-right md:text-right">
                          <Link
                            to={`/orders/${order.id}`}
                            className="text-primary font-bold text-sm hover:underline"
                          >
                            Ver detalhes
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
