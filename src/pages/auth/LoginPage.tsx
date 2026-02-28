import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/Layout/Header";
import { Footer } from "../../components/Layout/Footer";
import { useSettings } from "../../context/SettingsContext";
import { useUserAuth } from "../../context/UserAuthContext";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { login, socialLogin } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { title, subtitle, image } = settings.authPages?.login || {
    title: "Acesse sua conta",
    subtitle: "Novo cliente? Então registre-se",
    image: "/images/products/produc-image-1-.png",
  };

  const socialAuth = settings.authPages?.socialAuth || {
    text: "Ou faça login com",
    gmailIcon: "/images/icons/gmail.svg",
    facebookIcon: "/images/icons/facebookk.svg",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar fazer login");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    try {
      await socialLogin(provider);
      navigate("/");
    } catch (error) {
      console.error("Social login failed", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header variant="auth" />

      <div className="flex-grow bg-secondary/80">
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="bg-white rounded-lg shadow-md p-8 md:p-10 w-full max-w-sm">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {title}
                </h1>
                <p className="text-gray-600 text-sm mb-8">
                  {subtitle}{" "}
                  <Link
                    to="/signup"
                    className="text-primary font-bold underline"
                  >
                    aqui
                  </Link>
                  .
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md text-center">
                      {error}
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="login-email"
                      className="block text-sm font-bold text-gray-800 mb-2"
                    >
                      Login *
                    </label>
                    <input
                      id="login-email"
                      type="text"
                      placeholder="Insira seu login ou email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-light-gray border border-gray-200 rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="login-password"
                      className="block text-sm font-bold text-gray-800 mb-2"
                    >
                      Senha *
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      placeholder="Insira sua senha"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-light-gray border border-gray-200 rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="flex justify-start">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-gray-700 hover:text-primary font-medium"
                    >
                      Esqueci minha senha
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-pink-700 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Acessar Conta"
                    )}
                  </button>
                </form>

                <div className="mt-8">
                  <p className="text-sm text-gray-700 text-center mb-4">
                    {socialAuth.text}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin("google")}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 hover:border-gray-400 transition-colors hover:scale-110 transform duration-200"
                      aria-label="Login with Gmail"
                    >
                      <img
                        src={socialAuth.gmailIcon}
                        alt="Gmail"
                        className="w-5 h-5"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin("facebook")}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 hover:border-gray-400 transition-colors hover:scale-110 transform duration-200"
                      aria-label="Login with Facebook"
                    >
                      <img
                        src={socialAuth.facebookIcon}
                        alt="Facebook"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex justify-end items-center">
              <img
                src={image}
                alt="Login Illustration"
                className="w-full max-w-md drop-shadow-2xl object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
