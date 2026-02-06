import React, { useState, useEffect } from "react";
import { Save, RefreshCw, Upload } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";

export const SpecialOfferPage: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState(settings.specialOffer);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (settings.specialOffer) {
      setFormData(settings.specialOffer);
    }
  }, [settings]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      updateSettings({ specialOffer: formData });
      setMessage({
        type: "success",
        text: "Oferta Especial atualizada com sucesso!",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao salvar alterações." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Deseja descartar as alterações não salvas?")) {
      setFormData(settings.specialOffer);
      setMessage(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Editar Oferta Especial
        </h1>
        {message && (
          <div
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtítulo (Texto Pequeno)
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                placeholder="Ex: Oferta Especial"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título Principal
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                placeholder="Ex: Air Jordan Edição Limitada"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                placeholder="Descreva a oferta..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link de Destino
              </label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                placeholder="/products/1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Texto do Botão
              </label>
              <input
                type="text"
                name="linkText"
                value={formData.linkText}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                placeholder="Ver Oferta"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagem do Produto
              </label>
              <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                      placeholder="https://... ou carregue uma imagem"
                    />
                    <label className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap">
                      <Upload className="w-5 h-5" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Recomendado: Imagem PNG com fundo transparente para melhor
                    efeito visual.
                  </p>
                </div>
                <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">Sem imagem</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 sticky bottom-4 bg-gray-100/80 backdrop-blur p-4 rounded-xl">
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
