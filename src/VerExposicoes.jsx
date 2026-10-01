import { useState } from 'react';
import {  useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  Sparkles, 
  PlusCircle, 
  CheckCircle2, 
  Share2, 
  Heart, 
  Eye, 
  Layers, 
  Info, 
  X, 
  Check, 
  Lock,  
  Building2,
  GraduationCap,
  ShoppingBag
} from 'lucide-react';

// Dados fictícios com ficha técnica completa para o modal de detalhes
const MOCK_EXPOSITION_DETAILS = {
  id: 'exp-101',
  title: 'Cores e Texturas da Zambézia',
  category: 'Pintura & Artes Mistas',
  curator: 'Prof. Dr. Mateus Mabote',
  campus: 'Campus Quelimane (UniLicungo)',
  locationType: 'Híbrido (Presencial & Virtual)',
  startDate: '10 de Outubro de 2026',
  endDate: '30 de Outubro de 2026',
  status: 'Inscrições Abertas',
  isCollaborative: true,
  maxArtworksPerArtist: 3,
  coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
  description: `Esta exposição celebra a riqueza paisagística, humana e cultural da província da Zambézia através do olhar dos estudantes e professores da Universidade Licungo. Reunindo obras de pintura a óleo, acrílico e colagens de materiais reciclados locais, a mostra explora a resiliência e as identidades fluviais de Quelimane.`,
  rules: [
    'Aberto a todos os estudantes e docentes da UniLicungo com cadastro ativo.',
    'Cada participante pode vincular até 3 obras originais publicadas na plataforma.',
    'As obras submetidas passam por uma validação rápida da curadoria antes da exibição final.',
    'Formatos aceites: Pintura, Desenho, Colagem e Arte Mista.'
  ],
  // Obras integrantes com ficha técnica completa
  obrasExpostas: [
    {
      id: 'o1',
      title: 'Sons do Bons Sinais',
      artist: 'Lúcia Nhamusse',
      course: 'Licenciatura em Ensino de Música',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      category: 'Pintura',
      likes: 34,
      year: '2025',
      dimensions: '120 x 80 cm',
      technique: 'Óleo sobre tela',
      status: 'Apenas Exposição',
      price: null,
      description: 'Obra inspirada no ritmo e movimento das águas do Rio dos Bons Sinais em Quelimane, transmitindo paz e identidade cultural zambeziana.'
    },
    {
      id: 'o2',
      title: 'Manhã no Rio',
      artist: 'Mateus Mabote',
      course: 'Engenharia Informática',
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80',
      category: 'Fotografia Digital',
      likes: 28,
      year: '2026',
      dimensions: '60 x 40 cm (Impressão FineArt)',
      technique: 'Fotografia de Longa Exposição',
      status: 'Disponível',
      price: 4500,
      description: 'Captura fotográfica no alvorecer da baía de Quelimane, explorando os tons quentes do sol nascente sobre as amarrações dos barcos de pesca.'
    },
    {
      id: 'o3',
      title: 'Resiliência Zambeziana',
      artist: 'Afonso Bila',
      course: 'Artes Visuais',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      category: 'Escultura',
      likes: 19,
      year: '2024',
      dimensions: '45 x 30 x 25 cm',
      technique: 'Escultura em Madeira de Ébano e Bronze',
      status: 'Apenas Exposição',
      price: null,
      description: 'Escultura esculpida à mão representando a força do povo moçambicano perante as adversidades climáticas na região centro.'
    }
  ]
};

// Minhas Obras Publicadas no Perfil (para o Modal de Vincular)
const MOCK_MINHAS_OBRAS = [
  {
    id: 'm1',
    title: 'Amanhecer no Campus',
    category: 'Pintura A óleo',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80',
    date: '20 Set 2026',
    alreadyLinked: false
  },
  {
    id: 'm2',
    title: 'Retrato de Quelimane',
    category: 'Desenho',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
    date: '15 Ago 2026',
    alreadyLinked: false
  },
  {
    id: 'm3',
    title: 'Ritmos Macua',
    category: 'Arte Digital',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80',
    date: '02 Set 2026',
    alreadyLinked: true
  }
];

