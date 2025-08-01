import { Link } from 'react-router-dom';
import MostrarCuadrante from "../components/MostrarCuadrante";
import '../css/CuadranteMostrarPage.css';

function CuadranteMostrar() {
  return (
    <div className='cuadrante-mostrar-container'>
      <Link to='/cuadrantes/config' className='boton-atras-superior'>Configurar otro cuadrante</Link>
      <Link to="/"><button className='boton-home-superior'>Home</button></Link>

      <MostrarCuadrante /> 

    </div>
  );
}

export default CuadranteMostrar;