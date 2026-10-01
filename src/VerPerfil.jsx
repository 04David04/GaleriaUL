import { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  Award, 
  Palette, 
  Calendar, 
  Share2, 
  Heart, 
  Eye, 
  CheckCircle2, 
  Globe, 
  Building2, 
  X, 
  ExternalLink,
  ShoppingBag,
  AtSign,
  PlusCircle
} from 'lucide-react';

// Dados de demonstração do perfil do artista (substituível por chamada à API / Supabase)
const MOCK_ARTISTAS_DATA = {
  '1': {
    id: '1',
    name: 'Lúcia Nhamusse',
    course: 'Licenciatura em Ensino de Música',
    campus: 'Campus Quelimane (UniLicungo)',
    category: 'Pintura & Arte Mista',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    bio: 'Estudante do 4º ano da UniLicungo apaixonada por retratar as tradições e paisagens fluviais do Rio dos Bons Sinais através da pintura a óleo e técnicas mistas.',
    fullBio: `Lúcia Nhamusse nasceu na Província da Zambézia e desenvolveu a sua paixão pelas artes visuais combinando influências musicais e pictóricas. O seu trabalho explora a identidade cultural zambeziana, a resiliência das comunidades ribeirinhas e o uso expressivo da cor. Na Universidade Licungo, tem participado ativamente em mostras académicas e iniciativas de valorização cultural.`,
    email: 'lucia.nhamusse@unilicungo.ac.mz',
    phone: '+258 84 123 4567',
    instagram: '@lucia_art_mz',
    website: 'https://galeria.unilicungo.ac.mz/artistas/lucia-nhamusse',
    joinedDate: 'Março de 2024',
    stats: {
      totalObras: 12,
      totalExposicoes: 4,
      totalLikes: 184,
      premios: 2
    },
    // Obras do Artista
    obras: [
      {
        id: 'o1',
        title: 'Sons do Bons Sinais',
        category: 'Pintura',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        status: 'Apenas Exposição',
        price: null,
        year: '2025',
        dimensions: '120 x 80 cm',
        technique: 'Óleo sobre tela',
        description: 'Obra inspirada no ritmo e movimento das águas do Rio dos Bons Sinais em Quelimane, transmitindo paz e identidade cultural zambeziana.',
        likes: 48
      },
      {
        id: 'o2',
        title: 'Amanhecer no Campus',
        category: 'Pintura A óleo',
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
        status: 'Disponível',
        price: 5000,
        year: '2026',
        dimensions: '90 x 60 cm',
        technique: 'Tinta a óleo e colagem',
        description: 'Representação da luz matinal sobre a arquitetura do Campus de Quelimane e a vivência académica.',
        likes: 32
      },
      {
        id: 'o3',
        title: 'Retrato de Quelimane',
        category: 'Desenho & Carvão',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        status: 'Disponível',
        price: 3500,
        year: '2026',
        dimensions: '50 x 40 cm',
        technique: 'Carvão sobre papel Fabriano',
        description: 'Estudo expressivo sobre as expressões dos vendedores nos mercados tradicionais de Quelimane.',
        likes: 27
      }
    ],
    // Participações em Exposições
    exposicoes: [
      {
        id: 'exp-101',
        title: 'Cores e Texturas da Zambézia',
        campus: 'Campus Quelimane (UniLicungo)',
        date: 'Outubro de 2026',
        category: 'Exposição Coletiva',
        role: 'Expositora Convidada',
        status: 'Em Exibição',
        coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'exp-102',
        title: 'Mostra Académica de Artes Visuais UniLicungo',
        campus: 'Campus Central',
        date: 'Novembro de 2025',
        category: 'Mostra Estudantil',
        role: 'Participante',
        status: 'Concluída',
        coverImage: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=600&q=80'
      }
    ],
    // Prêmios e Reconhecimentos
    premios: [
      {
        year: '2025',
        title: '1º Lugar no Concurso Cultural UniLicungo',
        event: 'Categoria Pintura & Artes Mistas'
      },
      {
        year: '2024',
        title: 'Menção Honrosa de Mérito Artístico',
        event: 'Semana de Extensão Universitária'
      }
    ]
  }
};

