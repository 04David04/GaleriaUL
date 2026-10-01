import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  LogIn, 
  Mail, 
  Lock, 
  User, 
  GraduationCap, 
  Building2, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function Cadastrar() {
  const navigate = useNavigate();
  const [verSenha, setVerSenha] = useState(false);
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    vinculo: 'Estudante',
    cursoOuDepto: '',
    senha: '',
    confirmarSenha: '',
    aceitouTermos: false,
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

    if (!formData.nome || !formData.email || !formData.senha) {
      setErro('Por favor, preencha os campos obrigatórios.');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErro('As palavras-passe não coincidem.');
      return;
    }

    if (!formData.aceitouTermos) {
      setErro('É necessário aceitar os termos da Galeria UniLicungo.');
      return;
    }

    // Simulação de cadastro bem-sucedido
    setSucesso('Conta criada com sucesso! A reencaminhar...');
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
        <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0088ce_1px,transparent_1px)] background-size-[16px_16px]"></div>
          
          <div className="relative z-10 space-y-2">
            <div className="w-12 h-12 bg-[#8c5222]/20 border border-[#8c5222]/40 rounded-2xl flex items-center justify-center mx-auto text-amber-400 mb-3">
              <Building2 className="w-6 h-6" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
              Galeria UniLicungo
            </span>

            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Criar Nova Conta
            </h1>

            <p className="text-xs text-slate-300">
              Junte-se à comunidade de artistas e estudantes da UniLicungo
            </p>
          </div>

          {/* NAVEGAÇÃO DE ROTA (ENTRAR / CADASTRAR) */}
          <div className="mt-6 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 flex items-center gap-1 relative z-10">
            <Link
              to="/entrar"
              className="flex-1 py-2 text-xs font-bold rounded-lg text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Entrar</span>
            </Link>

            <div className="flex-1 py-2 text-xs font-bold rounded-lg bg-[#8c5222] text-white shadow-sm flex items-center justify-center gap-1.5 cursor-default">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Cadastrar</span>
            </div>
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
            
            {/* Nome Completo */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Nome Completo</span>
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex: David Bernardo"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Email Institucional ou Pessoal</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="estudante@unilicungo.ac.mz"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
              />
            </div>

            {/* Vínculo Académico e Curso */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>Perfil</span>
                </label>
                <select
                  name="vinculo"
                  value={formData.vinculo}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                >
                  <option value="Estudante">Estudante</option>
                  <option value="Docente">Docente</option>
                  <option value="Artista Local">Artista Local</option>
                  <option value="Visitante">Visitante</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Curso / Depto
                </label>
                <input
                  type="text"
                  name="cursoOuDepto"
                  value={formData.cursoOuDepto}
                  onChange={handleChange}
                  placeholder="Ex: Engenharia TI"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Palavra-passe */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Criar Palavra-passe</span>
              </label>
              <div className="relative">
                <input
                  type={verSenha ? 'text' : 'password'}
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
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

            {/* Confirmação de Palavra-passe */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Confirmar Palavra-passe
              </label>
              <input
                type={verSenha ? 'text' : 'password'}
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                placeholder="Repita a palavra-passe"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
              />
            </div>

            {/* Termos e Condições */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="aceitouTermos"
                name="aceitouTermos"
                checked={formData.aceitouTermos}
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#0088ce] focus:ring-[#0088ce]"
              />
              <label htmlFor="aceitouTermos" className="text-[11px] text-slate-600 leading-tight cursor-pointer">
                Concordo com os regulamentos e políticas de publicação da Galeria UniLicungo.
              </label>
            </div>

            {/* Botão Cadastrar */}
            <button
              type="submit"
              className="w-full bg-[#8c5222] hover:bg-[#73421a] text-white font-bold text-xs py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Criar Conta</span>
            </button>

            {/* CHAMADA PARA ENTRAR */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Já tem uma conta registada?{' '}
                <Link
                  to="/entrar"
                  className="font-bold text-[#0088ce] hover:underline inline-flex items-center gap-1"
                >
                  <span>Iniciar Sessão</span>
                </Link>
              </p>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}