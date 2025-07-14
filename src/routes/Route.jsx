import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Usuarios from '../pages/Usuarios';
import CuadranteConfig from '../pages/CuadranteConfig';
import CuadranteGenerar from '../pages/CuadranteGenerar';
import ListaUsuarios from '../pages/ListaUsuarios';
import CuadranteMostrar from '../pages/CuadranteMostrar';



function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/cuadrantes/generar" element={<CuadranteGenerar />} />
      <Route path="/cuadrantes/config" element={<CuadranteConfig />} />
      <Route path="/usuarios/lista" element={<ListaUsuarios />}/>
      <Route path="/cuadrantes/mostrar" element={<CuadranteMostrar />} />   
      </Routes>
  );
}

export default AppRoutes;


    




