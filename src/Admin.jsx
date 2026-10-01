import { useState, useMemo } from 'react';
import {Link} from 'react-router-dom'
import {
  LayoutDashboard,
  Palette,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Eye,
  Search,
  Plus,
  Edit,
  Trash2,
  Layers,
  X,
  AlertCircle,
  TrendingUp,
  Calendar,
} from 'lucide-react';

// --- DADOS FICTÍCIOS INICIAIS ---
const INITIAL_SUBMISSIONS = [
  {
    id: 101,
    title: 'Amanhecer em Quelimane',
    artist: 'Sérgio Mabunda',
    category: 'Fotografia Digital',
    course: 'Engenharia Informática',
    submittedAt: '2026-09-28',
    status: 'Pendente',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=600&q=80',
    price: 4000,
    technique: 'Fotografia FineArt',
    description: 'Captura matinal das embarcações nas margens do Rio dos Bons Sinais.'
  },
  {
    id: 102,
    title: 'Ritmos do Bairro Carrupeia',
    artist: 'Cátia Macamo',
    category: 'Pintura',
    course: 'Licenciatura em Ensino de Música',
    submittedAt: '2026-09-29',
    status: 'Pendente',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    price: null,
    technique: 'Óleo sobre tela',
    description: 'Representação abstrata das expressões sonoras e danças tradicionais.'
  }
];

const INITIAL_ARTWORKS = [
  {
    id: 1,
    title: 'Sons do Bons Sinais',
    artist: 'Lúcia Nhamusse',
    course: 'Licenciatura em Ensino de Música',
    category: 'Pintura',
    status: 'Apenas Exposição',
    price: null,
    likes: 42,
    views: 310,
    featured: true,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'Manhã no Rio dos Bons Sinais',
    artist: 'Mateus Mabote',
    course: 'Engenharia Informática',
    category: 'Fotografia Digital',
    status: 'Disponível',
    price: 4500,
    likes: 58,
    views: 480,
    featured: true,
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'Tradição e Modernidade',
    artist: 'Anísia Cossa',
    course: 'Design & Multimédia',
    category: 'Arte Digital',
    status: 'Disponível',
    price: 3000,
    likes: 24,
    views: 190,
    featured: false,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80'
  }
];

const INITIAL_ARTISTS = [
  { id: 1, name: 'Lúcia Nhamusse', course: 'Ensino de Música', role: 'Estudante', worksCount: 4, status: 'Ativo' },
  { id: 2, name: 'Mateus Mabote', course: 'Engenharia Informática', role: 'Estudante', worksCount: 3, status: 'Ativo' },
  { id: 3, name: 'Anísia Cossa', course: 'Design & Multimédia', role: 'Estudante', worksCount: 2, status: 'Ativo' },
  { id: 4, name: 'Prof. Dr. Armindo Zimba', course: 'Artes Visuais', role: 'Docente', worksCount: 6, status: 'Ativo' }
];

const INITIAL_EXHIBITIONS = [
  {
    id: 1,
    title: 'I Mostra de Arte Académica de Quelimane',
    curator: 'Coordenação de Artes Visuais',
    status: 'Ativa', // 'Ativa' | 'Em Breve' | 'Encerrada'
    type: 'Colaborativa / Aberta',
    artworksCount: 18,
    startDate: '2026-09-01',
    endDate: '2026-10-30',
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    description: 'Exposição coletiva que celebra as manifestações culturais e expressões dos estudantes do campus de Quelimane.'
  },
  {
    id: 2,
    title: 'Expressões em Fotografia Urbana',
    curator: 'Núcleo de Fotografia da UniLicungo',
    status: 'Em Breve',
    type: 'Exclusiva por Convite',
    artworksCount: 12,
    startDate: '2026-10-15',
    endDate: '2026-11-20',
    coverImage: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80',
    description: 'Um olhar fotográfico profundo sobre as transformações urbanas e arquitetónicas da Província da Zambézia.'
  },
  {
    id: 3,
    title: 'Retrospectiva das Capulanas e Padrões',
    curator: 'Prof. Dr. Armindo Zimba',
    status: 'Encerrada',
    type: 'Temática Académica',
    artworksCount: 24,
    startDate: '2026-05-10',
    endDate: '2026-07-01',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    description: 'Mostra dedicada à preservação estética e releituras digitais das capulanas tradicionais.'
  }
];

