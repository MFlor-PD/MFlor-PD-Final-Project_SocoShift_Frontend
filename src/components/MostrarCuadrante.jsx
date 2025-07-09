import { useState } from 'react';
import { getCuadranteByMes } from '../services/api';

const MostrarCuadrante = () => {
  const [mes, setMes] = useState('');
  const [cuadrante, setCuadrante] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCuadrante(null);

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

      {cuadrante && (
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
          {JSON.stringify(cuadrante, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default MostrarCuadrante;
