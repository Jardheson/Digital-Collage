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
    gmailIcon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%2334A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3C/svg%3E",
    facebookIcon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%231877F2' d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/%3E%3C/svg%3E",
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
