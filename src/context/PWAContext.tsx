import React, { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "./SettingsContext";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAContextValue {
  showInstallPrompt: boolean;
  installApp: () => Promise<void>;
  hidePrompt: () => void;
}

const PWAContext = createContext<PWAContextValue | undefined>(undefined);

declare global {
  interface Window {
    deferredPrompt: BeforeInstallPromptEvent | null;
  }
}

export const PWAProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      const promptEvent = e as BeforeInstallPromptEvent;
      promptEvent.preventDefault();
      setDeferredPrompt(promptEvent);

      if (
        !window.matchMedia("(display-mode: standalone)").matches &&
        settings.pwa.enabled
      ) {
        setShowInstallPrompt(true);
      }
    };

    if (window.deferredPrompt) {
      handleBeforeInstallPrompt(window.deferredPrompt);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
  }, [settings.pwa.enabled]);

  // Effect to handle toggle change when prompt is already deferred
  useEffect(() => {
    if (deferredPrompt && !window.matchMedia("(display-mode: standalone)").matches) {
      if (settings.pwa.enabled) {
        setShowInstallPrompt(true);
      } else {
        setShowInstallPrompt(false);
      }
    }
  }, [settings.pwa.enabled, deferredPrompt]);

  const installApp = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    setShowInstallPrompt(false);
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
  if (!ctx) throw new Error("usePWA must be used within PWAProvider");
  return ctx;
};
