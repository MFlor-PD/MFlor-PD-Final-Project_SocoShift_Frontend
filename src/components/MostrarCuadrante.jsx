import { useState } from 'react';
import { getCuadranteByMes } from '../services/api';
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
      setError('Error al obtener el cuadrante');
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Mes (YYYY-MM):</label><br />
        <input
          type="month"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          required
        />
        <button type="submit">Consultar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      
      {cuadrante.length > 0 && mes && (
        <CalendarioGlobal cuadranteData={cuadrante} mes={mes} />
      )}
      
    </div>
  );
};

export default MostrarCuadrante;

