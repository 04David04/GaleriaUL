import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Palette, 
  GraduationCap, 
  Award, 
  ArrowRight, 
  Filter, 
  PlusCircle,
  MapPin
} from 'lucide-react';

// Dados de Exemplo dos Artistas / Estudantes / Docentes
const MOCK_ARTISTAS = [
  {
    id: '1',
    nome: 'Ana Paula Sitoe',
    papel: 'Estudante',
    cursoOuDepto: 'Engenharia de Redes & TI',
    localizacao: 'Quelimane',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    especialidades: ['Fotografia Digital', 'Arte Digital'],
    biografia: 'Explora a interseção entre tecnologia e cultura moçambicana através da fotografia urbana e retoque digital.',
    obrasPublicadas: 12,
    destaque: true
  },
  {
    id: '2',
    nome: 'Prof. Carlos Tembe',
    papel: 'Docente',
    cursoOuDepto: 'Departamento de Artes e Educação',
    localizacao: 'Campus Quelimane',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    especialidades: ['Escultura em Madeira', 'Pintura a Óleo'],
    biografia: 'Mestre em Artes Visuais com foco na preservação das técnicas de escultura tradicional do centro de Moçambique.',
    obrasPublicadas: 28,
    destaque: false
  },
  {
    id: '3',
    nome: 'Mateus Vilanculos',
    papel: 'Estudante',
    cursoOuDepto: 'Licenciatura em Comunicação',
    localizacao: 'Mocuba',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    especialidades: ['Fotografia Documental', 'Videoarte'],
    biografia: 'Registra a vida quotidiana, mercados locais e tradições orais ao longo do rio dos Bons Sinais.',
    obrasPublicadas: 19,
    destaque: false
  },
  {
    id: '4',
    nome: 'Zenaida Ramos',
    papel: 'Artista Convidada',
    cursoOuDepto: 'Associação de Artistas da Zambézia',
    localizacao: 'Quelimane',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    especialidades: ['Pintura Acrílica', 'Muralismo'],
    biografia: 'Pintora contemporânea reconhecida pelo uso vibrante de cores inspiradas nas capulanas e paisagens costeiras.',
    obrasPublicadas: 15,
    destaque: true
  },
  {
    id: '5',
    nome: 'Ausse Chirindza',
    papel: 'Estudante',
    cursoOuDepto: 'Engenharia Informática',
    localizacao: 'Quelimane',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
    especialidades: ['Ilustração 3D', 'Design Gráfico'],
    biografia: 'Cria ilustrações conceptuais e modelação tridimensional inspiradas no folclore e na ficção científica africana.',
    obrasPublicadas: 8,
    destaque: false
  },
  {
    id: '6',
    nome: 'Elsa Nguenha',
    papel: 'Estudante',
    cursoOuDepto: 'Ensino de História e Geografia',
    localizacao: 'Quelimane',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    especialidades: ['Desenho a Carvão', 'Tapeçaria'],
    biografia: 'Dedicada ao desenho figurativo e retratos históricos de figuras marcantes da história de Moçambique.',
    obrasPublicadas: 11,
    destaque: false
  }
];

export default function Artistas() {
  const [categoria, setCategoria] = useState('todos');
  const [busca, setBusca] = useState('');

  // Filtragem
  const artistasFiltrados = MOCK_ARTISTAS.filter((artista) => {
    const atendeCategoria = 
      categoria === 'todos' ||
      (categoria === 'estudantes' && artista.papel === 'Estudante') ||
      (categoria === 'docentes' && artista.papel === 'Docente') ||
      (categoria === 'convidados' && artista.papel === 'Artista Convidado');

    const atendeBusca = 
      artista.nome.toLowerCase().includes(busca.toLowerCase()) ||
      artista.cursoOuDepto.toLowerCase().includes(busca.toLowerCase()) ||
      artista.especialidades.some(esp => esp.toLowerCase().includes(busca.toLowerCase()));

    return atendeCategoria && atendeBusca;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* 1. HERO SECTION BANNER */}
      <section className="relative bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0088ce_1px,transparent_1px)] background-size-[16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left md:flex items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              Comunidade Criativa UniLicungo
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Artistas & Criadores
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Conheça os estudantes, docentes e talentos da Universidade Licungo e da Zambézia que dão vida às nossas galerias de pintura, escultura, fotografia e arte digital.
            </p>
          </div>
        </div>
      </section>

      {/* 2. BARRA DE FILTROS E PESQUISA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* Categorias / Funções */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'todos', label: 'Todos os Criadores' },
              { id: 'estudantes', label: 'Estudantes' },
              { id: 'docentes', label: 'Docentes' },
              { id: 'convidados', label: 'Artistas Locais' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoria(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  categoria === tab.id
                    ? 'bg-[#0088ce] text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Campo de Pesquisa */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar por nome, curso ou arte..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

        </div>
      </div>

      {/* 3. GRID DE ARTISTAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {artistasFiltrados.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Nenhum artista encontrado</h3>
            <p className="text-xs text-slate-500 mt-1">
              Tente pesquisar por outro termo ou alterar o filtro selecionado.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artistasFiltrados.map((artista) => (
              <article
                key={artista.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Indicador de Destaque */}
                {artista.destaque && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <span>Destaque</span>
                  </div>
                )}

                <div>
                  {/* Cabeçalho do Perfil (Avatar + Informação Básica) */}
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={artista.avatar}
                        alt={artista.nome}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-[#0088ce] transition-colors"
                      />
                      <span className="absolute -bottom-1 -right-1 bg-sky-50 text-[#0088ce] border border-[#0088ce]/30 rounded-full p-1 shadow-sm">
                        {artista.papel === 'Estudante' ? (
                          <GraduationCap className="w-3.5 h-3.5" />
                        ) : artista.papel === 'Docente' ? (
                          <Award className="w-3.5 h-3.5 text-[#8c5222]" />
                        ) : (
                          <Palette className="w-3.5 h-3.5 text-amber-600" />
                        )}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1 pr-6">
                      <h3 className="font-bold text-slate-900 text-base truncate group-hover:text-[#0088ce] transition-colors">
                        {artista.nome}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#8c5222]"></span>
                        <span className="text-xs font-semibold text-[#8c5222]">
                          {artista.papel}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {artista.cursoOuDepto}
                      </p>
                    </div>
                  </div>

                  {/* Localização */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{artista.localizacao}</span>
                  </div>

                  {/* Biografia */}
                  <p className="text-slate-600 text-xs mt-3 line-clamp-3 leading-relaxed">
                    {artista.biografia}
                  </p>

                  {/* Tags de Especialidades */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {artista.especialidades.map((esp, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                      >
                        {esp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rodapé do Cartão */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Palette className="w-4 h-4 text-[#0088ce]" />
                    <span><strong className="text-slate-800">{artista.obrasPublicadas}</strong> Obras</span>
                  </div>

                  <Link
                    to={`/verperfil`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0088ce] hover:text-sky-700 transition"
                  >
                    <span>Ver Perfil</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. CALL TO ACTION - JUNTE-SE À GALERIA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-700">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-[#0088ce] text-xs font-bold uppercase tracking-wider">
              Comunidade de Talentos
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              É estudante ou docente da UniLicungo?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Exponha os seus trabalhos de pintura, fotografia, escultura ou design na nossa galeria oficial e partilhe a sua arte com a comunidade académica.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              to="/publicar"
              className="inline-flex items-center justify-center gap-2 bg-[#0088ce] hover:bg-sky-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar Trabalho</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}