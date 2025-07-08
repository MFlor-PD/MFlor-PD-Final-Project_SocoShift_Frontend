import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Usuarios from '../pages/Usuarios';
import Cuadrantes from '../pages/Cuadrantes';
import ListaUsuarios from '../pages/ListaUsuarios'


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/cuadrantes" element={<Cuadrantes />} />
      <Route path="/usuarios/lista" element={<ListaUsuarios/>}/>
    </Routes>
  );
}

export default AppRoutes;