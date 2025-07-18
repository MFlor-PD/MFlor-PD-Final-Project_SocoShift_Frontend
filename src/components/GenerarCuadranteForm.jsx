import { useState, useEffect } from 'react';
import { generarCuadrante } from '../services/api'; 
import '../css/CuadranteGenerarForm.css';
import { useNavigate, useLocation } from 'react-router-dom';


function GenerarCuadranteForm() {
  const [mes, setMes] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mesSeleccionado= location.state?.mes || '';

  useEffect(() => {
    if (mesSeleccionado) {
      setMes(mesSeleccionado);
    }
  }, [mesSeleccionado]);

  const handleSubmit = async e => {
    e.preventDefault();
    setResultado(null);
    setError(null);
    setLoading(true);

    if (!mes) {
      setError('Por favor ingresa un mes');
      setLoading(false);
      return;
    }

    try {
      const response = await generarCuadrante({ mes });
      setResultado(response.data);
    } catch (err) {
      console.error(err);
      setError('Error generando cuadrante: no hay configuración para el mes seleccionado');
    } finally {
      setLoading(false);
    }
  };
    
    const handleMostrarCuadrante = () => {
    navigate('/cuadrantes/mostrar', { state: { mes } });

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

      {loading && <div className="spinner"></div>}

      {resultado && !error && (
        <>
          <p className="success-message">Cuadrante generado correctamente.</p>
          <button
            onClick={handleMostrarCuadrante}
            className="generar-cuadrante-button"
            style={{ marginTop: '10px' }}
          >
            Mostrar Cuadrante
          </button>
        </>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}


export default GenerarCuadranteForm;