export default function VerExposicao() {
//   const { id } = useParams();
  const navigate = useNavigate();

  // Estados Locais
  const [activeTab, setActiveTab] = useState('obras');
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Estado para Modal de Vincular Obras
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtworkIds, setSelectedArtworkIds] = useState([]);
  const [linkedSuccess, setLinkedSuccess] = useState(false);

  // Estado para Modal de Detalhes da Obra
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Toggle de Seleção de Obras no Modal de Vinculação
  const toggleSelectArtwork = (artworkId) => {
    if (selectedArtworkIds.includes(artworkId)) {
      setSelectedArtworkIds(selectedArtworkIds.filter(id => id !== artworkId));
    } else {
      if (selectedArtworkIds.length >= MOCK_EXPOSITION_DETAILS.maxArtworksPerArtist) {
        alert(`O limite máximo para esta exposição é de ${MOCK_EXPOSITION_DETAILS.maxArtworksPerArtist} obras por participante.`);
        return;
      }
      setSelectedArtworkIds([...selectedArtworkIds, artworkId]);
    }
  };

  // Submeter Vinculação
  const handleConfirmVincular = (e) => {
    e.preventDefault();
    if (selectedArtworkIds.length === 0) return;

    setLinkedSuccess(true);
    setTimeout(() => {
      setLinkedSuccess(false);
      setIsModalOpen(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* 1. BARRA NAVEGAÇÃO TOPO / BOTÃO VOLTAR */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/exposicoes')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0088ce] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar às Exposições</span>
          </button>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-xl border transition ${
                isFavorite 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Guardar Exposição"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>

            <button 
              onClick={() => alert('Link da exposição copiado para a área de transferência!')}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              title="Partilhar"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. CABEÇALHO DA EXPOSIÇÃO (HERO & BANNER) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Banner de Capa */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-900 overflow-hidden">
            <img 
              src={MOCK_EXPOSITION_DETAILS.coverImage} 
              alt={MOCK_EXPOSITION_DETAILS.title}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            {/* Badges do Estado */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">
              <span className="bg-[#0088ce] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {MOCK_EXPOSITION_DETAILS.status}
              </span>

              <span className="bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#8c5222]" />
                {MOCK_EXPOSITION_DETAILS.locationType}
              </span>
            </div>
          </div>

          {/* Conteúdo Informativo Principal */}
          <div className="p-6 sm:p-8 lg:p-10 -mt-12 relative z-10">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-lg">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Título & Detalhes Rápidos */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#8c5222] tracking-wider uppercase">
                    {MOCK_EXPOSITION_DETAILS.category}
                  </span>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {MOCK_EXPOSITION_DETAILS.title}
                  </h1>

                  {/* Informações Metadados */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#0088ce]" />
                      <span>Curadoria: <strong className="text-slate-800">{MOCK_EXPOSITION_DETAILS.curator}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0088ce]" />
                      <span>{MOCK_EXPOSITION_DETAILS.startDate} até {MOCK_EXPOSITION_DETAILS.endDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0088ce]" />
                      <span>{MOCK_EXPOSITION_DETAILS.campus}</span>
                    </div>
                  </div>
                </div>

                {/* Ação de Participar (Para o Artista/Estudante) */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
                  {MOCK_EXPOSITION_DETAILS.isCollaborative ? (
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 bg-[#0088ce] hover:bg-[#0077b5] text-white font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-[#0088ce]/20"
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span>Participar com Minhas Obras</span>
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-500 font-semibold px-4 py-3 rounded-xl text-xs">
                      <Lock className="w-4 h-4" />
                      <span>Exposição Fechada a Novas Submissões</span>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400 text-center">
                    {MOCK_EXPOSITION_DETAILS.isCollaborative 
                      ? `Exposição aberta à comunidade UniLicungo (máx. ${MOCK_EXPOSITION_DETAILS.maxArtworksPerArtist} obras).` 
                      : 'Esta exposição possui curadoria exclusiva.'}
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 3. TABS DE NAVEGAÇÃO DA PÁGINA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="border-b border-slate-200 flex space-x-8">
          <button
            onClick={() => setActiveTab('obras')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'obras' 
                ? 'border-[#0088ce] text-[#0088ce]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Obras Expostas ({MOCK_EXPOSITION_DETAILS.obrasExpostas.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sobre')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'sobre' 
                ? 'border-[#0088ce] text-[#0088ce]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Sobre o Evento & Regulamento</span>
          </button>
        </div>
      </div>

      {/* 4. CONTEÚDO DAS TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* TAB 1: GRELHA DE OBRAS EXPOSTAS */}
        {activeTab === 'obras' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Explore as criações que integram esta exposição virtual e presencial.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_EXPOSITION_DETAILS.obrasExpostas.map((obra) => (
                <div 
                  key={obra.id}
                  onClick={() => setSelectedArtwork(obra)}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img 
                      src={obra.image} 
                      alt={obra.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {obra.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0088ce] transition-colors">
                        {obra.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Por <strong className="text-slate-800">{obra.artist}</strong>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {obra.course}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                        {obra.likes} gostos
                      </span>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArtwork(obra);
                        }}
                        className="text-[#0088ce] font-bold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver Detalhes</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SOBRE A EXPOSIÇÃO E REGULAMENTO */}
        {activeTab === 'sobre' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Conceito e Proposta</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {MOCK_EXPOSITION_DETAILS.description}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Regras e Requisitos de Submissão</h3>
                <ul className="space-y-3">
                  {MOCK_EXPOSITION_DETAILS.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-[#0088ce] shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Ficha Técnica Lateral */}
            <div className="lg:col-span-4 bg-slate-100/70 p-6 rounded-2xl space-y-5 border border-slate-200/60 h-fit">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-200 pb-3">
                Ficha Técnica
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 text-xs block">Organização</span>
                  <span className="font-bold text-slate-800">Direcção de Cultura UniLicungo</span>
                </div>

                <div>
                  <span className="text-slate-400 text-xs block">Local de Visitação Presencial</span>
                  <span className="font-bold text-slate-800">Ateliê Central do Campus de Quelimane</span>
                </div>

                <div>
                  <span className="text-slate-400 text-xs block">Acessibilidade Virtual</span>
                  <span className="font-bold text-slate-800">Disponível em todo o ecossistema digital UniLicungo</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 5. MODAL: PARTICIPAR / VINCULAR OBRAS PUBLICADAS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Cabeçalho do Modal */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-[#0088ce] font-bold uppercase tracking-wider">
                  Participação no Evento
                </span>
                <h2 className="text-xl font-bold">Vincular Obras Publicadas</h2>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Feedback Mensagem de Sucesso */}
            {linkedSuccess ? (
              <div className="p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Obras Submetidas com Sucesso!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  As suas obras foram vinculadas à exposição. A curadoria da UniLicungo irá rever a submissão em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmVincular} className="p-6 space-y-6 overflow-y-auto">
                
                <div className="bg-sky-50 p-4 rounded-xl border border-sky-100 flex items-start gap-3 text-xs sm:text-sm text-sky-900">
                  <Info className="w-5 h-5 text-[#0088ce] shrink-0 mt-0.5" />
                  <p>
                    Selecione quais das suas obras já publicadas no seu perfil deseja submeter para esta exposição. Pode selecionar até <strong>{MOCK_EXPOSITION_DETAILS.maxArtworksPerArtist} obras</strong>.
                  </p>
                </div>

                {/* Lista de Minhas Obras */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Sua Biblioteca de Obras ({MOCK_MINHAS_OBRAS.length})
                  </label>

                  <div className="space-y-3">
                    {MOCK_MINHAS_OBRAS.map((obra) => {
                      const isSelected = selectedArtworkIds.includes(obra.id);
                      
                      return (
                        <div 
                          key={obra.id}
                          onClick={() => !obra.alreadyLinked && toggleSelectArtwork(obra.id)}
                          className={`p-3 sm:p-4 rounded-2xl border transition flex items-center justify-between gap-4 cursor-pointer ${
                            obra.alreadyLinked 
                              ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed' 
                              : isSelected
                              ? 'bg-sky-50/60 border-[#0088ce] ring-2 ring-[#0088ce]/20'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img 
                              src={obra.image} 
                              alt={obra.title} 
                              className="w-14 h-14 rounded-xl object-cover shrink-0"
                            />
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">{obra.title}</h4>
                              <p className="text-xs text-slate-500">{obra.category} • Publicado a {obra.date}</p>
                              {obra.alreadyLinked && (
                                <span className="inline-block mt-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                                  Já vinculada a esta exposição
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Checkbox Visual */}
                          {!obra.alreadyLinked && (
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                              isSelected 
                                ? 'bg-[#0088ce] border-[#0088ce] text-white' 
                                : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Opção Alternativa: Criar/Publicar Nova Obra */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-500">A obra que quer submeter ainda não está publicada?</span>
                  <Link 
                    to="/submeter-obra" 
                    className="font-bold text-[#8c5222] hover:underline flex items-center gap-1"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Publicar Nova Obra Agora</span>
                  </Link>
                </div>

                {/* Botões de Ação do Modal */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition text-sm"
                  >
                    Cancelar
                  </button>

                  <button 
                    type="submit"
                    disabled={selectedArtworkIds.length === 0}
                    className={`px-6 py-2.5 rounded-xl text-white font-bold transition text-sm flex items-center gap-2 ${
                      selectedArtworkIds.length > 0
                        ? 'bg-[#0088ce] hover:bg-[#0077b5] shadow-md shadow-[#0088ce]/25'
                        : 'bg-slate-300 cursor-not-allowed'
                    }`}
                  >
                    <span>Vincular ({selectedArtworkIds.length}) Obras</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* 6. MODAL DE DETALHES DA OBRA (COMO EM OBRAS) */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 relative max-h-[90vh] flex flex-col md:flex-row">
            
            {/* Botão de Fechar */}
            <button
              onClick={() => setSelectedArtwork(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-md transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lado Esquerdo: Imagem Ampliada */}
            <div className="md:w-1/2 bg-slate-950 relative min-h-[280px] md:min-h-full flex items-center justify-center">
              <img
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                className="w-full h-full object-cover max-h-[450px]"
              />
              {selectedArtwork.dimensions && (
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full">
                  {selectedArtwork.dimensions}
                </span>
              )}
            </div>

            {/* Lado Direito: Informações Detalhadas */}
            <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-sky-100 text-[#0088ce] text-[11px] font-bold uppercase mb-2">
                    {selectedArtwork.category}
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
                    {selectedArtwork.title}
                  </h2>
                </div>

                {/* Informações do Autor */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                  <p className="text-xs text-slate-500">Autor(a) da Obra:</p>
                  <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#8c5222]" />
                    {selectedArtwork.artist}
                  </p>
                  <p className="text-xs text-slate-600 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-slate-400" />
                    {selectedArtwork.course}
                  </p>
                </div>

                {/* Ficha Técnica */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block">Técnica:</span>
                    <span className="font-semibold text-slate-700">{selectedArtwork.technique || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Ano de Criação:</span>
                    <span className="font-semibold text-slate-700">{selectedArtwork.year || '2025'}</span>
                  </div>
                </div>

                {/* Descrição */}
                {selectedArtwork.description && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                      Sobre a Obra
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedArtwork.description}
                    </p>
                  </div>
                )}

              </div>

              {/* Rodapé do Modal */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Estado / Valor:</span>
                    <span className="text-xl font-extrabold text-[#8c5222]">
                      {selectedArtwork.price 
                        ? `${selectedArtwork.price.toLocaleString('pt-MZ')} MT` 
                        : 'Apenas Exposição'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span>{selectedArtwork.likes || 0} gostos</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {selectedArtwork.price ? (
                    <button className="flex-1 bg-[#0088ce] hover:bg-[#0077b5] text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Demonstrar Interesse em Comprar</span>
                    </button>
                  ) : (
                    <button className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Obra Integrante da Galeria UniLicungo</span>
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}