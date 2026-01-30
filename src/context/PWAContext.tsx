import React, { createContext, useContext, useEffect, useState } from 'react';

interface PWAContextValue {
  showInstallPrompt: boolean;
  installApp: () => Promise<void>;
  hidePrompt: () => void;
}

const PWAContext = createContext<PWAContextValue | undefined>(undefined);

export const PWAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Also check if already installed to not show
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallPrompt(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const hidePrompt = () => {
    setShowInstallPrompt(false);
  };

  return (
    <PWAContext.Provider value={{ showInstallPrompt, installApp, hidePrompt }}>
      {children}
    </PWAContext.Provider>
  );
};

export const usePWA = (): PWAContextValue => {
  const ctx = useContext(PWAContext);
  if (!ctx) throw new Error('usePWA must be used within PWAProvider');
  return ctx;
};
