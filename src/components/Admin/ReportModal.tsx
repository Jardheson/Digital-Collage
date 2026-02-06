import React, { useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import {
  generatePDF,
  generateExcel,
  generateCSV,
  type ReportType,
} from "../../utils/reportGenerator";
import { getProducts } from "../../services/api";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { settings } = useSettings();
  const [format, setFormat] = useState<"pdf" | "excel" | "csv">("pdf");
  const [type, setType] = useState<ReportType>("sales");
  const [period, setPeriod] = useState("last-30");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const products = type === "products" ? await getProducts() : [];

      const reportData = {
        orders: settings.orders || [],
        users: settings.users || [],
        products: products,
        period: period === "all" ? "Todo o período" : "Últimos 30 dias",
        type: type,
      };

      switch (format) {
        case "pdf":
          generatePDF(reportData);
          break;
        case "excel":
          generateExcel(reportData);
          break;
        case "csv":
          generateCSV(reportData);
          break;
      }
      onClose();
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Erro ao gerar relatório. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-pink-600 p-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Exportar Relatório
          </h3>
          <p className="text-pink-100 text-sm mt-1">
            Selecione o tipo, formato e o período desejado
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Relatório
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setType("sales")}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  type === "sales"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-100 hover:border-purple-200 text-gray-600"
                }`}
              >
                <span className="font-bold text-sm mb-1">Vendas</span>
              </button>

              <button
                type="button"
                onClick={() => setType("products")}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  type === "products"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-100 hover:border-orange-200 text-gray-600"
                }`}
              >
                <span className="font-bold text-sm mb-1">Produtos</span>
              </button>

              <button
                type="button"
                onClick={() => setType("customers")}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  type === "customers"
                    ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                    : "border-gray-100 hover:border-cyan-200 text-gray-600"
                }`}
              >
                <span className="font-bold text-sm mb-1">Clientes</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Formato do Arquivo
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormat("pdf")}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  format === "pdf"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-100 hover:border-red-200 text-gray-600"
                }`}
              >
                <span className="font-bold text-lg mb-1">PDF</span>
                <span className="text-xs">Documento</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat("excel")}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  format === "excel"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-100 hover:border-green-200 text-gray-600"
                }`}
              >
                <span className="font-bold text-lg mb-1">XLSX</span>
                <span className="text-xs">Excel</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat("csv")}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  format === "csv"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-100 hover:border-blue-200 text-gray-600"
                }`}
              >
                <span className="font-bold text-lg mb-1">CSV</span>
                <span className="text-xs">Dados Puros</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Período dos Dados
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 p-2.5 bg-gray-50"
            >
              <option value="last-30">Últimos 30 dias</option>
              <option value="last-90">Últimos 3 meses</option>
              <option value="this-year">Este ano</option>
              <option value="all">Todo o histórico</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-pink-700 transition-colors font-medium text-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Gerando...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Baixar Relatório
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
