import { useState, useEffect} from 'react';
import { getCuadranteByMes, getConfiguracionPorMes, deleteConfiguracionCuadrante, generarCuadrante } from '../services/api';
import '../css/MostrarCuadrante.css';
import CalendarioGlobal from './CalendarioGlobal';
import { ClipLoader } from 'react-spinners';
import { useLocation, useNavigate } from 'react-router-dom';
import { existeCuadranteEnLocal, guardarCuadranteEnLocal } from '../helper/localStorage';
import ModalConfirmacion from './ModalConfirmacion';



const MostrarCuadrante = () => {
  
  const location = useLocation();
  const mesInicial = location.state?.mes || '';
  const [mes, setMes] = useState(mesInicial);
  const [cuadrante, setCuadrante] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [configuraciones, setConfiguraciones] = useState([]);
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cuadrantePendiente, setCuadrantePendiente] = useState(null);

  const fetchConfiguraciones = async () => {
  try {
    const response = await getConfiguracionPorMes();
    setConfiguraciones(response.data || []);
  } catch (err) {
    console.error(err);
    setConfiguraciones([]);
  }
};


  const handleEliminar = async (mes) => {
  if (!window.confirm(`¿Eliminar configuración y asignaciones del mes ${mes}?`)) return;

  try {
    await deleteConfiguracionCuadrante(mes);
    setConfiguraciones(prev => prev.filter(cfg => cfg.mes !== mes));
  } catch (err) {
    console.error(err);
    alert('Error eliminando la configuración');
  }
};
  

     useEffect(() => {
       fetchConfiguraciones();
    }, []);


  const fetchCuadrante = async (mesAConsultar) => {
    if (!mesAConsultar) return setError('Selecciona un mes antes de consultar');
    setError(null);
    setCuadrante([]);
    setLoading(true);

    try {
      const response = await getCuadranteByMes(mesAConsultar);
      if (response.data.length === 0) {
        setError('No hay cuadrante generado para este mes.');
      } else {
        setCuadrante(response.data);
      }
    } catch (err) {
      console.error(err);
      setError('Error al obtener el cuadrante.');
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (mesInicial) {
      fetchCuadrante(mesInicial);
    }
  }, [mesInicial]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mes) {
      setError('Selecciona un mes');
      return;
    }
    fetchCuadrante(mes);
  };

  const handleVerCuadrante = async (mes) => {
  setError(null);
  setLoading(true);
  try {
    const response = await getCuadranteByMes(mes);
    if (response.data.length === 0) {
      
      await generarCuadrante({ mes });
    }
    
    navigate('/cuadrantes/generar', { state: { mes } });
  } catch (error) {
    console.error('Error al ver o generar cuadrante:', error);
    setError('Error al obtener o generar el cuadrante.');
  } finally {
    setLoading(false);
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
        <div className="configuraciones-lista">
  <h3>Configuraciones disponibles</h3>
  {configuraciones.length === 0 ? (
    <p>No hay configuraciones guardadas</p>
  ) : (
    <ul className='configuraciones-disponibles'>
      {configuraciones.map(cfg => (
        <li key={cfg.mes} className="configuracion-item">
          <strong>{cfg.mes}</strong> 
          <div className="acciones-config">
            <button onClick={() =>handleVerCuadrante(cfg.mes)}>Ver</button>
            <button onClick={() => navigate('/cuadrantes/config', { state: { config: cfg } })}>Editar</button>
            <button onClick={() => handleEliminar(cfg.mes)}>Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      </div>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <ClipLoader
      color="#cceeccff"
      size={40}
      aria-label="loading"
      data-testid="loader"
    />
        </div>
      )}
      
      {cuadrante.length > 0 && mes && !loading && (
      <div className='cuadrante-global-wrapper'>
        <button
  onClick={() => {
    if (existeCuadranteEnLocal(mes)) {
      setCuadrantePendiente({ mes, datos: cuadrante });
      setMostrarModal(true);
    } else {
      guardarCuadranteEnLocal(mes, cuadrante);
      alert('Cuadrante guardado');
    }
  }}
  className="guardar-cuadrante-button"
  style={{ marginTop: '10px' }}>Guardar Cuadrante</button>
          <CalendarioGlobal cuadranteData={cuadrante} mes={mes} />

          {mostrarModal && (
         <ModalConfirmacion
         mensaje={`Ya existe un cuadrante guardado para el mes ${cuadrantePendiente.mes}. ¿Deseas reemplazarlo?`}
         onConfirmar={() => {
          guardarCuadranteEnLocal(cuadrantePendiente.mes, cuadrantePendiente.datos);
          setMostrarModal(false);
          setCuadrantePendiente(null);
          alert('Cuadrante reemplazado');
        }}
         onCancelar={() => {
          setMostrarModal(false);
          setCuadrantePendiente(null);
        }}
      />
    )}
        </div>
        )}
  </>
  );
};

export default MostrarCuadrante;

