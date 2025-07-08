import { Link } from 'react-router-dom';
import UsuarioForm from '../components/UsuarioForm';

function Usuarios() {
  return (
    <>
      <h2>Crear Usuario</h2>
      <UsuarioForm />

      <div style={{ marginTop: '20px' }}>
        <Link to="/">
          <button>Home</button>
        </Link>

        <Link to="/usuarios/lista">
          <button style={{ marginLeft: '10px' }}>Listar usuarios</button>
        </Link>
      </div>
    </>
  );
}

export default Usuarios;
