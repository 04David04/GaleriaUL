import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from "./footer";
import Header from "./header";
import Inicio from './Inicio';
import Obras from './Obras';
import Exposicoes from './Exposicoes';
import Artistas from './Artistas';
import Sobre from './Sobre'
import Publicar from './Publicar'
import Entrar from './Entrar'
import Cadastrar from'./Cadastrar'
import CriarExposicao from './CriarExposicao';
import VerExposicoes from './VerExposicoes';
import VerPerfil from './VerPerfil';
import MeuPerfil from './MeuPerfil';
import MinhaExposicao from './MinhaExposicao';
import Admin from './Admin';

function App(){
  return(
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
          
          {/* Header tem acesso às rotas (para botões do menu, entrar, etc.) */}
          <Header />

          {/* 2. O <main> guarda apenas a troca de páginas (<Routes>) */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/Obras" element={<Obras />} />
              <Route path="/Exposicoes" element={<Exposicoes />} />
              <Route path="/Artistas" element={<Artistas />} />
              <Route path="/Sobre" element={<Sobre />} />
              <Route path="/Publicar" element={<Publicar />} />
              <Route path="/Entrar" element={<Entrar />} />
              <Route path="/Cadastrar" element={<Cadastrar />} />
              <Route path="/CriarExposicao" element={<CriarExposicao />} />
              <Route path="/VerExposicoes" element={<VerExposicoes />} />
              <Route path="/VerPerfil" element={<VerPerfil />} />
              <Route path="/MeuPerfil" element={<MeuPerfil />} />
              <Route path="/MinhaExposicao" element={<MinhaExposicao />} />
              <Route path="/Admin" element={<Admin />} />
            </Routes>
          </main>

          {/* Footer também tem acesso às rotas (para os links de rodapé) */}
          <Footer />

        </div>
      </BrowserRouter>
  )
}

export default App;