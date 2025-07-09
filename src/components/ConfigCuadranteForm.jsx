import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfigCuadranteForm = () => {
  const [formData, setFormData] = useState({
    mes: '',
    horasDiarias: '',
    horasLegalesMes: '',
    socorristasPorDia: '',
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [guardado, setGuardado] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
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
    <div>
      <h2>Configurar parámetros del Cuadrante</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mes (YYYY-MM):</label><br />
          <input
            type="month"
            name="mes"
            value={formData.mes}
            onChange={handleChange}
            required
          />
        </div>
        <div>
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
        <div>
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
        <div>
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

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {guardado && (
        <button onClick={handleSiguiente} style={{ marginTop: '20px' }}>
          Siguiente: Generar Cuadrante
        </button>
      )}
    </div>
  );
};

export default ConfigCuadranteForm;



