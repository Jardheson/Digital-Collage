import React, { useState } from "react";
import { Briefcase, MapPin, Clock, Send } from "lucide-react";

export const CareerPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, phone, position, message });

    setName("");
    setEmail("");
    setPhone("");
    setPosition("");
    setMessage("");
    alert("Candidatura enviada com sucesso!");
  };

  const jobs = [
    {
      id: 1,
      title: "Desenvolvedor Full Stack",
      department: "Tecnologia",
      location: "São Paulo - SP",
      type: "Tempo Integral",
      description:
        "Procuramos um desenvolvedor Full Stack experiente em React, Node.js e TypeScript.",
    },
    {
      id: 2,
      title: "Designer UI/UX",
      department: "Design",
      location: "Remoto",
      type: "Tempo Integral",
      description:
        "Buscamos designer talentoso para criar interfaces incríveis e experiências de usuário memoráveis.",
    },
    {
      id: 3,
      title: "Gerente de Produtos",
      department: "Produto",
      location: "São Paulo - SP",
      type: "Tempo Integral",
      description:
        "Procuramos um gerente de produtos estratégico para liderar a visão do nosso produto.",
    },
    {
      id: 4,
      title: "Especialista em Marketing Digital",
      department: "Marketing",
      location: "Remoto",
      type: "Tempo Integral",
      description:
        "Buscamos especialista em marketing digital com experiência em e-commerce e growth hacking.",
    },
  ];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-primary to-secondary py-12 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-6">
              Trabalhe Conosco
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto px-4">
              Faça parte de um time inovador dedicado a transformar a
              experiência de compra online
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-light-gray">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Por que se juntar a nós?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Na Digital Store, acreditamos que nossos colaboradores são nosso
              maior ativo. Oferecemos um ambiente de trabalho colaborativo,
              oportunidades de crescimento contínuo e benefícios competitivos
              para ajudá-lo a prosperar tanto profissional quanto pessoalmente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <Briefcase className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                Oportunidades de Carreira
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Desenvolva suas habilidades e avance na carreira com mentorias e
                treinamentos contínuos.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 mb-4">
                <MapPin className="text-secondary w-6 h-6" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                Trabalho Flexível
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Opções de trabalho remoto, flexibilidade de horários e ambiente
                moderno e acolhedor.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 mb-4">
                <Clock className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                Benefícios Competitivos
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Salário competitivo, vale refeição, convênio médico e programa
                de bem-estar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            Posições Abertas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-lg p-6 md:p-7 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <p className="text-primary font-semibold text-sm mb-4">
                  {job.department}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{job.type}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {job.description}
                </p>

                <button className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-pink-700 transition-colors text-sm">
                  Candidatar-se
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-light-gray">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
              Envie sua Candidatura
            </h2>
            <p className="text-gray-600 text-center text-sm sm:text-base mb-8 md:mb-12">
              Preencha o formulário abaixo e entraremos em contato com você em
              breve
            </p>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-md p-6 md:p-10 space-y-5 md:space-y-6"
            >
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-light-gray border border-gray-200 rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="seu.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-light-gray border border-gray-200 rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-light-gray border border-gray-200 rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Posição de Interesse *
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full bg-light-gray border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                >
                  <option value="">Selecione uma posição</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Mensagem (Opcional)
                </label>
                <textarea
                  placeholder="Conte-nos um pouco sobre você e por que gostaria de trabalhar conosco..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full bg-light-gray border border-gray-200 rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-pink-700 active:bg-pink-800 transition-colors duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Send className="w-5 h-5" />
                Enviar Candidatura
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
