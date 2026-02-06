import React, { useState } from "react";
import {
  Shield,
  Lock,
  Eye,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const SecurityPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const securityFeatures = [
    {
      icon: <Lock className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Criptografia SSL/TLS",
      description:
        "Todos os dados são transmitidos com criptografia de 256 bits, garantindo máxima segurança.",
    },
    {
      icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Proteção PCI DSS",
      description:
        "Somos certificados PCI DSS Level 1, o padrão mais elevado de segurança para pagamentos.",
    },
    {
      icon: <Eye className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Monitoramento 24/7",
      description:
        "Sistema de monitoramento contínuo que detecta e previne atividades suspeitas em tempo real.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Dados Protegidos",
      description:
        "Seus dados pessoais são armazenados em servidores seguros com backup automático diário.",
    },
  ];

  const privacyPoints = [
    "Não compartilhamos seus dados com terceiros sem consentimento",
    "Você pode solicitar acesso, exclusão ou correção de seus dados a qualquer momento",
    "Usamos cookies apenas para melhorar sua experiência de navegação",
    "Nossa política de privacidade é transparente e fácil de entender",
    "Conformidade com LGPD (Lei Geral de Proteção de Dados) do Brasil",
  ];

  const guarantees = [
    {
      title: "Garantia de Segurança",
      description:
        "Se seus dados forem comprometidos por culpa nossa, oferecemos reembolso total.",
    },
    {
      title: "Satisfação Garantida",
      description:
        "Compre com confiança. Se não estiver satisfeito, temos política de devolução fácil.",
    },
    {
      title: "Suporte 24/7",
      description:
        "Nossa equipe está sempre disponível para responder suas dúvidas de segurança.",
    },
    {
      title: "Política Transparente",
      description:
        "Todas as nossas políticas são claras e atualizadas regularmente para sua proteção.",
    },
  ];

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Como meus dados de pagamento são protegidos?",
      answer:
        "Utilizamos criptografia SSL/TLS de 256 bits para todas as transações. Além disso, somos certificados PCI DSS Level 1, o padrão mais alto de segurança. Seus dados de cartão nunca são armazenados em nossos servidores, sendo processados por provedores certificados.",
    },
    {
      id: 2,
      question: "O que vocês fazem com meus dados pessoais?",
      answer:
        "Usamos seus dados apenas para processar pedidos, enviar confirmações e melhorar seu atendimento. Nunca compartilhamos com terceiros sem seu consentimento expresso. Você pode revisar nossa Política de Privacidade completa a qualquer momento.",
    },
    {
      id: 3,
      question: "Como posso proteger minha conta?",
      answer:
        "Use uma senha forte com letras, números e símbolos. Não compartilhe sua senha com ninguém. Ative a autenticação de dois fatores se disponível. Acesse sua conta apenas em redes de internet seguras e não em redes públicas.",
    },
    {
      id: 4,
      question: "Minha senha é armazenada com segurança?",
      answer:
        "Sim. Suas senhas são criptografadas usando algoritmos de hash de uma única direção. Nem mesmo nossos funcionários podem ver sua senha. Se esquecer, você pode redefini-la com segurança por email.",
    },
    {
      id: 5,
      question: "O que fazer se suspeitar de atividade fraudulenta?",
      answer:
        "Entre em contato conosco imediatamente pelo email seguranca@digitalstore.com ou pelo telefone. Cancelaremos sua sessão, resetaremos sua senha e investigaremos qualquer atividade suspeita. Sua conta será protegida enquanto investigamos.",
    },
    {
      id: 6,
      question: "Como posso deletar meus dados?",
      answer:
        "Você tem direito de solicitar a exclusão de seus dados a qualquer momento, conforme LGPD. Entre em contato conosco e processaremos sua solicitação em até 30 dias. Alguns dados podem ser mantidos por obrigação legal (notas fiscais, por exemplo).",
    },
    {
      id: 7,
      question: "Vocês usam cookies? Como são seguros?",
      answer:
        "Sim, usamos cookies apenas para melhorar sua experiência. Não são cookies de rastreamento invasivo. Você pode desativar cookies nas configurações do navegador, mas isso pode afetar sua experiência de compra.",
    },
    {
      id: 8,
      question: "Como denunciar um problema de segurança?",
      answer:
        "Se descobrir uma vulnerabilidade de segurança, por favor, nos informe discretamente em seguranca@digitalstore.com. Não divulgue publicamente. Investigaremos e corrigiremos o problema rapidamente.",
    },
  ];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-primary to-secondary py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-6">
              Segurança e Privacidade
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto px-4">
              Sua segurança é nossa prioridade. Conheça as medidas que tomamos
              para proteger você
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-6">
              Nossas Medidas de Segurança
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Implementamos as melhores práticas e tecnologias mais avançadas do
              mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-light-gray rounded-lg p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-12 md:py-20 bg-light-gray">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-10">
              Sua Privacidade Importa
            </h2>

            <div className="bg-white rounded-lg p-6 md:p-8 shadow-md">
              <div className="space-y-4 md:space-y-6">
                {privacyPoints.map((point, index) => (
                  <div key={index} className="flex gap-3 md:gap-4">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-sm md:text-base">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 md:mt-10 bg-secondary/10 border border-secondary/20 rounded-lg p-6 md:p-8">
              <h3 className="font-bold text-gray-900 mb-3 text-base md:text-lg">
                Conformidade com LGPD
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Digital Store está em conformidade total com a Lei Geral de
                Proteção de Dados (LGPD). Você tem direitos sobre seus dados e
                pode solicitar acesso, correção ou exclusão a qualquer momento.
                Para exercer seus direitos, entre em contato conosco.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            Nossas Garantias
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {guarantees.map((guarantee, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 hover:border-primary transition-colors duration-300"
              >
                <div className="flex items-start gap-3 md:gap-4 mb-4">
                  <AlertCircle className="w-6 h-6 md:w-7 md:h-7 text-primary flex-shrink-0 mt-1" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    {guarantee.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  {guarantee.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-light-gray">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
              Perguntas Frequentes
            </h2>

            <div className="space-y-3 md:space-y-4">
              {faqItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFAQ(openFAQ === item.id ? null : item.id)
                    }
                    className="w-full px-6 py-4 md:py-5 flex items-center justify-between hover:bg-light-gray transition-colors duration-300 text-left"
                  >
                    <span className="font-semibold text-gray-900 text-sm md:text-base pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                        openFAQ === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openFAQ === item.id && (
                    <div className="px-6 py-4 md:py-5 bg-light-gray border-t border-gray-200">
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-gray-100">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <HelpCircle className="w-12 h-12 md:w-14 md:h-14 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-6">
              Mais Dúvidas?
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8">
              Nossa equipe de segurança está disponível para responder qualquer
              pergunta sobre sua privacidade e segurança.
            </p>
            <div className="space-y-2 md:space-y-3 text-gray-700 text-sm md:text-base">
              <p>
                <strong>Email:</strong> seguranca@digitalstore.com
              </p>
              <p>
                <strong>Telefone:</strong> (85) 3051-3411
              </p>
              <p>
                <strong>Horário:</strong> Seg-Sex 9h às 18h
              </p>
            </div>
            <button className="mt-6 md:mt-8 bg-primary text-white px-6 md:px-8 py-2 md:py-3 rounded-md hover:bg-pink-700 transition-colors duration-300 font-semibold text-sm md:text-base">
              Entrar em Contato
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
