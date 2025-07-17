import { Link } from 'react-router-dom';
import UsuarioForm from '../components/UsuarioForm';

function Usuarios() {

  return (

    <>
        <Link to="/"><button className='boton-home-superior'>Home</button></Link>

        <UsuarioForm />

        <div>
        <Link to="/usuarios/lista"><button className='boton-ver-cuadrante'>Listar usuarios</button></Link>
       </div>
    </>
  );
}

export default Usuarios;
