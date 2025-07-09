import { useState } from 'react';
import { generarCuadrante } from '../services/api'; 

function GenerarCuadranteForm() {
  const [mes, setMes] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setResultado(null);
    setError(null);

    if (!mes) {
      setError('Por favor ingresa un mes');
      return;
    }

    try {
      const data = await generarCuadrante({ mes });
      setResultado(data);
    } catch (err) {
      console.error(err);
      setError('Error generando cuadrante');
    }
  };

  return (
    <>
      <h2>Generar Cuadrante</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="month"
          placeholder="YYYY-MM"
          value={mes}
          onChange={e => setMes(e.target.value)}
          required
        />
        <button type="submit">Generar Cuadrante</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {resultado && (
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
          {JSON.stringify(resultado, null, 2)}
        </pre>
      )}
    </>
  );
}

export default GenerarCuadranteForm;



 