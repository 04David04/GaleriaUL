import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  Image as ImageIcon, 
  Palette, 
  User, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  Info, 
  ArrowLeft, 
  Tag, 
  Calendar, 
  Layers, 
  X,
  Send
} from 'lucide-react';

export default function Publicar() {
  const [submetido, setSubmetido] = useState(false);
  const [previewImagem, setPreviewImagem] = useState(null);

  // Estado do Formulário
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: 'Pintura',
    ano: new Date().getFullYear().toString(),
    tecnica: '',
    dimensoes: '',
    descricao: '',
    nomeAutor: '',
    papel: 'Estudante',
    cursoOuDepto: '',
    email: '',
    telefone: '',
    imagemUrl: ''
  });

  // Atualizar campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simular Carregamento de Ficheiro/Imagem
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImagem(url);
      setFormData((prev) => ({ ...prev, imagemUrl: url }));
    }
  };

  // Limpar a imagem selecionada
  const handleRemoveImage = () => {
    setPreviewImagem(null);
    setFormData((prev) => ({ ...prev, imagemUrl: '' }));
  };

  // Submissão do Formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de envio para backend / base de dados
    setSubmetido(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* 1. HERO SECTION BANNER */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0088ce_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            to="/obras"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Galeria</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0088ce]/20 border border-[#0088ce]/40 text-[#0088ce] text-xs font-bold uppercase tracking-wider">
              Submissão de Trabalhos
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-3">
            Publicar Nova Obra na Galeria
          </h1>
          <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Partilhe a sua criação artística com a comunidade universitária da Licungo. Preencha os detalhes da obra e os seus dados de autor.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* MENSAGEM DE SUCESSO (APÓS SUBMISSÃO) */}
        {submetido ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-lg text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Obra Submetida com Sucesso!
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                A sua publicação <strong>{formData.titulo || 'Sem Título'}</strong> foi registada. O trabalho passará por uma rápida revisão pedagógica antes de ficar visível na galeria pública.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-800">Resumo da Submissão:</div>
              <div>• <strong>Autor:</strong> {formData.nomeAutor} ({formData.papel})</div>
              <div>• <strong>Curso/Depto:</strong> {formData.cursoOuDepto || 'Não especificado'}</div>
              <div>• <strong>Categoria:</strong> {formData.categoria}</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  setSubmetido(false);
                  setPreviewImagem(null);
                  setFormData({
                    titulo: '',
                    categoria: 'Pintura',
                    ano: new Date().getFullYear().toString(),
                    tecnica: '',
                    dimensoes: '',
                    descricao: '',
                    nomeAutor: '',
                    papel: 'Estudante',
                    cursoOuDepto: '',
                    email: '',
                    telefone: '',
                    imagemUrl: ''
                  });
                }}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-6 py-3 rounded-xl transition"
              >
                Submeter Outra Obra
              </button>

              <Link
                to="/artistas"
                className="w-full sm:w-auto bg-[#0088ce] hover:bg-sky-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-sm text-center"
              >
                Ver Lista de Artistas
              </Link>
            </div>
          </div>
        ) : (
          /* FORMULÁRIO DE SUBMISSÃO */
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. UPLOAD DE IMAGEM */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <ImageIcon className="w-5 h-5 text-[#0088ce]" />
                <h2 className="font-bold text-slate-900 text-base">Ficheiro Visual da Obra</h2>
              </div>

              {previewImagem ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-96 bg-slate-900 group">
                  <img
                    src={previewImagem}
                    alt="Pré-visualização"
                    className="w-full h-80 object-contain mx-auto"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-4 right-4 bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-full shadow-lg transition"
                    title="Remover Imagem"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-4 bg-slate-950/80 text-white text-[11px] px-3 py-1 rounded-lg backdrop-blur-sm">
                    Imagem pronta para envio
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-200 hover:border-[#0088ce] rounded-2xl p-8 text-center transition bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <div className="w-12 h-12 bg-sky-50 text-[#0088ce] rounded-2xl flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    Clique para selecionar ou arraste a imagem da obra
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Formatos suportados: JPG, PNG, WEBP (Máx. 10MB)
                  </p>
                </div>
              )}
            </div>

            {/* 2. INFORMAÇÕES DA OBRA */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Palette className="w-5 h-5 text-[#8c5222]" />
                <h2 className="font-bold text-slate-900 text-base">Detalhes da Obra</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Título */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Título da Obra *</span>
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Ex: Pescadores do Rio dos Bons Sinais"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                  />
                </div>

                {/* Categoria */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                    <span>Categoria / Tipo de Arte *</span>
                  </label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                  >
                    <option value="Pintura">Pintura</option>
                    <option value="Escultura">Escultura</option>
                    <option value="Fotografia">Fotografia Digital / Documental</option>
                    <option value="Arte Digital">Arte Digital & Modelação 3D</option>
                    <option value="Desenho">Desenho & Carvão</option>
                    <option value="Ilustração">Ilustração & Design Gráfico</option>
                    <option value="Artesanato">Artesanato & Capulana</option>
                  </select>
                </div>

                {/* Ano */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ano de Criação *</span>
                  </label>
                  <input
                    type="number"
                    name="ano"
                    value={formData.ano}
                    onChange={handleChange}
                    min="1990"
                    max={new Date().getFullYear()}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                  />
                </div>

                {/* Técnica / Materiais */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span>Técnica / Materiais</span>
                  </label>
                  <input
                    type="text"
                    name="tecnica"
                    value={formData.tecnica}
                    onChange={handleChange}
                    placeholder="Ex: Acrílico sobre tela, Madeira de Ébano, Câmera DSLR"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                  />
                </div>

                {/* Dimensões */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <span>Dimensões / Resolução</span>
                  </label>
                  <input
                    type="text"
                    name="dimensoes"
                    value={formData.dimensoes}
                    onChange={handleChange}
                    placeholder="Ex: 80 x 60 cm ou 3840x2160 px"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                  />
                </div>

                {/* Descrição */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Descrição / Conceito da Obra *
                  </label>
                  <textarea
                    name="descricao"
                    rows={4}
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Explique o conceito, a inspiração ou o contexto cultural e académico por trás desta obra..."
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition resize-none"
                  ></textarea>
                </div>

              </div>
            </div>

            {/* 3. INFORMAÇÕES DO AUTOR */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <User className="w-5 h-5 text-[#0088ce]" />
                <h2 className="font-bold text-slate-900 text-base">Identificação do Autor</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Nome do Autor */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Nome Completo do Autor *
                  </label>
                  <input
                    type="text"
                    name="nomeAutor"
                    value={formData.nomeAutor}
                    onChange={handleChange}
                    placeholder="Ex: David Bernardo"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                  />
                </div>

                {/* Função na UniLicungo */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>Vínculo com a UniLicungo *</span>
                  </label>
                  <select
                    name="papel"
                    value={formData.papel}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                  >
                    <option value="Estudante">Estudante</option>
                    <option value="Docente">Docente / Investigador</option>
                    <option value="Corpo Técnico">Corpo Técnico Administrativo</option>
                    <option value="Artista Convidado">Artista Convidado / Parceria Local</option>
                  </select>
                </div>

                {/* Curso ou Departamento */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Curso ou Departamento *
                  </label>
                  <input
                    type="text"
                    name="cursoOuDepto"
                    value={formData.cursoOuDepto}
                    onChange={handleChange}
                    placeholder="Ex: Engenharia de Redes & TI, Licenciatura em Ensino de História"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Email Institucional / Pessoal *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="estudante@unilicungo.ac.mz"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                  />
                </div>

                {/* Telefone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Contacto Telefónico
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="+258 84/86/87 ..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0088ce] focus:bg-white transition"
                  />
                </div>

              </div>
            </div>

            {/* BOTÃO DE SUBMISSÃO */}
            <div className="pt-2 flex items-center justify-end gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0088ce] hover:bg-sky-600 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Submeter Obra para Validação</span>
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}