import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/ConfigCuadranteForm.css';

const ConfigCuadranteForm = () => {
  const location = useLocation();
  const config = location.state?.config;

  const [formData, setFormData] = useState({
    mes: '',
    horasDiarias: '',
    horasLegalesMes: '',
    socorristasPorDia: '',
  });

  useEffect(() => {
    if (config) {
      setFormData({
        mes: config.mes || '',
        horasDiarias: config.horas_diarias?.toString() || '',
        horasLegalesMes: config.horas_legales_mes?.toString() || '',
        socorristasPorDia: config.socorristas_por_dia?.toString() || '',
      });
    }
  }, [config]);

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [guardado, setGuardado] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setGuardado(false);

    if (!formData.mes || !formData.horasDiarias || !formData.horasLegalesMes || !formData.socorristasPorDia) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      const payload = {
        mes: formData.mes,
        horas_diarias: Number(formData.horasDiarias),
        horas_legales_mes: Number(formData.horasLegalesMes),
        socorristas_por_dia: Number(formData.socorristasPorDia),
      };

      await axios.put('http://localhost:3000/configuracion-cuadrante', payload);
      setMessage('Configuración guardada con éxito');
      setGuardado(true);
    } catch (err) {
      console.error(err);
      setError('Error guardando la configuración');
    }
  };

  const handleSiguiente = () => {
    navigate('/cuadrantes/generar');
  };

  return (
    <div className='config-cuadrante-form-container'>
      <h2>Configurar parámetros del Cuadrante</h2>
      <form onSubmit={handleSubmit}>
        <div className='mes'>
          <label>Mes (YYYY-MM):</label><br />
          <input
            type="month"
            name="mes"
            value={formData.mes}
            onChange={handleChange}
            required
          />
        </div>
        <div className='horas-diarias'>
          <label>Horas diarias:</label><br />
          <input
            type="number"
            step="0.1"
            name="horasDiarias"
            value={formData.horasDiarias}
            onChange={handleChange}
            required
          />
        </div>
        <div className='horas-legales'>
          <label>Horas legales al mes:</label><br />
          <input
            type="number"
            step="0.1"
            name="horasLegalesMes"
            value={formData.horasLegalesMes}
            onChange={handleChange}
            required
          />
        </div>
        <div className='socorristas'>
          <label>Socorristas por día:</label><br />
          <input
            type="number"
            name="socorristasPorDia"
            value={formData.socorristasPorDia}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Guardar configuración</button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      {guardado && (
        <button onClick={handleSiguiente} style={{ marginTop: '20px' }}>
          Siguiente: Generar Cuadrante
        </button>
      )}
    </div>
  );
};

export default ConfigCuadranteForm;
