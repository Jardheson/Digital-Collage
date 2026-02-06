export interface Product {
  id: number;
  name: string;
  slug?: string;
  category: string;
  brand: string;
  price: number;
  priceDiscount?: number;
  rating: number;
  images: string[];
  description: string;
  gender: "Masculino" | "Feminino" | "Unisex";
  state: "Novo" | "Usado";
  colors?: string[];
  sizes?: string[];
  technicalSpecs?: {
    gender?: string;
    indicatedFor?: string;
    height?: string;
    material?: string;
    sole?: string;
    weight?: string;
    warranty?: string;
    origin?: string;
    [key: string]: string | undefined;
  };
}

export interface FilterOptions {
  brand?: string[];
  category?: string[];
  gender?: string[];
  state?: string[];
  sort?: string;
}
