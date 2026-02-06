import React, { useState, useEffect } from 'react';
import { Save, Upload, RefreshCw, Smartphone, Monitor, Trash2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const PWASettingsPage: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState(settings.pwa);
  const [activeTab, setActiveTab] = useState<'general' | 'banner'>('general');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Only update local state if settings change externally
    if (JSON.stringify(formData) !== JSON.stringify(settings.pwa)) {
      setFormData(settings.pwa);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.pwa]);

  // Auto-save logic (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (JSON.stringify(formData) !== JSON.stringify(settings.pwa)) {
        updateSettings({ pwa: formData });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [formData, settings.pwa, updateSettings]);

  const handleRemoveIcon = () => {
    setFormData(prev => ({
      ...prev,
      iconUrl: ''
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('banner.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        installBanner: {
          ...prev.installBanner,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          iconUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Configurações PWA</h1>
          <p className="text-gray-600">Personalize a experiência de instalação e aparência do app</p>
        </div>
        <div className="flex items-center gap-2">
          {isSaved && <span className="text-green-600 text-sm animate-fade-in">Salvo automaticamente</span>}
          <button 
            onClick={() => setFormData(settings.pwa)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Recarregar valores"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => updateSettings({ pwa: formData })}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Save className="w-5 h-5" />
            Salvar Alterações
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar / Tabs */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                activeTab === 'general' ? 'bg-primary/5 text-primary font-medium border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              Identidade do App
            </button>
            <button
              onClick={() => setActiveTab('banner')}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                activeTab === 'banner' ? 'bg-primary/5 text-primary font-medium border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Monitor className="w-5 h-5" />
              Banner de Instalação
            </button>
          </div>

          {/* Preview Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-4">Preview do Banner</h3>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative overflow-hidden h-40 flex items-end justify-center">
               <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <span className="text-4xl font-bold text-gray-300">SITE</span>
               </div>
               
               {/* Banner Preview */}
               <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-3 w-full flex items-center gap-3 transform scale-90 origin-bottom">
                  <div className="bg-primary/10 p-1.5 rounded-lg shrink-0">
                    <img src={formData.iconUrl} alt="Icon" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-xs truncate">{formData.installBanner.title}</h3>
                    <p className="text-[10px] text-gray-500 truncate">{formData.installBanner.description}</p>
                  </div>
                  <button className="bg-primary text-white px-3 py-1.5 rounded-md font-bold text-xs whitespace-nowrap">
                    {formData.installBanner.buttonText}
                  </button>
               </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Como aparecerá no celular do cliente</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">Informações Gerais</h2>
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="showInFooter"
                        checked={formData.showInFooter} 
                        onChange={handleChange}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      <span className="ml-3 text-sm font-medium text-gray-700">Mostrar no Rodapé</span>
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="enabled"
                        checked={formData.enabled} 
                        onChange={handleChange}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      <span className="ml-3 text-sm font-medium text-gray-700">PWA Ativo</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome do App</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Ex: Digital Store"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome Curto (Homescreen)</label>
                      <input
                        type="text"
                        name="shortName"
                        value={formData.shortName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Ex: Store"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cor do Tema (Status Bar)</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          name="themeColor"
                          value={formData.themeColor}
                          onChange={handleChange}
                          className="h-10 w-20 p-1 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          name="themeColor"
                          value={formData.themeColor}
                          onChange={handleChange}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary uppercase"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cor de Fundo (Splash)</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          name="backgroundColor"
                          value={formData.backgroundColor}
                          onChange={handleChange}
                          className="h-10 w-20 p-1 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          name="backgroundColor"
                          value={formData.backgroundColor}
                          onChange={handleChange}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary uppercase"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary resize-none"
                      placeholder="Descrição do aplicativo..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ícone do App</label>
                    <div className="flex gap-4 items-start">
                      <div className="w-24 h-24 bg-gray-50 border border-gray-200 rounded-xl flex flex-col items-center justify-center overflow-hidden shrink-0 relative group">
                        {formData.iconUrl ? (
                          <>
                            <img src={formData.iconUrl} alt="App Icon" className="w-full h-full object-contain p-2" />
                            <button
                              type="button"
                              onClick={handleRemoveIcon}
                              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remover ícone"
                            >
                              <Trash2 className="w-8 h-8 text-white" />
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-gray-400 text-center px-2">Sem ícone</span>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <label className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors flex items-center gap-2 text-gray-700 font-medium w-fit">
                          <Upload className="w-5 h-5" />
                          Carregar Novo Ícone
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleFileUpload}
                          />
                        </label>
                        <p className="text-xs text-gray-500">
                          Recomendado: PNG quadrado, mín. 512x512px.
                          Este ícone será usado na tela inicial e no banner de instalação.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'banner' && (
              <div className="space-y-6">
                 <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">Personalizar Banner</h2>
                  <p className="text-sm text-gray-500">Customização do pop-up de instalação</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título do Banner</label>
                    <input
                      type="text"
                      name="banner.title"
                      value={formData.installBanner.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="Ex: Baixe nosso App"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Texto Descritivo</label>
                    <input
                      type="text"
                      name="banner.description"
                      value={formData.installBanner.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="Ex: Receba ofertas exclusivas"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
                    <input
                      type="text"
                      name="banner.buttonText"
                      value={formData.installBanner.buttonText}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="Ex: Instalar Agora"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
