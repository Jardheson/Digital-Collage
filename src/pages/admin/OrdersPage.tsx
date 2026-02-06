import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, X, Save } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import type { Order } from '../../context/SettingsContext';

export const OrdersPage: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  
  const [formData, setFormData] = useState<Partial<Order>>({
    customer: '',
    total: 0,
    status: 'Processando',
    date: new Date().toLocaleDateString('pt-BR')
  });

  const orders = settings.orders || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue': return 'bg-green-100 text-green-700';
      case 'Enviado': return 'bg-blue-100 text-blue-700';
      case 'Processando': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = (order?: Order) => {
    if (order) {
      setEditingOrder(order);
      setFormData(order);
    } else {
      const newId = `#${Math.floor(Math.random() * 90000) + 10000}`;
      setEditingOrder(null);
      setFormData({ 
        id: newId,
        customer: '', 
        total: 0, 
        status: 'Processando',
        date: new Date().toLocaleDateString('pt-BR')
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingOrder) {
      const updatedOrders = orders.map(ord => 
        ord.id === editingOrder.id ? { ...ord, ...formData } as Order : ord
      );
      updateSettings({ orders: updatedOrders });
    } else {
      const newOrder = formData as Order;
      updateSettings({ orders: [newOrder, ...orders] });
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      const updatedOrders = orders.filter(ord => ord.id !== id);
      updateSettings({ orders: updatedOrders });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Pedidos</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => handleOpenModal()}
            className="bg-[#C92071] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-pink-700 transition-colors"
          >
            Novo Pedido
          </button>
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`border px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${
                statusFilter !== 'all' 
                  ? 'bg-pink-50 border-pink-200 text-pink-700' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              {statusFilter === 'all' ? 'Filtrar' : statusFilter}
              {statusFilter !== 'all' && (
                <X 
                  className="w-4 h-4 ml-1 hover:text-red-500" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setStatusFilter('all');
                  }}
                />
              )}
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-gray-50 text-xs font-bold text-gray-400 uppercase">
                  Filtrar por Status
                </div>
                {['all', 'Processando', 'Enviado', 'Entregue', 'Cancelado'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      statusFilter === status ? 'text-primary font-bold bg-pink-50' : 'text-gray-600'
                    }`}
                  >
                    {status === 'all' ? 'Todos os Pedidos' : status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar por ID ou cliente..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C92071]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Pedido</th>
                <th className="hidden md:table-cell px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="hidden lg:table-cell px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{order.id}</div>
                      <div className="text-xs text-gray-500 md:hidden">{order.customer}</div>
                      <div className="text-xs text-gray-400 lg:hidden">{order.date}</div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-gray-600">{order.customer}</td>
                    <td className="hidden lg:table-cell px-6 py-4 text-gray-600">{order.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      R$ {order.total.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(order)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label={`Editar pedido ${order.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(order.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label={`Excluir pedido ${order.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">
                {editingOrder ? 'Editar Pedido' : 'Novo Pedido'}
              </h3>
              <button 
                onClick={handleCloseModal}
                aria-label="Fechar modal"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID do Pedido</label>
                <input
                  type="text"
                  value={formData.id}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  value={formData.customer}
                  onChange={(e) => setFormData({...formData, customer: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                  placeholder="Ex: Maria Silva"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                    placeholder="DD/MM/AAAA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total (R$)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={formData.total}
                    onChange={(e) => setFormData({...formData, total: parseFloat(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as Order['status']})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                >
                  <option value="Processando">Processando</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Entregue">Entregue</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C92071] text-white font-bold rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
