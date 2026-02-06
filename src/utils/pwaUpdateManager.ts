import { registerSW } from "virtual:pwa-register";

// Gerenciador de atualização do PWA usando vite-plugin-pwa
export class PWAUpdateManager {
  private updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined;

  // Inicializar o gerenciador
  init(onUpdateAvailable?: (hasUpdate: boolean) => void) {
    this.updateSW = registerSW({
      onNeedRefresh() {
        if (onUpdateAvailable) {
          onUpdateAvailable(true);
        }
      },
      onOfflineReady() {
        // App ready for offline use
      },
      onRegisterError(error) {
        console.error("Erro ao registrar Service Worker:", error);
      },
    });
  }

  // Ativar nova versão (recarregar página)
  activateUpdate() {
    if (this.updateSW) {
      this.updateSW(true);
    }
  }

  // Obter informações (simplificado para compatibilidade)
  getInfo() {
    return {
      isRegistered: true, // vite-plugin-pwa gerencia isso
    };
  }
}
