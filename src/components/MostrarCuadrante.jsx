import { useState } from 'react';
import { getCuadranteByMes } from '../services/api';
import '../css/MostrarCuadrante.css';
import CalendarioGlobal from './CalendarioGlobal';

const MostrarCuadrante = () => {
  const [mes, setMes] = useState('');
  const [cuadrante, setCuadrante] = useState([]);
  const [error, setError] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCuadrante([]);

    if (!mes) {
      setError('Por favor selecciona un mes');
      return;
    }

    try {
      const response = await getCuadranteByMes(mes);
      setCuadrante(response.data);
    } catch (err) {
      setError('Error al obtener el cuadrante: No hay suficiente personal');
      console.error(err);
    }
  };

  return (
    <>
    <div className='mostrar-cuadrante-container'>
      <h2>Mostrar Cuadrante</h2>
      <p>Selecciona un mes para consultar el cuadrante generado.</p>
      <form onSubmit={handleSubmit} className="mostrar-cuadrante-form">
        <br />
        <input
          type="month"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          required
        />
        <button type="submit" className="mostrar-cuadrante-button">Consultar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      </div>
      
      {cuadrante.length > 0 && mes && (
      <div className='cuadrante-global-wrapper'>
          <CalendarioGlobal cuadranteData={cuadrante} mes={mes} />
        </div>
        )}
  </>
  );
};

export default MostrarCuadrante;

