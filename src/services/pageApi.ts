import type { Page } from "../types/Page";

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/v1';

export const getPages = async (): Promise<Page[]> => {
  try {
    const storedPages = localStorage.getItem("pages_v1");
    if (storedPages) {
      return JSON.parse(storedPages);
    }

    const defaultPages: Page[] = [
      {
        id: 1,
        title: "Sobre Digital Store",
        slug: "about",
        section: "info",
        is_active: true,
        content: `
          <h2>Quem somos</h2>
          <p>Somos a sua loja online especializada em moda urbana e lifestyle. Com uma curadoria cuidadosa dos melhores produtos, trazemos as últimas tendências diretamente para você.</p>
          <h3>Nossa Missão</h3>
          <p>Democratizar o acesso à moda urbana de qualidade, conectando pessoas com produtos que expressam sua personalidade e estilo de vida único.</p>
        `,
        image_url:
          "https://images.unsplash.com/photo-1556906781-9a412961d289?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Segurança e Privacidade",
        slug: "security",
        section: "info",
        is_active: true,
        content: `
          <h2>Sua segurança é nossa prioridade</h2>
          <p>A Digital Store utiliza tecnologia de ponta para garantir que seus dados estejam sempre seguros.</p>
          <ul>
            <li>Certificado SSL em todas as páginas</li>
            <li>Pagamentos processados por gateways seguros</li>
            <li>Seus dados pessoais nunca são compartilhados</li>
          </ul>
        `,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: "Trabalhe Conosco",
        slug: "career",
        section: "info",
        is_active: true,
        content: `
          <h2>Faça parte do nosso time</h2>
          <p>Estamos sempre em busca de talentos que compartilham nossa paixão por moda e tecnologia.</p>
          <p>Envie seu currículo para <strong>carreiras@digitalstore.com</strong></p>
        `,
        image_url:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 4,
        title: "Blog",
        slug: "blog",
        section: "blog",
        is_active: true,
        content: `
          <h2>Tendências de Verão 2026</h2>
          <p>Descubra o que vai bombar na próxima estação. Cores vibrantes, tecidos leves e muito estilo.</p>
          <hr />
          <h2>Sneaker Culture</h2>
          <p>A história por trás dos tênis mais icônicos do mundo e como eles mudaram a moda urbana.</p>
        `,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 5,
        title: "Wishlist",
        slug: "wishlist",
        section: "info",
        is_active: true,
        content: `
          <h2>Sua Lista de Desejos</h2>
          <p>Salve seus produtos favoritos para comprar depois. Não perca nenhuma oferta especial dos itens que você ama.</p>
          <p>Crie uma conta para sincronizar sua wishlist em todos os dispositivos.</p>
        `,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 6,
        title: "Meus Pedidos",
        slug: "orders",
        section: "info",
        is_active: true,
        content: `
          <h2>Acompanhe seus pedidos</h2>
          <p>Veja o histórico completo de suas compras, rastreie entregas e gerencie devoluções em um só lugar.</p>
        `,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 7,
        title: "Métodos de Pagamento",
        slug: "payment-methods",
        section: "info",
        is_active: true,
        content: `
          <h2>Formas de Pagamento Aceitas</h2>
          <p>Aceitamos as principais bandeiras de cartão de crédito, PIX e boleto bancário.</p>
          <ul>
            <li>Cartão de Crédito (até 12x sem juros)</li>
            <li>PIX (5% de desconto)</li>
            <li>Boleto Bancário</li>
          </ul>
        `,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem("pages_v1", JSON.stringify(defaultPages));
    return defaultPages;
  } catch (error) {
    console.error("Mock fetch error:", error);
    return [];
  }
};

export const getPage = async (idOrSlug: string | number): Promise<Page> => {
  const pages = await getPages();
  const page = pages.find(
    (p) => String(p.id) === String(idOrSlug) || p.slug === idOrSlug,
  );
  if (!page) throw new Error("Page not found");
  return page;
};

export const createPage = async (pageData: Partial<Page>): Promise<Page> => {
  const pages = await getPages();
  const newPage: Page = {
    id: Date.now(),
    title: pageData.title || "Sem título",
    slug: pageData.slug || `page-${Date.now()}`,
    content: pageData.content || "",
    section: pageData.section || "info",
    is_active: pageData.is_active ?? true,
    image_url: pageData.image_url,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedPages = [...pages, newPage];
  localStorage.setItem("pages_v1", JSON.stringify(updatedPages));
  return newPage;
};

export const updatePage = async (
  id: number,
  pageData: Partial<Page>,
): Promise<Page> => {
  const pages = await getPages();
  const index = pages.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Page not found");

  const updatedPage = {
    ...pages[index],
    ...pageData,
    updatedAt: new Date().toISOString(),
  };

  pages[index] = updatedPage;
  localStorage.setItem("pages_v1", JSON.stringify(pages));
  return updatedPage;
};

export const deletePage = async (id: number): Promise<void> => {
  const pages = await getPages();
  const filteredPages = pages.filter((p) => p.id !== id);
  localStorage.setItem("pages_v1", JSON.stringify(filteredPages));
};
