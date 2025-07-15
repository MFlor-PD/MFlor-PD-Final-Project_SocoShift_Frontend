import { Link } from 'react-router-dom';
import ConfigCuadranteForm from '../components/ConfigCuadranteForm';
import '../css/CuadranteConfigPage.css';

function CuadranteConfig() {
  return (
    <div className="pagina-config-cuadrante">
      <div className="top-buttons">
        <Link to="/" className="boton-home-superior">
          Home
        </Link>

        <Link to="/cuadrantes/generar" className="boton-siguiente-superior">
          Siguiente
        </Link>
      </div>

      <ConfigCuadranteForm />
    </div>
  );
}

export default CuadranteConfig;


