import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter,  
  Eye, 
  Heart, 
  X,  
  GraduationCap, 
  ShoppingBag, 
  CheckCircle2,
  ArrowUpDown,
  User
} from 'lucide-react';

// Dados de exemplo de obras de estudantes e docentes da UniLicungo
const ALL_ARTWORKS = [
  {
    id: 1,
    title: 'Sons do Bons Sinais',
    artist: 'Lúcia Nhamusse',
    course: 'Licenciatura em Ensino de Música',
    category: 'Pintura',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    status: 'Apenas Exposição',
    price: null,
    year: '2025',
    dimensions: '120 x 80 cm',
    technique: 'Óleo sobre tela',
    description: 'Obra inspirada no ritmo e movimento das águas do Rio dos Bons Sinais em Quelimane, transmitindo paz e identidade cultural zambeziana.',
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
    price: 4500,
    year: '2026',
    dimensions: '60 x 40 cm (Impressão FineArt)',
    technique: 'Fotografia de Longa Exposição',
    description: 'Captura fotográfica no alvorecer da baía de Quelimane, explorando os tons quentes do sol nascente sobre as amarrações dos barcos de pesca.',
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
    price: 3000,
    year: '2025',
    dimensions: 'Ficheiro Digital High-Res / Tela',
    technique: 'Ilustração Vectorial e Pintura Digital',
    description: 'Fusão de padrões estéticos do vestuário tradicional Moçambicano (capulanas) com formas abstratas e geometria 3D contemporânea.',
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
    price: null,
    year: '2024',
    dimensions: '45 x 30 x 25 cm',
    technique: 'Escultura em Madeira de Ébano e Bronze',
    description: 'Escultura esculpida à mão representando a força do povo moçambicano perante as adversidades climáticas na região centro.',
    likes: 31
  },
  {
    id: 5,
    title: 'Rostos da Zambézia',
    artist: 'Elsa Guambe',
    course: 'Ensino de História',
    category: 'Pintura',
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=800&q=80',
    status: 'Disponível',
    price: 6000,
    year: '2026',
    dimensions: '100 x 70 cm',
    technique: 'Acrílico sobre tela com pigmentos naturais',
    description: 'Acrílico com texturas marcantes destacando o olhar expressivo das mulheres trabalhadoras dos palmares da província da Zambézia.',
    likes: 56
  },
  {
    id: 6,
    title: 'Arquitectura Colonial & Vida',
    artist: 'Ausse Francisco',
    course: 'Engenharia Civil',
    category: 'Fotografia Digital',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    status: 'Disponível',
    price: 2500,
    year: '2026',
    dimensions: '50 x 70 cm',
    technique: 'Fotografia Urbano P&B',
    description: 'Estudo fotográfico sobre a intersecção entre as ruínas históricas do centro urbano de Quelimane e o dinamismo da juventude académica.',
    likes: 29
  }
];

const CATEGORIES = [
  'Todas',
  'Pintura',
  'Fotografia Digital',
  'Escultura',
  'Arte Digital'
];

