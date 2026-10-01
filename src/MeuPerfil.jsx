import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Camera,
  Save,
  Edit3,
  Palette,
  Eye,
  Heart,
  Award,
  Lock,
  Globe,
  Plus,
  CheckCircle,
  AlertCircle,
  Calendar,
  Grid,
  X,
  ChevronRight,
  Pencil,
  Upload
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MeuPerfil = () => {
  // Aba ativa: 'dados', 'obras', 'exposicoes', 'seguranca'
  const [abaAtiva, setAbaAtiva] = useState('dados');
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  // Estado para o Modal de Edição de Obra
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [obraEditando, setObraEditando] = useState(null);

  // Dados simulados do utilizador logado
  const [perfil, setPerfil] = useState({
    id: 1,
    nome: 'David Moz',
    email: 'david.estudante@unilicungo.ac.mz',
    telefone: '+258 84 123 4567',
    categoria: 'Estudante',
    curso: 'Engenharia Informática e de Redes',
    faculdade: 'Faculdade de Ciências e Tecnologia',
    biografia:
      'Apaixonado por arte digital e artes plásticas. Exploro a intersecção entre tecnologia, cultura moçambicana e expressão visual.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    capa: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    website: 'https://portfolio-exemplo.co.mz',
    instagram: '@david_art',
    estatisticas: {
      totalObras: 3,
      exposicoes: 2,
      visualizacoes: 1240,
      curtidas: 385,
    },
  });

  // Obras do utilizador
  const [obras, setObras] = useState([
    {
      id: 1,
      user_id: 1,
      titulo: 'Amanhecer no Zambeze',
      categoria: 'Pintura Digital',
      ano: '2026',
      visibilidade: 'Pública',
      status: 'Aprovado',
      curtidas: 142,
      visualizacoes: 520,
      descricao: 'Representação digital dos tons dourados do amanhecer sobre as águas do rio Zambeze.',
      imagem: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 2,
      user_id: 1,
      titulo: 'Sinfonia das Cores',
      categoria: 'Acrílico sobre Tela',
      ano: '2025',
      visibilidade: 'Pública',
      status: 'Aprovado',
      curtidas: 98,
      visualizacoes: 340,
      descricao: 'Exploração de texturas e sobreposição de tintas acrílicas em tela de grande formato.',
      imagem: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 3,
      user_id: 1,
      titulo: 'Fragmentos Urbanos - Quelimane',
      categoria: 'Fotografia Artística',
      ano: '2026',
      visibilidade: 'Rascunho',
      status: 'Em Revisão',
      curtidas: 0,
      visualizacoes: 15,
      descricao: 'Série fotográfica retratando os detalhes arquitetónicos e do quotidiano de Quelimane.',
      imagem: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&auto=format&fit=crop',
    },
  ]);

  // Exposições em que participa
  const [exposicoes] = useState([
    {
      id: 1,
      user_id: 1,
      titulo: 'Mostra Cultural UniLicungo 2026',
      papel: 'Organizador & Expositor',
      status: 'Em Exibição',
      data: '15 Set - 30 Out 2026',
    },
    {
      id: 2,
      user_id: 2,
      titulo: 'Novos Talentos das Artes Visuais',
      papel: 'Expositor Convidado',
      status: 'Concluído',
      data: '01 Jun - 20 Jun 2026',
    },
  ]);


  // Manipulação de formulário do perfil
  const handlePerfilChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  // Upload de Fotos de Perfil ou Capa (Máx. 5 MB)
  const handleImageUpload = (e, tipo) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMensagem({
        tipo: 'erro',
        texto: 'O arquivo seleccionado excede o tamanho máximo de 5 MB.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPerfil((prev) => ({ ...prev, [tipo]: reader.result }));
      setMensagem({
        tipo: 'sucesso',
        texto: `${tipo === 'capa' ? 'Foto de capa' : 'Foto de perfil'} actualizada com sucesso!`,
      });
      setTimeout(() => setMensagem({ tipo: '', texto: '' }), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleSalvarPerfil = (e) => {
    e.preventDefault();
    setEditandoPerfil(false);
    setMensagem({
      tipo: 'sucesso',
      texto: 'As alterações ao teu perfil foram guardadas com sucesso!',
    });
    setTimeout(() => setMensagem({ tipo: '', texto: '' }), 4000);
  };

  // --- LÓGICA DO MODAL DE EDIÇÃO DA OBRA ---
  const handleAbrirModalEditarObra = (obra) => {
    setObraEditando({ ...obra });
    setModalEdicaoAberto(true);
  };

  const handleFecharModalObra = () => {
    setModalEdicaoAberto(false);
    setObraEditando(null);
  };

  const handleObraChange = (e) => {
    const { name, value } = e.target;
    setObraEditando((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagemObraUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMensagem({
        tipo: 'erro',
        texto: 'A imagem da obra excede o limite máximo de 5 MB.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setObraEditando((prev) => ({ ...prev, imagem: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSalvarEdicaoObra = (e) => {
    e.preventDefault();
    if (!obraEditando) return;

    // Atualiza a obra no estado local
    setObras((prevObras) =>
      prevObras.map((o) => (o.id === obraEditando.id ? obraEditando : o))
    );

    handleFecharModalObra();
    setMensagem({
      tipo: 'sucesso',
      texto: `A obra "${obraEditando.titulo}" foi actualizada com sucesso!`,
    });
    setTimeout(() => setMensagem({ tipo: '', texto: '' }), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Mensagem de Feedback (Toast) */}
      {mensagem.texto && (
        <div
          className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 text-white transition-all ${
            mensagem.tipo === 'erro' ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          {mensagem.tipo === 'erro' ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          <span>{mensagem.texto}</span>
        </div>
      )}

      {/* Banner de Capa */}
      <div className="relative h-64 md:h-80 w-full bg-gray-800">
        <img
          src={perfil.capa}
          alt="Capa de perfil"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Alterar Foto de Capa */}
        <label className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md cursor-pointer flex items-center gap-2 text-sm font-medium transition-all">
          <Camera className="w-4 h-4 text-blue-600" />
          <span>Alterar Capa</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, 'capa')}
          />
        </label>
      </div>

      {/* Contentor Principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
            
            {/* Foto de Perfil + Informações Rápidas */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
              <div className="relative group">
                <img
                  src={perfil.avatar}
                  alt={perfil.nome}
                  className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-md bg-white"
                />
                <label className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-transform hover:scale-105">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'avatar')}
                  />
                </label>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{perfil.nome}</h1>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {perfil.categoria}
                  </span>
                </div>
                <p className="text-gray-600 text-sm flex items-center justify-center sm:justify-start gap-1">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  {perfil.curso}
                </p>
                <p className="text-gray-500 text-xs mt-1">{perfil.faculdade}</p>
              </div>
            </div>

            {/* Ação Principal */}
            <div className="flex gap-3">
              <button
                onClick={() => setEditandoPerfil(!editandoPerfil)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                  editandoPerfil
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                {editandoPerfil ? 'Cancelar Edição' : 'Editar Perfil'}
              </button>
            </div>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-1 text-blue-600">
                <Palette className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {perfil.estatisticas.totalObras}
              </span>
              <p className="text-xs text-gray-500 font-medium">Obras Publicadas</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-1 text-amber-600">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {perfil.estatisticas.exposicoes}
              </span>
              <p className="text-xs text-gray-500 font-medium">Exposições</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-1 text-green-600">
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {perfil.estatisticas.visualizacoes}
              </span>
              <p className="text-xs text-gray-500 font-medium">Visualizações</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-1 text-red-500">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {perfil.estatisticas.curtidas}
              </span>
              <p className="text-xs text-gray-500 font-medium">Curtidas</p>
            </div>
          </div>
        </div>

        {/* Navegação por Abas (Tabs) */}
        <div className="flex border-b border-gray-200 mb-6 bg-white rounded-xl px-4 shadow-sm overflow-x-auto">
          <button
            onClick={() => setAbaAtiva('dados')}
            className={`py-4 px-5 font-semibold text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              abaAtiva === 'dados'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-4 h-4" />
            Informações Pessoais
          </button>

          <button
            onClick={() => setAbaAtiva('obras')}
            className={`py-4 px-5 font-semibold text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              abaAtiva === 'obras'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Grid className="w-4 h-4" />
            Minhas Obras ({obras.length})
          </button>

          <button
            onClick={() => setAbaAtiva('exposicoes')}
            className={`py-4 px-5 font-semibold text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              abaAtiva === 'exposicoes'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Award className="w-4 h-4" />
            Minhas Exposições
          </button>

          <button
            onClick={() => setAbaAtiva('seguranca')}
            className={`py-4 px-5 font-semibold text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              abaAtiva === 'seguranca'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Lock className="w-4 h-4" />
            Segurança & Conta
          </button>
        </div>

        {/* Conteúdo da Aba 1: Informações Pessoais */}
        {abaAtiva === 'dados' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <form onSubmit={handleSalvarPerfil}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Dados do Perfil</h2>
                {editandoPerfil && (
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    Guardar Alterações
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="nome"
                    disabled={!editandoPerfil}
                    value={perfil.nome}
                    onChange={handlePerfilChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                    E-mail Institucional
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      name="email"
                      disabled={!editandoPerfil}
                      value={perfil.email}
                      onChange={handlePerfilChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                    Telefone de Contacto
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="telefone"
                      disabled={!editandoPerfil}
                      value={perfil.telefone}
                      onChange={handlePerfilChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                    Vínculo Académico
                  </label>
                  <select
                    name="categoria"
                    disabled={!editandoPerfil}
                    value={perfil.categoria}
                    onChange={handlePerfilChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-gray-800"
                  >
                    <option value="Estudante">Estudante</option>
                    <option value="Docente">Docente / Professor</option>
                    <option value="Aluno Graduado">Ex-Aluno / Graduado</option>
                    <option value="Artista Convidado">Artista Convidado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                    Curso / Área de Estudos
                  </label>
                  <input
                    type="text"
                    name="curso"
                    disabled={!editandoPerfil}
                    value={perfil.curso}
                    onChange={handlePerfilChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                    Faculdade / Unidade Orgânica
                  </label>
                  <input
                    type="text"
                    name="faculdade"
                    disabled={!editandoPerfil}
                    value={perfil.faculdade}
                    onChange={handlePerfilChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                    Website / Portfólio
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="url"
                      name="website"
                      disabled={!editandoPerfil}
                      value={perfil.website}
                      onChange={handlePerfilChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                    Instagram / Rede Social
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    disabled={!editandoPerfil}
                    value={perfil.instagram}
                    onChange={handlePerfilChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-gray-800"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                    Biografia & Conceito Artístico
                  </label>
                  <textarea
                    rows={4}
                    name="biografia"
                    disabled={!editandoPerfil}
                    value={perfil.biografia}
                    onChange={handlePerfilChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 text-gray-800 leading-relaxed"
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Conteúdo da Aba 2: Minhas Obras */}
        {abaAtiva === 'obras' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Gerir Obras</h2>
                <p className="text-sm text-gray-500">
                  Visualiza, edita ou submete novas obras para a galeria da universidade.
                </p>
              </div>

              <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                Cadastrar Nova Obra
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {obras.map((obra) => (
                <div
                  key={obra.id}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={obra.imagem}
                      alt={obra.titulo}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${
                        obra.status === 'Aprovado'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {obra.status}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg mb-1">
                        {obra.titulo}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">
                        {obra.categoria} • {obra.ano}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> {obra.visualizacoes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-red-500" /> {obra.curtidas}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* BOTÃO EDITAR QUE ABRE O MODAL */}
                        <button
                          onClick={() => handleAbrirModalEditarObra(obra)}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo da Aba 3: Minhas Exposições */}
        {abaAtiva === 'exposicoes' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Participações & Exposições</h2>
                <p className="text-sm text-gray-500">
                  Exposições em que as tuas obras estão em destaque.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {exposicoes.map((expo) => (
                <div
                  key={expo.id}
                  className="p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-200 transition-colors"
                >
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">{expo.titulo}</h3>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {expo.data}
                      </span>
                      <span className="font-medium text-blue-600">{expo.papel}</span>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      expo.status === 'Em Exibição'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {expo.status}
                  </span>

                  { perfil.id === expo.user_id ? (
                    <Link
                        to={`/minhaexposicao`}
                        type="button" 
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                        <Pencil className="w-4 h-4" />
                        Editar exposição
                    </Link>
                  ):(
                       <Link
                            to="/verexposicao"
                            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 transition-colors rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            Ver detalhes
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                  )
                  }
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo da Aba 4: Segurança & Conta */}
        {abaAtiva === 'seguranca' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Segurança da Conta</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMensagem({
                  tipo: 'sucesso',
                  texto: 'Palavra-passe alterada com sucesso!',
                });
                setTimeout(() => setMensagem({ tipo: '', texto: '' }), 4000);
              }}
              className="max-w-md space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Palavra-passe Actual
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Nova Palavra-passe
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mínimo de 8 caracteres"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Confirmar Nova Palavra-passe
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Repita a nova palavra-passe"
                />
              </div>

              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
              >
                Actualizar Palavra-passe
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL DE EDIÇÃO DE OBRA */}
      {/* ========================================================= */}
      {modalEdicaoAberto && obraEditando && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in duration-200">
            {/* Botão Fechar Modal */}
            <button
              onClick={handleFecharModalObra}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Cabeçalho do Modal */}
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-600" />
                Editar Detalhes da Obra
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Actualiza as informações técnicas, visibilidade e imagem da tua peça.
              </p>
            </div>

            {/* Formulário de Edição */}
            <form onSubmit={handleSalvarEdicaoObra} className="space-y-5">
              {/* Pré-visualização e Troca da Imagem */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Imagem da Obra (Máx. 5 MB)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    <img
                      src={obraEditando.imagem}
                      alt="Pré-visualização"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="w-full border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50 hover:bg-blue-50/30">
                      <Upload className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-xs font-medium text-gray-700">
                        Carregar nova imagem
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        PNG, JPG ou WEBP até 5 MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImagemObraUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Título da Obra */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Título da Obra
                </label>
                <input
                  type="text"
                  name="titulo"
                  required
                  value={obraEditando.titulo}
                  onChange={handleObraChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>

              {/* Categoria / Técnica e Ano */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Categoria / Técnica
                  </label>
                  <select
                    name="categoria"
                    value={obraEditando.categoria}
                    onChange={handleObraChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  >
                    <option value="Pintura Digital">Pintura Digital</option>
                    <option value="Acrílico sobre Tela">Acrílico sobre Tela</option>
                    <option value="Fotografia Artística">Fotografia Artística</option>
                    <option value="Escultura">Escultura</option>
                    <option value="Desenho a Lápis/Carvão">Desenho a Lápis/Carvão</option>
                    <option value="Arte Mista">Arte Mista</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Ano de Criação
                  </label>
                  <input
                    type="number"
                    name="ano"
                    value={obraEditando.ano}
                    onChange={handleObraChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  />
                </div>
              </div>

              {/* Visibilidade da Obra */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Visibilidade na Galeria
                </label>
                <select
                  name="visibilidade"
                  value={obraEditando.visibilidade}
                  onChange={handleObraChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                >
                  <option value="Pública">Pública (Visível para todos os visitantes)</option>
                  <option value="Rascunho">Rascunho (Apenas visível no meu painel)</option>
                  <option value="Oculta">Oculta (Inativa temporariamente)</option>
                </select>
              </div>

              {/* Descrição / Conceito */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Descrição / Conceito da Obra
                </label>
                <textarea
                  rows={3}
                  name="descricao"
                  value={obraEditando.descricao || ''}
                  onChange={handleObraChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 leading-relaxed text-sm"
                  placeholder="Escreve uma breve explicação do conceito da tua obra..."
                />
              </div>

              {/* Botões do Rodapé do Modal */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleFecharModalObra}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Guardar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeuPerfil;