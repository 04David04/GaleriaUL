import { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  AlertCircle, 
  Info, 
  Palette, 
  Globe, 
  Building2, 
  Layers, 
  Check, 
  X,
  FileText
} from 'lucide-react';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // 5 MB

const CriarExposicao = () => {
  const [step, setStep] = useState(1);
  const [erroCapa, setErroCapa] = useState('');

  // Dados de simulação das obras do artista já cadastradas no acervo
  const [obrasAcervo] = useState([
    { id: 1, titulo: 'Cores do Bons Sinais', categoria: 'Pintura', ano: 2025, capa: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=300' },
    { id: 2, titulo: 'Amanhecer em Quelimane', categoria: 'Fotografia', ano: 2026, capa: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300' },
    { id: 3, titulo: 'Tradição & Modernidade', categoria: 'Escultura', ano: 2025, capa: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300' }
  ]);

  // Estado do formulário
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    descricao: '',
    categoria: 'Arte Contemporânea',
    fotoCapa: null,
    fotoCapaPreview: '',
    dataInicio: '',
    dataFim: '',
    horarioVisita: '',
    modalidade: 'VIRTUAL', // VIRTUAL, PRESENCIAL, HIBRIDA
    localFisico: '',
    exposicaoAberta: false,
    maxObrasPorArtista: 3,
    obrasSelecionadasIds: []
  });

  // Manipulador de upload da Foto de Capa com validação de 5 MB
  const handleCapaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validação de tipo
    if (!file.type.startsWith('image/')) {
      setErroCapa('Por favor, selecione um arquivo de imagem válido (PNG, JPG, WEBP).');
      return;
    }

    // Validação de tamanho (Máximo 5 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErroCapa(`A foto de capa excede o limite máximo permitido de ${MAX_FILE_SIZE_MB} MB. Por favor, escolha uma imagem menor.`);
      return;
    }

    setErroCapa('');
    setFormData((prev) => ({
      ...prev,
      fotoCapa: file,
      fotoCapaPreview: URL.createObjectURL(file)
    }));
  };

  const removerFotoCapa = () => {
    setFormData((prev) => ({
      ...prev,
      fotoCapa: null,
      fotoCapaPreview: ''
    }));
    setErroCapa('');
  };

  // Alternar seleção de obra existente no acervo
  const toggleObraSelecao = (id) => {
    setFormData((prev) => {
      const jaExiste = prev.obrasSelecionadasIds.includes(id);
      return {
        ...prev,
        obrasSelecionadasIds: jaExiste
          ? prev.obrasSelecionadasIds.filter((item) => item !== id)
          : [...prev.obrasSelecionadasIds, id]
      };
    });
  };

  // Processo de envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Exposição criada com sucesso:', formData);
    alert('Exposição criada com sucesso! Você poderá gerenciá-la e associar novas obras no painel "Minhas Exposições".');
  };

  // Validação do passo 1
  const podeAvancarPasso1 = formData.titulo.trim() !== '' && formData.descricao.trim() !== '' && formData.fotoCapa !== null;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabeçalho da Página */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Criar Nova Exposição Virtual
          </h1>
          <p className="text-slate-600 mt-1">
            Organize um evento cultural, agrupe obras e compartilhe a sua narrativa curatorial com a comunidade UniLicungo.
          </p>
        </div>

        {/* Barra de Progresso (Passos) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-8">
          <div className="flex justify-between items-center relative">
            
            {/* Passo 1 */}
            <div className={`flex items-center gap-2 z-10 ${step >= 1 ? 'text-[#0088ce]' : 'text-slate-400'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-[#0088ce] text-white' : 'bg-slate-200 text-slate-600'}`}>
                1
              </div>
              <span className="hidden sm:inline font-medium text-sm">Informações</span>
            </div>

            {/* Linha Divisória */}
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-[#0088ce]' : 'bg-slate-200'}`}></div>

            {/* Passo 2 */}
            <div className={`flex items-center gap-2 z-10 ${step >= 2 ? 'text-[#0088ce]' : 'text-slate-400'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-[#0088ce] text-white' : 'bg-slate-200 text-slate-600'}`}>
                2
              </div>
              <span className="hidden sm:inline font-medium text-sm">Datas & Formato</span>
            </div>

            {/* Linha Divisória */}
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-[#0088ce]' : 'bg-slate-200'}`}></div>

            {/* Passo 3 */}
            <div className={`flex items-center gap-2 z-10 ${step >= 3 ? 'text-[#0088ce]' : 'text-slate-400'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-[#0088ce] text-white' : 'bg-slate-200 text-slate-600'}`}>
                3
              </div>
              <span className="hidden sm:inline font-medium text-sm">Obras do Acervo</span>
            </div>

            {/* Linha Divisória */}
            <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-[#0088ce]' : 'bg-slate-200'}`}></div>

            {/* Passo 4 */}
            <div className={`flex items-center gap-2 z-10 ${step >= 4 ? 'text-[#0088ce]' : 'text-slate-400'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${step >= 4 ? 'bg-[#0088ce] text-white' : 'bg-slate-200 text-slate-600'}`}>
                4
              </div>
              <span className="hidden sm:inline font-medium text-sm">Revisão</span>
            </div>

          </div>
        </div>

        {/* Formulário Principal */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
          
          {/* PASSO 1: Informações e Foto de Capa */}
          {step === 1 && (
            <div className="p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0088ce]" />
                1. Conceito e Identidade da Exposição
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Título */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Título da Exposição <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Expressões da Zambézia: Arte e Identidade"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0088ce] focus:border-transparent outline-none transition"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  />
                </div>

                {/* Subtítulo */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Subtítulo / Slogan
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Uma viagem pelas cores e memórias da região"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0088ce] focus:border-transparent outline-none transition"
                    value={formData.subtitulo}
                    onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}
                  />
                </div>

                {/* Categoria */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Categoria Curatorial
                  </label>
                  <select
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0088ce] text-slate-700 outline-none transition"
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  >
                    <option value="Arte Contemporânea">Arte Contemporânea</option>
                    <option value="Pintura & Fotografia">Pintura & Fotografia</option>
                    <option value="Património Cultural">Património Cultural</option>
                    <option value="Projetos Académicos">Projetos Académicos</option>
                    <option value="Escultura e Artesanato">Escultura e Artesanato</option>
                  </select>
                </div>

                {/* Descrição Curatorial */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Manifesto / Descrição Curatorial <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Explique o conceito, os objetivos culturais e a mensagem central que esta exposição transmite..."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0088ce] focus:border-transparent outline-none transition"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  />
                </div>

                {/* Upload da Foto de Capa com Limite de 5 MB */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Foto de Capa (Banner da Exposição) <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500 mb-2">
                    Tamanho máximo permitido: <strong>5 MB</strong>. Formatos aceitos: JPG, PNG, WEBP.
                  </p>

                  {erroCapa && (
                    <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
                      <span>{erroCapa}</span>
                    </div>
                  )}

                  {!formData.fotoCapaPreview ? (
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-[#0088ce] transition bg-slate-50 relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCapaUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="w-10 h-10 text-[#0088ce] mb-2" />
                        <p className="text-sm font-medium text-slate-700">
                          Clique ou arraste a imagem da capa aqui
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Limite máximo: 5 MB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 group">
                      <img
                        src={formData.fotoCapaPreview}
                        alt="Pré-visualização da capa"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={removerFotoCapa}
                        className="absolute top-3 right-3 bg-red-600 text-white p-1.5 rounded-full shadow-md hover:bg-red-700 transition"
                        title="Remover capa"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-sm">
                        Capa Selecionada ({(formData.fotoCapa.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* PASSO 2: Datas, Modalidade e Exposição Aberta */}
          {step === 2 && (
            <div className="p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0088ce]" />
                2. Período, Formato e Colaboração
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Data de Início */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Data de Início
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0088ce] outline-none text-slate-700"
                    value={formData.dataInicio}
                    onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                  />
                </div>

                {/* Data de Término */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Data de Término
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0088ce] outline-none text-slate-700"
                    value={formData.dataFim}
                    onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                  />
                </div>

                {/* Modalidade */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Formatos de Exibição
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, modalidade: 'VIRTUAL' })}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition ${
                        formData.modalidade === 'VIRTUAL'
                          ? 'border-[#0088ce] bg-sky-50 text-[#0088ce] font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <Globe className="w-6 h-6" />
                      <span className="text-sm">100% Virtual</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, modalidade: 'PRESENCIAL' })}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition ${
                        formData.modalidade === 'PRESENCIAL'
                          ? 'border-[#0088ce] bg-sky-50 text-[#0088ce] font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <Building2 className="w-6 h-6" />
                      <span className="text-sm">Presencial</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, modalidade: 'HIBRIDA' })}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition ${
                        formData.modalidade === 'HIBRIDA'
                          ? 'border-[#0088ce] bg-sky-50 text-[#0088ce] font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <Layers className="w-6 h-6" />
                      <span className="text-sm">Híbrida</span>
                    </button>

                  </div>
                </div>

                {/* Local Físico (se presencial ou híbrido) */}
                {(formData.modalidade === 'PRESENCIAL' || formData.modalidade === 'HIBRIDA') && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Local Físico / Sala na UniLicungo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Campus Quelimane - Bloco C, Atrium Central"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0088ce] outline-none"
                      value={formData.localFisico}
                      onChange={(e) => setFormData({ ...formData, localFisico: e.target.value })}
                    />
                  </div>
                )}

                {/* Exposição Aberta / Colaborativa */}
                <div className="md:col-span-2 bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-[#0088ce] rounded border-slate-300 focus:ring-[#0088ce]"
                      checked={formData.exposicaoAberta}
                      onChange={(e) => setFormData({ ...formData, exposicaoAberta: e.target.checked })}
                    />
                    <div>
                      <span className="font-semibold text-slate-800 text-sm">
                        Permitir Exposição Aberta / Colaborativa
                      </span>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Ao ativar, outros estudantes e artistas da UniLicungo poderão submeter obras para integrar esta exposição.
                      </p>
                    </div>
                  </label>

                  {formData.exposicaoAberta && (
                    <div className="mt-3 pl-7">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Limite de Obras por Artista Participante:
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        className="w-24 px-3 py-1.5 text-sm rounded border border-slate-300"
                        value={formData.maxObrasPorArtista}
                        onChange={(e) => setFormData({ ...formData, maxObrasPorArtista: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* PASSO 3: Seleção de Obras do Acervo */}
          {step === 3 && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-b pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#0088ce]" />
                  3. Associar Obras do seu Acervo
                </h2>
              </div>

              {/* Nota Explicativa do Fluxo */}
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl flex items-start gap-3 text-sky-900 text-sm">
                <Info className="w-5 h-5 text-[#0088ce] flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Como funciona a associação de obras?</strong>
                  <p className="text-xs text-sky-800 mt-1">
                    Selecione abaixo as obras que já estão publicadas no seu perfil. Após criar a exposição, você poderá gerenciar as suas exposições e associar/adicionar novas obras através do componente <strong>Minha Exposição</strong>[cite: 1].
                  </p>
                </div>
              </div>

              {/* Lista de Obras do Acervo com Checkbox */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3">
                  Suas obras cadastradas disponíveis ({obrasAcervo.length}):
                </p>

                {obrasAcervo.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-slate-500 text-sm">Nenhuma obra encontrada no seu acervo.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {obrasAcervo.map((obra) => {
                      const selecionada = formData.obrasSelecionadasIds.includes(obra.id);
                      return (
                        <div
                          key={obra.id}
                          onClick={() => toggleObraSelecao(obra.id)}
                          className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition ${
                            selecionada
                              ? 'border-[#0088ce] ring-2 ring-[#0088ce]/20 bg-sky-50/30'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <img
                            src={obra.capa}
                            alt={obra.titulo}
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-3">
                            <span className="text-xs font-semibold text-[#8c5222] uppercase tracking-wider">
                              {obra.categoria}
                            </span>
                            <h4 className="font-bold text-slate-800 text-sm truncate">
                              {obra.titulo}
                            </h4>
                            <p className="text-xs text-slate-500">{obra.ano}</p>
                          </div>

                          {/* Indicador de Seleção */}
                          <div
                            className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition ${
                              selecionada ? 'bg-[#0088ce] text-white' : 'bg-black/40 text-white'
                            }`}
                          >
                            {selecionada ? <Check className="w-4 h-4" /> : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* PASSO 4: Revisão e Confirmação */}
          {step === 4 && (
            <div className="p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0088ce]" />
                4. Revisar e Confirmar
              </h2>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
                {/* Banner de Capa */}
                {formData.fotoCapaPreview && (
                  <div className="w-full h-40 rounded-lg overflow-hidden border border-slate-200">
                    <img
                      src={formData.fotoCapaPreview}
                      alt="Capa da Exposição"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <span className="text-xs font-semibold text-[#0088ce] uppercase">
                    {formData.categoria} • Modalidade: {formData.modalidade}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800">{formData.titulo || 'Sem título'}</h3>
                  {formData.subtitulo && (
                    <p className="text-sm italic text-slate-600">{formData.subtitulo}</p>
                  )}
                </div>

                <p className="text-sm text-slate-700 whitespace-pre-line border-t border-slate-200 pt-3">
                  {formData.descricao}
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs text-slate-600 border-t border-slate-200 pt-3">
                  <div>
                    <strong>Início:</strong> {formData.dataInicio || 'Não definido'}
                  </div>
                  <div>
                    <strong>Término:</strong> {formData.dataFim || 'Não definido'}
                  </div>
                  <div>
                    <strong>Obras Vinculadas:</strong> {formData.obrasSelecionadasIds.length} obra(s)
                  </div>
                  <div>
                    <strong>Exposição Aberta:</strong> {formData.exposicaoAberta ? 'Sim' : 'Não'}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>
                  Após finalizar, esta exposição ficará salva. Você poderá acessá-la em <strong>Minhas Exposições</strong> para realizar alterações e associar novas obras cadastradas pelo processo padrão[cite: 1].
                </span>
              </div>
            </div>
          )}

          {/* Rodapé de Navegação */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-slate-600 font-medium hover:text-slate-800 flex items-center gap-1.5 transition text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button
                type="button"
                disabled={step === 1 && !podeAvancarPasso1}
                onClick={() => setStep(step + 1)}
                className={`px-6 py-2.5 rounded-lg font-medium text-white flex items-center gap-1.5 transition text-sm ${
                  step === 1 && !podeAvancarPasso1
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-[#0088ce] hover:bg-[#0077b3] shadow-sm'
                }`}
              >
                Próximo
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm flex items-center gap-2 transition text-sm"
              >
                <Check className="w-4 h-4" />
                Finalizar e Criar Exposição
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default CriarExposicao;