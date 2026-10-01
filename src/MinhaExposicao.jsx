import { useState } from 'react';
import { 
  Pencil, 
  Save, 
  X, 
  MapPin, 
  Tag, 
  Users, 
  ArrowLeft, 
  Check, 
  Image as ImageIcon,
  BookOpen,
  Globe,
  Building,
  Layers,
  UserCheck,
  Plus,
  Trash2,
  Star,
  ExternalLink,
  Download
} from 'lucide-react';

export default function MinhaExposicao() {
  // Estado inicial com base rigorosa no fluxo de criação do CriarExposicao.jsx
  const [exposicao, setExposicao] = useState({
    id: "exp-2026-001",
    titulo: "Expressões da Zambézia: Arte e Identidade",
    subtitulo: "Uma viagem pelas cores e memórias do Rio dos Bons Sinais",
    manifestoCuratorial: "Esta exposição reúne obras de artes visuais e fotografia digital produzidas por estudantes e docentes da UniLicungo. O objetivo é refletir sobre a evolução das tradições socioculturais na era contemporânea, promovendo o diálogo entre o ecossistema local e as novas mídias digitais.",
    categoria: "Arte Contemporânea Moçambicana",
    status: "Ativa", // Rascunho, Agendada, Ativa, Encerrada
    imagemCapa: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1200",
    
    // Datas e Horários
    dataInicio: "2026-10-15",
    dataFim: "2026-11-20",
    horario: "Segunda a Sexta, das 09:00 às 17:00",

    // Modalidade e Localização
    formato: "Híbrida", // Presencial, Virtual, Híbrida
    localFisico: "Campus Quelimane - Bloco C, Atrium Central",
    linkSalaVirtual: "https://galeria.unilicungo.ac.mz/tour-3d/zambezia",

    // Curadoria e Organização
    curador: "Prof. Dr. Eugénio Silva",
    departamentoPromotor: "Faculdade de Letras e Humanidades - Direção de Cultura",
    catalogoPdfUrl: "https://galeria.unilicungo.ac.mz/docs/catalogo-zambezia.pdf",

    // Exposição Aberta / Colaborativa
    permitirSubmissoes: true,
    limiteObrasPorArtista: 2,

    // Obras Associadas do Acervo
    obras: [
      {
        id: "obra-101",
        titulo: "Amanhecer no Bons Sinais",
        artista: "David",
        categoria: "Fotografia",
        imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400",
        destaque: true
      },
      {
        id: "obra-102",
        titulo: "Ritmos do Licungo",
        artista: "Elsa",
        categoria: "Pintura",
        imagem: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400",
        destaque: false
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...exposicao });
  const [savedMessage, setSavedMessage] = useState(false);

  // Manipuladores de Mudança nos Campos Simples
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Alternar Destaque de uma Obra
  const handleToggleDestaque = (obraId) => {
    const novasObras = formData.obras.map(obra => 
      obra.id === obraId ? { ...obra, destaque: !obra.destaque } : obra
    );
    setFormData(prev => ({ ...prev, obras: novasObras }));
  };

  // Remover Obra da Exposição
  const handleRemoveObra = (obraId) => {
    const novasObras = formData.obras.filter(obra => obra.id !== obraId);
    setFormData(prev => ({ ...prev, obras: novasObras }));
  };

  // Salvar Alterações
  const handleSave = (e) => {
    e.preventDefault();
    setExposicao(formData);
    setIsEditing(false);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3500);
  };

  // Cancelar Edição
  const handleCancel = () => {
    setFormData({ ...exposicao });
    setIsEditing(false);
  };

  // Badge de Status da Exposição
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ativa':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Agendada':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Rascunho':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Alerta de Sucesso */}
        {savedMessage && (
          <div className="flex items-center gap-2 p-4 text-green-800 bg-green-50 border border-green-200 rounded-lg shadow-sm transition-all">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">Dados da exposição atualizados e salvos com sucesso na Galeria UniLicungo!</span>
          </div>
        )}

        {/* CABEÇALHO COM AÇÕES */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Editar Exposição' : exposicao.titulo}
                </h1>
              </div>
              <p className="text-sm text-gray-500">Gestão e Curadoria de Evento Cultural</p>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO COM A HIERARQUIA RECOMENDADA */}
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#0088ce] hover:bg-[#0077b5] rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#0088ce] focus:ring-offset-1"
              >
                <Pencil className="w-4 h-4" />
                Editar exposição
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                >
                  <Save className="w-4 h-4" />
                  Guardar alterações
                </button>
              </>
            )}
          </div>
        </div>

        {/* CORPO PRINCIPAL DA EXPOSIÇÃO */}
        <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          
          {/* BANNER DE CAPA */}
          <div className="relative h-72 w-full bg-gray-100 overflow-hidden border-b border-gray-200">
            <img 
              src={isEditing ? formData.imagemCapa : exposicao.imagemCapa} 
              alt="Capa da Exposição" 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x400?text=Sem+Imagem+de+Capa'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap justify-between items-end gap-2">
              <div className="space-y-1">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border shadow-sm ${getStatusBadge(isEditing ? formData.status : exposicao.status)}`}>
                  {isEditing ? formData.status : exposicao.status}
                </span>
                {!isEditing && (
                  <h2 className="text-2xl font-bold text-white drop-shadow-sm">{exposicao.subtitulo}</h2>
                )}
              </div>
              <span className="px-3 py-1 text-xs font-medium bg-[#8c5222] text-white rounded-md shadow-sm">
                {isEditing ? formData.categoria : exposicao.categoria}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-8">

            {/* SEÇÃO 1: Conceito & Manifesto Curatorial */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0088ce]" />
                Conceito & Manifesto Curatorial
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Título */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Título da Exposição</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  ) : (
                    <p className="text-lg font-bold text-gray-900">{exposicao.titulo}</p>
                  )}
                </div>

                {/* Subtítulo / Slogan */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Subtítulo / Slogan</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="subtitulo"
                      value={formData.subtitulo}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 italic">{exposicao.subtitulo}</p>
                  )}
                </div>

                {/* Categoria e Status */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Categoria Temática</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  ) : (
                    <span className="text-sm text-gray-800 font-medium">{exposicao.categoria}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Estado de Publicação</label>
                  {isEditing ? (
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none bg-white"
                    >
                      <option value="Rascunho">Rascunho</option>
                      <option value="Agendada">Agendada (Brevemente)</option>
                      <option value="Ativa">Ativa (Exibição Pública)</option>
                      <option value="Encerrada">Encerrada</option>
                    </select>
                  ) : (
                    <p className="text-sm font-medium text-gray-800">{exposicao.status}</p>
                  )}
                </div>

                {/* URL da Imagem da Capa */}
                {isEditing && (
                  <div className="md:col-span-2 bg-gray-50 p-3 border border-gray-200 rounded-lg">
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#0088ce]" /> URL do Banner de Capa
                    </label>
                    <input
                      type="url"
                      name="imagemCapa"
                      value={formData.imagemCapa}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  </div>
                )}

                {/* Manifesto Curatorial */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Manifesto Curatorial</label>
                  {isEditing ? (
                    <textarea
                      name="manifestoCuratorial"
                      rows={4}
                      value={formData.manifestoCuratorial}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-stone-50 p-4 rounded-lg border border-stone-200">
                      {exposicao.manifestoCuratorial}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SEÇÃO 2: Modalidade, Datas & Localização */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0088ce]" />
                Modalidade, Datas e Localização
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Formato */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Formato da Exposição</label>
                  {isEditing ? (
                    <select
                      name="formato"
                      value={formData.formato}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none bg-white"
                    >
                      <option value="Virtual">Virtual (Catálogo Web)</option>
                      <option value="Presencial">Presencial (Campus)</option>
                      <option value="Híbrida">Híbrida (Campus + Site)</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                      {exposicao.formato === 'Virtual' && <Globe className="w-4 h-4 text-[#0088ce]" />}
                      {exposicao.formato === 'Presencial' && <Building className="w-4 h-4 text-[#8c5222]" />}
                      {exposicao.formato === 'Híbrida' && <Layers className="w-4 h-4 text-[#0088ce]" />}
                      <span>{exposicao.formato}</span>
                    </div>
                  )}
                </div>

                {/* Data Início */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Data de Início</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dataInicio"
                      value={formData.dataInicio}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-800 font-medium">{exposicao.dataInicio}</p>
                  )}
                </div>

                {/* Data Fim */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Data de Encerramento</label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dataFim"
                      value={formData.dataFim}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-800 font-medium">{exposicao.dataFim}</p>
                  )}
                </div>

                {/* Horário */}
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Horário de Funcionamento</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="horario"
                      value={formData.horario}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-800">{exposicao.horario}</p>
                  )}
                </div>

                {/* Local Físico */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Local Físico / Espaço</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="localFisico"
                      value={formData.localFisico}
                      onChange={handleChange}
                      placeholder="Ex.: Campus Quelimane - Bloco C"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-800">{exposicao.localFisico || "Não aplicável (100% Virtual)"}</p>
                  )}
                </div>

                {/* Link da Sala Virtual */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Link da Sala Virtual / Tour 3D</label>
                  {isEditing ? (
                    <input
                      type="url"
                      name="linkSalaVirtual"
                      value={formData.linkSalaVirtual}
                      onChange={handleChange}
                      placeholder="https://galeria.unilicungo.ac.mz/tour-3d"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  ) : (
                    exposicao.linkSalaVirtual ? (
                      <a 
                        href={exposicao.linkSalaVirtual} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0088ce] hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" /> Aceder ao Tour Virtual
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500">Nenhum link virtual associado</p>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* SEÇÃO 3: Organização, Curadoria e Anexos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#0088ce]" />
                Curadoria, Organização e Catálogo
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Curador */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Curador / Responsável</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="curador"
                      value={formData.curador}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-800">{exposicao.curador}</p>
                  )}
                </div>

                {/* Faculdade/Departamento */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Departamento / Faculdade Promotora</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="departamentoPromotor"
                      value={formData.departamentoPromotor}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-800">{exposicao.departamentoPromotor}</p>
                  )}
                </div>

                {/* Catálogo PDF */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Catálogo Oficial em PDF (Flyer/Desdobrável)</label>
                  {isEditing ? (
                    <input
                      type="url"
                      name="catalogoPdfUrl"
                      value={formData.catalogoPdfUrl}
                      onChange={handleChange}
                      placeholder="https://exemplo.com/catalogo.pdf"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                    />
                  ) : (
                    exposicao.catalogoPdfUrl ? (
                      <a 
                        href={exposicao.catalogoPdfUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#8c5222] bg-amber-50 border border-amber-200 rounded-md hover:bg-amber-100 transition-colors"
                      >
                        <Download className="w-4 h-4" /> Transferir Catálogo Oficial (PDF)
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500">Nenhum catálogo em PDF carregado</p>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* SEÇÃO 4: Submissão Aberta / Exposição Colaborativa */}
            <div className="space-y-4 bg-blue-50/60 p-4 rounded-xl border border-blue-100">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#0088ce]" />
                Exposição Colaborativa & Submissões
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <input
                      type="checkbox"
                      id="permitirSubmissoes"
                      name="permitirSubmissoes"
                      checked={formData.permitirSubmissoes}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#0088ce] rounded focus:ring-[#0088ce]"
                    />
                  ) : (
                    <span className={`w-3 h-3 rounded-full ${exposicao.permitirSubmissoes ? 'bg-green-500' : 'bg-gray-400'}`} />
                  )}
                  <label htmlFor="permitirSubmissoes" className="text-sm font-medium text-gray-800">
                    Permitir que outros artistas da comunidade submetam obras
                  </label>
                </div>

                {(isEditing ? formData.permitirSubmissoes : exposicao.permitirSubmissoes) && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Limite de Obras por Artista</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="limiteObrasPorArtista"
                        value={formData.limiteObrasPorArtista}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        className="w-28 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088ce] focus:outline-none"
                      />
                    ) : (
                      <p className="text-sm text-gray-800 font-semibold">{exposicao.limiteObrasPorArtista} obra(s) por participante</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* SEÇÃO 5: Obras de Arte Associadas do Acervo */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#0088ce]" />
                  Obras Expostas no Acervo ({isEditing ? formData.obras.length : exposicao.obras.length})
                </h3>

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => alert('Abrir modal para selecionar mais obras do acervo...')}
                    className="flex items-center gap-1 text-xs font-medium text-[#0088ce] hover:underline"
                  >
                    <Plus className="w-4 h-4" /> Adicionar Obras
                  </button>
                )}
              </div>

              {/* Lista/Grelha de Obras */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(isEditing ? formData.obras : exposicao.obras).map((obra) => (
                  <div key={obra.id} className="relative group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    
                    {/* Imagem da Obra */}
                    <div className="h-40 w-full bg-gray-100 relative">
                      <img src={obra.imagem} alt={obra.titulo} className="w-full h-full object-cover" />
                      
                      {/* Badge de Destaque */}
                      {obra.destaque && (
                        <span className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 text-xs font-bold bg-amber-400 text-stone-900 rounded-full shadow">
                          <Star className="w-3 h-3 fill-stone-900" /> Destaque
                        </span>
                      )}
                    </div>

                    {/* Informações da Obra */}
                    <div className="p-3 space-y-1">
                      <h4 className="text-sm font-bold text-gray-900 truncate">{obra.titulo}</h4>
                      <p className="text-xs text-gray-500">Por: {obra.artista}</p>
                      <span className="inline-block px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-700 rounded">
                        {obra.categoria}
                      </span>
                    </div>

                    {/* Controlos no Modo de Edição */}
                    {isEditing && (
                      <div className="p-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleToggleDestaque(obra.id)}
                          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded transition-colors ${
                            obra.destaque 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${obra.destaque ? 'fill-amber-600 text-amber-600' : ''}`} />
                          {obra.destaque ? 'Em Destaque' : 'Destacar'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveObra(obra.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Remover da Exposição"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RODAPÉ DO FORMULÁRIO (Apenas em Edição) */}
          {isEditing && (
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
              >
                <Save className="w-4 h-4" />
                Guardar alterações
              </button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}