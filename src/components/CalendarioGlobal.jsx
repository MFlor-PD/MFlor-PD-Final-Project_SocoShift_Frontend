import { useState, useEffect } from 'react';
import '../css/CalendarioGlobal.css';

function CalendarioGlobal({ cuadranteData, mes }) {
  const [diasDelMes, setDiasDelMes] = useState([]);

  useEffect(() => {
    if (!mes) return;

    const [year, month] = mes.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();

    const dias = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const diaStr = i.toString().padStart(2, '0');
      dias.push(`${mes}-${diaStr}`);
    }
    setDiasDelMes(dias);
  }, [mes]);

  const asignacionesPorDia = {};
  diasDelMes.forEach(dia => {
    asignacionesPorDia[dia] = [];
  });

  cuadranteData.forEach(({ trabajador, apellido, playa, dias_trabajados }) => {
    dias_trabajados.forEach(({ fecha }) => {
      if (asignacionesPorDia[fecha]) {
        asignacionesPorDia[fecha].push({ nombre: trabajador, apellido, playa });
      }
    });
  });

  return (
    <div className="roster-container">
      <table className="roster-table">
        <thead>
          <tr>
            {diasDelMes.map(dia => (
              <th key={dia}>
                {dia.split('-')[2]} / {dia.split('-')[1]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {diasDelMes.map(dia => {
              const trabajadoresOrdenados = [...asignacionesPorDia[dia]].sort((a, b) => {
                if (a.playa !== b.playa) return a.playa.localeCompare(b.playa);
                return `${a.nombre} ${a.apellido}`.localeCompare(`${b.nombre} ${b.apellido}`);
              });

              return (
                <td key={dia}>
                  {trabajadoresOrdenados.length > 0 ? (
                    <ul className="trabajadores-list">
                      {trabajadoresOrdenados.map((trab, i) => (
                        <li key={i}>
                          <p className='trabajador'>{trab.nombre} {trab.apellido} {' '}</p>
                          <span className="playa">{trab.playa}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="sin-trabajador">-</span>
                  )}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CalendarioGlobal;

