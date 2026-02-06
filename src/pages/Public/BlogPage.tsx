import React, { useState } from "react";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "Todos",
    "Moda",
    "Tendências",
    "Estilo de Vida",
    "Dicas",
    "Notícias",
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "10 Tendências de Moda para 2026",
      excerpt:
        "Descubra as principais tendências de moda que dominam o ano. De cores vibrantes a cortes minimalistas...",
      content: "Conteúdo completo do artigo sobre tendências de moda.",
      category: "Tendências",
      author: "Maria Silva",
      date: "15 de janeiro de 2026",
      image: "/images/slides/home-slide-1.jpeg",
      readTime: "5 min de leitura",
    },
    {
      id: 2,
      title: "Como Combinar Peças Básicas com Estilo",
      excerpt:
        "Aprenda a criar looks incríveis com peças básicas do seu guarda-roupa. Simples, elegante e versátil...",
      content: "Conteúdo completo sobre combinações de moda.",
      category: "Dicas",
      author: "João Costa",
      date: "14 de janeiro de 2026",
      image: "/images/slides/home-slide-2.jpeg",
      readTime: "4 min de leitura",
    },
    {
      id: 3,
      title: "Sustentabilidade na Moda: Choices que Importam",
      excerpt:
        "Entenda como fazer escolhas conscientes na hora de comprar roupa. Sustentabilidade nunca foi tão importante...",
      content: "Conteúdo completo sobre moda sustentável.",
      category: "Estilo de Vida",
      author: "Ana Paula",
      date: "12 de janeiro de 2026",
      image: "/images/slides/home-slide-3.jpeg",
      readTime: "6 min de leitura",
    },
    {
      id: 4,
      title: "Nova Coleção de Inverno Chegou!",
      excerpt:
        "Confira os novos looks para a estação de inverno. Peças quentes, confortáveis e cheias de estilo...",
      content: "Conteúdo completo sobre nova coleção.",
      category: "Notícias",
      author: "Digital Store",
      date: "10 de janeiro de 2026",
      image: "/images/slides/home-slide-4.jpeg",
      readTime: "3 min de leitura",
    },
    {
      id: 5,
      title: "Acessórios que Transformam seu Look",
      excerpt:
        "Descubra como os acessórios certos podem transformar completamente seu visual. Pequenos detalhes, grande impacto...",
      content: "Conteúdo completo sobre acessórios.",
      category: "Dicas",
      author: "Carolina Lima",
      date: "8 de janeiro de 2026",
      image: "/images/slides/home-slide-5.jpeg",
      readTime: "5 min de leitura",
    },
    {
      id: 6,
      title: "Guia Completo: Cores que Combinam com Você",
      excerpt:
        "Aprenda a identificar quais cores mais te favorecem. Análise de cores para potencializar seu estilo pessoal...",
      content: "Conteúdo completo sobre análise de cores.",
      category: "Moda",
      author: "Designer Rafael",
      date: "5 de janeiro de 2026",
      image: "/images/slides/home-slide-6.jpeg",
      readTime: "7 min de leitura",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchCategory =
      selectedCategory === "Todos" || post.category === selectedCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-6">
              Blog Digital Store
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto px-4">
              Dicas, tendências e novidades sobre moda, estilo e lifestyle
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-light-gray">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          {/* Search Bar */}
          <div className="mb-8 md:mb-10">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-6 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gray-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="text-gray-500 text-xs md:text-sm">
                        {post.readTime}
                      </div>
                    </div>

                    <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-300 font-semibold flex items-center justify-center gap-2 text-sm md:text-base">
                      Leia Mais
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-20">
              <p className="text-gray-500 text-base md:text-lg">
                Nenhum post encontrado. Tente uma busca diferente ou selecione
                outra categoria.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-r from-secondary/20 to-primary/20 py-12 md:py-16 border-t border-gray-100">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-6">
              Fique Atualizado
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8">
              Receba as últimas dicas de moda e tendências direto no seu e-mail
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 px-4 md:px-6 py-2 md:py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
              />
              <button className="bg-primary text-white px-6 md:px-8 py-2 md:py-3 rounded-md hover:bg-pink-700 transition-colors duration-300 font-semibold whitespace-nowrap text-sm md:text-base">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
