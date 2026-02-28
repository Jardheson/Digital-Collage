import React, { createContext, useContext, useState, useEffect } from "react";

interface SiteSettings {
  siteName: string;
  logoUrl: string;
  footerLogoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    facebookIcon?: string;
    instagramIcon?: string;
    twitterIcon?: string;
  };
  slides: Slide[];
  categories: Category[];
  featuredCollections: FeaturedCollection[];
  specialOffer: SpecialOffer;
  authPages: AuthPages;
  orders: Order[];
  users: User[];
  pwa: PWASettings;
  footerNavigation: FooterLink[];
}

export interface FooterLink {
  id: string;
  label: string;
  path: string;
  visible: boolean;
  image?: string;
}

export interface PWASettings {
  enabled: boolean;
  showInFooter: boolean;
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  iconUrl: string;
  installBanner: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface AuthPages {
  login: {
    title: string;
    subtitle: string;
    image: string;
  };
  signup: {
    title: string;
    subtitle: string;
    image: string;
  };
  socialAuth: {
    text: string;
    gmailIcon: string;
    facebookIcon: string;
  };
}

export interface SpecialOffer {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
}

export interface FeaturedCollection {
  id: number;
  title: string;
  discount: number;
  image: string;
  link: string;
  linkText: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "Admin" | "Cliente";
  status: "Ativo" | "Inativo";
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: "Entregue" | "Enviado" | "Processando" | "Cancelado";
}

export interface Category {
  id: number;
  name: string;
  image: string;
  status: "Ativo" | "Inativo";
}

export interface Slide {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  image: string;
  link: string;
  buttonText: string;
}

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
}

