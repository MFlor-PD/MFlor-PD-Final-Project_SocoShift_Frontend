import { useState } from 'react';
import { generarCuadrante } from '../services/api'; 
import '../css/CuadranteGenerarForm.css'


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
    <div className="generar-cuadrante-container">
      <h2>Generar Cuadrante</h2>

      <form onSubmit={handleSubmit} className="generar-cuadrante-form">
        <input
          type="month"
          placeholder="YYYY-MM"
          value={mes}
          onChange={e => setMes(e.target.value)}
          required
          className="generar-cuadrante-input"
        />

        <button type="submit" className="generar-cuadrante-button">
          Generar Cuadrante
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {resultado && (
        <pre className="resultado-pre">
          {JSON.stringify(resultado, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default GenerarCuadranteForm;