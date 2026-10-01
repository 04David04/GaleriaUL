import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  PlusCircle, 
  User 
} from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lista de rotas do menu de navegação
  const navLinks = [
    { path: '/', label: 'Início', mobileLabel: 'Início', end: true },
    { path: '/obras', label: 'Obras', mobileLabel: 'Obras de Arte' },
    { path: '/exposicoes', label: 'Exposições', mobileLabel: 'Exposições Virtuais' },
    { path: '/artistas', label: 'Artistas', mobileLabel: 'Estudantes / Artistas' },
    { path: '/sobre', label: 'Sobre', mobileLabel: 'Sobre a Galeria' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          
          {/* 1. Logótipo com redirecionamento para a página principal */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img 
              src="src/assets/icone.png"
              alt="Logótipo Universidade Licungo" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="border-l border-slate-200 pl-2 sm:pl-3">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-lg tracking-tight text-slate-900 leading-tight">
                  Galeria
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#8c5222] font-semibold tracking-wider uppercase hidden sm:block">
                Universidade Licungo
              </p>
            </div>
          </Link>

          {/* 2. Barra de Pesquisa (Sempre visível em todos os ecrãs) */}
          <div className="flex flex-1 max-w-md mx-1 sm:mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:border-[#0088ce] focus:bg-white focus:ring-2 focus:ring-[#0088ce]/20 transition-all placeholder:text-slate-400"
              />
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* 3. Links de Navegação Desktop (usando NavLink) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  `pb-1 transition-colors ${
                    isActive
                      ? 'text-[#0088ce] font-bold border-b-2 border-[#0088ce]'
                      : 'text-slate-700 hover:text-[#8c5222]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* 4. Botões de Acção Desktop */}
          <div className="hidden sm:flex items-center gap-2 md:gap-3">
            <Link
              to="/publicar"
              className="flex items-center gap-2 bg-[#8c5222] hover:bg-[#73421a] text-white text-xs font-semibold px-3 md:px-4 py-2.5 rounded-lg transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-amber-200" />
              <span className="hidden md:inline">Publicar Obra</span>
            </Link>

            <Link
              to="/entrar"
              className="flex items-center gap-2 bg-sky-50 hover:bg-sky-100 text-[#0088ce] border border-[#0088ce]/30 text-xs font-bold px-3 md:px-4 py-2.5 rounded-lg transition"
            >
              <User className="w-4 h-4 text-[#0088ce]" />
              <span className="hidden md:inline">Entrar</span>
            </Link>
          </div>

          {/* 5. Botão do Menu Hambúrguer (Mobile) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition focus:outline-none"
              aria-label="Abrir Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#8c5222]" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#0088ce]" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 6. Menu Desdobrável Mobile (usando NavLink) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg">
          
          <div className="flex flex-col space-y-1 pt-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm transition ${
                    isActive
                      ? 'bg-sky-50 text-[#0088ce] font-bold'
                      : 'text-slate-700 hover:bg-amber-50 hover:text-[#8c5222] font-medium'
                  }`
                }
              >
                {link.mobileLabel}
              </NavLink>
            ))}
          </div>

          {/* Botões de Ação Mobile */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/publicar"
              onClick={closeMobileMenu}
              className="w-full flex items-center justify-center gap-2 bg-[#8c5222] text-white text-sm font-semibold py-2.5 rounded-lg shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-amber-200" />
              <span>Publicar Nova Obra</span>
            </Link>
            <Link
              to="/entrar"
              onClick={closeMobileMenu}
              className="w-full flex items-center justify-center gap-2 bg-sky-50 text-[#0088ce] border border-[#0088ce]/30 text-sm font-bold py-2.5 rounded-lg"
            >
              <User className="w-4 h-4 text-[#0088ce]" />
              <span>Entrar na Conta</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}