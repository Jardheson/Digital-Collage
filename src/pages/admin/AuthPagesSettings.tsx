import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const AuthPagesSettings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState(settings.authPages);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (settings.authPages) {
      setFormData(settings.authPages);
    } else {
      // Fallback if authPages is missing from context
      setFormData({
        login: {
          title: 'Acesse sua conta',
          subtitle: 'Novo cliente? Então registre-se',
          image: '/images/products/produc-image-1-.png'
        },
        signup: {
          title: 'Crie sua conta',
          subtitle: 'Já possui uma conta? Entre',
          image: '/images/products/produc-image-4-.png'
        },
        socialAuth: {
          text: 'Ou faça login com',
          gmailIcon: '/images/icons/logo.png',
          facebookIcon: '/images/icons/Facebook-criar-conta.svg'
        }
      });
    }
  }, [settings]);

  const handleChange = (page: 'login' | 'signup', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (page: 'login' | 'signup', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [page]: {
            ...prev[page],
            image: reader.result as string
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialAuth: {
        ...(prev?.socialAuth || {
          text: 'Ou faça login com',
          gmailIcon: '',
          facebookIcon: ''
        }),
        [field]: value
      }
    }));
  };

  const handleSocialFileUpload = (field: 'gmailIcon' | 'facebookIcon', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSocialChange(field, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      updateSettings({ authPages: formData });
      setMessage({ type: 'success', text: 'Páginas de autenticação atualizadas com sucesso!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao salvar alterações.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Deseja descartar as alterações não salvas?')) {
      setFormData(settings.authPages);
      setMessage(null);
    }
  };

  const handleRestoreDefaults = () => {
    if (window.confirm('Isso irá restaurar os textos e imagens originais do tema. Deseja continuar?')) {
      const defaults = {
        login: {
          title: 'Acesse sua conta',
          subtitle: 'Novo cliente? Então registre-se',
          image: '/images/products/produc-image-1-.png'
        },
        signup: {
          title: 'Crie sua conta',
          subtitle: 'Já possui uma conta? Entre',
          image: '/images/products/produc-image-4-.png'
        },
        socialAuth: {
          text: 'Ou faça login com',
          gmailIcon: '/images/icons/logo.png',
          facebookIcon: '/images/icons/Facebook-criar-conta.svg'
        }
      };
      setFormData(defaults);
      updateSettings({ authPages: defaults });
      setMessage({ type: 'success', text: 'Configurações originais restauradas com sucesso!' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Páginas de Autenticação</h1>
        {message && (
          <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Login Page Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-2 text-lg">Página de Login</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={formData?.login.title}
                  onChange={(e) => handleChange('login', 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                <input
                  type="text"
                  value={formData?.login.subtitle}
                  onChange={(e) => handleChange('login', 'subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Imagem Ilustrativa</label>
              <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <label className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-center">
                    <span className="text-sm text-gray-600 font-medium">Carregar Imagem</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload('login', e)}
                    />
                  </label>
                  <p className="text-xs text-gray-500">
                    Recomendado: Imagem vertical ou quadrada com fundo transparente.
                  </p>
                </div>
                <div className="w-24 h-24 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                  {formData?.login.image ? (
                    <img src={formData.login.image} alt="Preview" className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-xs text-gray-400">Sem imagem</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signup Page Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-2 text-lg">Página de Cadastro (Sign Up)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={formData?.signup.title}
                  onChange={(e) => handleChange('signup', 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                <input
                  type="text"
                  value={formData?.signup.subtitle}
                  onChange={(e) => handleChange('signup', 'subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Imagem Ilustrativa</label>
              <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <label className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-center">
                    <span className="text-sm text-gray-600 font-medium">Carregar Imagem</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload('signup', e)}
                    />
                  </label>
                  <p className="text-xs text-gray-500">
                    Recomendado: Imagem vertical ou quadrada com fundo transparente.
                  </p>
                </div>
                <div className="w-24 h-24 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                  {formData?.signup.image ? (
                    <img src={formData.signup.image} alt="Preview" className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-xs text-gray-400">Sem imagem</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Login Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-2 text-lg">Login Social (Gmail / Facebook)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto de Chamada</label>
              <input
                type="text"
                value={formData?.socialAuth?.text || 'Ou faça login com'}
                onChange={(e) => handleSocialChange('text', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                placeholder="Ex: Ou faça login com"
              />
            </div>

            {/* Gmail Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ícone Gmail</label>
              <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <label className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-center">
                    <span className="text-sm text-gray-600 font-medium">Carregar Ícone</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleSocialFileUpload('gmailIcon', e)}
                    />
                  </label>
                  <p className="text-xs text-gray-500">
                    Recomendado: SVG ou PNG transparente (aprox. 24x24px).
                  </p>
                </div>
                <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                  {formData?.socialAuth?.gmailIcon ? (
                    <img src={formData.socialAuth.gmailIcon} alt="Gmail" className="w-8 h-8 object-contain" />
                  ) : (
                    <span className="text-xs text-gray-400">Sem ícone</span>
                  )}
                </div>
              </div>
            </div>

            {/* Facebook Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ícone Facebook</label>
              <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <label className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-center">
                    <span className="text-sm text-gray-600 font-medium">Carregar Ícone</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleSocialFileUpload('facebookIcon', e)}
                    />
                  </label>
                  <p className="text-xs text-gray-500">
                    Recomendado: SVG ou PNG transparente (aprox. 24x24px).
                  </p>
                </div>
                <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                  {formData?.socialAuth?.facebookIcon ? (
                    <img src={formData.socialAuth.facebookIcon} alt="Facebook" className="w-8 h-8 object-contain" />
                  ) : (
                    <span className="text-xs text-gray-400">Sem ícone</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 sticky bottom-4 bg-gray-100/80 backdrop-blur p-4 rounded-xl">
          <button
            type="button"
            onClick={handleRestoreDefaults}
            className="px-4 py-3 text-sm text-gray-500 hover:text-gray-700 font-medium underline transition-colors mr-auto"
          >
            Restaurar Padrões
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Descartar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-[#C92071] text-white font-bold rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-70"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                Salvar Alterações
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
