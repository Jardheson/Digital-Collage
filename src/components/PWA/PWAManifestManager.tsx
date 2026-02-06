import React, { useEffect } from "react";
import { useSettings } from "../../context/SettingsContext";

export const PWAManifestManager: React.FC = () => {
  const { settings } = useSettings();

  if (!settings || !settings.pwa) return null;

  const { pwa } = settings;

  useEffect(() => {
    if (!pwa?.enabled) return;

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", pwa.themeColor);
    } else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = pwa.themeColor;
      document.head.appendChild(meta);
    }

    const manifest = {
      name: pwa.name,
      short_name: pwa.shortName,
      description: pwa.description,
      theme_color: pwa.themeColor,
      background_color: pwa.backgroundColor,
      display: "standalone",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: pwa.iconUrl || "/images/icons/Logo-D.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: pwa.iconUrl || "/images/icons/Logo-D.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    };

    const stringManifest = JSON.stringify(manifest);
    const blob = new Blob([stringManifest], { type: "application/json" });
    const manifestURL = URL.createObjectURL(blob);

    const linkTag = document.querySelector(
      'link[rel="manifest"]',
    ) as HTMLLinkElement;
    if (linkTag) {
      linkTag.href = manifestURL;
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "manifest";
      newLink.href = manifestURL;
      document.head.appendChild(newLink);
    }

    return () => {
      URL.revokeObjectURL(manifestURL);
    };
  }, [pwa]);

  return null;
};
