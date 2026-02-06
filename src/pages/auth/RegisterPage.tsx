import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Header } from "../../components/Layout/Header";
import { useUserAuth } from "../../context/UserAuthContext";
import {
  validateCPF,
  formatCPF,
  validatePassword,
} from "../../utils/validators";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useUserAuth();
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    cpf?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const locationState = location.state as any;

  const [formData, setFormData] = useState({
    name: "",
    email: locationState?.email || "",
    password: "",
    confirmPassword: "",
    cpf: "",
    phone: "",
    address: "",
    bairro: "",
    cidade: "",
    cep: "",
    complemento: "",
    newsletter: false,
    terms: false,
  });

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === "cpf") {
      const formatted = formatCPF(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));

      if (fieldErrors.cpf) {
        setFieldErrors((prev) => ({ ...prev, cpf: undefined }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password" && fieldErrors.password) {
      setFieldErrors((prev) => ({ ...prev, password: undefined }));
    }

    if (name === "cep" && value.replace(/\D/g, "").length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${value.replace(/\D/g, "")}/json/`,
        );
        const data = await response.json();

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            address: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            cep: value,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cpf" && value.length > 0) {
      if (!validateCPF(value)) {
        setFieldErrors((prev) => ({ ...prev, cpf: "CPF inválido" }));
      }
    }

    if (name === "password" && value.length > 0) {
      const check = validatePassword(value);
      if (!check.valid) {
        setFieldErrors((prev) => ({ ...prev, password: check.message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }

    const passwordCheck = validatePassword(formData.password);
    if (!passwordCheck.valid) {
      setError(passwordCheck.message || "Senha inválida");
      return;
    }

    if (!validateCPF(formData.cpf)) {
      setError("CPF inválido. Verifique os números digitados.");
      return;
    }

    setLoading(true);
    const success = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      bairro: formData.bairro,
      cidade: formData.cidade,
      cep: formData.cep,
    });

    if (success) {
      navigate("/login", {
        state: { message: "Conta criada com sucesso! Faça login." },
      });
    } else {
      setError("Erro ao criar conta. Email já cadastrado ou erro no servidor.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-light-gray">
      <Header variant="auth" />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Criar Conta
            </h2>
            <p className="text-gray-600">
              Já tem uma conta?
              <Link
                to="/login"
                className="text-primary hover:text-primary-dark font-medium"
              >
                Entre aqui
              </Link>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            {error && (
              <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-bold text-gray-800 mb-2">
                Informações Pessoais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nome Completo *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Insira seu nome"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cpf"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CPF *
                  </label>
                  <input
                    id="cpf"
                    name="cpf"
                    type="text"
                    required
                    value={formData.cpf}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`appearance-none relative block w-full px-3 py-3 border ${fieldErrors.cpf ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                    placeholder="Insira seu CPF"
                  />
                  {fieldErrors.cpf && (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.cpf}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    E-mail *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Insira seu email"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Senha *
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`appearance-none relative block w-full px-3 py-3 border ${fieldErrors.password ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                      placeholder="Crie uma senha"
                    />
                    {fieldErrors.password && (
                      <p className="mt-1 text-xs text-red-600">
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirmar Senha *
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="Confirme a senha"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Celular{" "}
                    <span className="text-gray-400 font-normal">
                      (Opcional)
                    </span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Insira seu celular"
                  />
                </div>
              </div>

              <h3 className="font-bold text-gray-800 mt-6">
                Informações de Entrega
              </h3>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Endereço *
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Insira seu endereço"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="bairro"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bairro *
                    </label>
                    <input
                      id="bairro"
                      name="bairro"
                      type="text"
                      required
                      value={formData.bairro}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="Insira seu bairro"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cidade"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Cidade *
                    </label>
                    <input
                      id="cidade"
                      name="cidade"
                      type="text"
                      required
                      value={formData.cidade}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="Insira sua cidade"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="cep"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      CEP *
                    </label>
                    <input
                      id="cep"
                      name="cep"
                      type="text"
                      required
                      value={formData.cep}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="Insira seu CEP"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="complemento"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Complemento
                    </label>
                    <input
                      id="complemento"
                      name="complemento"
                      type="text"
                      value={formData.complemento}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="Insira complemento"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                  />
                  <label
                    htmlFor="newsletter"
                    className="ml-3 block text-sm text-gray-700"
                  >
                    Quero receber por email ofertas e novidades das lojas da
                    Digital Store. A frequência de envios pode variar de acordo
                    com a interação do cliente.
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Criando conta..." : "Criar conta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
