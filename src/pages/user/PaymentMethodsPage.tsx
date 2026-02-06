import React from "react";
import { CreditCard, Banknote, Landmark } from "lucide-react";

export const PaymentMethodsPage: React.FC = () => {
  return (
    <div className="bg-light-gray min-h-screen py-10 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wide uppercase">
              Informações
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4">
              Métodos de Pagamento
            </h1>
            <p className="text-gray-500 text-lg">
              Oferecemos diversas opções para você realizar suas compras com
              segurança e praticidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Cartão de Crédito
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Aceitamos as principais bandeiras. Parcele suas compras em até
                12x sem juros (parcela mínima de R$ 50,00).
              </p>
              <div className="flex justify-center gap-2 mt-4 opacity-60">
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                <div className="w-8 h-5 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Landmark className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pix</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Pagamento instantâneo com aprovação imediata. Ganhe{" "}
                <strong>5% de desconto</strong> pagando via Pix.
              </p>
              <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mt-2">
                Aprovação Imediata
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Banknote className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Boleto Bancário
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Pague em qualquer banco ou lotérica. O prazo de compensação é de
                1 a 3 dias úteis.
              </p>
              <div className="text-xs text-gray-400 mt-2">
                *Vencimento em 2 dias úteis
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
              Perguntas Frequentes
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">
                  É seguro digitar meus dados do cartão?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sim! Utilizamos criptografia SSL de ponta a ponta. Seus dados
                  são processados diretamente pela operadora e não ficam salvos
                  em nossos servidores.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Posso alterar a forma de pagamento após fechar o pedido?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Por questões de segurança, não é possível alterar a forma de
                  pagamento após a finalização. Caso precise, sugerimos cancelar
                  o pedido e refazê-lo.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">
                  Como funciona o estorno?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  O estorno é feito na mesma forma de pagamento utilizada. Para
                  cartão de crédito, pode levar até 2 faturas. Para Pix e
                  Boleto, o reembolso é feito em conta bancária.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
