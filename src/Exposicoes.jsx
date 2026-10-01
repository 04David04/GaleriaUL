import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Eye, 
  Filter, 
  Search, 
  ArrowRight,  
  User,
  PlusCircle
} from 'lucide-react';

// Dados de Exemplo das Exposições
const MOCK_EXPOSICOES = [
  {
    id: '1',
    titulo: 'Expressões da Zambézia: Arte, Cultura e Identidade',
    descricao: 'Uma mostra profunda sobre as tradições visuais, esculturas em madeira e pintura contemporânea da província da Zambézia.',
    imagem: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000&auto=format&fit=crop',
    categoria: 'Virtual & Presencial',
    status: 'atual', // 'atual' | 'proxima' | 'passada'
    tipo: 'virtual', // 'virtual' | 'presencial'
    dataInicio: '10 Setembro 2026',
    dataFim: '30 Outubro 2026',
    local: 'Campus Quelimane & Galeria 3D',
    curador: 'Prof. Nelson Mabunda',
    obrasCount: 24,
    destaque: true
  },
  {
    id: '2',
    titulo: 'Olhares de Quelimane: Fotografia Urbana Estudantil',
    descricao: 'Fotografias capturadas por estudantes da UniLicungo revelando o quotidiano, a arquitetura e os rostos da cidade de Quelimane.',
    imagem: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1000&auto=format&fit=crop',
    categoria: 'Fotografia',
    status: 'atual',
    tipo: 'virtual',
    dataInicio: '01 Setembro 2026',
    dataFim: '15 Novembro 2026',
    local: 'Plataforma Virtual Galeria UL',
    curador: 'Estudantes do Curso de Comunicação',
    obrasCount: 40,
    destaque: false
  },
  {
    id: '3',
    titulo: 'Esculturas Contemporâneas e Reciclagem Criativa',
    descricao: 'Projetos artísticos de reaproveitamento de materiais metálicos e madeira para criação de esculturas tridimensionais.',
    imagem: 'https://images.unsplash.com/photo-1544411047-c491e34a2465?q=80&w=1000&auto=format&fit=crop',
    categoria: 'Escultura',
    status: 'proxima',
    tipo: 'presencial',
    dataInicio: '20 Outubro 2026',
    dataFim: '05 Dezembro 2026',
    local: 'Átrio Central - UniLicungo',
    curador: 'Dep. de Artes e Educação',
    obrasCount: 15,
    destaque: false
  },
  {
    id: '4',
    titulo: 'Retrospectiva de Artes Visuais UniLicungo 2025',
    descricao: 'Compilação das melhores obras selecionadas durante o ano letivo de 2025 nas áreas de pintura, desenho e escultura.',
    imagem: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1000&auto=format&fit=crop',
    categoria: 'Pintura e Desenho',
    status: 'passada',
    tipo: 'virtual',
    dataInicio: '15 Março 2025',
    dataFim: '20 Junho 2025',
    local: 'Arquivo Virtual',
    curador: 'Conselho Pedagógico de Artes',
    obrasCount: 52,
    destaque: false
  }
];

