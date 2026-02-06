import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Eye, EyeOff, Upload, ExternalLink, RefreshCw } from 'lucide-react';
import { useSettings, type FooterLink } from '../../context/SettingsContext';

export const FooterLinksPage: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [links, setLinks] = useState<FooterLink[]>(settings.footerNavigation || []);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Sync with settings if they change externally
    if (JSON.stringify(links) !== JSON.stringify(settings.footerNavigation)) {
      setLinks(settings.footerNavigation || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.footerNavigation]);

  const handleAddLink = () => {
    const newLink: FooterLink = {
      id: Date.now().toString(),
      label: 'Novo Link',
      path: '/',
      visible: true
    };
    setLinks(prev => [...prev, newLink]);
  };

  const handleRemoveLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const handleUpdateLink = (id: string, field: keyof FooterLink, value: any) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateLink(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateSettings({ footerNavigation: links });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Links do Rodapé</h1>
          <p className="text-gray-600">Gerencie os links da seção "Informação" no rodapé do site</p>
        </div>
        <div className="flex items-center gap-2">
          {isSaved && <span className="text-green-600 text-sm animate-fade-in">Salvo com sucesso!</span>}
          <button 
            onClick={() => setLinks(settings.footerNavigation || [])}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Descartar alterações"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Save className="w-5 h-5" />
            Salvar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-700">Lista de Links</h3>
          <button 
            onClick={handleAddLink}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-medium px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar Link
          </button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {links.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum link cadastrado. Clique em "Adicionar Link" para começar.
            </div>
          ) : (
            links.map((link, index) => (
              <div key={link.id} className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold text-xs shrink-0">
                  {index + 1}
                </div>
                
                {/* Icon Upload */}
                <div className="relative group shrink-0">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center overflow-hidden ${link.image ? 'border-gray-200 bg-white' : 'border-dashed border-gray-300 bg-gray-50'}`}>
                    {link.image ? (
                      <img src={link.image} alt="Icon" className="w-full h-full object-contain p-1" />
                    ) : (
                      <Upload className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg text-white">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(link.id, e)}
                    />
                    <Upload className="w-4 h-4" />
                  </label>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Título do Link</label>
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => handleUpdateLink(link.id, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                      placeholder="Ex: Sobre Nós"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Caminho / URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={link.path}
                        onChange={(e) => handleUpdateLink(link.id, 'path', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
                        placeholder="Ex: /about"
                      />
                      <a 
                        href={link.path.startsWith('http') ? link.path : `http://localhost:5173${link.path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-gray-400 hover:text-primary border border-gray-300 rounded-md flex items-center justify-center"
                        title="Testar link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 border-l border-gray-200 pl-4 md:ml-2">
                  <button
                    onClick={() => handleUpdateLink(link.id, 'visible', !link.visible)}
                    className={`p-2 rounded-lg transition-colors ${link.visible ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-400 bg-gray-100 hover:bg-gray-200'}`}
                    title={link.visible ? "Visível" : "Oculto"}
                  >
                    {link.visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => handleRemoveLink(link.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
