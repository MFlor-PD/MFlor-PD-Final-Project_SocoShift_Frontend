import { useState, useEffect} from 'react';
import { getCuadranteByMes } from '../services/api';
import '../css/MostrarCuadrante.css';
import CalendarioGlobal from './CalendarioGlobal';
import { Oval } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';

const MostrarCuadrante = () => {
    const location = useLocation();
  const mesInicial = location.state?.mes || '';

  const [mes, setMes] = useState(mesInicial);
  const [cuadrante, setCuadrante] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // 2. Si viene con mes predefinido, cargarlo automáticamente
  useEffect(() => {
    if (mesInicial) {
      fetchCuadrante(mesInicial);
    }
  }, [mesInicial]);

  // 3. Consulta manual
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mes) {
      setError('Selecciona un mes');
      return;
    }
    fetchCuadrante(mes);
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

