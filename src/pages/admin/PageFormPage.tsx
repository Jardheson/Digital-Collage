import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPage, getPage, updatePage } from '../../services/pageApi';
import type { Page } from '../../types/Page';
import { useAdminAuth } from '../../context/AdminAuthContext';

import { Upload } from 'lucide-react';

export const PageFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAdminAuth();
  const isEditing = !!id;

  const [formData, setFormData] = useState<Partial<Page>>({
    title: '',
    slug: '',
    content: '',
    section: 'info',
    is_active: true,
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      setLoading(true);
      getPage(id)
        .then(data => {
          setFormData({
            title: data.title,
            slug: data.slug,
            content: data.content,
            section: data.section,
            is_active: data.is_active,
            image_url: data.image_url
          });
        })
        .catch(() => setError('Erro ao carregar página'))
        .finally(() => setLoading(false));
    }
  }, [isEditing, id]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image_url: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      // TODO: Get real token from context when available
      // const token = 'temp_token'; 
      if (isEditing && id) {
        await updatePage(Number(id), formData);
      } else {
        await createPage(formData);
      }
      navigate('/admin/pages');
    } catch (err) {
      setError('Erro ao salvar página');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (loading && isEditing) return <div>Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Editar Página' : 'Nova Página'}
      </h1>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="ex: sobre-nos, seguranca"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seção</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="info">Informação</option>
              <option value="blog">Blog</option>
              <option value="legal">Legal</option>
              <option value="system">Sistema</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 text-primary border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">Ativo</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagem de Capa (Banner)</label>
          <div className="flex gap-4 items-start">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                name="image_url"
                value={formData.image_url || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary mb-2"
                placeholder="URL da imagem (http://...)"
              />
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700">
                <Upload className="w-4 h-4" />
                Upload de Imagem
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">Suporta JPG, PNG, GIF, WEBP, SVG</p>
            </div>
            
            {formData.image_url && (
              <div className="w-full md:w-1/2 h-40 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden relative">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo (HTML suportado)</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/pages')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Salvar Página'}
          </button>
        </div>
      </form>
    </div>
  );
};