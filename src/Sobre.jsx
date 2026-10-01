import { Link } from 'react-router-dom';
import { 
  Building2, 
  Palette, 
  Compass, 
  Heart, 
  MapPin, 
  Mail, 
  Globe, 
  Award, 
  Users, 
  PlusCircle, 
  GraduationCap,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export default function Sobre() {
  const estatisticas = [
    { valor: '100+', rótulo: 'Obras de Arte Registadas', icone: Palette },
    { valor: '50+', rótulo: 'Estudantes & Artistas', icone: Users },
    { valor: '12+', rótulo: 'Exposições Virtuais', icone: Award },
    { valor: '4+', rótulo: 'Cursos Envolvidos', icone: GraduationCap },
  ];

  const objetivos = [
    {
      titulo: 'Preservação da Cultura Local',
      descricao: 'Documentar e catalogar digitalmente o património artístico da província da Zambézia e da região centro de Moçambique.',
      icone: Compass,
      corIcone: 'text-[#0088ce]',
      bgIcone: 'bg-sky-50'
    },
    {
      titulo: 'Valorização do Talento Académico',
      descricao: 'Proporcionar uma vitrina virtual para que estudantes dos diferentes cursos da UniLicungo exponham as suas obras e trabalhos de investigação.',
      icone: GraduationCap,
      corIcone: 'text-[#8c5222]',
      bgIcone: 'bg-amber-50'
    },
    {
      titulo: 'Inovação & Acesso Digital',
      descricao: 'Garantir que a comunidade académica, investigadores e o público geral acedam livremente a coleções artísticas a partir de qualquer dispositivo.',
      icone: Globe,
      corIcone: 'text-[#0088ce]',
      bgIcone: 'bg-sky-50'
    },
    {
      titulo: 'Intercâmbio e Parcerias',
      descricao: 'Promover conexões entre a comunidade universitária, artistas locais e associações culturais moçambicanas.',
      icone: Heart,
      corIcone: 'text-[#8c5222]',
      bgIcone: 'bg-amber-50'
    }
  ];

  const faqs = [
    {
      pergunta: 'Quem pode publicar obras na Galeria?',
      resposta: 'Todos os estudantes, docentes e colaboradores da Universidade Licungo, bem como artistas locais convidados e parceiros culturais.'
    },
    {
      pergunta: 'Que tipos de arte são aceites na plataforma?',
      resposta: 'Aceitamos trabalhos de Pintura, Escultura, Fotografia, Arte Digital, Ilustração, Desenho, Instalações e Projetos de Design Gráfico.'
    },
    {
      pergunta: 'Como posso expor os meus trabalhos?',
      resposta: 'Basta aceder ao botão "Publicar Obra" no topo do site, preencher o formulário com a imagem, descrição e dados da obra. A submissão passará por uma revisão pedagógica antes de ficar visível.'
    },
    {
      pergunta: 'As exposições têm versão presencial no Campus?',
      resposta: 'Sim. Várias exposições ocorrem em formato híbrido: exibidas presencialmente nos espaços da universidade (Quelimane) e catalogadas permanentemente nesta galeria virtual.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* 1. HERO SECTION BANNER */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0088ce_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0088ce]/20 border border-[#0088ce]/40 text-[#0088ce] text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            Universidade Licungo — Quelimane
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Sobre a Galeria de Arte
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Uma plataforma institucional criada para promover, catalogar e divulgar a riqueza artística e cultural produzida pela comunidade académica da Universidade Licungo e criadores da Zambézia.
          </p>
        </div>
      </section>

      {/* 2. NÚMEROS E ESTATÍSTICAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
          {estatisticas.map((stat, index) => {
            const Icon = stat.icone;
            return (
              <div key={index} className="text-center p-2">
                <Icon className="w-6 h-6 text-[#0088ce] mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stat.valor}</div>
                <div className="text-xs text-slate-500 font-medium mt-1">{stat.rótulo}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. MISSÃO E CONTEXTO INSTITUCIONAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-4">
            <span className="text-[#8c5222] text-xs font-bold uppercase tracking-wider">
              Nossa Identidade
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              Conectando Arte, Ensino Superior e Cultura Moçambicana
            </h2>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              A <strong>Galeria de Arte da Universidade Licungo</strong> nasce como uma ponte entre o ambiente académico e a comunidade artística. O nosso objetivo é dar visibilidade aos trabalhos desenvolvidos por estudantes, professores e artistas locais, promovendo o diálogo entre as artes visuais, a pesquisa e a sociedade.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              Localizada no coração de Quelimane, a galeria virtual serve como arquivo vivo da expressão cultural da região, permitindo que obras de pintura, escultura, fotografia e arte digital cruzem fronteiras e estejam acessíveis a qualquer pessoa.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-sky-50 px-3 py-2 rounded-lg border border-sky-100">
                <CheckCircle2 className="w-4 h-4 text-[#0088ce]" />
                <span>Integração com Cursos da UniLicungo</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
                <CheckCircle2 className="w-4 h-4 text-[#8c5222]" />
                <span>Arquivo Digital Gratuito</span>
              </div>
            </div>
          </div>

          {/* Imagem / Card Visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1000&auto=format&fit=crop"
                alt="Exposição de Arte na Universidade"
                className="w-full h-80 sm:h-96 object-cover opacity-90 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Campus de Quelimane
                </p>
                <h3 className="font-bold text-lg">Universidade Licungo</h3>
                <p className="text-xs text-slate-300">Promovendo o património artístico e a educação em Moçambique.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PILARES E OBJETIVOS DA GALERIA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#0088ce] text-xs font-bold uppercase tracking-wider">
            Objetivos do Projeto
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Os Nossos Pilares Fundamentais
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Trabalhamos para garantir que a criatividade da nossa universidade tenha o reconhecimento que merece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {objetivos.map((item, idx) => {
            const Icon = item.icone;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${item.bgIcone} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${item.corIcone}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {item.titulo}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. PERGUNTAS FREQUENTES (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-10">
          <span className="text-[#8c5222] text-xs font-bold uppercase tracking-wider">
            Esclareça as suas dúvidas
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#0088ce] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {faq.pergunta}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-1">
                    {faq.resposta}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LOCALIZAÇÃO E CONTACTOS INSTITUCIONAIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-4">
            <span className="text-[#0088ce] text-xs font-bold uppercase tracking-wider">
              Contactos
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Onde Estamos
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              A Galeria de Arte é mantida e gerida no Campus da Universidade Licungo em Quelimane.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#8c5222] shrink-0" />
                <span>Quelimane, Província da Zambézia — Moçambique</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-[#0088ce] shrink-0" />
                <span>Campus Universitário UniLicungo</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0088ce] shrink-0" />
                <span>galeria@unilicungo.ac.mz</span>
              </div>
            </div>
          </div>

          {/* Banner de Chamada para Ação */}
          <div className="lg:col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                Faça parte da nossa história
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                Tem algum projeto ou obra para expor?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
                Junte-se aos estudantes e docentes que já partilharam as suas criações. Submeta o seu trabalho hoje mesmo.
              </p>
            </div>

            <div>
              <Link
                to="/publicar"
                className="inline-flex items-center gap-2 bg-[#0088ce] hover:bg-sky-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submeter Nova Obra</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}