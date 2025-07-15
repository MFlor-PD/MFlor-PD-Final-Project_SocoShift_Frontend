import { Link } from 'react-router-dom';
import GenerarCuadranteForm from '../components/GenerarCuadranteForm';
import '../css/CuadranteGenerarPage.css';

const GenerarCuadrante = () => {
  return (
    <div className='generar-cuadrante-container'>
      <Link to='/cuadrantes/config' className='boton-atras-superior'>Atras</Link>
      <Link to='/' className='boton-home-superior'>Home</Link>
      <Link to='/cuadrantes/mostrar' className='boton-ver-cuadrante'>Ver Cuadrante</Link>

      <GenerarCuadranteForm />
    </div>
  );
};

export default GenerarCuadrante;









