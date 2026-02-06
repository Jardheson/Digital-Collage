import React, { useEffect } from "react";
import { useSettings } from "../../context/SettingsContext";

export const ThemeSync: React.FC = () => {
  const { settings } = useSettings();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", settings.primaryColor);
    root.style.setProperty("--color-secondary", settings.secondaryColor);
  }, [settings.primaryColor, settings.secondaryColor]);

  return null;
};
