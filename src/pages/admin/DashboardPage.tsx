import React, { useState, useEffect } from 'react';
import { ShoppingBag, Users, DollarSign, Package, Download } from 'lucide-react';
import { ReportModal } from '../../components/Admin/ReportModal';
import { useSettings } from '../../context/SettingsContext';

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  color: string;
}> = ({ title, value, icon: Icon, trend, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);

export const DashboardPage: React.FC = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { settings } = useSettings();
  const [realStats, setRealStats] = useState({
    usersCount: 0,
    activeUsersCount: 0,
    productsCount: 0
  });

  useEffect(() => {
    const loadStats = () => {
      const usersDb = JSON.parse(localStorage.getItem('users_db') || '[]');
      const activeUsers = usersDb.filter((u: any) => u.status === 'Ativo').length;
      
      const productsDb = JSON.parse(localStorage.getItem('products_db') || '[]');
      
      setRealStats({
        usersCount: usersDb.length,
        activeUsersCount: activeUsers,
        productsCount: productsDb.length
      });
    };
    
    loadStats();
    
    window.addEventListener('storage', loadStats);
    return () => window.removeEventListener('storage', loadStats);
  }, []);

  const totalRevenue = settings.orders?.reduce((acc, order) => acc + order.total, 0) || 0;
  const totalOrders = settings.orders?.length || 0;
  const totalUsers = realStats.usersCount || settings.users?.length || 0;
  const activeUsers = realStats.activeUsersCount || settings.users?.filter(u => u.status === 'Ativo').length || 0;
  const totalProducts = realStats.productsCount || 48;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          Exportar Relatório
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Vendas Totais" 
          value={`R$ ${totalRevenue.toFixed(2).replace('.', ',')}`}
          icon={DollarSign} 
          trend="+12.5%"
          color="text-green-600"
        />
        <StatCard 
          title="Pedidos" 
          value={totalOrders.toString()}
          icon={ShoppingBag} 
          trend="+8.2%"
          color="text-blue-600"
        />
        <StatCard 
          title="Produtos" 
          value={totalProducts.toString()}
          icon={Package} 
          color="text-orange-600"
        />
        <StatCard 
          title="Clientes" 
          value={totalUsers.toString()}
          icon={Users} 
          trend={`${activeUsers} ativos`}
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4">Vendas Recentes</h2>
          <div className="space-y-4">
             {(settings.orders || []).slice(0, 5).map((order) => (
               <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                     {order.customer.substring(0, 2).toUpperCase()}
                   </div>
                   <div>
                     <p className="text-sm font-medium text-gray-800">{order.customer}</p>
                     <p className="text-xs text-gray-500">{order.date}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-bold text-gray-800">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                   <p className={`text-xs ${
                     order.status === 'Entregue' ? 'text-green-600' : 
                     order.status === 'Cancelado' ? 'text-red-600' : 'text-blue-600'
                   }`}>{order.status}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4">Produtos Mais Vendidos</h2>
           <div className="space-y-4">
             {[
               { id: 1, name: 'Nike Air Jordan High', sales: 32, price: 499.90, image: '/images/products/product-thumb-1.jpeg' },
               { id: 2, name: 'Camiseta K-Swiss', sales: 28, price: 199.90, image: '/images/products/product-thumb-2.jpeg' },
               { id: 3, name: 'Tênis Nike Revolution', sales: 25, price: 299.90, image: '/images/products/product-thumb-3.jpeg' },
               { id: 4, name: 'Tênis Casual', sales: 18, price: 159.90, image: '/images/products/product-thumb-4.jpeg' },
               { id: 5, name: 'Headphone Bluetooth', sales: 12, price: 349.90, image: '/images/products/product-thumb-5.jpeg' },
             ].map((product) => (
               <div key={product.id} className="flex items-center gap-4 py-2">
                 <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                   <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1">
                   <p className="text-sm font-medium text-gray-800">{product.name}</p>
                   <p className="text-xs text-gray-500">{product.sales} vendas</p>
                 </div>
                 <p className="text-sm font-bold text-gray-800">R$ {product.price.toFixed(2)}</p>
               </div>
             ))}
          </div>
        </div>
      </div>

      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
    </div>
  );
};