const defaultSettings: SiteSettings = {
  siteName: "Digital Store",
  logoUrl: "/images/icons/logo-header.svg",
  footerLogoUrl: "/images/icons/logo-footer.svg",
  primaryColor: "#C92071",
  secondaryColor: "#B5B6F2",
  contactEmail: "contato@digitalstore.com",
  contactPhone: "(85) 3051-3411",
  address:
    "Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    facebookIcon: "/images/icons/Facebook.svg",
    instagramIcon: "/images/icons/Instagram.svg",
    twitterIcon: "/images/icons/Twitter.svg",
  },
  slides: [
    {
      id: 1,
      subtitle: "Melhores ofertas personalizadas",
      title: "Queima de estoque Nike 🔥",
      description:
        "Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.",
      image: "/images/slides/home-slide-1.jpeg",
      link: "/products",
      buttonText: "Ver Ofertas",
    },
    {
      id: 2,
      subtitle: "Coleção de Verão",
      title: "Novas Cores e Estilos ☀️",
      description:
        "Aproveite o verão com o melhor estilo. Conforto e design exclusivo para você.",
      image: "/images/slides/home-slide-2.jpeg",
      link: "/products",
      buttonText: "Ver Ofertas",
    },
    {
      id: 3,
      subtitle: "Lançamentos Exclusivos",
      title: "Tênis para Performance 🏃",
      description:
        "Tecnologia de ponta para seus treinos. Supere seus limites com a nova coleção.",
      image: "/images/slides/home-slide-3.jpeg",
      link: "/products",
      buttonText: "Comprar Agora",
    },
    {
      id: 4,
      subtitle: "Oferta Especial",
      title: "Descontos de até 50% 🏷️",
      description:
        "Não perca as últimas unidades com preços imperdíveis. Garanta já o seu.",
      image: "/images/slides/home-slide-4.jpeg",
      link: "/products",
      buttonText: "Conferir",
    },
  ],
  categories: [
    {
      id: 1,
      name: "Camisetas",
      image: "/images/icons/camiseta.svg",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Calças",
      image: "/images/icons/calca.svg",
      status: "Ativo",
    },
    {
      id: 3,
      name: "Bonés",
      image: "/images/icons/bone-_2_.svg",
      status: "Ativo",
    },
    {
      id: 4,
      name: "Headphones",
      image: "/images/icons/headphones.svg",
      status: "Ativo",
    },
    {
      id: 5,
      name: "Tênis",
      image: "/images/icons/tenis.svg",
      status: "Ativo",
    },
  ],
  featuredCollections: [
    {
      id: 1,
      title: "Novo drop Supreme",
      discount: 30,
      image: "/images/products/star-wars-storm.png",
      link: "/products",
      linkText: "Comprar",
    },
    {
      id: 2,
      title: "Coleção Adidas",
      discount: 30,
      image: "/images/icons/ddd 1.png",
      link: "/products?brand=Adidas",
      linkText: "Comprar",
    },
    {
      id: 3,
      title: "Novo Beats Bass",
      discount: 30,
      image: "/images/products/collection-3.png",
      link: "/products?category=Headphones",
      linkText: "Comprar",
    },
  ],
  specialOffer: {
    subtitle: "Oferta especial",
    title: "Air Jordan edição de colecionador",
    description:
      "Descubra o Air Jordan 1. O sneaker que une história e atitude para elevar o nível do seu rolê.",
    image: "/images/products/Laye 1.png",
    link: "/special-offer",
    linkText: "Ver Oferta",
  },
  authPages: {
    login: {
      title: "Acesse sua conta",
      subtitle: "Novo cliente? Então registre-se",
      image: "/images/products/produc-image-1-.png",
    },
    signup: {
      title: "Crie sua conta",
      subtitle: "Já possui uma conta? Entre",
      image: "/images/products/produc-image-4-.png",
    },
    socialAuth: {
      text: "Ou faça login com",
      gmailIcon: "/images/icons/gmail.svg",
      facebookIcon: "/images/icons/facebookk.svg",
    },
  },
  orders: [
    {
      id: "#12345",
      customer: "João da Silva",
      date: "04/02/2026",
      total: 499.9,
      status: "Entregue",
    },
    {
      id: "#12346",
      customer: "Maria Oliveira",
      date: "03/02/2026",
      total: 129.5,
      status: "Enviado",
    },
    {
      id: "#12347",
      customer: "Pedro Santos",
      date: "03/02/2026",
      total: 850.0,
      status: "Processando",
    },
    {
      id: "#12348",
      customer: "Ana Costa",
      date: "02/02/2026",
      total: 249.9,
      status: "Cancelado",
    },
    {
      id: "#12349",
      customer: "Carlos Pereira",
      date: "01/02/2026",
      total: 59.9,
      status: "Entregue",
    },
  ],
  users: [
    {
      id: 1,
      name: "João da Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      role: "Cliente",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Admin User",
      email: "admin@digitalstore.com",
      phone: "(11) 98888-8888",
      role: "Admin",
      status: "Ativo",
    },
    {
      id: 3,
      name: "Maria Oliveira",
      email: "maria@email.com",
      phone: "(21) 97777-7777",
      role: "Cliente",
      status: "Inativo",
    },
  ],
  pwa: {
    enabled: false,
    showInFooter: true, // Default to true
    name: "Digital Store",
    shortName: "Digital Store",
    description:
      "Sua loja online de roupas e acessórios com os melhores produtos",
    themeColor: "#C92071",
    backgroundColor: "#ffffff",
    iconUrl: "/images/icons/Logo-D.png",
    installBanner: {
      title: "Baixe o App Digital Store",
      description: "Melhor experiência e ofertas exclusivas",
      buttonText: "Baixar",
    },
  },
  footerNavigation: [
    { id: "1", label: "Sobre Digital Store", path: "/about", visible: true },
    { id: "2", label: "Segurança", path: "/security", visible: true },
    { id: "3", label: "Lista de Desejos", path: "/wishlist", visible: true },
    { id: "4", label: "Blog", path: "/blog", visible: true },
    { id: "5", label: "Trabalhe Conosco", path: "/career", visible: true },
    { id: "6", label: "Meus Pedidos", path: "/orders", visible: true },
    {
      id: "7",
      label: "Métodos de Pagamento",
      path: "/orders/payment-methods",
      visible: true,
    },
  ],
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const storedSettings = localStorage.getItem("siteSettings_v2");
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);

        const mergedSettings = {
          ...defaultSettings,
          ...parsedSettings,
          authPages: parsedSettings.authPages || defaultSettings.authPages,
          categories: parsedSettings.categories || defaultSettings.categories,
          featuredCollections:
            parsedSettings.featuredCollections ||
            defaultSettings.featuredCollections,
          specialOffer:
            parsedSettings.specialOffer || defaultSettings.specialOffer,
          primaryColor:
            parsedSettings.primaryColor || defaultSettings.primaryColor,
          secondaryColor:
            parsedSettings.secondaryColor || defaultSettings.secondaryColor,
          pwa: {
            ...defaultSettings.pwa,
            ...(parsedSettings.pwa || {}),
          },
          footerNavigation:
            parsedSettings.footerNavigation || defaultSettings.footerNavigation,
        };

        if (
          !parsedSettings.authPages ||
          !parsedSettings.secondaryColor ||
          !parsedSettings.pwa ||
          !parsedSettings.footerNavigation
        ) {
          localStorage.setItem(
            "siteSettings_v2",
            JSON.stringify(mergedSettings),
          );
        }
        return mergedSettings;
      }
    } catch (error) {
      console.error("Error parsing settings:", error);
    }

    localStorage.setItem("siteSettings_v2", JSON.stringify(defaultSettings));
    return defaultSettings;
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "siteSettings_v2" && e.newValue) {
        setSettings(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("siteSettings_v2", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
