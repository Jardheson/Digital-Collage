import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <img src="/images/icons/logo-header.svg" alt="Digital Store Admin" className="h-10 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Acesso Administrativo</h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie sua loja de forma segura</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 mb-6 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                placeholder="admin@exemplo.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-right mt-1">
              <Link 
                to="/admin/forgot-password" 
                className="text-xs text-[#C92071] hover:underline font-medium"
              >
                Esqueceu a senha?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#C92071] text-white py-2.5 rounded-lg font-bold hover:bg-pink-700 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            ← Voltar para a Loja
          </Link>
        </div>
      </div>
    </div>
  );
};
