import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Palette, 
  Camera, 
  Component, 
  Layers, 
  Eye, 
  Heart, 
  Upload, 
  Award,
  BookOpen
} from 'lucide-react';

// Dados fictícios para demonstração do layout (serão substituídos pelo Supabase)
const FEATURED_ARTWORKS = [
  {
    id: 1,
    title: 'Sons do Bons Sinais',
    artist: 'Lúcia Nhamusse',
    course: 'Licenciatura em Ensino de Música',
    category: 'Pintura',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    status: 'Em Exposição',
    likes: 24
  },
  {
    id: 2,
    title: 'Manhã no Rio dos Bons Sinais',
    artist: 'Mateus Mabote',
    course: 'Engenharia Informática',
    category: 'Fotografia Digital',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80',
    status: 'Disponível',
    price: '4.500 MT',
    likes: 42
  },
  {
    id: 3,
    title: 'Tradição e Modernidade',
    artist: 'Anísia Cossa',
    course: 'Design & Multimédia',
    category: 'Arte Digital',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    status: 'Disponível',
    price: '3.000 MT',
    likes: 18
  },
  {
    id: 4,
    title: 'Escultura da Resiliência',
    artist: 'Afonso Bila',
    course: 'Artes Visuais',
    category: 'Escultura',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    status: 'Apenas Exposição',
    likes: 31
  }
];

const CATEGORIES = [
  { name: 'Pintura & Desenho', icon: Palette, count: '32 obras', color: 'bg-blue-50 text-[#0088ce]' },
  { name: 'Fotografia Digital', icon: Camera, count: '45 obras', color: 'bg-amber-50 text-[#8c5222]' },
  { name: 'Escultura & Cerâmica', icon: Component, count: '14 obras', color: 'bg-[#0088ce]/10 text-[#0088ce]' },
  { name: 'Arte Digital & Design', icon: Layers, count: '28 obras', color: 'bg-[#8c5222]/10 text-[#8c5222]' }
];

export default function Inicio() {
  return (
    <div className="space-y-16 pb-12">
      
      {/* 1. SECÇÃO HERO (Apresentação Principal) */}
      <section className="relative overflow-hidden bg-linear-to-b from-sky-50/70 via-white to-slate-50 pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texto Principal do Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100/80 text-[#0088ce] text-xs font-bold tracking-wide">
                <span>Plataforma Cultural da Universidade Licungo</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                O talento artístico da <span className="text-[#0088ce]">UniLicungo</span> numa galeria virtual.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Explore, aprecie e adquira obras originais criadas por estudantes e docentes da Universidade Licungo. Um espaço aberto à criatividade, expressão e cultura académica.
              </p>

              {/* Botões de Ação do Hero */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link 
                to="/obras"
                 className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#0088ce] hover:bg-[#0077b5] text-white font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-[#0088ce]/25">
                  <span>Explorar Galeria</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link  
                to="/publicar"
                 className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-[#8c5222] border-2 border-[#8c5222]/20 font-bold px-6 py-3.5 rounded-xl transition">
                  <Upload className="w-4 h-4 text-[#8c5222]" />
                  <span>Submeter a Minha Obra</span>
                </Link>
              </div>

              {/* Estatísticas Rápidas */}
              <div className="pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="text-2xl font-black text-slate-900">120+</p>
                  <p className="text-xs text-slate-500 font-medium">Obras Expostas</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0088ce]">45+</p>
                  <p className="text-xs text-slate-500 font-medium">Artistas Académicos</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#8c5222]">8</p>
                  <p className="text-xs text-slate-500 font-medium">Cursos Representados</p>
                </div>
              </div>

            </div>

            {/* Imagem / Cartão de Destaque no Hero */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Elemento Decorativo Atrás da Imagem */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#0088ce] to-[#8c5222] rounded-3xl blur-xl opacity-20"></div>

                <div className="relative bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
                  <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80" 
                      alt="Obra em Destaque" 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#8c5222] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      Destaque do Mês
                    </span>
                  </div>

                  <div className="p-2 space-y-1">
                    <span className="text-xs font-semibold text-[#0088ce] uppercase tracking-wider">
                      Pintura a Óleo
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">Sons do Bons Sinais</h3>
                    <p className="text-xs text-slate-500">Por Lúcia Nhamusse — Licenciatura em Ensino de Música</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECÇÃO DE CATEGORIAS / EXPRESSÕES ARTÍSTICAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Expressões Artísticas
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Navegue pelas diferentes modalidades artísticas produzidas nos nossos campi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-[#0088ce] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{cat.count}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SECÇÃO DE OBRAS EM DESTAQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-[#8c5222] uppercase tracking-wider">
              Exposição Recente
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Obras em Destaque
            </h2>
          </div>

          <Link 
            to="/obras" 
            className="flex items-center gap-2 text-sm font-bold text-[#0088ce] hover:text-[#006699] transition-colors"
          >
            <span>Ver Todo o Catálogo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grelha de Cartões de Obras */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_ARTWORKS.map((art) => (
            <div 
              key={art.id} 
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Imagem da Obra */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img 
                  src={art.image} 
                  alt={art.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge de Estado */}
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {art.status}
                </span>

                {/* Botão de Curtir / Favoritos */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 flex items-center justify-center transition shadow-sm">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Informações da Obra */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-bold text-[#0088ce] uppercase tracking-wider block mb-1">
                    {art.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-[#0088ce] transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Por <span className="font-semibold text-slate-800">{art.artist}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {art.course}
                  </p>
                </div>

                {/* Preço e Botão de Ação */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-extrabold text-sm text-[#8c5222]">
                    {art.price || 'Apenas Exposição'}
                  </span>
                  <button className="p-2 rounded-lg bg-sky-50 hover:bg-[#0088ce] text-[#0088ce] hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 4. SECÇÃO BANNER CHAMADA PARA AÇÃO (CTA Estudante/Docente) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 overflow-hidden shadow-2xl border-b-4 border-[#0088ce]">
          
          {/* Círculos Decorativos no Fundo */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-[#0088ce]/10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-[#8c5222]/20 blur-2xl"></div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Espaço para Artistas Académicos</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              É estudante ou docente da Universidade Licungo?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Exponha as suas pinturas, fotos, esculturas ou projectos digitais na nossa galeria oficial. Crie o seu perfil de artista e mostre o seu talento à comunidade universitária e ao mundo.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to="/publicar"
               className="flex items-center justify-center gap-2 bg-[#8c5222] hover:bg-[#73421a] text-white font-bold px-6 py-3 rounded-xl transition shadow-md">
                <Upload className="w-4 h-4 text-amber-300" />
                <span>Submeter a Minha Obra</span>
              </Link>
              
              <Link
                to="/sobre"
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-xl transition border border-slate-700"
              >
                <BookOpen className="w-4 h-4 text-[#0088ce]" />
                <span>Ver Regulamento de Submissão</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}