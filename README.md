# 🛍️ Digital Store

> **Architected & Developed by Jardheson Oliveira**

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📖 Visão Geral do Projeto

O **Digital Store** é uma plataforma de e-commerce moderna, robusta e escalável, desenvolvida como uma **Progressive Web Application (PWA)**. O projeto foca em oferecer uma experiência de usuário (UX) fluida, performance de alto nível e uma arquitetura de código limpa e modular.

Este frontend foi construído seguindo os princípios de **Clean Architecture** adaptados para o ecossistema React, garantindo separação de responsabilidades, facilidade de manutenção e testabilidade.

A plataforma agora conta com um **backend integrado via Supabase**, garantindo persistência de dados em tempo real e sincronização entre o painel administrativo e a loja.

---

## 🎨 Interface e Layout

A interface foi projetada com foco em usabilidade e conversão, utilizando uma paleta de cores vibrante (Rosa Magenta #C92071) para CTAs e tipografia clara para hierarquia de informações.

### 📱 Mobile View
Experiência otimizada para dispositivos móveis com navegação simplificada e elementos de toque amigáveis.

<img width="240" height="500" alt="image" src="https://github.com/user-attachments/assets/b623f817-69b9-45c5-ba4b-afb42b49e21a" />

**Destaques da Interface Mobile:**
*   **Cabeçalho:** Menu hambúrguer acessível, busca rápida e carrinho sempre visível.
*   **Banner Promocional:** Destaque visual gerenciável via Admin.
*   **Navegação Inferior (Tab Bar):** Acesso rápido às seções principais: Home (ativo em Rosa), Buscar, Favoritos, Carrinho e Perfil.
*   **Identidade Visual:** Uso estratégico da cor primária (Rosa Magenta) para indicar estado ativo e ações principais.

### 💻 Desktop View
Layout responsivo que aproveita o espaço de tela para exibir mais informações e facilitar a navegação por categorias.

<img width="2760" height="1586" alt="image" src="https://github.com/user-attachments/assets/41089957-0f4a-475d-b64f-05519e390318" />

**Destaques da Interface Desktop:**
*   **Cabeçalho Expandido:** Barra de busca centralizada, acesso direto a "Minha Conta" e "Meus Pedidos".
*   **Menu de Navegação:** Abas claras para Home, Produtos e Categorias com indicador de página ativa (sublinhado rosa).
*   **Hero Section Imersiva:** Layout em grid com texto à esquerda e imagem à direita, criando um fluxo de leitura natural em "Z".
*   **Elementos de Conversão:** Botão "Ver Ofertas" com alto contraste e posicionamento estratégico acima da dobra.

---

## 🎛️ Painel Administrativo (Backoffice)

O projeto inclui um **CMS completo** para gerenciamento da loja, permitindo que administradores controlem produtos, pedidos e conteúdo do site sem necessidade de alterar código.

<div align="center">
<img width="45%"  alt="image" src="https://github.com/user-attachments/assets/aabae1ad-a7ab-46ab-aed1-fb85a4844d94" />
<img width="45%"  alt="image" src="https://github.com/user-attachments/assets/7387472b-0226-49c2-b2ed-c992d5c867ad" />
</div>

### Funcionalidades do Admin
*   **Dashboard**: Visão geral de métricas (Vendas, Pedidos, Produtos, Usuários) com dados em tempo real do Supabase.
*   **Catálogo**:
    *   Gerenciamento de Produtos (CRUD completo com variações de cor/tamanho).
    *   Gestão de Categorias (Criação, Edição, Exclusão).
    *   Gestão de Coleções em Destaque.
*   **Vendas**: Visualização e alteração de status de pedidos (Processando, Enviado, Entregue, Cancelado).
*   **Gestão de Conteúdo (CMS)**:
    *   **Banners (Carrossel)**: Gerenciamento completo dos slides da Home.
    *   **Configurações PWA**: Ativação/Desativação do banner de instalação do App.
*   **Usuários**: Gestão completa de clientes e administradores.
*   **Acesso Administrativo (Demo)**:
    *   **URL**: `/admin/login`
    *   **Email**: `admin@digitalstore.com`
    *   **Senha**: `Admin@1234`
    *   *(Credenciais já cadastradas e prontas para uso)*

---

## 🚀 Tecnologias e Ferramentas

O projeto utiliza um stack tecnológico de ponta, focado em performance e produtividade:

### Core
*   **[React 18](https://reactjs.org/)**: Biblioteca para construção de interfaces reativas.
*   **[TypeScript](https://www.typescriptlang.org/)**: Superset JavaScript para tipagem estática e segurança de código.
*   **[Vite](https://vitejs.dev/)**: Build tool de próxima geração para desenvolvimento rápido e bundles otimizados.

### Backend & Dados
*   **[Supabase](https://supabase.com/)**: Backend-as-a-Service (PostgreSQL) para banco de dados, autenticação e armazenamento.
*   **Integração em Tempo Real**: Sincronização imediata entre Admin e Loja.

### Estilização e UI
*   **[Tailwind CSS](https://tailwindcss.com/)**: Framework utility-first para estilização rápida e responsiva.
*   **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones leve e consistente.

### Gerenciamento de Estado e Rotas
*   **[React Router DOM](https://reactrouter.com/)**: Gerenciamento de rotas client-side (SPA).
*   **Context API**: Gerenciamento de estado global (Carrinho, Autenticação, Configurações).

### Integrações e Serviços
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
│   ├── 📂 auth/        # Fluxos de autenticação (Login, Register)
│   ├── 📂 admin/       # Páginas do painel administrativo (Dashboard, Products, Users...)
│   ├── 📂 checkout/    # Fluxo de compra (Cart, Payment, Success)
│   ├── 📂 product/     # Visualização e listagem de produtos
│   └── ...             # Outras páginas (Home, About, etc.)
├── 📂 routes/          # Definição e configuração de rotas
├── 📂 services/        # Camada de comunicação com APIs externa
│   ├── api.ts          # Configuração base do Axios/Fetch
│   ├── auth.ts         # Serviços de autenticação
│   ├── product.ts      # Serviços de produtos (Supabase Integration)
│   ├── settings.ts     # Serviços de configurações (Banners, Categories via Supabase)
│   └── supabase.ts     # Cliente Supabase
├── 📂 types/           # Definições de Tipos TypeScript (Interfaces)
└── 📂 utils/           # Funções utilitárias e helpers
```

### Decisões de Engenharia

1.  **Service Layer Pattern**: Toda a lógica de comunicação com o backend/API está isolada na pasta `services`. Os componentes da UI não fazem chamadas diretas ao banco, eles consomem funções dos serviços.
2.  **Modularização de Páginas**: As páginas estão agrupadas por contexto de negócio (`Auth`, `Checkout`, `Admin`).
3.  **Context API para State Management**: Utilizamos Contexts para dados que precisam ser acessíveis globalmente, como o carrinho de compras (`CartContext`), sessão do usuário (`AuthContext`) e configurações do site (`SettingsContext`).

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
    O projeto já está configurado para conectar ao projeto Supabase de demonstração. Se desejar usar seu próprio projeto, atualize `src/services/supabase.ts`.

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

## 📱 Funcionalidades PWA

Este projeto é uma **Progressive Web App**. Isso significa que ele:
*   Pode ser instalado no Desktop e Mobile como um aplicativo nativo.
*   Funciona offline (cache de assets e dados básicos).
*   Possui manifesto de aplicativo configurado (`manifest.webmanifest`).
*   **Controle via Admin**: A exibição do banner de instalação pode ser controlada remotamente pelo painel administrativo.

---

## ✒️ Autor

**Jardheson Oliveira**
*Software Engineer*

> *"Código é poesia escrita para máquinas, mas lida por humanos."*
