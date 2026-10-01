import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  Building2, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function Entrar() {
  const navigate = useNavigate();
  const [verSenha, setVerSenha] = useState(false);
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    lembrar: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');
    
    if (!formData.email || !formData.senha) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Simulação de login bem-sucedido
    setSucesso('Sessão iniciada com sucesso! A reencaminhar...');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Botão de Regresso */}
      <div className="max-w-md w-full mx-auto mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0088ce] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à Página Inicial</span>
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* CABEÇALHO DO CARD */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0088ce_1px,transparent_1px)] background-size-[16px_16px]"></div>
          
          <div className="relative z-10 space-y-2">
            <div className="w-12 h-12 bg-[#0088ce]/20 border border-[#0088ce]/40 rounded-2xl flex items-center justify-center mx-auto text-[#0088ce] mb-3">
              <Building2 className="w-6 h-6" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
              Galeria UniLicungo
            </span>

            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Bem-vindo de volta
            </h1>

            <p className="text-xs text-slate-300">
              Aceda à sua conta institucional para gerir e publicar obras
            </p>
          </div>

          {/* NAVEGAÇÃO DE ROTA (ENTRAR / CADASTRAR) */}
          <div className="mt-6 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 flex items-center gap-1 relative z-10">
            <div className="flex-1 py-2 text-xs font-bold rounded-lg bg-[#0088ce] text-white shadow-sm flex items-center justify-center gap-1.5 cursor-default">
              <LogIn className="w-3.5 h-3.5" />
              <span>Entrar</span>
            </div>

            <Link
              to="/cadastrar"
              className="flex-1 py-2 text-xs font-bold rounded-lg text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Cadastrar</span>
            </Link>
          </div>
        </div>

        {/* CORPO DO FORMULÁRIO */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Feedback */}
          {erro && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{erro}</span>
            </div>
          )}

          {sucesso && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{sucesso}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email / Utilizador */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Email ou Código Institucional</span>
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemplo@unilicungo.ac.mz"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
              />
            </div>

            {/* Palavra-passe */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Palavra-passe</span>
                </label>
                <a
                  href="#recuperar"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('As instruções de recuperação foram enviadas para o seu email.');
                  }}
                  className="text-[11px] font-semibold text-[#0088ce] hover:underline"
                >
                  Esqueceu?
                </a>
              </div>

              <div className="relative">
                <input
                  type={verSenha ? 'text' : 'password'}
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setVerSenha(!verSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {verSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Lembrar-me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="lembrar"
                name="lembrar"
                checked={formData.lembrar}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-[#0088ce] focus:ring-[#0088ce]"
              />
              <label htmlFor="lembrar" className="text-xs text-slate-600 select-none cursor-pointer">
                Manter sessão iniciada
              </label>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              className="w-full bg-[#0088ce] hover:bg-sky-600 text-white font-bold text-xs py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Iniciar Sessão</span>
            </button>

            {/* CHAMADA PARA CADASTRAR */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Ainda não possui uma conta?{' '}
                <Link
                  to="/cadastrar"
                  className="font-bold text-[#8c5222] hover:underline inline-flex items-center gap-1"
                >
                  <span>Cadastre-se aqui</span>
                </Link>
              </p>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}