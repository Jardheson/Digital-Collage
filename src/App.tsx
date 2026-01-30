import { useEffect, useState } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { PWAProvider, usePWA } from './context/PWAContext';
import { PWAUpdateManager } from './utils/pwaUpdateManager';
import { X } from 'lucide-react';
import './index.css';

import { Share, PlusSquare } from 'lucide-react';

const InstallPopup = () => {
  const { showInstallPrompt, installApp, hidePrompt, showManualInstall, closeManualInstall } = usePWA();

  if (showManualInstall) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm relative animate-scale-up overflow-hidden">
          <button 
            onClick={closeManualInstall}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col items-center text-center relative z-0">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
               <img src="/images/icons/logo-header.svg" alt="Logo" className="w-12 h-12 object-contain" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Instalar no iPhone
            </h3>
            <p className="text-gray-500 mb-8 text-sm">Siga os passos abaixo para instalar</p>
            
            <div className="w-full space-y-4 mb-8">
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl text-left transition-colors hover:bg-gray-100">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-blue-500">
                  <Share className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Passo 1</p>
                  <p className="text-sm text-gray-700 font-medium">Toque em <span className="text-blue-600 font-bold">Compartilhar</span></p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl text-left transition-colors hover:bg-gray-100">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-gray-700">
                  <PlusSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Passo 2</p>
                  <p className="text-sm text-gray-700 font-medium">Selecione <span className="font-bold">Início</span></p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl text-left transition-colors hover:bg-gray-100">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-gray-700">
                  <span className="font-bold text-lg">Add</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Passo 3</p>
                  <p className="text-sm text-gray-700 font-medium">Confirme em <span className="font-bold">Adicionar</span></p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={closeManualInstall}
              className="w-full bg-primary text-white font-bold py-3.5 px-6 rounded-xl hover:bg-pink-700 transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              Entendi
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative animate-scale-up">
        <button 
          onClick={hidePrompt}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 p-4 rounded-2xl mb-4">
            <img src="/images/icons/logo-header.svg" alt="Logo" className="w-16 h-16 object-contain" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Instale nosso App!
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Tenha a melhor experiência de compra, receba ofertas exclusivas e navegue offline.
          </p>
          
          <button 
            onClick={installApp}
            className="w-full bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-pink-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/30"
          >
            Instalar Aplicativo
          </button>
          
          <button 
            onClick={hidePrompt}
            className="mt-3 text-sm text-gray-500 font-medium hover:text-gray-800 transition-colors"
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [updateManager] = useState(() => new PWAUpdateManager());

  useEffect(() => {
    updateManager.init((update) => {
      if (update) {
        setHasUpdate(true);
      }
    });
  }, [updateManager]);

  const handleUpdate = () => {
    updateManager.activateUpdate();
  };

  return (
    <PWAProvider>
      <FavoritesProvider>
        <CartProvider>
          {hasUpdate && (
            <div className="fixed bottom-20 md:bottom-4 right-4 bg-primary text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-bounce">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold">Nova versão disponível!</p>
                  <p className="text-sm text-gray-100 mt-1">Atualize para aproveitar as melhores novidades.</p>
                </div>
                <button 
                  onClick={handleUpdate}
                  className="ml-4 bg-white text-primary px-4 py-2 rounded font-bold text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  Atualizar
                </button>
              </div>
            </div>
          )}
          <InstallPopup />
          <AppRoutes />
        </CartProvider>
      </FavoritesProvider>
    </PWAProvider>
  );
}

export default App;
