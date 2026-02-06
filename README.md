# 🛍️ Digital Store (Digital Collage)

> **Architected & Developed by Jardheson Oliveira**

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📖 Visão Geral do Projeto

O **Digital Store** é uma plataforma de e-commerce moderna, robusta e escalável, desenvolvida como uma **Progressive Web Application (PWA)**. O projeto foca em oferecer uma experiência de usuário (UX) fluida, performance de alto nível e uma arquitetura de código limpa e modular.

Este frontend foi construído seguindo os princípios de **Clean Architecture** adaptados para o ecossistema React, garantindo separação de responsabilidades, facilidade de manutenção e testabilidade.

---

## 🎨 Interface e Layout

A interface foi projetada com foco em usabilidade e conversão, utilizando uma paleta de cores vibrante (Rosa Magenta #C92071) para CTAs e tipografia clara para hierarquia de informações.

### � Mobile View
Experiência otimizada para dispositivos móveis com navegação simplificada e elementos de toque amigáveis.

<img width="250" height="500" alt="iPhone-XR-2018-traefbx94igd vercel app" src="https://github.com/user-attachments/assets/d458a7ab-1c6d-4bae-8b48-afd7dfa735d0" />

**Destaques da Interface Mobile:**
*   **Cabeçalho:** Menu hambúrguer acessível, busca rápida e carrinho sempre visível.

*   **Banner Promocional:** Destaque visual com imagem de produto (ex: Sapato Oxford Verde) e copy persuasiva ("Queima de estoque Nike 🔥").
*   **Navegação Inferior (Tab Bar):** Acesso rápido às seções principais: Home (ativo em Rosa), Buscar, Favoritos, Carrinho e Perfil.
*   **Identidade Visual:** Uso estratégico da cor primária (Rosa Magenta) para indicar estado ativo e ações principais.

### 💻 Desktop View
Layout responsivo que aproveita o espaço de tela para exibir mais informações e facilitar a navegação por categorias.

<img width="3797" height="1816" alt="Captura de tela 2026-02-06 102523" src="https://github.com/user-attachments/assets/7ab08f3b-a719-43a6-833f-c3137c3b6986" />

**Destaques da Interface Desktop:**
*   **Cabeçalho Expandido:** Barra de busca centralizada, acesso direto a "Minha Conta" e "Meus Pedidos".
*   **Menu de Navegação:** Abas claras para Home, Produtos e Categorias com indicador de página ativa (sublinhado rosa).
*   **Hero Section Imersiva:** Layout em grid com texto à esquerda e imagem à direita, criando um fluxo de leitura natural em "Z".
*   **Elementos de Conversão:** Botão "Ver Ofertas" com alto contraste e posicionamento estratégico acima da dobra.

---

## ♿ Acessibilidade

O projeto foi desenvolvido seguindo as diretrizes WCAG (Web Content Accessibility Guidelines) para garantir que a plataforma seja utilizável por todas as pessoas, independentemente de suas habilidades.

### Principais Recursos Implementados
*   **Navegação Semântica**: Estrutura HTML correta (`<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`) para facilitar a navegação por leitores de tela.
*   **Gerenciamento de Foco**: Foco visível e ordem lógica de tabulação para navegação via teclado.
*   **Labels e Descrições**: Todos os campos de formulário possuem labels associados (`htmlFor` + `id`) e botões de ícone possuem `aria-label` descritivos.
*   **Contraste de Cores**: A paleta de cores foi testada para garantir legibilidade (ex: texto branco sobre fundo Rosa Magenta #C92071 passa nos critérios AA).
*   **Imagens Acessíveis**: Atributos `alt` descritivos em imagens de conteúdo e `alt=""` em imagens decorativas.
*   **Responsividade**: Layout fluido que se adapta a diferentes tamanhos de tela e níveis de zoom sem perda de funcionalidade.

---

## 🎛️ Painel Administrativo (Backoffice)

O projeto inclui um **CMS completo** para gerenciamento da loja, permitindo que administradores controlem produtos, pedidos e conteúdo do site sem necessidade de alterar código.

### Funcionalidades do Admin
*   **Dashboard**: Visão geral de métricas e indicadores.
*   **Catálogo**:
    *   Gerenciamento de Produtos (CRUD completo com variações de cor/tamanho).
    *   Gestão de Categorias e Coleções.
    *   Moderação de Avaliações (Reviews).
*   **Vendas**: Visualização e alteração de status de pedidos.
*   **Gestão de Conteúdo (CMS)**:
    *   Editor de Páginas Institucionais (Sobre, Políticas).
    *   Gerenciamento de Banners (Carrossel da Home).
    *   Configuração de Ofertas Especiais e Coleções em Destaque.
    *   Links do Rodapé.
*   **Configurações**:
    *   Personalização de temas e identidade visual.
    *   Configurações de PWA (ícones, nome do app).
    *   Ajustes de páginas de autenticação.

---

## 🚀 Tecnologias e Ferramentas

O projeto utiliza um stack tecnológico de ponta, focado em performance e produtividade:

### Core
*   **[React 18](https://reactjs.org/)**: Biblioteca para construção de interfaces reativas.
*   **[TypeScript](https://www.typescriptlang.org/)**: Superset JavaScript para tipagem estática e segurança de código.
*   **[Vite](https://vitejs.dev/)**: Build tool de próxima geração para desenvolvimento rápido e bundles otimizados.

### Estilização e UI
*   **[Tailwind CSS](https://tailwindcss.com/)**: Framework utility-first para estilização rápida e responsiva.
*   **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones leve e consistente.

### Gerenciamento de Estado e Rotas
*   **[React Router DOM](https://reactrouter.com/)**: Gerenciamento de rotas client-side (SPA).
*   **Context API**: Gerenciamento de estado global (Carrinho, Autenticação, Configurações).

### Integrações e Serviços
*   **Firebase/Supabase**: Integração para autenticação e banco de dados (Backend-as-a-Service).
*   **PWA (Vite PWA)**: Capacidades offline, instalação no dispositivo e workers.

---

## 🏗️ Arquitetura e Estrutura do Frontend

A estrutura de pastas foi refatorada para garantir escalabilidade e organização lógica. Abaixo, a explicação detalhada de cada diretório:

```bash
src/
├── 📂 assets/          # Recursos estáticos (imagens, svgs globais)
├── 📂 components/      # Componentes reutilizáveis (Atomic Design adaptado)
│   ├── 📂 Admin/       # Componentes específicos do painel administrativo
│   ├── 📂 Layout/      # Estruturas de layout (Header, Footer, Sidebar)
│   ├── 📂 Product/     # Cards, galerias e listagens de produtos
│   ├── 📂 UI/          # Componentes de interface genéricos (Modais, Loaders)
│   └── 📂 PWA/         # Componentes relacionados a funcionalidades PWA
├── 📂 context/         # Gerenciamento de estado global (Providers)
├── 📂 layouts/         # Layouts de página (MainLayout, AdminLayout)
├── 📂 pages/           # Páginas da aplicação organizadas por domínio
│   ├── 📂 Public/      # Páginas públicas (Home, About, Blog)
│   ├── 📂 Auth/        # Fluxos de autenticação (Login, Register)
│   ├── 📂 Product/     # Visualização e listagem de produtos
│   ├── 📂 Checkout/    # Fluxo de compra (Cart, Payment, Success)
│   ├── 📂 User/        # Área do cliente (Profile, Orders)
│   ├── 📂 Admin/       # Páginas do painel administrativo
│   └── 📂 Legal/       # Termos e políticas
├── 📂 routes/          # Definição e configuração de rotas
├── 📂 services/        # Camada de comunicação com APIs externa
│   ├── api.ts          # Configuração base do Axios/Fetch
│   ├── auth.ts         # Serviços de autenticação
│   └── product.ts      # Serviços de produtos
├── 📂 types/           # Definições de Tipos TypeScript (Interfaces)
└── 📂 utils/           # Funções utilitárias e helpers
```

### Decisões de Engenharia

1.  **Service Layer Pattern**: Toda a lógica de comunicação com o backend/API está isolada na pasta `services`. Os componentes da UI não fazem chamadas `fetch` diretas, eles consomem funções dos serviços. Isso permite trocar a fonte de dados (ex: de Mock para API Real) sem alterar a interface.
2.  **Modularização de Páginas**: As páginas não estão jogadas na raiz de `pages`, mas agrupadas por contexto de negócio (`Auth`, `Checkout`, `Admin`).
3.  **Context API para State Management**: Utilizamos Contexts para dados que precisam ser acessíveis globalmente, como o carrinho de compras (`CartContext`) e sessão do usuário (`AuthContext`), evitando *prop drilling*.

---

## 💻 Como Executar o Projeto

### Pré-requisitos
*   Node.js (v16 ou superior)
*   npm ou yarn

### Passo a Passo

1.  **Instalação de Dependências**
    ```bash
    npm install
    ```

2.  **Configuração de Variáveis de Ambiente**
    Crie um arquivo `.env` na raiz do projeto baseando-se no `.env.example`.
    ```env
    VITE_API_URL=http://localhost:3000/v1
    VITE_FIREBASE_API_KEY=...
    ```

3.  **Executar em Desenvolvimento**
    Inicia o servidor local com Hot Module Replacement (HMR).
    ```bash
    npm run dev
    ```
    O projeto estará acessível em `http://localhost:5173`.

4.  **Build para Produção**
    Gera os arquivos estáticos otimizados na pasta `dist`.
    ```bash
    npm run build
    ```

---

## 🛠️ Guia de Desenvolvimento

### Adicionando uma Nova Página
1.  Crie o componente da página em `src/pages/[Contexto]/NovaPagina.tsx`.
2.  Adicione a rota em `src/routes/AppRoutes.tsx`.
3.  Se necessário, adicione link no menu ou botões de navegação.

### Adicionando um Novo Serviço
1.  Defina a tipagem em `src/types`.
2.  Crie ou edite um arquivo em `src/services` exportando a função assíncrona.
3.  Consuma o serviço no componente utilizando `useEffect` ou handlers de eventos.

---

## 📱 Funcionalidades PWA

Este projeto é uma **Progressive Web App**. Isso significa que ele:
*   Pode ser instalado no Desktop e Mobile como um aplicativo nativo.
*   Funciona offline (cache de assets e dados básicos).
*   Possui manifesto de aplicativo configurado (`manifest.webmanifest`).

---

## ✒️ Autor

**Jardheson Oliveira**
*Software Engineer*

> *"Código é poesia escrita para máquinas, mas lida por humanos."*
