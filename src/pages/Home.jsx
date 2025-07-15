
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  return (
    <div className='home-container'>
      <h1>Bienvenidos a SoS</h1>
      <h2>SocoShift Management App</h2>
      <p>App diseñada para generar cuadrantes en entornos dinámicos.</p>
      
      <Link to="/cuadrantes/config">
      <button>Cuadrantes</button>
      </Link>

      <Link to="/usuarios">
      <button>Usuarios</button>
      </Link>

      <Link to="/cuadrantes/mostrar">
      <button>Ver Cuadrante</button>
      </Link>

    </div>
  );
}

export default Home;


