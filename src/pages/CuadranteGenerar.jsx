import { Link } from 'react-router-dom';
import GenerarCuadranteForm from '../components/GenerarCuadranteForm';

const GenerarCuadrante = () => {
  return (
    <div>
      <Link to='/cuadrantes/config'>
      <button>Atras</button>
      </Link>

      <Link to='/'>
      <button>Home</button>
      </Link>
      
      <Link to="/cuadrantes/mostrar">
      <button>Ver Cuadrante</button>
      </Link>

      <GenerarCuadranteForm />
    </div>
  );
};

export default GenerarCuadrante;





