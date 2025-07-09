import { Link } from 'react-router-dom';
import MostrarCuadrante from "../components/MostrarCuadrante";

function CuadranteMostrar() {
  return (
    <div>
      <h2>Mostrar Cuadrante</h2>
      <MostrarCuadrante />
      <Link to="/">Home</Link>
    </div>
  );
}

export default CuadranteMostrar;