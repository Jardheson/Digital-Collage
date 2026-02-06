import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';

export const AdminForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Enviado!</h2>
          <p className="text-gray-600 mb-6">
            Enviamos as instruções de recuperação de senha para <strong>{email}</strong>.
            Verifique sua caixa de entrada.
          </p>
          <Link 
            to="/admin/login"
            className="inline-block bg-[#C92071] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-pink-700 transition-colors"
          >
            Voltar para Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-pink-50 rounded-full">
              <LockResetIcon className="w-8 h-8 text-[#C92071]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Recuperar Senha</h1>
          <p className="text-gray-500 text-sm mt-1">
            Digite seu email administrativo para receber o link de redefinição.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Cadastrado</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#C92071] focus:border-[#C92071]"
                placeholder="admin@exemplo.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#C92071] text-white py-2.5 rounded-lg font-bold hover:bg-pink-700 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Enviar Link de Recuperação'
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <Link to="/admin/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para Login
          </Link>
        </div>
      </div>
    </div>
  );
};

// Custom icon for visual variety
const LockResetIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <path d="M12 15v2" />
    <circle cx="12" cy="16" r="1" />
  </svg>
);
