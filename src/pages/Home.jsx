
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenidos a SoS</h1>
      <h2>SocoShift Management App</h2>
      <p>App diseñada para generar cuadrantes en entornos dinámicos.</p>
      <Link to="/cuadrantes">
        <button>Cuadrantes</button>
      </Link>
      <Link to="/usuarios">
        <button>Usuarios</button>
      </Link>
    </div>
  );
}

export default Home;


