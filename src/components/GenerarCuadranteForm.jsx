import { useState } from 'react';
import { generarCuadrante } from '../services/api'; 
import '../css/CuadranteGenerarForm.css'


function GenerarCuadranteForm() {
  const [mes, setMes] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setResultado(null);
    setError(null);
    setLoading(true);
    const [loadingText, setLoadingText] = useState('Generando cuadrante');

    if (!mes) {
      setError('Por favor ingresa un mes');
      setLoading(false);
      return;
    }

    try {
      const data = await generarCuadrante({ mes });
      setResultado(data);
    } catch (err) {
      console.error(err);
      setError('Error generando cuadrante: no hay configuración para el mes seleccionado');
    }finally {
    setLoading(false);
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

        <button type="submit" className="generar-cuadrante-button" disabled={loading}>
          {loading ? 'Generando...' : 'Generar Cuadrante'}
        </button>
      </form>

      
      {resultado && !error && <p className="success-message">Cuadrante generado correctamente.</p>}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default GenerarCuadranteForm;