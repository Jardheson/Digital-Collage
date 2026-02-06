import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPages, deletePage } from '../../services/pageApi';
import type { Page } from '../../types/Page';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const PagesPage: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAdminAuth();

  const fetchPages = async () => {
    try {
      const data = await getPages();
      setPages(data);
    } catch (err) {
      setError('Erro ao carregar páginas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir esta página?')) return;
    if (!isAuthenticated) return;

    try {
      // TODO: Get real token from context when available
      // const token = 'temp_token'; 
      await deletePage(id);
      setPages(pages.filter(p => p.id !== id));
    } catch (err) {
      alert('Erro ao excluir página');
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Páginas de Informação</h1>
        <Link 
          to="/admin/pages/new" 
          className="bg-primary text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
        >
          Nova Página
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seção</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id}>
                <td className="px-6 py-4 whitespace-nowrap">{page.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{page.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap">{page.section}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${page.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {page.is_active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/admin/pages/${page.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</Link>
                  <button onClick={() => handleDelete(page.id)} className="text-red-600 hover:text-red-900">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};