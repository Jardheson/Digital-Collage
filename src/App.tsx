import { useEffect, useState } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { PWAProvider, usePWA } from './context/PWAContext';
import { PWAUpdateManager } from './utils/pwaUpdateManager';
import { Download, X } from 'lucide-react';
import './index.css';

const InstallBanner = () => {
  const { showInstallPrompt, installApp, hidePrompt } = usePWA();

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-50 md:hidden animate-slide-up">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-2 rounded-lg shrink-0">
          <img src="/logo-header.svg" alt="Logo" className="w-8 h-8 object-contain" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-sm">Baixe o App Digital Store</h3>
          <p className="text-xs text-gray-500">Melhor experiência e ofertas exclusivas</p>
        </div>
        <button 
          onClick={installApp}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap hover:bg-pink-700 transition-colors"
        >
          Baixar
        </button>
        <button 
          onClick={hidePrompt}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>
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
          <InstallBanner />
          <AppRoutes />
        </CartProvider>
      </FavoritesProvider>
    </PWAProvider>
  );
}

export default App;
