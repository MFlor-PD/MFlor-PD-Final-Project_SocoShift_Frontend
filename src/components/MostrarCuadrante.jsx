import { useState, useEffect} from 'react';
import { getCuadranteByMes, getConfiguracionPorMes, deleteConfiguracionCuadrante, generarCuadrante } from '../services/api';
import '../css/MostrarCuadrante.css';
import CalendarioGlobal from './CalendarioGlobal';
import { Oval } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';

const MostrarCuadrante = () => {
  
  const location = useLocation();
  const mesInicial = location.state?.mes || '';
  const [mes, setMes] = useState(mesInicial);
  const [cuadrante, setCuadrante] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [configuraciones, setConfiguraciones] = useState([]);
  const navigate = useNavigate();

  const fetchConfiguraciones = async () => {
  try {
    const response = await getConfiguracionPorMes('');
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
      // Si no hay cuadrante, generamos
      await generarCuadrante({ mes });
    }
    // Navegamos a la página para mostrar el cuadrante
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
    <ul>
      {configuraciones.map(cfg => (
        <li key={cfg.mes} className="configuracion-item">
          <strong>{cfg.mes}</strong> | Horas/día: {cfg.horas_diarias} | Horas/mes: {cfg.horas_legales_mes} | Socorristas/día: {cfg.socorristas_por_dia}
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
          <Oval
            height={40}
            width={40}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      
      {cuadrante.length > 0 && mes && !loading && (
      <div className='cuadrante-global-wrapper'>
          <CalendarioGlobal cuadranteData={cuadrante} mes={mes} />
        </div>
        )}
  </>
  );
};

export default MostrarCuadrante;

