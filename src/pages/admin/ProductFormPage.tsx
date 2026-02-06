import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Plus, X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { getProductById, saveProduct } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';
import type { Product } from '../../types/Product';

export const ProductFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    priceDiscount: 0,
    category: '',
    brand: '',
    gender: 'Unisex',
    state: 'Novo',
    images: [''],
    rating: 5,
    colors: [],
    sizes: [],
    technicalSpecs: {
      gender: 'Unisex',
      indicatedFor: '',
      height: '',
      material: '',
      sole: '',
      weight: '',
      warranty: '',
      origin: ''
    }
  });

  useEffect(() => {
    if (isEditing) {
      loadProduct(Number(id));
    }
  }, [id, isEditing]);

  const loadProduct = async (productId: number) => {
    try {
      setIsLoading(true);
      const product = await getProductById(productId);
      if (product) {
        setFormData(product);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'priceDiscount' ? parseFloat(value) : value
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...(formData.images || [])];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...(prev.images || []), ''] }));
  };

  const removeImageField = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({ 
          ...prev, 
          images: [...(prev.images || []).filter(img => img !== ''), base64String] 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTechSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      technicalSpecs: {
        ...prev.technicalSpecs,
        [name]: value
      }
    }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'colors' | 'sizes') => {
    const values = e.target.value.split(',').map(v => v.trim());
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await saveProduct(formData as Product);
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/products')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Editar Produto' : 'Novo Produto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Informações Básicas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                placeholder="Ex: Tênis Nike Air Jordan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
              <input
                type="number"
                name="price"
                required
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço com Desconto (R$)</label>
              <input
                type="number"
                name="priceDiscount"
                step="0.01"
                min="0"
                value={formData.priceDiscount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
              >
                <option value="">Selecione uma categoria</option>
                {settings.categories?.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
              <input
                type="text"
                name="brand"
                required
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                placeholder="Ex: Nike"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
              >
                <option value="Novo">Novo</option>
                <option value="Usado">Usado</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                placeholder="Descreva o produto..."
              />
            </div>

            <div className="md:col-span-2 border-t border-gray-100 pt-6">
                <h3 className="font-bold text-gray-800 mb-4">Variações</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cores (Hex codes separados por vírgula)</label>
                        <input
                            type="text"
                            value={formData.colors?.join(', ') || ''}
                            onChange={(e) => handleArrayChange(e, 'colors')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                            placeholder="#FF0000, #00FF00, #0000FF"
                        />
                        <div className="flex gap-2 mt-2">
                            {formData.colors?.map((color, idx) => (
                                <div key={idx} className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: color }} title={color} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tamanhos (Separados por vírgula)</label>
                        <input
                            type="text"
                            value={formData.sizes?.join(', ') || ''}
                            onChange={(e) => handleArrayChange(e, 'sizes')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                            placeholder="39, 40, 41, 42"
                        />
                    </div>
                </div>
            </div>

            <div className="md:col-span-2 border-t border-gray-100 pt-6">
                <h3 className="font-bold text-gray-800 mb-4">Especificações Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Indicado para</label>
                        <input
                            type="text"
                            name="indicatedFor"
                            value={formData.technicalSpecs?.indicatedFor || ''}
                            onChange={handleTechSpecChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                            placeholder="Ex: Corrida, Dia a Dia"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                        <input
                            type="text"
                            name="material"
                            value={formData.technicalSpecs?.material || ''}
                            onChange={handleTechSpecChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                            placeholder="Ex: Mesh e Sintético"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Altura do Cano</label>
                        <input
                            type="text"
                            name="height"
                            value={formData.technicalSpecs?.height || ''}
                            onChange={handleTechSpecChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                            placeholder="Ex: Cano Baixo"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Solado</label>
                        <input
                            type="text"
                            name="sole"
                            value={formData.technicalSpecs?.sole || ''}
                            onChange={handleTechSpecChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                            placeholder="Ex: Borracha"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Peso</label>
                        <input
                            type="text"
                            name="weight"
                            value={formData.technicalSpecs?.weight || ''}
                            onChange={handleTechSpecChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                            placeholder="Ex: 250g"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gênero (Específico)</label>
                        <input
                            type="text"
                            name="gender"
                            value={formData.technicalSpecs?.gender || ''}
                            onChange={handleTechSpecChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                            placeholder="Ex: Masculino, Feminino, Unissex"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Garantia</label>
                        <input
                            type="text"
                            name="warranty"
                            value={formData.technicalSpecs?.warranty || ''}
                            onChange={handleTechSpecChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                            placeholder="Ex: Contra defeito de fabricação"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Origem</label>
                        <input
                            type="text"
                            name="origin"
                            value={formData.technicalSpecs?.origin || ''}
                            onChange={handleTechSpecChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                            placeholder="Ex: Nacional ou Importado"
                        />
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <h2 className="font-bold text-gray-800">Imagens do Produto</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {formData.images?.map((url, index) => (
                url && (
                  <div key={index} className="relative group aspect-square bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    <img src={url} alt={`Preview ${index}`} className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )
              ))}
              
              <label className="aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#C92071] hover:bg-pink-50 transition-colors flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:text-[#C92071]">
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-xs font-bold">Carregar Foto</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Ou adicione por URL externa:</label>
              {formData.images?.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="https://exemplo.com/imagem.jpg"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                    />
                  </div>
                  {formData.images!.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg border border-red-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="text-sm text-[#C92071] font-bold hover:underline flex items-center gap-1 mt-2"
              >
                <Plus className="w-4 h-4" /> Adicionar outro campo de URL
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-[#C92071] text-white font-bold rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isLoading ? 'Salvando...' : 'Salvar Produto'}
          </button>
        </div>
      </form>
    </div>
  );
};
