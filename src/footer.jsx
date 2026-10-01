
import { 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  ArrowUpRight,
  Palette
} from 'lucide-react';
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-[#0088ce] mt-auto">
      
      {/* 1. Secção Principal do Rodapé */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Coluna 1: Identificação Institucional & Sobre */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/icone.png" 
                alt="Lo" 
                className="h-12 w-auto bg-white p-1 rounded-lg object-contain shadow-sm"
              />
              <div>
                <h3 className="font-bold text-lg text-white tracking-tight">Galeria de Arte</h3>
                <p className="text-xs text-[#8c5222] font-semibold tracking-wider uppercase">
                  Universidade Licungo
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Espaço digital dedicado à valorização, exposição e divulgação da produção artística e cultural dos estudantes e docentes da Universidade Licungo.
            </p>

            {/* Redes Sociais */}
            <div className="pt-2 flex items-center gap-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#0088ce] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <span className="text-sm font-bold" aria-hidden="true">f</span>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#8c5222] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <span className="text-sm font-bold" aria-hidden="true">◎</span>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#0088ce] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold" aria-hidden="true">in</span>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#8c5222] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Website Institucional"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos de Navegação */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#0088ce] pl-3 mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                to={"/"}
                
                className="hover:text-[#0088ce] transition-colors flex items-center gap-1.5">
                  <span className="text-[#0088ce]">›</span> Início
                </Link>
              </li>
              <li>
                <Link
                 to={"/obras"} 
                 className="hover:text-[#0088ce] transition-colors flex items-center gap-1.5">
                  <span className="text-[#0088ce]">›</span> Catálogo de Obras
                </Link>
              </li>
              <li>
                <Link 
                to={"/exposicoes"}
                 className="hover:text-[#0088ce] transition-colors flex items-center gap-1.5">
                  <span className="text-[#0088ce]">›</span> Exposições Virtuais
                </Link>
              </li>
              <li>
                <Link
                to={"/artistas"}
                className="hover:text-[#0088ce] transition-colors flex items-center gap-1.5">
                  <span className="text-[#0088ce]">›</span> Directório de Artistas
                </Link>
              </li>
              <li>
                <Link 
                to={"/sobre"}
                className="hover:text-[#0088ce] transition-colors flex items-center gap-1.5">
                  <span className="text-[#0088ce]">›</span> Sobre o Projecto
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Categorias de Arte */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#8c5222] pl-3 mb-4">
              Expressões Artísticas
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                  <Link 
                to={"/obras"}
                 className="hover:text-[#8c5222] transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform">Pintura & Desenho</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#8c5222] transition-opacity" />
                </Link>
              </li>
              <li>
                 <Link 
                to={"/obras"}

                 className="hover:text-[#8c5222] transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform">Fotografia Digital</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#8c5222] transition-opacity" />
                </Link>
              </li>
              <li>
                 <Link 
                to={"/obras"}
                 className="hover:text-[#8c5222] transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform">Escultura & Cerâmica</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#8c5222] transition-opacity" />
                </Link>
              </li>
              <li>
                <Link 
                to={"/obras"}
                className="hover:text-[#8c5222] transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform">Arte Digital & Design</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#8c5222] transition-opacity" />
                </Link>
              </li>
              <li>
                 <Link 
                to={"/obras"}
                className="hover:text-[#8c5222] transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform">Artesanato & Cultura Local</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#8c5222] transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contacto Institucional */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#0088ce] pl-3 mb-4">
              Contactos
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0088ce] shrink-0 mt-1" />
                <span>Universidade Licungo, Quelimane — Moçambique</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#8c5222] shrink-0" />
                <span>galeria@unilicungo.ac.mz</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0088ce] shrink-0" />
                <span>+258 24 218 000</span>
              </div>
            </div>

            {/* Caixinha de destaque / Dica */}
            <div className="mt-5 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 flex items-center gap-2.5">
              <Palette className="w-5 h-5 text-amber-400 shrink-0" />
              <span>É estudante ou docente? Submeta a sua obra para apreciação académica.</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Barra Inferior (Direitos Autorais & Créditos) */}
      <div className="bg-slate-950 py-4 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <span className="text-white font-medium">Universidade Licungo</span>. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-slate-200 transition-colors">Política de Privacidade</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200 transition-colors">Termos de Uso</a>
            
          </div>

        </div>
      </div>

    </footer>
  );
}