export default function Admin() {
  // --- ESTADOS DE NAVEGAÇÃO ---
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'submissions' | 'artworks' | 'artists' | 'exhibitions'
  
  // --- BUSCAS E FILTROS ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [exhibitionFilter, setExhibitionFilter] = useState('Todas'); // 'Todas' | 'Ativa' | 'Em Breve' | 'Encerrada'

  // --- ESTADOS DE DADOS ---
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [artworks, setArtworks] = useState(INITIAL_ARTWORKS);
  const [artists, setArtists] = useState(INITIAL_ARTISTS);
  const [exhibitions, setExhibitions] = useState(INITIAL_EXHIBITIONS);

  // --- MODAIS ---

  const [rejectionModal, setRejectionModal] = useState({ isOpen: false, submissionId: null, reason: '' });


  // Modais de Exposição
  const [selectedExhibition, setSelectedExhibition] = useState(null); // Ver Detalhes
  const [exhibitionModal, setExhibitionModal] = useState({ isOpen: false, mode: 'create', data: null }); // Criar / Editar

  // Formulário de Exposição
  const [exForm, setExForm] = useState({
    title: '',
    curator: 'UniLicungo Artes',
    type: 'Colaborativa / Aberta',
    status: 'Ativa',
    startDate: '',
    endDate: '',
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    description: ''
  });

  // Formulário de Nova Obra


  // --- AÇÕES DE MODERAÇÃO DE SUBMISSÕES ---
  const handleApproveSubmission = (sub) => {
    const newArt = {
      id: Date.now(),
      title: sub.title,
      artist: sub.artist,
      course: sub.course,
      category: sub.category,
      status: sub.price ? 'Disponível' : 'Apenas Exposição',
      price: sub.price,
      likes: 0,
      views: 0,
      featured: false,
      image: sub.image
    };

    setArtworks([newArt, ...artworks]);
    setSubmissions(submissions.filter((item) => item.id !== sub.id));

  };



  const handleDeleteArtwork = (id) => {
    if (window.confirm('Tem certeza que deseja remover esta obra do acervo oficial?')) {
      setArtworks(artworks.filter((art) => art.id !== id));
    }
  };





  // --- AÇÕES DE GESTÃO DE EXPOSIÇÕES ---


  const handleOpenEditExhibition = (exhibition) => {
    setExForm({
      title: exhibition.title,
      curator: exhibition.curator,
      type: exhibition.type,
      status: exhibition.status,
      startDate: exhibition.startDate,
      endDate: exhibition.endDate || '',
      coverImage: exhibition.coverImage,
      description: exhibition.description
    });
    setExhibitionModal({ isOpen: true, mode: 'edit', data: exhibition });
  };

  const handleSaveExhibition = (e) => {
    e.preventDefault();
    if (!exForm.title.trim()) return;

    if (exhibitionModal.mode === 'create') {
      const createdEx = {
        id: Date.now(),
        title: exForm.title,
        curator: exForm.curator,
        type: exForm.type,
        status: exForm.status,
        artworksCount: 0,
        startDate: exForm.startDate,
        endDate: exForm.endDate,
        coverImage: exForm.coverImage,
        description: exForm.description
      };
      setExhibitions([createdEx, ...exhibitions]);
    } else if (exhibitionModal.mode === 'edit' && exhibitionModal.data) {
      setExhibitions(
        exhibitions.map((ex) =>
          ex.id === exhibitionModal.data.id
            ? { ...ex, ...exForm }
            : ex
        )
      );
    }

    setExhibitionModal({ isOpen: false, mode: 'create', data: null });
  };

  const handleToggleExhibitionStatus = (id) => {
    setExhibitions(
      exhibitions.map((ex) => {
        if (ex.id === id) {
          let nextStatus = 'Ativa';
          if (ex.status === 'Ativa') nextStatus = 'Encerrada';
          else if (ex.status === 'Encerrada') nextStatus = 'Em Breve';
          else nextStatus = 'Ativa';
          return { ...ex, status: nextStatus };
        }
        return ex;
      })
    );
  };

  const handleDeleteExhibition = (id) => {
    if (window.confirm('Tem certeza que deseja eliminar esta exposição e encerrar a sua sala virtual?')) {
      setExhibitions(exhibitions.filter((ex) => ex.id !== id));
    }
  };

  // --- FILTROS COMPUTADOS ---
  const filteredArtworks = useMemo(() => {
    return artworks.filter((art) => {
      const matchSearch =
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.course.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'Todas' || art.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [artworks, searchTerm, selectedCategory]);

  const filteredExhibitions = useMemo(() => {
    return exhibitions.filter((ex) => {
      const matchSearch =
        ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.curator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = exhibitionFilter === 'Todas' || ex.status === exhibitionFilter;
      return matchSearch && matchStatus;
    });
  }, [exhibitions, searchTerm, exhibitionFilter]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      
      {/* 1. CABEÇALHO SUPERIOR DO ADMIN */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0088ce] flex items-center justify-center font-black text-white shadow-lg">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg leading-tight tracking-wide flex items-center gap-2">
                Painel Administrativo
                <span className="text-[10px] bg-[#8c5222] text-amber-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  UniLicungo
                </span>
              </h1>
              <p className="text-xs text-slate-400">Gestão da Galeria Virtual de Arte</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-300 font-medium">Sistema Ativo</span>
            </div>
            <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
              <div className="w-8 h-8 rounded-full bg-[#0088ce]/20 border border-[#0088ce] flex items-center justify-center text-xs font-bold text-[#0088ce]">
                AD
              </div>
              <span className="text-xs font-semibold text-slate-200 hidden md:inline">Curador Geral</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. BARRA DE NAVEGAÇÃO POR ABAS (TABS) */}
      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto scrollbar-none">
          <div className="flex space-x-1 sm:space-x-4 py-2">
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-[#0088ce] text-white shadow-md shadow-[#0088ce]/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Visão Geral</span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap relative ${
                activeTab === 'submissions'
                  ? 'bg-[#0088ce] text-white shadow-md shadow-[#0088ce]/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Submissões</span>
              {submissions.length > 0 && (
                <span className="ml-1 bg-[#8c5222] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {submissions.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('artworks')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'artworks'
                  ? 'bg-[#0088ce] text-white shadow-md shadow-[#0088ce]/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Acervo de Obras</span>
            </button>

            <button
              onClick={() => setActiveTab('artists')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'artists'
                  ? 'bg-[#0088ce] text-white shadow-md shadow-[#0088ce]/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Artistas & Cursos</span>
            </button>

            <button
              onClick={() => setActiveTab('exhibitions')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'exhibitions'
                  ? 'bg-[#0088ce] text-white shadow-md shadow-[#0088ce]/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Exposições Virtuais</span>
            </button>

          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'exhibitions' ? (
              <Link
              to={"/criarexposicao"}
                className="hidden lg:flex items-center gap-2 bg-[#0088ce] hover:bg-[#0077b5] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Exposição</span>
              </Link>
            ) : (
              <Link
                to={"/publicar"}
                className="hidden lg:flex items-center gap-2 bg-[#8c5222] hover:bg-[#73421a] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Obra</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* 3. CONTEÚDO PRINCIPAL (MUDANÇA CONFORME A ABA) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8 w-full">
        
        {/* ABA 1: VISÃO GERAL */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total no Acervo</p>
                  <h3 className="text-3xl font-black text-slate-900 mt-1">{artworks.length}</h3>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +12% este mês
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0088ce] flex items-center justify-center">
                  <Palette className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pendentes de Revisão</p>
                  <h3 className="text-3xl font-black text-[#8c5222] mt-1">{submissions.length}</h3>
                  <span className="text-[11px] text-amber-600 font-semibold mt-1 block">Aguardando curadoria</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#8c5222] flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Artistas Ativos</p>
                  <h3 className="text-3xl font-black text-slate-900 mt-1">{artists.length}</h3>
                  <span className="text-[11px] text-slate-500 font-semibold mt-1 block">Estudantes e Docentes</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Exposições Registadas</p>
                  <h3 className="text-3xl font-black text-slate-900 mt-1">{exhibitions.length}</h3>
                  <span className="text-[11px] text-blue-600 font-semibold mt-1 block">Mostras Virtuais</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0088ce] flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
              </div>
            </div>

            {submissions.length > 0 && (
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-[#8c5222] p-5 rounded-2xl bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl text-[#8c5222]">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Existem {submissions.length} obras aguardando aprovação!</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Submetidas recentemente por estudantes da UniLicungo.</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className="bg-[#8c5222] hover:bg-[#73421a] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm whitespace-nowrap"
                >
                  Ir para Moderação
                </button>
              </div>
            )}
          </div>
        )}

        {/* ABA 2: MODERAÇÃO DE SUBMISSÕES */}
        {activeTab === 'submissions' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Moderação de Submissões</h2>
                <p className="text-xs text-slate-600 mt-0.5">Revise as obras submetidas pela comunidade académica antes de serem publicadas no acervo oficial.</p>
              </div>
              <span className="bg-amber-100 text-[#8c5222] text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-200">
                {submissions.length} obras aguardando aprovação
              </span>
            </div>

            {submissions.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-slate-900 text-lg">Tudo em dia!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">Não há nenhuma submissão pendente de moderação neste momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {submissions.map((sub) => (
                  <div key={sub.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                    <div>
                      <div className="relative h-48 bg-slate-100">
                        <img src={sub.image} alt={sub.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          Pendente
                        </span>
                      </div>
                      <div className="p-5 space-y-3">
                        <div>
                          <span className="text-[10px] font-bold text-[#0088ce] uppercase tracking-wider block">{sub.category}</span>
                          <h3 className="font-extrabold text-slate-900 text-base">{sub.title}</h3>
                          <p className="text-xs text-slate-600 mt-0.5">Por <strong className="text-slate-800">{sub.artist}</strong></p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2">
                      <button
                        className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 flex-1">
                        <button
                          onClick={() => setRejectionModal({ isOpen: true, submissionId: sub.id, reason: '' })}
                          className="flex-1 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Rejeitar</span>
                        </button>
                        <button
                          onClick={() => handleApproveSubmission(sub)}
                          className="flex-1 py-2 px-3 bg-[#0088ce] hover:bg-[#0077b5] text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Aprovar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ABA 3: ACERVO DE OBRAS */}
        {activeTab === 'artworks' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Gestão do Acervo Oficial</h2>
                <p className="text-xs text-slate-600 mt-0.5">Gerencie o catálogo de obras expostas publicamente no portal da galeria.</p>
              </div>

            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar obras, artistas..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0088ce]"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                      <th className="py-3.5 px-4">Obra</th>
                      <th className="py-3.5 px-4">Artista</th>
                      <th className="py-3.5 px-4">Categoria</th>
                      <th className="py-3.5 px-4">Estado / Valor</th>
                      <th className="py-3.5 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredArtworks.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img src={art.image} alt={art.title} className="w-10 h-10 rounded-lg object-cover border" />
                          <span className="font-bold text-slate-900">{art.title}</span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{art.artist}</td>
                        <td className="py-3 px-4"><span className="px-2 py-1 bg-sky-50 text-[#0088ce] font-bold rounded-lg text-[10px]">{art.category}</span></td>
                        <td className="py-3 px-4 font-bold">{art.price ? `${art.price.toLocaleString('pt-MZ')} MT` : 'Exposição'}</td>
                        <td className="py-3 px-4 text-right">
                          <button onClick={() => handleDeleteArtwork(art.id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ABA 4: ARTISTAS */}
        {activeTab === 'artists' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-black text-slate-900 border-b border-slate-200 pb-4">Artistas Académicos</h2>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                    <th className="py-3.5 px-4">Nome</th>
                    <th className="py-3.5 px-4">Curso</th>
                    <th className="py-3.5 px-4">Vínculo</th>
                    <th className="py-3.5 px-4">Obras</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {artists.map((artist) => (
                    <tr key={artist.id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{artist.name}</td>
                      <td className="py-3.5 px-4 text-slate-600">{artist.course}</td>
                      <td className="py-3.5 px-4 font-bold text-[10px] text-[#0088ce]">{artist.role}</td>
                      <td className="py-3.5 px-4 font-bold">{artist.worksCount} obras</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ABA 5: GESTÃO COMPLETA DE EXPOSIÇÕES (NOVO / APRIMORADO COM AÇÕES) */}
        {activeTab === 'exhibitions' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Cabeçalho de Exposições */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Gestão de Exposições Virtuais</h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Crie, edite, altere o estado e gira as obras participantes das salas virtuais da UniLicungo.
                </p>
              </div>
            </div>

            {/* Barra de Filtros para Exposições */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar por título, curador ou tipo de mostra..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0088ce]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                {['Todas', 'Ativa', 'Em Breve', 'Encerrada'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setExhibitionFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      exhibitionFilter === st ? 'bg-[#0088ce] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabela Interativa de Exposições com Ações */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                      <th className="py-3.5 px-4">Exposição / Capa</th>
                      <th className="py-3.5 px-4">Curadoria & Tipo</th>
                      <th className="py-3.5 px-4">Datas de Vigência</th>
                      <th className="py-3.5 px-4">Estado</th>
                      <th className="py-3.5 px-4 text-right">Ações de Gestão</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredExhibitions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          Nenhuma exposição encontrada para os termos ou filtros selecionados.
                        </td>
                      </tr>
                    ) : (
                      filteredExhibitions.map((ex) => (
                        <tr key={ex.id} className="hover:bg-slate-50/80 transition">
                          
                          {/* Título e Capa */}
                          <td className="py-3.5 px-4 w-100">
                            <div className="flex items-center gap-3">
                              <img src={ex.coverImage} alt={ex.title} className="w-12 h-10 rounded-lg object-cover border border-slate-200 shrink-0" />
                              <div>
                                <h4 className="font-extrabold text-slate-900 text-xs line-clamp-1">{ex.title}</h4>
                                <p className="text-[10px] text-slate-400 line-clamp-1">{ex.description}</p>
                              </div>
                            </div>
                          </td>

                          {/* Curadoria */}
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-slate-800">{ex.curator}</p>
                            <span className="text-[10px] text-[#8c5222] font-bold bg-amber-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                              {ex.type}
                            </span>
                          </td>

                          {/* Datas */}
                          <td className="py-3.5 px-4 text-slate-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{ex.startDate} {ex.endDate ? `até ${ex.endDate}` : ''}</span>
                            </div>
                          </td>

                          {/* Estado Atual */}
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              ex.status === 'Ativa'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : ex.status === 'Em Breve'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {ex.status}
                            </span>
                          </td>

                          {/* Ações Atribuidas */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              
                              {/* Botão Ver Detalhes */}
                              <button
                                onClick={() => setSelectedExhibition(ex)}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                                title="Ver Detalhes e Obras"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {/* Botão Editar */}
                              <button
                                onClick={() => handleOpenEditExhibition(ex)}
                                className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0088ce] transition"
                                title="Editar Exposição"
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              {/* Botão Alternar Estado (Ativa / Encerrada) */}
                              <button
                                onClick={() => handleToggleExhibitionStatus(ex.id)}
                                className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#8c5222] transition"
                                title="Mudar Estado (Ativa / Em Breve / Encerrada)"
                              >
                                <Clock className="w-4 h-4" />
                              </button>

                              {/* Botão Eliminar */}
                              <button
                                onClick={() => handleDeleteExhibition(ex.id)}
                                className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                                title="Eliminar Exposição"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>

                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* --- MODAL DE VER DETALHES DA EXPOSIÇÃO --- */}
      {selectedExhibition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative space-y-5 border border-slate-100">
            <button
              onClick={() => setSelectedExhibition(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-[#0088ce] font-bold text-[10px] uppercase">
                {selectedExhibition.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                {selectedExhibition.status}
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900">{selectedExhibition.title}</h3>

            <div className="h-48 rounded-2xl overflow-hidden bg-slate-100 relative">
              <img src={selectedExhibition.coverImage} alt={selectedExhibition.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-slate-700"><strong>Curador / Organização:</strong> {selectedExhibition.curator}</p>
              <p className="text-slate-700"><strong>Período de Exposição:</strong> {selectedExhibition.startDate} até {selectedExhibition.endDate || 'Sem data final'}</p>
              <p className="text-slate-700"><strong>Total de Obras em Exibição:</strong> {selectedExhibition.artworksCount} obras</p>
              <div className="p-3 bg-slate-50 rounded-xl text-slate-600 border border-slate-100 mt-2">
                <strong>Descrição da Sala Virtual:</strong>
                <p className="mt-1 leading-relaxed">{selectedExhibition.description || 'Sem descrição cadastrada.'}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedExhibition(null);
                  handleOpenEditExhibition(selectedExhibition);
                }}
                className="px-4 py-2 bg-[#0088ce] hover:bg-[#0077b5] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Editar Informações</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DE CRIAR / EDITAR EXPOSIÇÃO --- */}
      {exhibitionModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setExhibitionModal({ isOpen: false, mode: 'create', data: null })}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900">
              {exhibitionModal.mode === 'create' ? 'Criar Nova Exposição Virtual' : 'Editar Exposição Virtual'}
            </h3>

            <form onSubmit={handleSaveExhibition} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Título da Exposição</label>
                <input
                  type="text"
                  required
                  value={exForm.title}
                  onChange={(e) => setExForm({ ...exForm, title: e.target.value })}
                  placeholder="Ex: I Mostra de Fotografia Urbana da Zambézia"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Curador / Organização</label>
                  <input
                    type="text"
                    required
                    value={exForm.curator}
                    onChange={(e) => setExForm({ ...exForm, curator: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipo de Exposição</label>
                  <select
                    value={exForm.type}
                    onChange={(e) => setExForm({ ...exForm, type: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0088ce] focus:outline-none font-semibold"
                  >
                    <option value="Colaborativa / Aberta">Colaborativa / Aberta</option>
                    <option value="Exclusiva por Convite">Exclusiva por Convite</option>
                    <option value="Temática Académica">Temática Académica</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estado</label>
                  <select
                    value={exForm.status}
                    onChange={(e) => setExForm({ ...exForm, status: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0088ce] focus:outline-none font-semibold"
                  >
                    <option value="Ativa">Ativa</option>
                    <option value="Em Breve">Em Breve</option>
                    <option value="Encerrada">Encerrada</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Data Início</label>
                  <input
                    type="date"
                    required
                    value={exForm.startDate}
                    onChange={(e) => setExForm({ ...exForm, startDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Data Fim</label>
                  <input
                    type="date"
                    value={exForm.endDate}
                    onChange={(e) => setExForm({ ...exForm, endDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">URL da Imagem de Capa</label>
                <input
                  type="text"
                  value={exForm.coverImage}
                  onChange={(e) => setExForm({ ...exForm, coverImage: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descrição do Conceito</label>
                <textarea
                  rows={3}
                  value={exForm.description}
                  onChange={(e) => setExForm({ ...exForm, description: e.target.value })}
                  placeholder="Escreva sobre o conceito curatorial e objetivos da mostra..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setExhibitionModal({ isOpen: false, mode: 'create', data: null })}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0088ce] hover:bg-[#0077b5] text-white font-bold rounded-xl shadow-md"
                >
                  {exhibitionModal.mode === 'create' ? 'Publicar Exposição' : 'Salvar Alterações'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}