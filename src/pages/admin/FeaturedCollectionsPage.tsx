import React, { useState } from 'react';
import { Save, Edit, Trash2, Plus, Upload, X } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { saveFeaturedCollection, deleteFeaturedCollection } from '../../services/settings';
import type { FeaturedCollection } from '../../context/SettingsContext';

export const FeaturedCollectionsPage: React.FC = () => {
  const { settings, refreshSettings } = useSettings();
  const [collections, setCollections] = useState<FeaturedCollection[]>(settings.featuredCollections || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<FeaturedCollection | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Partial<FeaturedCollection>>({
    title: '',
    discount: 0,
    image: '',
    link: '/products',
    linkText: 'Comprar'
  });

  const handleOpenModal = (collection?: FeaturedCollection) => {
    if (collection) {
      setEditingCollection(collection);
      setFormData(collection);
    } else {
      setEditingCollection(null);
      setFormData({ 
        title: '', 
        discount: 30, 
        image: '', 
        link: '/products', 
        linkText: 'Comprar' 
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCollection(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (editingCollection) {
        await saveFeaturedCollection({
            ...editingCollection,
            ...formData
        } as FeaturedCollection);
      } else {
        const newCollection: FeaturedCollection = {
          id: Date.now(), // Ignored by backend if using heuristic
          title: formData.title || 'Nova Coleção',
          discount: formData.discount || 0,
          image: formData.image || '',
          link: formData.link || '/products',
          linkText: formData.linkText || 'Comprar'
        };
        await saveFeaturedCollection(newCollection);
      }
      
      await refreshSettings();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save featured collection:', error);
      alert('Erro ao salvar coleção');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta coleção?')) {
      try {
        await deleteFeaturedCollection(id);
        await refreshSettings();
      } catch (error) {
        console.error('Failed to delete featured collection:', error);
        alert('Erro ao excluir coleção');
      }
    }
  };
  
  // Sync state
  React.useEffect(() => {
      setCollections(settings.featuredCollections || []);
  }, [settings.featuredCollections]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Coleções em Destaque</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#C92071] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-pink-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Coleção
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="relative h-48 bg-[#D8E3F2] p-6 overflow-hidden">
              <span className="bg-[#E7FF86] text-gray-800 text-xs font-bold px-2 py-1 rounded-full inline-block mb-2 relative z-10">
                {collection.discount}% OFF
              </span>
              <h3 className="text-xl font-bold text-gray-800 w-2/3 relative z-10">
                {collection.title}
              </h3>
              <img 
                src={collection.image} 
                alt={collection.title}
                className="absolute bottom-0 right-0 h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            
            <div className="p-4 flex justify-between items-center border-t border-gray-100">
              <span className="text-sm text-gray-500 truncate max-w-[50%]">{collection.link}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenModal(collection)}
                  aria-label={`Editar coleção ${collection.title}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(collection.id)}
                  aria-label={`Excluir coleção ${collection.title}`}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">
                {editingCollection ? 'Editar Coleção' : 'Nova Coleção'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                  placeholder="Ex: Novo drop Supreme"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Desconto (%)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) => setFormData({...formData, discount: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
                  <input
                    type="text"
                    required
                    value={formData.linkText}
                    onChange={(e) => setFormData({...formData, linkText: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link de Destino</label>
                <input
                  type="text"
                  required
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                  placeholder="/products"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                    placeholder="URL da imagem"
                  />
                  <label className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors flex items-center gap-2 text-gray-700 font-medium">
                    <Upload className="w-5 h-5" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
                {formData.image && (
                  <div className="h-32 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                    <img src={formData.image} alt="Preview" className="h-full object-contain" />
                  </div>
                )}
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
