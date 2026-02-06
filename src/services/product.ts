import { API_URL } from "./config";
import type { Product } from "../types/Product";

const formatProductImage = (product: any): Product => {
  const images = Array.isArray(product.images)
    ? product.images
        .map((img: any) => {
          if (typeof img === "string") return img;
          return img.path || img.content || img.url || "";
        })
        .filter(Boolean)
    : [];

  let colors: string[] = product.colors || [];
  let sizes: string[] = product.sizes || [];

  if (product.options && Array.isArray(product.options)) {
    product.options.forEach((opt: any) => {
      if (opt.title === "Cor" || opt.type === "color") {
        colors = opt.values.split(",");
      }
      if (opt.title === "Tamanho") {
        sizes = opt.values.split(",");
      }
    });
  }

  return {
    ...product,
    images: images.length > 0 ? images : ["/images/products/placeholder.png"],
    priceDiscount: product.price_with_discount ?? product.priceDiscount,
    category: product.categories?.[0]?.name || product.category || "Geral",
    colors,
    sizes,
    technicalSpecs: product.technical_specs || product.technicalSpecs || {},
  };
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/product/search?limit=100`);
    if (response.ok) {
      const data = await response.json();
      const productsList = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data)
          ? data
          : [];
      const formatted = productsList.map(formatProductImage);

      localStorage.setItem("products_db", JSON.stringify(formatted));
      return formatted;
    }
  } catch (error) {
    console.warn("Backend indisponível, tentando cache local:", error);
  }

  const localProducts = localStorage.getItem("products_db");
  if (localProducts) {
    const parsed = JSON.parse(localProducts);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  }

  try {
    const response = await fetch(`/db.json?t=${new Date().getTime()}`);
    if (!response.ok) throw new Error("Erro ao carregar mock local");
    const data = await response.json();
    const products = Array.isArray(data) ? data : data.products || [];
    const formatted = products.map(formatProductImage);

    localStorage.setItem("products_db", JSON.stringify(formatted));
    return formatted;
  } catch (mockError) {
    console.error(
      "Erro crítico: Não foi possível carregar produtos.",
      mockError,
    );
    return [];
  }
};

export const saveProduct = async (product: Product) => {
  const slug =
    product.slug ||
    product.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const backendPayload = {
    ...product,
    slug,
    price_with_discount: product.priceDiscount,
    technical_specs: product.technicalSpecs,
    options: [
      {
        title: "Cor",
        type: "color",
        shape: "circle",
        values: product.colors ? product.colors.join(",") : "",
      },
      {
        title: "Tamanho",
        type: "text",
        shape: "square",
        values: product.sizes ? product.sizes.join(",") : "",
      },
    ],
  };

  try {
    const token = localStorage.getItem("token");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const method = product.id ? "PUT" : "POST";
    const url = product.id
      ? `${API_URL}/product/${product.id}`
      : `${API_URL}/product`;

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(backendPayload),
    });

    if (response.ok) {
      const savedProduct = await response.json();
      saveProductLocal(savedProduct);
      return savedProduct;
    }
  } catch (error) {
    console.warn("Erro ao salvar na API, salvando apenas localmente:", error);
  }

  return saveProductLocal(product);
};

export const deleteProduct = async (id: string | number) => {
  try {
    const token = localStorage.getItem("token");
    const headers: HeadersInit = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    await fetch(`${API_URL}/product/${id}`, {
      method: "DELETE",
      headers,
    });
  } catch (error) {
    console.warn("Erro ao deletar na API, deletando apenas localmente:", error);
  }

  deleteProductLocal(id);
};

export const saveProductLocal = (product: Product) => {
  const products = JSON.parse(localStorage.getItem("products_db") || "[]");
  const index = products.findIndex(
    (p: Product) => String(p.id) === String(product.id),
  );

  if (index >= 0) {
    products[index] = product;
  } else {
    if (!product.id) product.id = Date.now();
    products.push(product);
  }

  localStorage.setItem("products_db", JSON.stringify(products));
  return product;
};

export const deleteProductLocal = (id: string | number) => {
  const products = JSON.parse(localStorage.getItem("products_db") || "[]");
  const filtered = products.filter((p: Product) => String(p.id) !== String(id));
  localStorage.setItem("products_db", JSON.stringify(filtered));
};

export const getProductById = async (
  id: string | number,
): Promise<Product | undefined> => {
  try {
    const response = await fetch(`${API_URL}/product/${id}`);
    if (response.ok) {
      const data = await response.json();
      return formatProductImage(data);
    }
  } catch (error) {
    console.warn(`Erro ao buscar produto ${id} no backend, tentando mock.`);
  }

  const products = await getProducts();
  return products.find((p) => String(p.id) === String(id));
};
