import { useState, useEffect } from 'react';
import { obtenerCuadrantesLocales, eliminarCuadranteLocal } from '../helper/localStorage';
import CalendarioGlobal from './CalendarioGlobal';
import { Link } from 'react-router-dom';
import '../css/MostrarCuadrante.css'
import '../css/CalendarioGlobal.css'

const ListarCuadrantesGuardados = () => {
  const [cuadrantes, setCuadrantes] = useState([]);
  const [cuadranteActivo, setCuadranteActivo] = useState(null);
  const [mesActivo, setMesActivo] = useState('');

  useEffect(() => {
    setCuadrantes(obtenerCuadrantesLocales());
  }, []);

  const handleVer = (cuadrante) => {
    setCuadranteActivo(cuadrante.data);
    setMesActivo(cuadrante.mes);
  };

  const handleEliminar = (mes) => {
    if (window.confirm(`¿Eliminar cuadrante guardado de ${mes}?`)) {
      eliminarCuadranteLocal(mes);
      setCuadrantes(prev => prev.filter(c => c.mes !== mes));
      if (mes === mesActivo) {
        setCuadranteActivo(null);
        setMesActivo('');
      }
    }
  };

  return (
    <div className='mostrar-cuadrante-container'>
      <Link to="/cuadrantes/mostrar"><button className='boton-atras-superior'>Atras</button></Link>
      <Link to="/"><button className="boton-home-superior">Home</button></Link> 
      <h2>Cuadrantes guardados</h2>
      {cuadrantes.length === 0 ? (
        <p>No hay cuadrantes guardados.</p>
      ) : (
        <ul className='configuraciones-disponibles'>
          {cuadrantes.map(c => (
            <li key={c.mes} className="configuracion-item">
              <strong>{c.mes}</strong>
              <button onClick={() => handleVer(c)}>Ver</button>
              <button onClick={() => handleEliminar(c.mes)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}

      {cuadranteActivo && (
        <>
          <h3>Cuadrante de {mesActivo}</h3>
          <CalendarioGlobal cuadranteData={cuadranteActivo} mes={mesActivo} />
        </>
      )}
    </div>
  );
};

export default ListarCuadrantesGuardados;
