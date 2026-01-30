import React, { createContext, useContext, useEffect, useState } from 'react';

interface PWAContextValue {
  showInstallPrompt: boolean;
  installApp: () => Promise<void>;
  hidePrompt: () => void;
  showManualInstall: boolean;
  closeManualInstall: () => void;
}

const PWAContext = createContext<PWAContextValue | undefined>(undefined);

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showManualInstall, setShowManualInstall] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    if (isInstalled) {
      setShowInstallPrompt(false);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installApp = async () => {
    if (deferredPrompt) {
      // Android / Chrome / Edge
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    } else {
      // iOS / Safari / Firefox / Others
      setShowManualInstall(true);
    }
  };

  const hidePrompt = () => {
    setShowInstallPrompt(false);
  };

  const closeManualInstall = () => {
    setShowManualInstall(false);
  };

  return (
    <PWAContext.Provider value={{ 
      showInstallPrompt, 
      installApp, 
      hidePrompt,
      showManualInstall,
      closeManualInstall
    }}>
      {children}
    </PWAContext.Provider>
  );
};

export const usePWA = (): PWAContextValue => {
  const ctx = useContext(PWAContext);
  if (!ctx) throw new Error('usePWA must be used within PWAProvider');
  return ctx;
};