export default function Exposicoes() {
  const [filtroStatus, setFiltroStatus] = useState('todas');
  const [busca, setBusca] = useState('');

  // Filtragem dos dados
  const exposicoesFiltradas = MOCK_EXPOSICOES.filter((expo) => {
    const atendeStatus = 
      filtroStatus === 'todas' || 
      (filtroStatus === 'atual' && expo.status === 'atual') ||
      (filtroStatus === 'proxima' && expo.status === 'proxima') ||
      (filtroStatus === 'virtual' && expo.tipo === 'virtual') ||
      (filtroStatus === 'passada' && expo.status === 'passada');

    const atendeBusca = 
      expo.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      expo.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      expo.curador.toLowerCase().includes(busca.toLowerCase());

    return atendeStatus && atendeBusca;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* 1. HERO SECTION BANNER */}
      <section className="relative bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0088ce_1px,transparent_1px)] bg-size-[16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left md:flex items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0088ce]/20 border border-[#0088ce]/40 text-[#0088ce] text-xs font-bold uppercase tracking-wider mb-4">
              Espaço Cultural Virtual
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Exposições de Arte
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore mostras artísticas, exibições virtuais e coleções temáticas produzidas pela comunidade académica e artistas convidados da Universidade Licungo.
            </p>
          </div>

          <div className="mt-8 md:mt-0 shrink-0 flex flex-col sm:flex-row gap-3">
            <a
              href="#exposicoes-grid"
                 onClick={() => setFiltroStatus("atual")}
              className="inline-flex items-center justify-center gap-2 bg-[#0088ce] hover:bg-sky-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-lg shadow-[#0088ce]/20"
            >
              <Eye className="w-4 h-4" />
              <span>Ver Exposições Ativas</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. BARRA DE FILTROS E PESQUISA */}
      <div id="exposicoes-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* Botões de Filtro */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'todas', label: 'Todas' },
              { id: 'atual', label: 'Em Exibição' },
              { id: 'proxima', label: 'Próximas' },
              { id: 'virtual', label: 'Virtuais' },
              { id: 'passada', label: 'Arquivo' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFiltroStatus(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  filtroStatus === tab.id
                    ? 'bg-[#8c5222] text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Campo de Pesquisa Interna */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar exposição ou curador..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

        </div>
      </div>

      {/* 3. GRID DE EXPOSIÇÕES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {exposicoesFiltradas.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Nenhuma exposição encontrada</h3>
            <p className="text-xs text-slate-500 mt-1">
              Tente alterar os filtros de pesquisa ou o termo pesquisado.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exposicoesFiltradas.map((expo) => (
              <article
                key={expo.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Imagem do Banner */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={expo.imagem}
                    alt={expo.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badges Flutuantes */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {expo.status === 'atual' && (
                      <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Em Exibição
                      </span>
                    )}
                    {expo.status === 'proxima' && (
                      <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Em Breve
                      </span>
                    )}
                    {expo.status === 'passada' && (
                      <span className="bg-slate-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Encerrada
                      </span>
                    )}
                    
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                      {expo.categoria}
                    </span>
                  </div>

                  {/* Contador de obras */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#0088ce]" />
                    <span>{expo.obrasCount} Obras</span>
                  </div>
                </div>

                {/* Conteúdo do Cartão */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0088ce] transition-colors leading-snug">
                      {expo.titulo}
                    </h3>
                    
                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                      {expo.descricao}
                    </p>
                  </div>

                  {/* Detalhes de Data, Local e Curadoria */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#8c5222] shrink-0" />
                      <span>{expo.dataInicio} — {expo.dataFim}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#0088ce] shrink-0" />
                      <span className="truncate">{expo.local}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">Curadoria: <strong className="text-slate-700 font-medium">{expo.curador}</strong></span>
                    </div>
                  </div>

                  {/* Botão de Ação */}
                  <div className="pt-2">
                    <Link
                      to={`/verexposicoes`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-sky-50 hover:bg-[#0088ce] text-[#0088ce] hover:text-white text-xs font-bold py-2.5 rounded-xl transition duration-200"
                    >
                      <span>Explorar Exposição</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. CALL TO ACTION - PROPÕE UMA EXPOSIÇÃO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-linear-to-r from-[#8c5222] to-[#73421a] rounded-3xl p-8 sm:p-12 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-amber-200 text-xs font-bold uppercase tracking-wider">
              Oportunidade para Estudantes e Docentes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Quer organizar uma Exposição Virtual?
            </h2>
            <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed">
              Submeta a sua proposta de curadoria ou coleção de trabalhos académicos para exibição oficial na plataforma da Galeria UniLicungo.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/criarexposicao"
              className="inline-flex items-center gap-2 bg-white text-[#8c5222] hover:bg-amber-50 font-bold text-sm px-6 py-3.5 rounded-xl transition shadow-md"
            >
              <PlusCircle className="w-4 h-4 text-[#8c5222]" />
              <span>Submeter Proposta</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}