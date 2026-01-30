import { useEffect, useState } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { PWAProvider, usePWA } from './context/PWAContext';
import { PWAUpdateManager } from './utils/pwaUpdateManager';
import { X } from 'lucide-react';
import './index.css';

const InstallPopup = () => {
  const { showInstallPrompt, installApp, hidePrompt } = usePWA();

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
