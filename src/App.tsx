import { useEffect, useState } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { PWAProvider, usePWA } from "./context/PWAContext";
import { PWAUpdateManager } from "./utils/pwaUpdateManager";
import { SplashScreen } from "./components/UI/SplashScreen";
import { X, WifiOff } from "lucide-react";
import { useSettings, SettingsProvider } from "./context/SettingsContext";
import "./index.css";

const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="bg-gray-800 text-white text-center py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 animate-pulse">
      <WifiOff className="w-4 h-4" />
      Você está offline. Algumas funcionalidades podem estar limitadas.
    </div>
  );
};

const InstallBanner = () => {
  const { showInstallPrompt, installApp, hidePrompt } = usePWA();
  const { settings } = useSettings();
  const { pwa } = settings;

  if (!showInstallPrompt || !pwa.enabled) return null;

  return (
    <div className="fixed bottom-[80px] left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-50 md:hidden animate-slide-up safe-area-bottom">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-2 rounded-lg shrink-0">
          <img
            src={pwa.iconUrl || settings.logoUrl}
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-sm">
            {pwa.installBanner.title}
          </h3>
          <p className="text-xs text-gray-500">
            {pwa.installBanner.description}
          </p>
        </div>
        <button
          onClick={installApp}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap hover:bg-pink-700 transition-colors"
        >
          {pwa.installBanner.buttonText}
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
  const [isLoading, setIsLoading] = useState(true);
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
    <>
      {isLoading && <SplashScreen onFinish={() => setIsLoading(false)} />}
      <SettingsProvider>
        <PWAProvider>
          <FavoritesProvider>
            <CartProvider>
              {hasUpdate && (
                <div className="fixed bottom-20 md:bottom-4 right-4 bg-primary text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-bounce">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold">Nova versão disponível!</p>
                      <p className="text-sm text-gray-100 mt-1">
                        Atualize para aproveitar as melhores novidades.
                      </p>
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
              <OfflineBanner />
              <div
                className={`${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-700"}`}
              >
                <AppRoutes />
              </div>
            </CartProvider>
          </FavoritesProvider>
        </PWAProvider>
      </SettingsProvider>
    </>
  );
}

export default App;
