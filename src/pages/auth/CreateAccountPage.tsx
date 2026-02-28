import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/Layout/Header";
import { Footer } from "../../components/Layout/Footer";
import { useSettings } from "../../context/SettingsContext";
import { useUserAuth } from "../../context/UserAuthContext";

export const CreateAccountPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const { settings } = useSettings();
  const { socialLogin } = useUserAuth();
  const canSubmit = email.trim().length > 0;
  const navigate = useNavigate();

  const { title, subtitle, image } = settings.authPages?.signup || {
    title: "Crie sua conta",
    subtitle: "Já possui uma conta? Entre",
    image: "/images/products/produc-image-4-.png",
  };

  const socialAuth = settings.authPages?.socialAuth || {
    text: "Ou faça login com",
    gmailIcon: "/images/icons/gmail.svg",
    facebookIcon: "/images/icons/facebookk.svg",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate("/register", { state: { email } });
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

      <div className="flex-grow bg-secondary/80 py-6 md:py-12">
        <div className="container mx-auto px-3 sm:px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div className="flex justify-center lg:justify-start w-full">
              <div className="bg-white rounded-lg shadow-md p-6 sm:p-7 md:p-8 lg:p-10 w-full max-w-sm">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {title}
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
                  {subtitle}{" "}
                  <Link
                    to="/login"
                    className="text-primary font-bold underline hover:no-underline"
                  >
                    aqui
                  </Link>
                  .
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="Insira seu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-light-gray border border-gray-200 rounded-md px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full bg-primary text-white font-bold py-2.5 sm:py-3 px-4 rounded-md hover:bg-pink-700 active:bg-pink-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    Criar Conta
                  </button>
                </form>

                <div className="mt-6 sm:mt-8">
                  <p className="text-xs sm:text-sm text-gray-700 text-center mb-3 sm:mb-4 font-medium">
                    {socialAuth.text}
                  </p>
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin("google")}
                      className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-300 hover:border-gray-400 active:border-gray-500 transition-colors duration-200 hover:scale-110 transform"
                      aria-label="Login with Gmail"
                    >
                      <img
                        src={socialAuth.gmailIcon}
                        alt="Gmail"
                        className="w-4 sm:w-5 h-4 sm:h-5"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin("facebook")}
                      className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-300 hover:border-gray-400 active:border-gray-500 transition-colors duration-200 hover:scale-110 transform"
                      aria-label="Login with Facebook"
                    >
                      <img
                        src={socialAuth.facebookIcon}
                        alt="Facebook"
                        className="w-4 sm:w-5 h-4 sm:h-5"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex justify-end items-center">
              <img
                src={image}
                alt="Signup Illustration"
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
