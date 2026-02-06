import React from "react";
import { usePWA } from "../../context/PWAContext";
import { Download, Share, PlusSquare, Monitor } from "lucide-react";

export const InstallPage: React.FC = () => {
  const { installApp, showInstallPrompt } = usePWA();

  return (
    <div className="bg-light-gray min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <img
                src="/images/icons/logo-header.svg"
                alt="Logo"
                className="w-12 h-12"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Instale o App Digital Store
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              Tenha a melhor experiência de compra diretamente no seu
              dispositivo. Acesso rápido, ofertas exclusivas e funcionamento
              offline.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Monitor className="text-primary" />
                Android & Desktop
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Para dispositivos Android e computadores (Chrome/Edge), clique
                no botão abaixo para instalar.
              </p>

              {showInstallPrompt ? (
                <button
                  onClick={installApp}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-bold hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Instalar Agora
                </button>
              ) : (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-medium">
                  O app já está instalado ou seu navegador não suporta
                  instalação automática.
                  <br />
                  <span className="text-xs font-normal mt-2 block text-gray-600">
                    Procure pelo ícone de instalação na barra de endereço do
                    navegador.
                  </span>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg"
                  alt="Apple"
                  className="w-5 h-5"
                />
                iOS (iPhone/iPad)
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                No iOS, a instalação é feita através do menu de compartilhamento
                do Safari.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-primary font-bold">
                    1
                  </div>
                  <p className="text-sm text-gray-600 pt-1">
                    Toque no botão <Share className="w-4 h-4 inline mx-1" />{" "}
                    <strong>Compartilhar</strong> na barra inferior do Safari.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-primary font-bold">
                    2
                  </div>
                  <p className="text-sm text-gray-600 pt-1">
                    Role para baixo e toque em{" "}
                    <PlusSquare className="w-4 h-4 inline mx-1" />{" "}
                    <strong>Adicionar à Tela de Início</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-primary font-bold">
                    3
                  </div>
                  <p className="text-sm text-gray-600 pt-1">
                    Confirme tocando em <strong>Adicionar</strong> no canto
                    superior direito.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
