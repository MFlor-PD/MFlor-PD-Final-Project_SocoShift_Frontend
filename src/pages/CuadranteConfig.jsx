import { Link } from 'react-router-dom';
import ConfigCuadranteForm from '../components/ConfigCuadranteForm';

function CuadranteConfig() {
  return (
    <div>
      <Link to="/cuadrantes/generar">Siguiente</Link>
      
      <ConfigCuadranteForm />

      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
}

export default CuadranteConfig;








