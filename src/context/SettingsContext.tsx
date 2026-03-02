import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../services/supabase";

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
  refreshSettings: () => Promise<void>;
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
  slides: [],
  categories: [],
  featuredCollections: [],
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
  orders: [],
  users: [],
  pwa: {
    enabled: false,
    showInFooter: true,
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
        return { ...defaultSettings, ...JSON.parse(storedSettings) };
      }
    } catch (error) {
      console.error("Error parsing settings:", error);
    }
    return defaultSettings;
  });

  const fetchSupabaseData = async () => {
    try {
      // Fetch Categories
      const { data: categories } = await supabase
        .from("categories")
        .select("*")
        .order("id", { ascending: true });

      // Fetch Slides
      const { data: slides } = await supabase
        .from("slides")
        .select("*")
        .order("created_at", { ascending: true });

      // Fetch Featured Collections
      const { data: collections } = await supabase
        .from("featured_collections")
        .select("*")
        .order("created_at", { ascending: true });

      setSettings((prev) => {
        const newSettings = {
          ...prev,
          categories: categories || prev.categories,
          slides: slides?.map((s: any) => ({
             id: s.id,
             subtitle: s.subtitle,
             title: s.title,
             description: s.description,
             image: s.image,
             link: s.link,
             buttonText: s.button_text
          })) || prev.slides,
          featuredCollections: collections?.map((c: any) => ({
             id: c.id,
             title: c.title,
             discount: c.discount,
             image: c.image,
             link: c.link,
             linkText: c.link_text
          })) || prev.featuredCollections,
        };
        localStorage.setItem("siteSettings_v2", JSON.stringify(newSettings));
        return newSettings;
      });
    } catch (error) {
      console.error("Error fetching settings from Supabase:", error);
    }
  };

  useEffect(() => {
    fetchSupabaseData();
  }, []);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("siteSettings_v2", JSON.stringify(updated));
      return updated;
    });
  };

  const refreshSettings = async () => {
    await fetchSupabaseData();
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, refreshSettings }}>
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
