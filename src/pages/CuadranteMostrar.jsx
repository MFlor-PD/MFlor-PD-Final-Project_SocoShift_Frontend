import { Link } from 'react-router-dom';
import MostrarCuadrante from "../components/MostrarCuadrante";

function CuadranteMostrar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <h2>Mostrar Cuadrante</h2>
      <MostrarCuadrante /> 
    </div>
  );
}

export default CuadranteMostrar;