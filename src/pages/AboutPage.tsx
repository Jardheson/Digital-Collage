import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-light-gray">
      <section className="bg-light-gray relative overflow-hidden py-10 lg:py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 space-y-6 z-10">
                <span className="text-primary font-bold tracking-wide">SOBRE NÓS</span>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Conheça a <br /> Drip Store
                </h1>
                <p className="text-gray-500 text-lg max-w-md leading-relaxed">
                    Somos a sua loja online especializada em moda urbana e lifestyle. 
                    Com uma curadoria cuidadosa dos melhores produtos, trazemos as últimas 
                    tendências diretamente para você.
                </p>
                <Link 
                  to="/products" 
                  className="inline-block bg-primary text-white font-bold py-3 px-8 rounded hover:bg-pink-700 transition-colors"
                >
                    Explorar Produtos
                </Link>
            </div>
            <div className="lg:w-1/2 relative mt-10 lg:mt-0">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-primary/10 to-transparent rounded-full -z-10 translate-x-1/4 -translate-y-1/4"></div>
                <div className="relative">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
                        <div className="text-center">
                            <div className="w-20 h-20  rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl font-bold"><img src="/Logo.svg" alt="Logo"/></span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Drip Store</h3>
                            <p className="text-gray-600 text-sm">
                                Moda urbana e lifestyle para pessoas que buscam estilo e qualidade
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nossa Missão</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Democratizar o acesso à moda urbana de qualidade, conectando pessoas com produtos 
              que expressam sua personalidade e estilo de vida único.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Qualidade</h3>
              <p className="text-gray-600">
                Selecionamos cuidadosamente cada produto, garantindo materiais premium e acabamento impecável.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Estilo</h3>
              <p className="text-gray-600">
                Trabalhamos com as melhores marcas para trazer as últimas tendências da moda urbana.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Inovação</h3>
              <p className="text-gray-600">
                Constantemente atualizando nosso catálogo com produtos inovadores e exclusivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Nossos Valores</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">💡</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Transparência</h3>
                    <p className="text-gray-600">
                      Acreditamos em relações claras e honestas com nossos clientes, fornecedores e parceiros.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">❤️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Paixão</h3>
                    <p className="text-gray-600">
                      Fazemos o que amamos e amamos o que fazemos. A moda é nossa paixão e isso se reflete em tudo.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">🤝</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Compromisso</h3>
                    <p className="text-gray-600">
                      Comprometidos com a satisfação total de nossos clientes e com a excelência em cada detalhe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-transparent rounded-full w-[300px] h-[300px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 blur-2xl"></div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                  <p className="text-gray-600 mb-4">Clientes Satisfeitos</p>
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-gray-600 mb-4">Produtos Disponíveis</p>
                  <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                  <p className="text-gray-600">Avaliação Média</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Pronto para elevar seu estilo?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Junte-se a milhares de clientes que já descobriram a diferença da Drip Store. 
            Sua próxima peça favorita está esperando por você.
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-white text-primary font-bold py-3 px-8 rounded hover:bg-gray-100 transition-colors"
          >
            Começar a Comprar
          </Link>
        </div>
      </section>
    </div>
  );
};
