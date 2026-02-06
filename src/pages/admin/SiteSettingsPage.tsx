import React, { useState, useEffect } from "react";
import { Save, RefreshCw, Upload, Trash2 } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";

export const SiteSettingsPage: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (JSON.stringify(formData) !== JSON.stringify(settings)) {
        updateSettings(formData);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData, settings, updateSettings]);

  useEffect(() => {
    if (JSON.stringify(formData) !== JSON.stringify(settings)) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => {
        const parentKey = parent as keyof typeof prev;
        const parentValue = prev[parentKey] as Record<string, string>;

        return {
          ...prev,
          [parent]: {
            ...parentValue,
            [child]: value,
          },
        };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldPath: string,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const value = reader.result as string;

        if (fieldPath.includes(".")) {
          const [parent, child] = fieldPath.split(".");
          setFormData((prev) => {
            const parentData = prev[parent as keyof typeof prev] as any;
            return {
              ...prev,
              [parent]: {
                ...parentData,
                [child]: value,
              },
            };
          });
        } else {
          setFormData((prev) => ({ ...prev, [fieldPath]: value }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (fieldPath: string) => {
    if (fieldPath.includes(".")) {
      const [parent, child] = fieldPath.split(".");
      setFormData((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parentData = prev[parent as keyof typeof prev] as any;
        return {
          ...prev,
          [parent]: {
            ...parentData,
            [child]: "",
          },
        };
      });
    } else {
      setFormData((prev) => ({ ...prev, [fieldPath]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      updateSettings(formData);
      setMessage({
        type: "success",
        text: "Configurações salvas com sucesso!",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao salvar configurações." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Deseja descartar as alterações não salvas?")) {
      setFormData(settings);
      setMessage(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Configurações do Site
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
          <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-2">
            Identidade Visual
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Site
              </label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cor Primária
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="h-10 w-20 p-1 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071] uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cor Secundária
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="secondaryColor"
                  value={formData.secondaryColor}
                  onChange={handleChange}
                  className="h-10 w-20 p-1 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  name="secondaryColor"
                  value={formData.secondaryColor}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071] uppercase"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo do Header
              </label>
              <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="logoUrl"
                      value={formData.logoUrl}
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
                        onChange={(e) => handleFileUpload(e, "logoUrl")}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Exibido no cabeçalho do site. Recomendado: PNG transparente.
                  </p>
                </div>
                <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-lg flex flex-col items-center justify-center overflow-hidden shrink-0 relative group">
                  {formData.logoUrl ? (
                    <>
                      <img
                        src={formData.logoUrl}
                        alt="Preview"
                        className="w-full h-full object-contain p-1"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage("logoUrl")}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remover imagem"
                      >
                        <Trash2 className="w-6 h-6 text-white" />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400">Sem logo</span>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo do Footer
              </label>
              <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="footerLogoUrl"
                      value={formData.footerLogoUrl || ""}
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
                        onChange={(e) => handleFileUpload(e, "footerLogoUrl")}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Exibido no rodapé do site.
                  </p>
                </div>
                <div className="w-20 h-20 bg-dark border border-gray-600 rounded-lg flex items-center justify-center overflow-hidden shrink-0 relative group">
                  {formData.footerLogoUrl ? (
                    <>
                      <img
                        src={formData.footerLogoUrl}
                        alt="Preview Footer"
                        className="w-full h-full object-contain p-1"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage("footerLogoUrl")}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remover imagem"
                      >
                        <Trash2 className="w-6 h-6 text-white" />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400">Sem logo</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-2">
            Informações de Contato
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email de Contato
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endereço Completo
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-2">
            Redes Sociais
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-gray-50 pb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook URL
                </label>
                <input
                  type="text"
                  name="socialLinks.facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ícone
                </label>
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden">
                    {formData.socialLinks.facebookIcon ? (
                      <img
                        src={formData.socialLinks.facebookIcon}
                        alt="FB"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">Icon</span>
                    )}
                  </div>
                  <label className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-xs font-bold text-gray-700">
                    Alterar
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, "socialLinks.facebookIcon")
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-gray-50 pb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram URL
                </label>
                <input
                  type="text"
                  name="socialLinks.instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ícone
                </label>
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden">
                    {formData.socialLinks.instagramIcon ? (
                      <img
                        src={formData.socialLinks.instagramIcon}
                        alt="IG"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">Icon</span>
                    )}
                  </div>
                  <label className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-xs font-bold text-gray-700">
                    Alterar
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, "socialLinks.instagramIcon")
                      }
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter URL
                </label>
                <input
                  type="text"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ícone
                </label>
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden">
                    {formData.socialLinks.twitterIcon ? (
                      <img
                        src={formData.socialLinks.twitterIcon}
                        alt="TW"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">Icon</span>
                    )}
                  </div>
                  <label className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-xs font-bold text-gray-700">
                    Alterar
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, "socialLinks.twitterIcon")
                      }
                    />
                  </label>
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