export default function VerPerfil() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Carrega os dados do artista pelo ID ou utiliza o perfil fictício por padrão
  const artista = MOCK_ARTISTAS_DATA[id] || MOCK_ARTISTAS_DATA['1'];

  // Estados Locais
  const [activeTab, setActiveTab] = useState('obras'); // 'obras' | 'exposicoes' | 'biografia'
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [likedArtworkIds, setLikedArtworkIds] = useState([]);

  // Alternar Curtidas das Obras
  const toggleLikeArtwork = (artworkId, e) => {
    e.stopPropagation();
    setLikedArtworkIds((prev) => 
      prev.includes(artworkId) ? prev.filter((item) => item !== artworkId) : [...prev, artworkId]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* 1. BARRA SUPERIOR DE NAVEGAÇÃO */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/artistas')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0088ce] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar aos Artistas</span>
          </button>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert('Link do perfil copiado para a área de transferência!')}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              title="Partilhar Perfil"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. CABEÇALHO DO PERFIL (BANNER + AVATAR + DETALHES) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Banner de Capa */}
          <div className="relative h-48 sm:h-64 md:h-72 w-full bg-slate-900 overflow-hidden">
            <img 
              src={artista.coverImage} 
              alt={artista.name}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent"></div>
          </div>

          {/* Dados do Artista e Avatar */}
          <div className="p-6 sm:p-8 relative z-10 -mt-16 sm:-mt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                {/* Imagem do Perfil */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-4 border-white overflow-hidden shadow-xl bg-slate-200 shrink-0">
                  <img 
                    src={artista.avatar} 
                    alt={artista.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Informações Pessoais Rápidas */}
                <div className="space-y-1.5 pt-2 sm:pt-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-sky-100 text-[#0088ce] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {artista.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      Membro desde {artista.joinedDate}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {artista.name}
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-2 font-medium">
                    <GraduationCap className="w-4 h-4 text-[#8c5222]" />
                    <span>{artista.course}</span>
                  </p>

                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{artista.campus}</span>
                  </p>
                </div>
              </div>

              {/* Botões de Interação (Seguir / Contactar) */}
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-md ${
                    isFollowing
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                      : 'bg-[#0088ce] hover:bg-[#0077b5] text-white shadow-[#0088ce]/20'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>A Seguir Artista</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Seguir Artista</span>
                    </>
                  )}
                </button>

                <a 
                  href={`mailto:${artista.email}`}
                  className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl transition text-sm"
                >
                  <Mail className="w-4 h-4 text-[#8c5222]" />
                  <span>Contactar</span>
                </a>
              </div>

            </div>

            {/* BARRA DE ESTATÍSTICAS RÁPIDAS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-2xl font-black text-slate-900">{artista.stats.totalObras}</p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Obras Publicadas</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-2xl font-black text-[#0088ce]">{artista.stats.totalExposicoes}</p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Exposições</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-2xl font-black text-rose-600">{artista.stats.totalLikes}</p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Gostos Acumulados</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-2xl font-black text-[#8c5222]">{artista.stats.premios}</p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Reconhecimentos</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 3. TABS DE NAVEGAÇÃO DO PERFIL */}
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
            <Palette className="w-4 h-4" />
            <span>Obras ({artista.obras.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('exposicoes')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'exposicoes' 
                ? 'border-[#0088ce] text-[#0088ce]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Exposições ({artista.exposicoes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('biografia')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'biografia' 
                ? 'border-[#0088ce] text-[#0088ce]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Biografia & Contactos</span>
          </button>
        </div>
      </div>

      {/* 4. CONTEÚDO DAS TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* ABA 1: GRELHA DE OBRAS DO ARTISTA */}
        {activeTab === 'obras' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Explore o portfólio de criações de <strong className="text-slate-800">{artista.name}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artista.obras.map((obra) => {
                const isLiked = likedArtworkIds.includes(obra.id);
                const currentLikes = obra.likes + (isLiked ? 1 : 0);

                return (
                  <div 
                    key={obra.id}
                    onClick={() => setSelectedArtwork(obra)}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Imagem da Obra */}
                      <div className="relative h-64 overflow-hidden bg-slate-100">
                        <img 
                          src={obra.image} 
                          alt={obra.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-white/90 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          {obra.category}
                        </span>

                        <button 
                          onClick={(e) => toggleLikeArtwork(obra.id, e)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition shadow-sm ${
                            isLiked 
                              ? 'bg-rose-500 text-white' 
                              : 'bg-white/90 hover:bg-white text-slate-700'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Informações resumidas */}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-slate-400">
                            {obra.technique}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            {obra.status}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#0088ce] transition-colors">
                          {obra.title}
                        </h3>

                        <p className="text-xs text-slate-500 line-clamp-2">
                          {obra.description}
                        </p>
                      </div>
                    </div>

                    {/* Rodapé do Card */}
                    <div className="p-5 pt-0 border-t border-slate-100/60 flex items-center justify-between text-xs mt-3">
                      <span className="font-extrabold text-[#8c5222]">
                        {obra.price ? `${obra.price.toLocaleString('pt-MZ')} MT` : 'Exposição'}
                      </span>

                      <div className="flex items-center gap-3 text-slate-500">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                          {currentLikes}
                        </span>
                        <button className="text-[#0088ce] font-bold hover:underline flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ABA 2: EXPOSIÇÕES E PARTICIPAÇÕES */}
        {activeTab === 'exposicoes' && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600">
              Histórico de participação em mostras, vernissages e eventos culturais universitários.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artista.exposicoes.map((exp) => (
                <div 
                  key={exp.id}
                  className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-5 items-center"
                >
                  <img 
                    src={exp.coverImage} 
                    alt={exp.title}
                    className="w-full sm:w-36 h-32 rounded-xl object-cover shrink-0" 
                  />

                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#0088ce] bg-sky-50 px-2.5 py-0.5 rounded-full">
                        {exp.category}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {exp.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{exp.title}</h3>
                    
                    <p className="text-xs text-slate-600 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#8c5222]" />
                      <span>{exp.campus}</span>
                    </p>

                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.date} • Papel: <strong>{exp.role}</strong></span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA 3: BIOGRAFIA E CONTACTOS */}
        {activeTab === 'biografia' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Texto Biográfico */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#0088ce]" />
                  <span>Sobre a Artista</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {artista.fullBio}
                </p>
              </div>

              {/* Lista de Prêmios */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#8c5222]" />
                  <span>Reconhecimentos & Prêmios</span>
                </h3>

                <div className="space-y-3">
                  {artista.premios.map((premio, idx) => (
                    <div key={idx} className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
                      <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{premio.title}</h4>
                        <p className="text-xs text-slate-600">{premio.event} • {premio.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ficha Lateral de Contactos */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 space-y-5 h-fit">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                Contactos Directos
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-4 h-4 text-[#0088ce] shrink-0" />
                  <span className="truncate">{artista.email}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="w-4 h-4 text-[#0088ce] shrink-0" />
                  <span>{artista.phone}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <AtSign className="w-4 h-4 text-[#8c5222] shrink-0" />
                  <span>{artista.instagram}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={artista.website} target="_blank" rel="noreferrer" className="text-[#0088ce] hover:underline flex items-center gap-1">
                    <span>Portfólio Institucional</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* 5. MODAL DE DETALHES DA OBRA */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 relative max-h-[90vh] flex flex-col md:flex-row">
            
            {/* Fechar Modal */}
            <button
              onClick={() => setSelectedArtwork(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-md transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Imagem Ampliada */}
            <div className="md:w-1/2 bg-slate-950 relative min-h-[260px] md:min-h-full flex items-center justify-center">
              <img
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                className="w-full h-full object-cover max-h-[420px]"
              />
              <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full">
                {selectedArtwork.dimensions}
              </span>
            </div>

            {/* Detalhes da Ficha Técnica */}
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

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 font-medium block">Técnica:</span>
                    <span className="font-semibold text-slate-700">{selectedArtwork.technique}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Ano:</span>
                    <span className="font-semibold text-slate-700">{selectedArtwork.year}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                    Sobre a Obra
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedArtwork.description}
                  </p>
                </div>
              </div>

              {/* Rodapé do Modal */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Estado / Valor:</span>
                    <span className="text-xl font-extrabold text-[#8c5222]">
                      {selectedArtwork.price ? `${selectedArtwork.price.toLocaleString('pt-MZ')} MT` : 'Exposição'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-lg">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>
                      {selectedArtwork.likes + (likedArtworkIds.includes(selectedArtwork.id) ? 1 : 0)} gostos
                    </span>
                  </div>
                </div>

                {selectedArtwork.price && (
                  <button className="w-full bg-[#0088ce] hover:bg-[#0077b5] text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Demonstrar Interesse em Comprar</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}