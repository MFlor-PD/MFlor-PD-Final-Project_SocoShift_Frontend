import { useState } from 'react';
import { getCuadranteByMes } from '../services/api';
import '../css/MostrarCuadrante.css';
import CalendarioGlobal from './CalendarioGlobal';
import { Oval } from 'react-loader-spinner';

const MostrarCuadrante = () => {
  const [mes, setMes] = useState('');
  const [cuadrante, setCuadrante] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCuadrante([]);
    setLoading(true)

    if (!mes) {
      setError('Por favor selecciona un mes');
      setLoading(false)

      return;
    }

    try {
      const response = await getCuadranteByMes(mes);
      if (response.data.length === 0) {
        setError('El mes seleccionado no esta configurado. configure primero y luego genere el cuadrante para poder visualizarlo')
        return;
      }
      setCuadrante(response.data);
    } catch (err) {
      setError('Error al obtener el cuadrante: No hay suficiente personal');
      console.error(err);
    } finally {
      setLoading(false)
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