export default function Obras() {
  // Estados para Filtros e Pesquisa
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [statusFilter, setStatusFilter] = useState('todos'); // 'todos', 'disponivel', 'exposicao'
  const [sortBy, setSortBy] = useState('relevancia'); // 'relevancia', 'preco-asc', 'preco-desc', 'likes'
  
  // Estado para Modal de Detalhes da Obra
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  
  // Estado de Obras Favoritadas
  const [likedIds, setLikedIds] = useState([]);

  // Lógica de Filtro e Ordenação
  const filteredArtworks = useMemo(() => {
    return ALL_ARTWORKS.filter((art) => {
      // Filtro de Pesquisa (Título, Artista, Técnica ou Curso)
      const matchesSearch = 
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.technique.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.course.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro de Categoria
      const matchesCategory = selectedCategory === 'Todas' || art.category === selectedCategory;

      // Filtro de Estado
      const matchesStatus = 
        statusFilter === 'todos' ||
        (statusFilter === 'disponivel' && art.status === 'Disponível') ||
        (statusFilter === 'exposicao' && art.status === 'Apenas Exposição');

      return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'preco-asc') {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === 'preco-desc') {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortBy === 'likes') {
        return (b.likes + (likedIds.includes(b.id) ? 1 : 0)) - (a.likes + (likedIds.includes(a.id) ? 1 : 0));
      }
      return a.id - b.id; // Ordem padrão
    });
  }, [searchTerm, selectedCategory, statusFilter, sortBy, likedIds]);

  // Alternar Curtida / Favorito
  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. CABEÇALHO DA PÁGINA */}
        <div className="text-center sm:text-left border-b border-slate-200/80 pb-6 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-[#0088ce] text-xs font-bold mb-2"> 
              <span>Acervo Cultural UniLicungo</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Catálogo de Obras
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Explore a diversidade de produções artísticas criadas por estudantes e docentes da Universidade Licungo.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            A mostrar <span className="font-bold text-[#0088ce]">{filteredArtworks.length}</span> de {ALL_ARTWORKS.length} obras
          </div>
        </div>

        {/* 2. BARRA DE FILTROS E PESQUISA */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Campo de Busca por Texto */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por título, artista, curso ou técnica..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0088ce] focus:bg-white transition"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs bg-slate-200 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filtro por Disponibilidade */}
            <div className="md:col-span-3 flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#8c5222] shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0088ce]"
              >
                <option value="todos">Todos os Estados</option>
                <option value="disponivel">Disponíveis para Aquisição</option>
                <option value="exposicao">Apenas em Exposição</option>
              </select>
            </div>

            {/* Ordenação */}
            <div className="md:col-span-3 flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-[#0088ce] shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0088ce]"
              >
                <option value="relevancia">Ordem Padrão</option>
                <option value="likes">Mais Populares (Apreciados)</option>
                <option value="preco-asc">Preço: Menor para Maior</option>
                <option value="preco-desc">Preço: Maior para Menor</option>
              </select>
            </div>

          </div>

          {/* Abas de Categorias */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0088ce] text-white shadow-md shadow-[#0088ce]/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* 3. GRELHA DE OBRAS DE ARTE */}
        {filteredArtworks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-sky-50 text-[#0088ce] flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Nenhuma obra encontrada</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Não encontramos resultados correspondentes à sua pesquisa ou aos filtros selecionados. Tente limpar os termos de busca.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todas');
                setStatusFilter('todos');
              }}
              className="px-5 py-2.5 bg-[#8c5222] hover:bg-[#73421a] text-white text-xs font-bold rounded-xl transition"
            >
              Restaurar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map((art) => {
              const isLiked = likedIds.includes(art.id);
              const currentLikes = art.likes + (isLiked ? 1 : 0);

              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArtwork(art)}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                >
                  {/* Container da Imagem */}
                  <div className="relative h-72 overflow-hidden bg-slate-100">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge de Estado */}
                    <span className={`absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-md ${
                      art.status === 'Disponível'
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-slate-900/80 text-slate-200'
                    }`}>
                      {art.status}
                    </span>

                    {/* Botão de Favoritar / Curtir */}
                    <button
                      onClick={(e) => toggleLike(art.id, e)}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition shadow-md ${
                        isLiked 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/90 hover:bg-white text-slate-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>

                    {/* Overlay de Ação no Hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                        <Eye className="w-4 h-4 text-[#0088ce]" />
                        <span>Ver Detalhes</span>
                      </span>
                    </div>
                  </div>

                  {/* Informações da Obra */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-bold text-[#0088ce] uppercase tracking-wider">
                          {art.category}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                          {currentLikes}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-[#0088ce] transition-colors line-clamp-1">
                        {art.title}
                      </h3>

                      <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#8c5222]" />
                        <span>Por <strong className="text-slate-800">{art.artist}</strong></span>
                      </p>

                      <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        <span className="line-clamp-1">{art.course}</span>
                      </p>
                    </div>

                    {/* Preço e Ação */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                          {art.price ? 'Valor de Aquisição' : 'Condição'}
                        </span>
                        <span className="font-black text-base text-[#8c5222]">
                          {art.price ? `${art.price.toLocaleString('pt-MZ')} MT` : 'Exposição'}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0088ce] group-hover:bg-[#0088ce] group-hover:text-white flex items-center justify-center transition-colors">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* 4. MODAL DE DETALHES DA OBRA */}
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
              <div className="md:w-1/2 bg-slate-950 relative min-h-280px md:min-h-full flex items-center justify-center">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="w-full h-full object-cover max-h-450px"
                />
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full">
                  {selectedArtwork.dimensions}
                </span>
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
                      <span className="font-semibold text-slate-700">{selectedArtwork.technique}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block">Ano de Criação:</span>
                      <span className="font-semibold text-slate-700">{selectedArtwork.year}</span>
                    </div>
                  </div>

                  {/* Descrição */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                      Sobre a Obra
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedArtwork.description}
                    </p>
                  </div>

                </div>

                {/* Rodapé do Modal (Preço e Botão de Interesse) */}
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
                      <span>{selectedArtwork.likes + (likedIds.includes(selectedArtwork.id) ? 1 : 0)} curtidas</span>
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

                    <button 
                      onClick={(e) => toggleLike(selectedArtwork.id, e)}
                      className={`p-3 rounded-xl border transition ${
                        likedIds.includes(selectedArtwork.id)
                          ? 'bg-red-50 border-red-200 text-red-500'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedIds.includes(selectedArtwork.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}